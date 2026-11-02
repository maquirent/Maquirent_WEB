"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useDemo } from "./demo-provider";
export function Login() {
  const { data } = useDemo();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);
  return (
    <main className="login-page">
      <div className="login-visual">
        <img src="/images/excavadoras.jpg" alt="Maquinaria de Maquirent" />
        <div className="login-overlay" />
        <Link href="/" className="login-brand">
          <img
            src={data.contact.logo}
            alt="Maquirent"
            width="195"
            height="110"
          />
        </Link>
        <div className="login-visual-copy">
          <span>MAQUIRENT / GUATEMALA</span>
          <h1>
            GRANDES PROYECTOS.
            <br />
            <em>UN MISMO EQUIPO.</em>
          </h1>
          <p>
            Tu empresa en movimiento.
            <br />
            Tu contenido, bajo control.
          </p>
        </div>
        <span className="login-visual-footer">
          MAQUINARIA Y TRANSPORTE EN RENTA
        </span>
      </div>
      <div className="login-form-side">
        <Link href="/" className="back-link">
          <ArrowLeft size={17} />
          Volver al sitio web
        </Link>
        <div className="login-form-container">
          <span className="demo-pill">
            <span />
            MOCKUP INTERACTIVO
          </span>
          <div className="login-icon">
            <LockKeyhole size={24} />
          </div>
          <h2>Bienvenido de nuevo.</h2>
          <p>Accede al panel de administración de Maquirent.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMessage(true);
            }}
          >
            <label>
              Correo electrónico
              <div className="input-icon">
                <Mail size={17} />
                <input
                  type="email"
                  placeholder="Tu correo de empresa"
                  autoComplete="username"
                  required
                />
              </div>
            </label>
            <label>
              Contraseña
              <div className="input-icon">
                <LockKeyhole size={17} />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  aria-label={
                    show ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
            <button className="button button-yellow" type="submit">
              Iniciar sesión <ArrowUpRight size={18} />
            </button>
            {message && (
              <p className="login-notice" role="status">
                La autenticación se conectará en la siguiente fase. Usa el
                acceso de demostración para revisar el panel.
              </p>
            )}
          </form>
          <div className="login-divider">
            <span>EXPLORA LA PROPUESTA</span>
          </div>
          <Link href="/dashboard" className="button button-outline-dark">
            Entrar al panel de demostración <ArrowUpRight size={18} />
          </Link>
          <p className="login-demo-note">
            <ShieldCheck size={16} />
            No necesitas credenciales para revisar el diseño.
          </p>
        </div>
        <p className="login-footer">© 2026 Maquirent · Acceso de la empresa</p>
      </div>
    </main>
  );
}
