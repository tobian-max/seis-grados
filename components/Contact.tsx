'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 70%', once: true };
      gsap.from(leftRef.current!.children, {
        scrollTrigger: trigger, opacity: 0, x: -40, stagger: 0.1, duration: 0.7, ease: 'power2.out',
      });
      gsap.from(formRef.current, {
        scrollTrigger: trigger, opacity: 0, x: 40, duration: 0.8, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Error al enviar');
      setSent(true);
    } catch {
      setError('Hubo un problema al enviar el mensaje. Inténtalo de nuevo o escríbenos directamente a tobian@6-grados.com');
    } finally {
      setSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
    fontSize: '15px',
    fontWeight: 400,
    color: 'var(--ink-dark)',
    background: 'var(--light-mid)',
    border: '1px solid var(--light-sub)',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
    appearance: 'none' as const,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: 'var(--ink-sub)',
    marginBottom: '8px',
    display: 'block',
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="section-outer"
      style={{ background: 'var(--light)', position: 'relative', overflow: 'hidden' }}
    >
      <div className="section-inner contact-grid" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left */}
        <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px', justifyContent: 'center' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '36px', height: '3px', borderRadius: '2px', background: 'var(--accent)', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              Hablemos
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: 'var(--ink-dark)',
              lineHeight: 1.15,
            }}
          >
            El primer paso<br />siempre es una<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>conversación.</em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--ink-mid)',
              lineHeight: 1.8,
            }}
          >
            Cuéntanos qué estás buscando y te responderemos en menos de 24 horas con una propuesta personalizada.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="tel:+573107653257"
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: '15px',
                fontWeight: 400,
                color: 'var(--ink-mid)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-mid)'; }}
            >
              <span style={{ color: 'var(--accent)', fontSize: '18px' }}>☏</span>
              +57 310 765 3257
            </a>
            <a
              href="mailto:tobian@6-grados.com"
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: '15px',
                fontWeight: 400,
                color: 'var(--ink-mid)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-mid)'; }}
            >
              <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✉</span>
              tobian@6-grados.com
            </a>
          </div>
        </div>

        {/* Form */}
        <div ref={formRef}>
          {sent ? (
            <div
              style={{
                background: 'var(--light-mid)',
                border: '1px solid var(--light-sub)',
                borderRadius: '12px',
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
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ color: '#fff', fontSize: '22px' }}>✓</span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '26px', fontWeight: 600, color: 'var(--ink-dark)',
                }}
              >
                ¡Mensaje enviado!
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '15px', fontWeight: 400, color: 'var(--ink-mid)', lineHeight: 1.7,
                }}
              >
                Nos pondremos en contacto contigo en las próximas 24 horas.
              </p>
              <button
                onClick={() => setSent(false)}
                style={{
                  marginTop: '8px',
                  background: 'none',
                  border: '1px solid var(--light-sub)',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  cursor: 'pointer',
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '14px',
                  color: 'var(--ink-sub)',
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
                background: 'var(--light-mid)',
                padding: '48px 40px',
                border: '1px solid var(--light-sub)',
                borderRadius: '12px',
              }}
            >
              <div className="form-name-row">
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input
                    required name="nombre" value={form.nombre} onChange={handleChange}
                    placeholder="Tu nombre" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--light-sub)')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Empresa</label>
                  <input
                    name="empresa" value={form.empresa} onChange={handleChange}
                    placeholder="Tu empresa" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--light-sub)')}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Correo electrónico</label>
                <input
                  required type="email" name="correo" value={form.correo} onChange={handleChange}
                  placeholder="tu@correo.com" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--light-sub)')}
                />
              </div>

              <div>
                <label style={labelStyle}>Servicio de interés</label>
                <select
                  name="servicio" value={form.servicio} onChange={handleChange}
                  style={{ ...inputStyle, color: form.servicio ? 'var(--ink-dark)' : 'var(--ink-faint)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--light-sub)')}
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
                  required name="mensaje" value={form.mensaje} onChange={handleChange}
                  placeholder="¿Qué estás buscando? ¿Cuál es tu reto actual?"
                  rows={5} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--light-sub)')}
                />
              </div>

              {error && (
                <p style={{
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '14px', color: '#c0392b', lineHeight: 1.5, margin: 0,
                }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  background: sending ? 'var(--ink-faint)' : 'var(--accent)',
                  color: '#fff',
                  padding: '16px 32px',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: sending ? 'not-allowed' : 'pointer',
                  transition: 'background 150ms ease, transform 150ms ease',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!sending) {
                    (e.target as HTMLButtonElement).style.background = 'var(--accent-mid)';
                    (e.target as HTMLButtonElement).style.transform = 'scale(1.01)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!sending) {
                    (e.target as HTMLButtonElement).style.background = 'var(--accent)';
                    (e.target as HTMLButtonElement).style.transform = 'scale(1)';
                  }
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
