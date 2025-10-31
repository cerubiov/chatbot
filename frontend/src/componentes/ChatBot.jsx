import React, { useState } from "react";
import { api } from "../services/api";

export default function ChatBot() {
  const [mensajes, setMensajes] = useState([
    { rol: "bot", texto: "¡Hola! ¿En qué te ayudo?" },
  ]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const normalizaRespuesta = (data) => {
    // Intenta diferentes campos comunes
    if (data == null) return null;
    if (typeof data === "string") return data;
    return (
      data.respuesta ??
      data.answer ??
      data.reply ??
      data.mensaje ??
      data.message ??
      data.texto ??
      null
    );
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    const propio = { rol: "user", texto: texto.trim() };
    setMensajes((m) => [...m, propio]);
    setTexto("");
    setError("");
    setCargando(true);

    try {
      const data = await api.enviarMensaje(propio.texto);
      console.log("Respuesta /api/preguntas/responder:", data);

      let reply = normalizaRespuesta(data);
      if (reply == null) reply = "No tengo una respuesta para eso.";

      setMensajes((m) => [...m, { rol: "bot", texto: String(reply) }]);
    } catch (e) {
      console.error("Fallo en responder:", e);
      setMensajes((m) => [...m, { rol: "bot", texto: "Error de conexión" }]);
      setError(e.message || "No se pudo contactar al servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="card">
      <h2>Chat</h2>

      <div style={{
        background:"#0b1220", border:"1px solid #1f2937", borderRadius:12,
        padding:12, height:360, overflowY:"auto", marginTop:12
      }}>
        {mensajes.map((m, i) => (
          <div key={i} style={{ marginBottom: 10, display:"flex", justifyContent: m.rol==="user" ? "flex-end":"flex-start" }}>
            <div style={{
              background: m.rol==="user" ? "#1f2937" : "#0c4a6e",
              color:"#e5e7eb", padding:"8px 10px", borderRadius:10, maxWidth:"75%"
            }}>
              {m.texto}
            </div>
          </div>
        ))}
        {cargando && <div style={{ color:"#9ca3af" }}>Pensando…</div>}
      </div>

      <form onSubmit={enviar} style={{ display:"flex", gap:8, marginTop:12 }}>
        <input
          className="input"
          placeholder="Escribe tu mensaje…"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button className="btn" disabled={cargando || !texto.trim()}>
          Enviar
        </button>
      </form>

      {error && <p style={{ color:"#fca5a5", marginTop:8 }}>{error}</p>}
    </section>
  );
}
