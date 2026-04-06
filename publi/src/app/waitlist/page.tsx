"use client"

import Link from "next/link"
import { useState } from "react"

type FormState = {
  nombre: string
  email: string
  clientes: string
  herramientas: string
}

const initialForm: FormState = {
  nombre: "",
  email: "",
  clientes: "",
  herramientas: "",
}

export default function WaitlistPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [success, setSuccess] = useState(false)

  function validate(): boolean {
    const next: Partial<FormState> = {}
    if (!form.nombre.trim()) next.nombre = "Campo requerido"
    if (!form.email.trim()) next.email = "Campo requerido"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Email inválido"
    if (!form.clientes) next.clientes = "Seleccioná una opción"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) setSuccess(true)
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#f5f0e8" }}
    >
      {/* Geometric decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-8 -left-8 w-40 h-40 rounded-2xl rotate-12"
          style={{ backgroundColor: "#0095b6", opacity: 0.3 }}
        />
        <div
          className="absolute top-16 left-12 w-16 h-16 rounded-xl -rotate-6"
          style={{ backgroundColor: "#ffb703", opacity: 0.3 }}
        />
        <div
          className="absolute -top-6 -right-10 w-32 h-32 rounded-2xl -rotate-12"
          style={{ backgroundColor: "#cceef5", opacity: 0.3 }}
        />
        <div
          className="absolute top-20 right-16 w-20 h-20 rounded-xl rotate-6"
          style={{ backgroundColor: "#0095b6", opacity: 0.3 }}
        />
        <div
          className="absolute -bottom-10 -left-6 w-36 h-36 rounded-2xl -rotate-6"
          style={{ backgroundColor: "#cceef5", opacity: 0.3 }}
        />
        <div
          className="absolute -bottom-8 -right-8 w-44 h-44 rounded-2xl rotate-12"
          style={{ backgroundColor: "#ffb703", opacity: 0.3 }}
        />
      </div>

      <div className="relative w-full max-w-[480px]">
        {/* Logo + back button */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150 hover:opacity-70"
            style={{ color: "#6b7280" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Volver al inicio
          </Link>
          <Link
            href="/"
            className="text-[24px] font-bold leading-none"
            style={{ color: "#0095b6" }}
          >
            publi
          </Link>
          <div className="w-[100px]" />
        </div>

        {/* Card */}
        <div
          className="w-full rounded-2xl p-8 sm:p-10"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e8f4f7",
          }}
        >
          {success ? (
            <SuccessState />
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1
                  className="text-[28px] sm:text-[32px] font-bold leading-snug mb-3"
                  style={{ color: "#1a1a2e" }}
                >
                  Estás a un paso de transformar
                  <br />
                  tu flujo de trabajo.
                </h1>
                <p className="text-[15px] leading-relaxed" style={{ color: "#6b7280" }}>
                  publi está en beta cerrada. Dejanos tu info
                  <br className="hidden sm:block" />
                  {" "}y te avisamos cuando tu acceso esté listo.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                {/* Nombre */}
                <Field label="Nombre completo" error={errors.nombre}>
                  <input
                    type="text"
                    placeholder="Tu nombre y apellido"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="waitlist-input"
                  />
                </Field>

                {/* Email */}
                <Field label="Email profesional" error={errors.email}>
                  <input
                    type="email"
                    placeholder="vos@ejemplo.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="waitlist-input"
                  />
                </Field>

                {/* Clientes */}
                <Field label="¿Cuántos clientes gestionás actualmente?" error={errors.clientes}>
                  <select
                    value={form.clientes}
                    onChange={(e) => setForm({ ...form, clientes: e.target.value })}
                    className="waitlist-input"
                    style={{ color: form.clientes ? "#1a1a2e" : "#9ca3af" }}
                  >
                    <option value="" disabled>Seleccioná una opción</option>
                    <option value="1-2">1-2</option>
                    <option value="3-5">3-5</option>
                    <option value="6-10">6-10</option>
                    <option value="mas-de-10">Más de 10</option>
                  </select>
                </Field>

                {/* Herramientas */}
                <Field label="¿Qué herramientas usás hoy?">
                  <textarea
                    rows={3}
                    placeholder="Ej: Meta Business Suite, Notion, planillas..."
                    value={form.herramientas}
                    onChange={(e) => setForm({ ...form, herramientas: e.target.value })}
                    className="waitlist-input resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl py-3.5 text-[15px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                  style={{ backgroundColor: "#0095b6" }}
                >
                  Solicitar acceso
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .waitlist-input {
          width: 100%;
          border: 1px solid #cceef5;
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 14px;
          color: #1a1a2e;
          background: #ffffff;
          outline: none;
          transition: border-color 150ms;
          font-family: inherit;
        }
        .waitlist-input:focus {
          border-color: #0095b6;
        }
        .waitlist-input::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </main>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-medium" style={{ color: "#1a1a2e" }}>
        {label}
      </label>
      {children}
      {error && (
        <span className="text-[12px]" style={{ color: "#ef4444" }}>
          {error}
        </span>
      )}
    </div>
  )
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      {/* Check icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(0, 149, 182, 0.1)" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-8 h-8"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="#0095b6" strokeWidth="1.8" />
          <path
            d="M7.5 12l3 3 6-6"
            stroke="#0095b6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <h2 className="text-[24px] font-bold mb-2" style={{ color: "#1a1a2e" }}>
          ¡Recibimos tu solicitud!
        </h2>
        <p className="text-[15px] leading-relaxed" style={{ color: "#6b7280" }}>
          Te vamos a avisar por email cuando tu acceso esté listo.
          <br />
          Mientras tanto, seguinos en Instagram para ver las novedades.
        </p>
      </div>

      <Link
        href="/"
        className="mt-2 inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-[15px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
        style={{ backgroundColor: "#0095b6" }}
      >
        Volver al inicio
      </Link>
    </div>
  )
}
