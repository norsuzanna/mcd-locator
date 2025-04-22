"use client";
import React, { useState } from "react";
import axios from "axios";

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    try {
      const response = await axios.post("https://your-fastapi-endpoint/chat", {
        message: input,
      });

      const botMsg = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { sender: "bot", text: "Error connecting to chatbot." };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        width: isOpen ? "300px" : "50px",
        height: isOpen ? "400px" : "50px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 0 12px rgba(0,0,0,0.3)",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          height: "50px",
          backgroundColor: "#007bff",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <strong>Chat</strong>
        <span>{isOpen ? "−" : "+"}</span>
      </div>

      {isOpen && (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "4px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    backgroundColor:
                      msg.sender === "user" ? "#dcf8c6" : "#f1f0f0",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              padding: "8px",
              borderTop: "1px solid #ddd",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              style={{ marginLeft: "6px", padding: "6px 12px" }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
