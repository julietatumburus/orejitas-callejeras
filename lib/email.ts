import { Resend } from "resend";
import { ORG } from "@/lib/config";

function resend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Falta RESEND_API_KEY.");
  return new Resend(key);
}

function from() {
  return process.env.RESEND_FROM || "Orejitas Callejeras <onboarding@resend.dev>";
}

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "";
}

function shell(title: string, bodyHtml: string) {
  const loginUrl = `${appUrl()}/admin/login`;
  return `
  <div style="background:#fdf6ec;padding:32px 0;font-family:Arial,Helvetica,sans-serif;color:#44403c">
    <div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid #fbcfe8;border-radius:18px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#b23c75,#f56fa3);padding:22px;text-align:center">
        <div style="color:#fdf3e8;font-size:20px;font-weight:bold">${ORG.name}</div>
      </div>
      <div style="padding:26px">
        <h1 style="color:#be185d;font-size:20px;margin:0 0 14px">${title}</h1>
        ${bodyHtml}
        ${
          loginUrl.startsWith("http")
            ? `<div style="text-align:center;margin-top:22px"><a href="${loginUrl}" style="background:#ec4899;color:#fff;text-decoration:none;font-weight:bold;padding:11px 22px;border-radius:999px;display:inline-block">Ingresar al panel</a></div>`
            : ""
        }
      </div>
      <div style="padding:14px;text-align:center;color:#a8a29e;font-size:12px">
        ${ORG.name} · Organización sin fines de lucro
      </div>
    </div>
  </div>`;
}

function tempBlock(password: string) {
  return `
    <p>Tu contraseña temporal es:</p>
    <p style="text-align:center;font-size:22px;font-weight:bold;letter-spacing:2px;color:#be185d;background:#fdf2f8;border:1px dashed #f9a8d4;border-radius:12px;padding:14px;margin:14px 0">${password}</p>
    <p style="color:#9f1239;font-size:14px"><strong>Importante:</strong> vence en 15 minutos y deberás cambiarla la primera vez que ingreses.</p>`;
}

async function send(to: string, subject: string, html: string) {
  const { error } = await resend().emails.send({ from: from(), to, subject, html });
  // Resend NO tira excepción: devuelve { error }. Lo convertimos en throw.
  if (error) {
    const msg = (error as { message?: string }).message ?? JSON.stringify(error);
    throw new Error(msg);
  }
}

export async function sendNewUserEmail(to: string, tempPassword: string) {
  return send(
    to,
    `Tu acceso al panel de ${ORG.name}`,
    shell(
      "¡Te dieron acceso al panel!",
      `<p>Se creó tu cuenta para administrar las adopciones de <strong>${ORG.name}</strong>.</p>
       <p>Ingresá con tu email y esta contraseña temporal:</p>
       ${tempBlock(tempPassword)}`,
    ),
  );
}

export async function sendResetEmail(to: string, tempPassword: string) {
  return send(
    to,
    `Restablecer tu contraseña — ${ORG.name}`,
    shell(
      "Restablecimiento de contraseña",
      `<p>Generamos una contraseña temporal para que vuelvas a ingresar:</p>
       ${tempBlock(tempPassword)}
       <p style="font-size:14px;color:#78716c">Si no pediste esto, podés ignorar este mail.</p>`,
    ),
  );
}
