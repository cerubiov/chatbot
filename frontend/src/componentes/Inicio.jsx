import React from "react";
import ChatBot from "./ChatBot"

export default function Inicio() {
  return (
    <section className="card">
      <h1>Chat Publico</h1>
      <p style={{ color: "#9ca3af", marginBottom:16 }}>
         Puedes conversar libremente con el chatbot. Si deseas administrar la
        base de conocimiento (crear, editar o eliminar preguntas), inicia
        sesión usando los botones de la parte superior.
      </p>
      <ChatBot/>
      </section>
  );
}
