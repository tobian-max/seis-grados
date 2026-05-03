'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type FormState = {
  nombre: string;
  empresa: string;
  correo: string;
  servicio: string;
  mensaje: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    nombre: '', empresa: '', correo: '', servicio: '', mensaje: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 70%', once: true };
      gsap.from(leftRef.current!.children, {
        scrollTrigger: trigger,
        opacity: 0,
        x: -40,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      });
      gsap.from(formRef.current, {
        scrollTrigger: trigger,
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1400);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
    fontSize: '15px',
    fontWeight: 300,
    color: 'var(--charcoal)',
    background: '#fff',
    border: '1px solid var(--cream)',
    outline: 'none',
    transition: 'border-color 0.2s',
    appearance: 'none' as const,
    borderRadius: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'var(--taupe)',
    marginBottom: '8px',
    display: 'block',
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      style={{
        background: 'var(--warm-white)',
        padding: '120px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.07 }}>
        <Image src="/uploads/watermark.png" alt="" fill style={{ objectFit: 'cover' }} />
      </div>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '100px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left */}
        <div
          ref={leftRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--green)',
            }}
          >
            Hablemos
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair, Playfair Display), serif',
              fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 400,
              color: 'var(--charcoal)',
              lineHeight: 1.15,
            }}
          >
            El primer paso
            <br />
            siempre es una
            <br />
            <em>conversación.</em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--brown-mid)',
              lineHeight: 1.8,
            }}
          >
            Cuéntanos qué estás buscando y te responderemos en menos de 24 horas con una propuesta personalizada.
          </p>
        </div>

        {/* Form */}
        <div ref={formRef}>
          {sent ? (
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--cream)',
                padding: '60px 40px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                minHeight: '400px',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: '#fff', fontSize: '22px' }}>✓</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair, Playfair Display), serif',
                  fontSize: '26px',
                  fontWeight: 400,
                  color: 'var(--charcoal)',
                }}
              >
                ¡Mensaje enviado!
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: 'var(--taupe)',
                  lineHeight: 1.7,
                }}
              >
                Nos pondremos en contacto contigo en las próximas 24 horas.
              </p>
              <button
                onClick={() => setSent(false)}
                style={{
                  marginTop: '8px',
                  background: 'none',
                  border: '1px solid var(--cream)',
                  padding: '10px 24px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                  fontSize: '13px',
                  color: 'var(--taupe)',
                }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                background: '#fff',
                padding: '48px 40px',
                border: '1px solid var(--cream)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input
                    required
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--tan)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--cream)')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Empresa</label>
                  <input
                    name="empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    placeholder="Tu empresa"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--tan)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--cream)')}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Correo electrónico</label>
                <input
                  required
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--tan)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--cream)')}
                />
              </div>

              <div>
                <label style={labelStyle}>Servicio de interés</label>
                <select
                  name="servicio"
                  value={form.servicio}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    color: form.servicio ? 'var(--charcoal)' : '#aaa',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--tan)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--cream)')}
                >
                  <option value="" disabled>Selecciona un servicio</option>
                  <option value="mentoria">Mentoría 1:1</option>
                  <option value="consultoria">Consultoría de Equipos</option>
                  <option value="speaker">Speaker / Conferencia</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Cuéntanos</label>
                <textarea
                  required
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="¿Qué estás buscando? ¿Cuál es tu reto actual?"
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--tan)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--cream)')}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                style={{
                  background: sending ? 'var(--taupe)' : 'var(--green)',
                  color: '#fff',
                  padding: '16px 32px',
                  border: 'none',
                  fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!sending) (e.target as HTMLButtonElement).style.background = 'var(--green-dark)';
                }}
                onMouseLeave={(e) => {
                  if (!sending) (e.target as HTMLButtonElement).style.background = 'var(--green)';
                }}
              >
                {sending ? 'Enviando…' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
