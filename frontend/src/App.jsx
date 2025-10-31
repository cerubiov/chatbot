import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Inicio from "./componentes/Inicio";
import ChatBot from "./componentes/ChatBot";
import FormularioAdmin from "./componentes/FormularioAdmin";
import "./estilos/principal.css";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">Chatbot MERN</Link>
        <nav className="nav">
          <Link to="/alimentar">Alimentar</Link>
        </nav>
          <Link to="/chat">Chatear</Link>
      </header>
 
      <main className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/alimentar" element={<FormularioAdmin />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">© {new Date().getFullYear()} Emily's</footer>
      
    </div>
  );
}
