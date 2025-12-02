import React  from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { setAuthToken } from "../services/api";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    logout();
    navigate("/");
  };

  const linkStyle = ({ isActive }) => ({
    marginLeft: 16,
    textDecoration: "none",
    color: isActive ? "#38bdf8" : "#e5e7eb",
    fontWeight: isActive ? "600" : "400",
  });

  return (
    <header className="topbar">
      <div className="logo" style={{ fontWeight: 600 }}>
        Chatbot MERN
      </div>
      <nav className="nav" style={{ display: "flex", alignItems: "center" }}>
        <NavLink to="/" style={linkStyle}>
          Chat
        </NavLink>

        {isAuthenticated && (
          <NavLink to="/alimentar" style={linkStyle}>
            Alimentar
          </NavLink>
        )}

        {!isAuthenticated && (
          <>
            <NavLink to="/login" style={linkStyle}>
              Iniciar sesión
            </NavLink>
            <NavLink to="/registro" style={linkStyle}>
              Registrarse
            </NavLink>
          </>
        )}

        {isAuthenticated && (
          <>
            <span style={{ marginLeft: 16, color: "#9ca3af" }}>
              Hola, {user?.nombre}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                marginLeft: 16,
                padding: "4px 10px",
                background: "transparent",
                borderRadius: 6,
                border: "1px solid #4b5563",
                color: "#f97373",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
}