import React from "react";
import ChatBot from "./ChatBot";

export default function ChatPublico() {
  return (
    <section className="card">
      <h1>Chat Público</h1>
      <p style={{ color: "#9ca3af", marginBottom: 16 }}>
        Puedes conversar libremente con el chatbot.
      </p>

      <ChatBot />
    </section>
  );
}