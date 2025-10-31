import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function FormularioAdmin() {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [lista, setLista] = useState([]);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const cargar = async () => {
    setError("");
    try {
      const data = await api.listarPreguntas();
      setLista(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error al listar /api/preguntas:", e);
      setError("No se pudieron cargar las preguntas.");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const resetForm = () => {
    setPregunta("");
    setRespuesta("");
    setEditId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!pregunta.trim() || !respuesta.trim()) {
      setError("Completa ambos campos.");
      return;
    }
    try {
      setGuardando(true);
      if (editId) {
        await api.actualizarPregunta(editId, {
          pregunta: pregunta.trim(),
          respuesta: respuesta.trim(),
        });
      } else {
        await api.crearPregunta({
          pregunta: pregunta.trim(),
          respuesta: respuesta.trim(),
        });
      }
      resetForm();
      await cargar();
    } catch (e) {
      console.error(
        `${editId ? "Error al actualizar" : "Error al crear"} /api/preguntas:`,
        e
      );
      setError(e.message || (editId ? "Error al actualizar." : "Error al crear."));
    } finally {
      setGuardando(false);
    }
  };

  const onEditar = (p) => {
    setPregunta(p.pregunta || "");
    setRespuesta(p.respuesta || "");
    setEditId(p._id || p.id);
  };

  const onEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta pregunta?")) return;
    setError("");
    try {
      setGuardando(true);
      await api.eliminarPregunta(id);
      if (editId === id) resetForm();
      await cargar();
    } catch (e) {
      console.error("Error al eliminar /api/preguntas:", e);
      setError(e.message || "No se pudo eliminar la pregunta.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="card">
      <h2>Alimentar el chatbot</h2>

      <form onSubmit={onSubmit} style={{ marginTop: 12 }}>
        <label>Pregunta</label>
        <textarea
          className="textarea"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          required
        />
        <label style={{ marginTop: 10 }}>Respuesta</label>
        <textarea
          className="textarea"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          required
        />
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button className="btn" disabled={guardando}>
            {guardando ? "Guardando..." : editId ? "Actualizar" : "Guardar"}
          </button>
          {editId && (
            <button
              type="button"
              className="btn secondary"
              onClick={resetForm}
              disabled={guardando}
            >
              Cancelar edición
            </button>
          )}
        </div>
        {error && <p style={{ color: "#fca5a5", marginTop: 10 }}>{error}</p>}
      </form>

      <hr style={{ borderColor: "#1f2937", margin: "20px 0" }} />

      <h3>Base de conocimiento</h3>
      {lista.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>Aún no hay preguntas registradas.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {lista.map((p) => {
            const id = p._id || p.id;
            return (
              <li key={id} style={{ marginBottom: 8 }}>
                <strong>{p.pregunta}</strong>
                <div style={{ color: "#9ca3af" }}>{p.respuesta}</div>
                <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                  <button className="btn" type="button" onClick={() => onEditar(p)}>
                    Editar
                  </button>
                  <button
                    className="btn"
                    type="button"
                    style={{ background: "#dc2626" }}
                    onClick={() => onEliminar(id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
