const { onRequest } = require('firebase-functions/v2/https')
const { defineSecret, defineString } = require('firebase-functions/params')
const { Resend } = require('resend')

const resendApiKey = defineSecret('RESEND_API_KEY')
const resendFrom = defineString('RESEND_FROM', {
    default: 'Braulio Echeverría <noreply@jbrau.dev>',
})
const resendReplyTo = defineString('RESEND_REPLY_TO', {
    default: 'braulioecheverria@kinal.org.gt',
})

/** @type {Map<string, number[]>} */
const rateLimitBuckets = new Map()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

const ALLOWED_ORIGINS = [
    'https://brauporfafolio.web.app',
    'https://brauporfafolio.firebaseapp.com',
    'http://127.0.0.1:4173',
    'http://127.0.0.1:4174',
    'http://localhost:4173',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

function applyCors(req, res) {
    const origin = req.get('origin')
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        res.set('Access-Control-Allow-Origin', origin)
        res.set('Vary', 'Origin')
    }
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '3600')
}

function getClientIp(req) {
    const forwarded = req.get('x-forwarded-for')
    if (forwarded) return forwarded.split(',')[0].trim()
    return req.ip || req.connection?.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
    const now = Date.now()
    const recent = (rateLimitBuckets.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
    if (recent.length >= RATE_LIMIT_MAX) {
        rateLimitBuckets.set(ip, recent)
        return true
    }
    recent.push(now)
    rateLimitBuckets.set(ip, recent)
    return false
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function buildAckEmail({ name, language }) {
    const safeName = escapeHtml(name.trim().slice(0, 80))
    const isEs = language !== 'en'

    const LINKEDIN_URL = 'https://www.linkedin.com/in/josebraulioe/'
    const GITHUB_URL = 'https://github.com/Jbraulio85'
    const PORTFOLIO_URL = 'https://brauporfafolio.web.app'

    const copy = isEs
        ? {
              subject: 'Gracias por tu mensaje — Braulio Echeverría',
              greeting: `Hola <strong style="color:#f05a6a;">${safeName}</strong>,`,
              lead: 'Gracias por tu mensaje.',
              body: 'Recibí tu mensaje correctamente y lo revisaré con atención. Me pondré en contacto contigo a la mayor brevedad posible.',
              note: 'Si tu consulta es urgente, también puedes encontrarme en mis redes profesionales.',
              ctaLinkedin: 'LinkedIn',
              ctaGithub: 'GitHub',
              ctaPortfolio: 'Ver portafolio',
              signoff: 'Saludos cordiales,',
              role: 'Desarrollador Full Stack · Guatemala',
              footer: 'Este es un mensaje automático de confirmación. Si no enviaste el formulario, puedes ignorar este correo.',
              text: `Hola ${name.trim()},\n\nGracias por tu mensaje. Recibí tu mensaje correctamente y me pondré en contacto contigo a la mayor brevedad posible.\n\nLinkedIn: ${LINKEDIN_URL}\nGitHub: ${GITHUB_URL}\nPortafolio: ${PORTFOLIO_URL}\n\nSaludos cordiales,\nBraulio Echeverría\nDesarrollador Full Stack`,
          }
        : {
              subject: 'Thanks for your message — Braulio Echeverría',
              greeting: `Hi <strong style="color:#f05a6a;">${safeName}</strong>,`,
              lead: 'Thank you for your message.',
              body: 'I received your message and will review it carefully. I will get back to you as soon as possible.',
              note: 'If your request is urgent, you can also reach me through my professional profiles.',
              ctaLinkedin: 'LinkedIn',
              ctaGithub: 'GitHub',
              ctaPortfolio: 'View portfolio',
              signoff: 'Best regards,',
              role: 'Full Stack Developer · Guatemala',
              footer: 'This is an automated confirmation. If you did not submit the contact form, you can safely ignore this email.',
              text: `Hi ${name.trim()},\n\nThank you for your message. I received it and will get back to you as soon as possible.\n\nLinkedIn: ${LINKEDIN_URL}\nGitHub: ${GITHUB_URL}\nPortfolio: ${PORTFOLIO_URL}\n\nBest regards,\nBraulio Echeverría\nFull Stack Developer`,
          }

    const html = `
<!DOCTYPE html>
<html lang="${isEs ? 'es' : 'en'}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(copy.subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a131f;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0a131f;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:#0d1b2a;border:1px solid #2d3748;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="height:4px;background-color:#f05a6a;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px 32px 24px;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;">Braulio Echeverría</p>
              <h1 style="margin:0 0 20px;font-size:24px;line-height:1.3;font-weight:700;color:#e5e7eb;">
                ${copy.lead}
              </h1>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#d1d5db;">
                ${copy.greeting}
              </p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#d1d5db;">
                ${copy.body}
              </p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#9ca3af;">
                ${copy.note}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-right:10px;padding-bottom:10px;">
                    <a href="${LINKEDIN_URL}" style="display:inline-block;padding:12px 18px;background-color:#1b263b;border:1px solid #2d3748;border-radius:999px;color:#e5e7eb;text-decoration:none;font-size:14px;font-weight:600;">
                      ${copy.ctaLinkedin}
                    </a>
                  </td>
                  <td style="padding-right:10px;padding-bottom:10px;">
                    <a href="${GITHUB_URL}" style="display:inline-block;padding:12px 18px;background-color:#1b263b;border:1px solid #2d3748;border-radius:999px;color:#e5e7eb;text-decoration:none;font-size:14px;font-weight:600;">
                      ${copy.ctaGithub}
                    </a>
                  </td>
                  <td style="padding-bottom:10px;">
                    <a href="${PORTFOLIO_URL}" style="display:inline-block;padding:12px 18px;background-color:#f05a6a;border:1px solid #f05a6a;border-radius:999px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;">
                      ${copy.ctaPortfolio}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;background-color:#1b263b;border-top:1px solid #2d3748;">
              <p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:#e5e7eb;font-weight:700;">Braulio Echeverría</p>
              <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#9ca3af;">${copy.role}</p>
              <p style="margin:0;font-size:12px;line-height:1.6;color:#6b7280;">${copy.signoff}</p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;max-width:560px;font-size:12px;line-height:1.6;color:#6b7280;text-align:center;">
          ${copy.footer}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`

    return {
        subject: copy.subject,
        html,
        text: copy.text,
    }
}

exports.contactAck = onRequest(
    {
        region: 'us-central1',
        secrets: [resendApiKey],
        cors: false,
        invoker: 'public',
        maxInstances: 10,
    },
    async (req, res) => {
        applyCors(req, res)

        if (req.method === 'OPTIONS') {
            res.status(204).send('')
            return
        }

        if (req.method !== 'POST') {
            res.status(405).json({ success: false, error: 'method_not_allowed' })
            return
        }

        const ip = getClientIp(req)
        if (isRateLimited(ip)) {
            res.status(429).json({ success: false, error: 'rate_limited' })
            return
        }

        const { name, email, language = 'es' } = req.body || {}

        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            res.status(400).json({ success: false, error: 'invalid_name' })
            return
        }

        if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
            res.status(400).json({ success: false, error: 'invalid_email' })
            return
        }

        const apiKey = resendApiKey.value()
        if (!apiKey) {
            console.error('RESEND_API_KEY secret is missing')
            res.status(500).json({ success: false, error: 'misconfigured' })
            return
        }

        const content = buildAckEmail({ name, language })
        const resend = new Resend(apiKey)

        try {
            const { error } = await resend.emails.send({
                from: resendFrom.value(),
                to: [email.trim()],
                replyTo: resendReplyTo.value(),
                subject: content.subject,
                html: content.html,
                text: content.text,
            })

            if (error) {
                console.error('Resend error', error)
                res.status(502).json({ success: false, error: 'send_failed' })
                return
            }

            res.status(200).json({ success: true })
        } catch (err) {
            console.error('Unexpected Resend failure', err)
            res.status(500).json({ success: false, error: 'send_failed' })
            return
        }
    }
)
