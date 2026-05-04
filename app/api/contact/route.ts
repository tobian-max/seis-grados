import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_EMAIL ?? 'tobian@6-grados.com';

export async function POST(req: Request) {
  console.log('[contact] POST recibido');

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 });
  }

  const { nombre, empresa, correo, servicio, mensaje } = body as Record<string, string>;
  if (!nombre || !correo || !mensaje) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  const servicioLabels: Record<string, string> = {
    mentoria:    'Mentoría 1:1',
    consultoria: 'Consultoría de Equipos',
    speaker:     'Speaker / Conferencia',
    otro:        'Otro',
  };

  const { error } = await resend.emails.send({
    from: 'Formulario 6 Grados <onboarding@resend.dev>',
    to:   TO,
    replyTo: correo,
    subject: `Nuevo mensaje de ${nombre}${empresa ? ` — ${empresa}` : ''}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3d3535;">
        <div style="background: #3d3535; padding: 24px 32px; margin-bottom: 0;">
          <p style="margin: 0; color: #82a52a; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700;">
            6 Grados Business Solutions
          </p>
          <h1 style="margin: 8px 0 0; color: #faf9f7; font-size: 22px; font-weight: 400;">
            Nuevo mensaje de contacto
          </h1>
        </div>
        <div style="background: #f4f1ec; padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8c7f7c; width: 140px;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; font-size: 15px;">${nombre}</td>
            </tr>
            ${empresa ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8c7f7c;">Empresa</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; font-size: 15px;">${empresa}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8c7f7c;">Correo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; font-size: 15px;"><a href="mailto:${correo}" style="color: #82a52a;">${correo}</a></td>
            </tr>
            ${servicio ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8c7f7c;">Servicio</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; font-size: 15px;">${servicioLabels[servicio] ?? servicio}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 24px;">
            <p style="font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8c7f7c; margin: 0 0 10px;">Mensaje</p>
            <p style="font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${mensaje}</p>
          </div>
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e8e2d8;">
            <p style="font-size: 12px; color: #8c7f7c; margin: 0;">
              Responde directamente a este correo para contactar a ${nombre}.
            </p>
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    console.log('[contact] Error Resend:', error);
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
  }

  console.log('[contact] Correo enviado a', TO);
  return NextResponse.json({ ok: true });
}
