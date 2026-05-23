"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ID";

export type Lang = "en" | "es";
type FormState = "idle" | "submitting" | "success" | "error";

const t = {
  en: {
    langLabel: "Preferred language",
    langEn: "English",
    langEs: "Spanish / Español",
    firstName: "First name",
    lastName: "Last name",
    contactSection: "How to reach you",
    contactNote: "at least one",
    phone: "Phone",
    email: "Email",
    service: "What brings you here?",
    servicePlaceholder: "Select a service area…",
    callTime: "Best time to call",
    callTimePlaceholder: "Select a time…",
    message: "Anything else you'd like us to know",
    optional: "optional",
    submit: "Send my information",
    submitting: "Sending…",
    privacy: "All information is confidential and used only to connect you with WRIC services.",
    errFirstName: "First name is required.",
    errLastName: "Last name is required.",
    errContact: "Please provide at least a phone number or email.",
    errService: "Please select a primary need.",
    errGeneric: "Something went wrong. Please try again or call us at",
    successTitle: "We received your message.",
    successBody: "A WRIC team member will be in touch within one business day. All communication is confidential.",
    successSooner: "Need to speak with someone sooner?",
    successCall: "Call WRIC: 201.367.1600",
    successNextLabel: "Ready to complete the full intake form now?",
    successNextLink: "Open full intake form →",
    serviceOptions: [
      "Career Services",
      "Housing Support",
      "Victim Services",
      "Domestic Violence Support",
      "Human Trafficking Support",
      "Wellness & Trauma Support",
      "Supportive Services",
      "Not sure yet"
    ],
    callTimeOptions: [
      "Morning (9 am – 12 pm)",
      "Afternoon (12 pm – 3 pm)",
      "Late afternoon (3 pm – 5 pm)",
      "Any time is fine"
    ]
  },
  es: {
    langLabel: "Idioma preferido",
    langEn: "English",
    langEs: "Español / Spanish",
    firstName: "Nombre",
    lastName: "Apellido",
    contactSection: "Cómo contactarte",
    contactNote: "al menos uno",
    phone: "Teléfono",
    email: "Correo electrónico",
    service: "¿Qué te trae aquí?",
    servicePlaceholder: "Selecciona un área de servicio…",
    callTime: "Mejor hora para llamar",
    callTimePlaceholder: "Selecciona una hora…",
    message: "¿Algo más que quieras que sepamos?",
    optional: "opcional",
    submit: "Enviar mi información",
    submitting: "Enviando…",
    privacy: "Toda la información es confidencial y se usa únicamente para conectarte con los servicios de WRIC.",
    errFirstName: "El nombre es obligatorio.",
    errLastName: "El apellido es obligatorio.",
    errContact: "Por favor, proporciona al menos un teléfono o correo electrónico.",
    errService: "Por favor, selecciona una necesidad principal.",
    errGeneric: "Algo salió mal. Por favor, inténtalo de nuevo o llámanos al",
    successTitle: "Recibimos tu mensaje.",
    successBody: "Un miembro del equipo de WRIC se pondrá en contacto contigo en un día hábil. Toda la comunicación es confidencial.",
    successSooner: "¿Necesitas hablar con alguien antes?",
    successCall: "Llama a WRIC: 201.431.5144",
    successNextLabel: "¿Lista para completar el formulario completo ahora?",
    successNextLink: "Abrir formulario completo →",
    serviceOptions: [
      "Servicios de empleo",
      "Apoyo de vivienda",
      "Servicios para víctimas",
      "Apoyo en violencia doméstica",
      "Apoyo en trata de personas",
      "Bienestar y apoyo en trauma",
      "Servicios de apoyo",
      "No estoy segura todavía"
    ],
    callTimeOptions: [
      "Mañana (9 am – 12 pm)",
      "Tarde (12 pm – 3 pm)",
      "Tarde avanzada (3 pm – 5 pm)",
      "Cualquier hora está bien"
    ]
  }
};

export function PreIntakeForm({ lang }: { lang: Lang }) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const T = t[lang];

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    if (!data.get("firstName")) errs.firstName = T.errFirstName;
    if (!data.get("lastName")) errs.lastName = T.errLastName;
    if (!data.get("phone") && !data.get("email")) errs.contact = T.errContact;
    if (!data.get("service")) errs.service = T.errService;
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("submitting");
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });
    setState(res.ok ? "success" : "error");
  }

  if (state === "success") {
    const phoneHref = lang === "es" ? "tel:+12014315144" : "tel:+12013671600";
    return (
      <div className="pif-success">
        <div className="pif-success-icon" aria-hidden="true">✓</div>
        <h3>{T.successTitle}</h3>
        <p>{T.successBody}</p>
        <p className="pif-success-sub">
          {T.successSooner}{" "}
          <a href={phoneHref}>{T.successCall}</a>
        </p>
        <div className="pif-success-next">
          <p>{T.successNextLabel}</p>
          <a
            className="pif-planstreet-link"
            href="https://app.planstreetinc.com/womensrights/PublicForm"
            rel="noreferrer"
            target="_blank"
          >
            {T.successNextLink}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="pif" noValidate onSubmit={handleSubmit}>

      {/* Hidden field so Formspree records the selected language */}
      <input name="language" type="hidden" value={T.langEn === "English" ? "English" : "Español"} />

      <div className="pif-row">
        <div className="pif-field">
          <label className="pif-label" htmlFor="pif-first">
            {T.firstName} <span aria-hidden="true">*</span>
          </label>
          <input
            autoComplete="given-name"
            className={`pif-input ${errors.firstName ? "pif-input-error" : ""}`}
            id="pif-first"
            name="firstName"
            type="text"
          />
          {errors.firstName && <span className="pif-error">{errors.firstName}</span>}
        </div>
        <div className="pif-field">
          <label className="pif-label" htmlFor="pif-last">
            {T.lastName} <span aria-hidden="true">*</span>
          </label>
          <input
            autoComplete="family-name"
            className={`pif-input ${errors.lastName ? "pif-input-error" : ""}`}
            id="pif-last"
            name="lastName"
            type="text"
          />
          {errors.lastName && <span className="pif-error">{errors.lastName}</span>}
        </div>
      </div>

      <div className="pif-field">
        <div className="pif-section-label">
          {T.contactSection} <span className="pif-required-note">({T.contactNote})</span>
        </div>
        {errors.contact && <span className="pif-error">{errors.contact}</span>}
        <div className="pif-row">
          <div className="pif-field">
            <label className="pif-label" htmlFor="pif-phone">{T.phone}</label>
            <input
              autoComplete="tel"
              className={`pif-input ${errors.contact ? "pif-input-error" : ""}`}
              id="pif-phone"
              name="phone"
              type="tel"
            />
          </div>
          <div className="pif-field">
            <label className="pif-label" htmlFor="pif-email">{T.email}</label>
            <input
              autoComplete="email"
              className={`pif-input ${errors.contact ? "pif-input-error" : ""}`}
              id="pif-email"
              name="email"
              type="email"
            />
          </div>
        </div>
      </div>

      <div className="pif-field">
        <label className="pif-label" htmlFor="pif-service">
          {T.service} <span aria-hidden="true">*</span>
        </label>
        <select
          className={`pif-input pif-select ${errors.service ? "pif-input-error" : ""}`}
          defaultValue=""
          id="pif-service"
          key={lang}
          name="service"
        >
          <option disabled value="">{T.servicePlaceholder}</option>
          {T.serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && <span className="pif-error">{errors.service}</span>}
      </div>

      <div className="pif-field">
        <label className="pif-label" htmlFor="pif-calltime">{T.callTime}</label>
        <select
          className="pif-input pif-select"
          defaultValue=""
          id="pif-calltime"
          key={`ct-${lang}`}
          name="callTime"
        >
          <option disabled value="">{T.callTimePlaceholder}</option>
          {T.callTimeOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="pif-field">
        <label className="pif-label" htmlFor="pif-message">
          {T.message} <span className="pif-optional">({T.optional})</span>
        </label>
        <textarea
          className="pif-input pif-textarea"
          id="pif-message"
          name="message"
          rows={3}
        />
      </div>

      {state === "error" && (
        <p className="pif-error pif-submit-error">
          {T.errGeneric}{" "}
          <a href={lang === "es" ? "tel:+12014315144" : "tel:+12013671600"}>
            {lang === "es" ? "201.431.5144" : "201.367.1600"}
          </a>.
        </p>
      )}

      <button
        className="pif-submit"
        disabled={state === "submitting"}
        type="submit"
      >
        {state === "submitting" ? T.submitting : T.submit}
      </button>

      <p className="pif-privacy">{T.privacy}</p>
    </form>
  );
}
