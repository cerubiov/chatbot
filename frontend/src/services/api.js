
const BASE_URL = "http://localhost:5000"; 


const BASE_PREG = "/api/preguntas";

async function jsonFetch(path, { method = "GET", body } = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const msg = text || `HTTP ${res.status} al llamar ${url}`;
    throw new Error(msg);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {
  //Listar todas laS PREGUNTAS
  listarPreguntas: () => jsonFetch(`${BASE_PREG}`),

  // Crear una nueva pregunta
  crearPregunta: (data) =>
    jsonFetch(`${BASE_PREG}`, { method: "POST", body: data }),
  
  // Actualizar una pregunta existente
  actualizarPregunta:(id, data)=>
    jsonFetch(`${BASE_PREG}/${id}`, { method: "PUT", body: data }),

  //Eliminar una pregunta existente
  eliminarPregunta: (id) =>
    jsonFetch(`${BASE_PREG}/${id}`, { method: "DELETE"}),

  //Envio el mesnaje
  enviarMensaje: (texto) =>
    jsonFetch(`${BASE_PREG}/responder`, {
      method: "POST",
      body: { pregunta: texto, mensaje: texto, texto },
    }),
};
