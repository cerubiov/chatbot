import React from "react";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <section className="card">
      <h1>¿Qué deseas hacer?</h1>
      <p style={{ color: "#9ca3af" }}>
        Elige entre alimentar al chatbot con nuevas preguntas/respuestas o conversar con él.
      </p>
      <div className="row" style={{ marginTop: 16 }}>
        <Link to="/alimentar" className="btn">Alimentar con preguntas</Link>
        <Link to="/chat" className="btn secondary">Interactuar con el chatbot</Link>
      </div>
    </section>
  );
}
