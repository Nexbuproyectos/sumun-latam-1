"use client";

import { useState, type FormEvent } from "react";

import styles from "./registroForm.module.css";

const CARGOS = [
  "Rector/a o director/a",
  "Coordinador/a académico/a",
  "Docente",
  "Equipo de tecnología",
  "Sostenedor/a o dueño/a",
  "Otro",
];

type Campo = "nombre" | "cargo" | "correo";
type Errores = Partial<Record<Campo, string>>;

function validar(datos: FormData): Errores {
  const errores: Errores = {};
  const nombre = String(datos.get("nombre") ?? "").trim();
  const cargo = String(datos.get("cargo") ?? "");
  const correo = String(datos.get("correo") ?? "").trim();

  if (nombre.length < 3) {
    errores.nombre = "Ingresa tu nombre completo.";
  }
  if (!cargo) {
    errores.cargo = "Selecciona tu cargo.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errores.correo = "Ingresa un correo válido.";
  }
  return errores;
}

/*
 * Formulario de inscripción (1100:6527). Por ahora solo valida en el navegador y muestra
 * la confirmación: el envío real se conecta cuando exista el backend.
 */
export function RegistroForm() {
  const [errores, setErrores] = useState<Errores>({});
  const [enviado, setEnviado] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const nuevos = validar(datos);
    setErrores(nuevos);

    const primero = (Object.keys(nuevos) as Campo[])[0];
    if (primero) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }
    setEnviado(String(datos.get("nombre")).trim().split(/\s+/)[0]);
  }

  // Al corregir un campo se borra su error.
  function limpiar(campo: Campo) {
    if (errores[campo]) {
      setErrores((actuales) => {
        const resto = { ...actuales };
        delete resto[campo];
        return resto;
      });
    }
  }

  return (
    <div id="registro" className={styles.card}>
      {enviado ? (
        <div className={styles.exito} role="status">
          <span className={styles.exitoIcono} aria-hidden="true">
            ✓
          </span>
          <h2 className={styles.titulo}>¡Listo, {enviado}!</h2>
          <p className={styles.bajada}>
            Tu lugar en la masterclass quedó reservado. Te enviaremos el enlace de acceso y
            el diagnóstico IA a tu correo.
          </p>
          <Fecha />
          <button type="button" className={styles.boton} onClick={() => setEnviado(null)}>
            Registrar a otra persona
          </button>
        </div>
      ) : (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
          <div className={styles.header}>
            <h2 className={styles.titulo}>Únete a la master class</h2>
            <p className={styles.bajada}>
              Completa tus datos para reservar tu lugar y acceder al diagnóstico IA.
            </p>
          </div>

          <div className={styles.campos}>
            <div className={styles.campo}>
              <label htmlFor="mc-nombre">Nombre</label>
              <input
                id="mc-nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre completo"
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={errores.nombre ? "mc-nombre-error" : undefined}
                onChange={() => limpiar("nombre")}
              />
              {errores.nombre ? (
                <p id="mc-nombre-error" className={styles.error}>
                  {errores.nombre}
                </p>
              ) : null}
            </div>

            <div className={styles.campo}>
              <label htmlFor="mc-cargo">Cargo</label>
              <div className={styles.select}>
                <select
                  id="mc-cargo"
                  name="cargo"
                  defaultValue=""
                  aria-invalid={Boolean(errores.cargo)}
                  aria-describedby={errores.cargo ? "mc-cargo-error" : undefined}
                  onChange={() => limpiar("cargo")}
                >
                  <option value="" disabled>
                    Tu cargo actual
                  </option>
                  {CARGOS.map((cargo) => (
                    <option key={cargo} value={cargo}>
                      {cargo}
                    </option>
                  ))}
                </select>
                <img
                  className={styles.flecha}
                  src="/images/masterclass/flecha-select.svg"
                  alt=""
                  width={9.5}
                  height={19}
                />
              </div>
              {errores.cargo ? (
                <p id="mc-cargo-error" className={styles.error}>
                  {errores.cargo}
                </p>
              ) : null}
            </div>

            <div className={styles.campo}>
              <label htmlFor="mc-correo">Correo</label>
              <input
                id="mc-correo"
                name="correo"
                type="email"
                autoComplete="email"
                placeholder="correo@institucion.com"
                aria-invalid={Boolean(errores.correo)}
                aria-describedby={errores.correo ? "mc-correo-error" : undefined}
                onChange={() => limpiar("correo")}
              />
              {errores.correo ? (
                <p id="mc-correo-error" className={styles.error}>
                  {errores.correo}
                </p>
              ) : null}
            </div>
          </div>

          <Fecha />

          <button type="submit" className={styles.boton}>
            Registrarme en la Masterclass
          </button>
        </form>
      )}
    </div>
  );
}

function Fecha() {
  return (
    <div className={styles.fecha}>
      <p className={styles.fechaTitulo}>Masterclass gratuita · Cupos limitado</p>
      <p className={styles.fechaDetalle}>
        <img src="/images/masterclass/calendario.svg" alt="" width={14} height={14} />
        4 de noviembre · 5:00 p. m. · Colombia
      </p>
    </div>
  );
}
