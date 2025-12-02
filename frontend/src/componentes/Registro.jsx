import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOkMsg("");

    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setError("Completa todos los campos.");
      return;
    }

    try {
      setCargando(true);
      await api.registrar({
        nombre: nombre.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      setOkMsg("Registro exitoso. Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al registrarse");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="card">
      <h2>Registrarse</h2>
      <form onSubmit={onSubmit}>
        <label>Nombre</label>
        <input
          className="input"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label style={{ marginTop: 10 }}>Email</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{ marginTop: 10 }}>Contraseña</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{ marginTop: 12 }}>
          <button className="btn" disabled={cargando}>
            {cargando ? "Creando cuenta..." : "Registrarme"}
          </button>
        </div>

        {error && (
          <p style={{ color: "#fca5a5", marginTop: 10 }}>{error}</p>
        )}
        {okMsg && (
          <p style={{ color: "#4ade80", marginTop: 10 }}>{okMsg}</p>
        )}
      </form>
    </section>
  );
}
