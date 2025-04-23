import React, { useState, useRef, useEffect } from "react";
import "../styles/ChatWidget.css"; // optional custom styling

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const controllerRef = useRef(null);
  const scrollRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botMessage = { sender: "bot", text: "" };
    setMessages((prev) => [...prev, botMessage]);

    controllerRef.current = new AbortController();

    try {
      const response = await fetch(
        "https://mcd-locator-4f4a288dfb77.herokuapp.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
          signal: controllerRef.current.signal,
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last.sender === "bot") {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...last,
              text: last.text + chunk,
            };
            return updated;
          }
          return prev;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, an error occurred." },
      ]);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div
        className="chat-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          background: "#007bff",
          color: "white",
          padding: "10px 15px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        💬
      </div>

      {isOpen && (
        <div
          className="chat-container"
          style={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: "300px",
            maxHeight: "500px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          <div
            className="chat-messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px",
              fontSize: "0.9rem",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  margin: "4px 0",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: msg.sender === "user" ? "#007bff" : "#eee",
                    color: msg.sender === "user" ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "16px",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", borderTop: "1px solid #ccc" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              style={{
                flex: 1,
                border: "none",
                padding: "10px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                border: "none",
                background: "#007bff",
                color: "white",
                padding: "0 16px",
              }}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
