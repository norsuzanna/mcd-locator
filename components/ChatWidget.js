"use client";
import React, { useState, useRef, useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import styles from "../styles/ChatWidget.module.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const newBotMsg = { sender: "bot", text: "" };
    setMessages((prev) => [...prev, newBotMsg]);

    // Constructing the URL with the user's message as a query parameter
    const eventSource = new EventSourcePolyfill(
      `https://mcd-locator-4f4a288dfb77.herokuapp.com/chat?message=${encodeURIComponent(
        input
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setInput("");

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        eventSource.close();
        return;
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text += event.data;
        return updated;
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to chatbot." },
      ]);
    };
  };

  return (
    <div className={styles.container}>
      <button className={styles.toggleBtn} onClick={toggleChat}>
        💬
      </button>

      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.header}>McD Chat</div>
          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.msg} ${
                  msg.sender === "user" ? styles.user : styles.bot
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputArea}>
            <input
              className={styles.input}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about McD outlets..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className={styles.sendBtn} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
