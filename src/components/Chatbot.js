import React, { useState } from "react";
import "../styles.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Tu es un assistant pour aider les étudiants à prendre des rendez-vous avec des tuteurs." },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "Je n’ai pas compris, peux-tu reformuler ?";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Erreur lors de la communication avec GPT." }]);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h2>💬 Chatbot Étudiant</h2>
      <div className="chatbox">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="bot-msg">⏳ GPT réfléchit...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Posez votre question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}

export default Chatbot;
