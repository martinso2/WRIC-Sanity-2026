"use client";

import { useEffect, useRef, useState } from "react";
import { contactDetails, type ModalContent } from "@/app/data/wric-content";
import { PreIntakeForm } from "@/app/components/wric/pre-intake-form";

type Lang = "en" | "es";

type ModalProps = {
  modal: ModalContent | null;
  onClose: () => void;
};

const intakeHeader = {
  en: {
    eyebrow: "WRIC — Confidential",
    title: "Let's get started",
    description:
      "Tell us a little about yourself. A WRIC team member will follow up within one business day — all communication is confidential."
  },
  es: {
    eyebrow: "WRIC — Confidencial",
    title: "Comencemos",
    description:
      "Cuéntanos un poco sobre ti. Un miembro del equipo de WRIC se pondrá en contacto contigo en un día hábil. Toda la comunicación es confidencial."
  }
};

export function Modal({ modal, onClose }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (!modal) return;
    closeButtonRef.current?.focus();
    document.body.classList.add("modal-open");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modal, onClose]);

  if (!modal) return null;

  const isPreintake = modal.type === "preintake";
  const header = isPreintake ? intakeHeader[lang] : null;

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="modal-backdrop"
      role="dialog"
    >
      <button
        aria-label="Close modal"
        className="modal-scrim"
        onClick={onClose}
        type="button"
      />
      <div className="modal-panel">

        {/* Language toggle — only for pre-intake, sits above everything */}
        {isPreintake && (
          <div className="modal-lang-toggle">
            {(["en", "es"] as Lang[]).map((l) => (
              <button
                className={`modal-lang-btn ${lang === l ? "active" : ""}`}
                key={l}
                onClick={() => setLang(l)}
                type="button"
              >
                {l === "en" ? "English" : "Español"}
              </button>
            ))}
          </div>
        )}

        <div className="modal-header">
          <div>
            <p className="eyebrow">{isPreintake ? header!.eyebrow : "WRIC action"}</p>
            <h2 id="modal-title">{isPreintake ? header!.title : modal.title}</h2>
            <p>{isPreintake ? header!.description : modal.description}</p>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            {lang === "es" && isPreintake ? "Cerrar" : "Close"}
          </button>
        </div>

        {modal.type === "embed" ? (
          <div className="modal-embed-wrap">
            <iframe
              className="modal-embed"
              loading="lazy"
              src={modal.url}
              title={modal.title}
            />
            <a
              className="modal-fallback"
              href={modal.url}
              rel="noreferrer"
              target="_blank"
            >
              {modal.fallbackLabel}
            </a>
          </div>
        ) : modal.type === "donate" ? (
          <div className="modal-donate">
            <p className="modal-donate-eyebrow">Your gift in action</p>
            <ul className="modal-donate-tiers">
              {modal.tiers.map((tier) => (
                <li key={tier.amount} className="modal-donate-tier">
                  <span className="modal-donate-amount">{tier.amount}</span>
                  <span className="modal-donate-impact">{tier.impact}</span>
                </li>
              ))}
            </ul>
            <a
              className="btn btn-primary modal-donate-btn"
              href={modal.url}
              rel="noreferrer"
              target="_blank"
            >
              {modal.buttonLabel} ↗
            </a>
          </div>
        ) : modal.type === "linkout" ? (
          <div className="modal-linkout">
            <a
              className="btn btn-primary modal-linkout-btn"
              href={modal.url}
              rel="noreferrer"
              target="_blank"
            >
              {modal.buttonLabel} ↗
            </a>
            {modal.note && <p className="modal-linkout-note">{modal.note}</p>}
          </div>
        ) : modal.type === "preintake" ? (
          <div className="modal-form-wrap">
            <PreIntakeForm lang={lang} />
          </div>
        ) : modal.type === "legal" ? (
          <div className="modal-legal">
            {modal.sections.map((section) => (
              <section className="modal-legal-section" key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        ) : (
          <div className="contact-modal">
            <a className="modal-contact-card" href={contactDetails.phoneHref}>
              <span>Call</span>
              <strong>{contactDetails.phone}</strong>
            </a>
            <a className="modal-contact-card" href={contactDetails.emailHref}>
              <span>Email</span>
              <strong>{contactDetails.email}</strong>
            </a>
            <div className="modal-contact-card">
              <span>Visit</span>
              <strong>{contactDetails.address}</strong>
            </div>
            <div className="modal-contact-card">
              <span>Hours</span>
              <strong>{contactDetails.hours}</strong>
            </div>
            <p className="modal-note">{contactDetails.spanish}</p>
          </div>
        )}
      </div>
    </div>
  );
}
