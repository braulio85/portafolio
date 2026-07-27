<div align="center">

# io_portafolio

**Portafolio personal** de **Braulio Echeverría**  
Full Stack Developer · Docente · Guatemala 🇬🇹

[![Live](https://img.shields.io/badge/brauporfafolio.web.app-0d1117?style=for-the-badge&logo=firebase&logoColor=FFCA28&labelColor=0d1117)](https://brauporfafolio.web.app)
[![jbrau.dev](https://img.shields.io/badge/jbrau.dev-0d1117?style=for-the-badge&logo=vercel&logoColor=a855f7&labelColor=0d1117)](https://www.jbrau.dev/)
[![LinkedIn](https://img.shields.io/badge/josebraulioe-0d1117?style=for-the-badge&logo=linkedin&logoColor=0A66C2&labelColor=0d1117)](https://www.linkedin.com/in/josebraulioe/)
[![GitHub](https://img.shields.io/badge/Jbraulio85-0d1117?style=for-the-badge&logo=github&logoColor=white&labelColor=0d1117)](https://github.com/Jbraulio85)
[![Email](https://img.shields.io/badge/email-0d1117?style=for-the-badge&logo=gmail&logoColor=EA4335&labelColor=0d1117)](mailto:braulioecheverria@kinal.org.gt)

</div>

<br/>

> Portafolio web en **React + Vite** para presentar trayectoria, habilidades, proyectos y contacto.  
> Incluye formulario con **EmailJS**, auto-respuesta con **Resend** (Cloudflare Worker) y despliegue en **Firebase Hosting**.

<br/>

### Qué incluye

- 👤 &nbsp;**Sobre mí**, educación, experiencia y habilidades
- 🗂️ &nbsp;**Portafolio técnico** con proyectos formativos y profesionales
- ✉️ &nbsp;**Contacto** con CAPTCHA (Turnstile) + confirmación automática al visitante
- 🌐 &nbsp;**i18n** (ES / EN) y UI responsive
- ♿ &nbsp;**Mejoras de accesibilidad** en controles e iconos

<br/>

### Stack del proyecto

<table border="0">
  <tr>
    <td valign="top" width="50%">
      <h4>Frontend</h4>
      <p>
        <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
        <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
        <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white" />
        <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white" />
      </p>
    </td>
    <td valign="top" width="50%">
      <h4>Integraciones</h4>
      <p>
        <img src="https://img.shields.io/badge/EmailJS-FFCA28?style=flat-square&logo=maildotru&logoColor=black" />
        <img src="https://img.shields.io/badge/Resend-000000?style=flat-square&logo=resend&logoColor=white" />
        <img src="https://img.shields.io/badge/Turnstile-F38020?style=flat-square&logo=cloudflare&logoColor=white" />
      </p>
    </td>
  </tr>
  <tr>
    <td valign="top" width="50%">
      <h4>Infraestructura</h4>
      <p>
        <img src="https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
        <img src="https://img.shields.io/badge/Cloudflare_Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white" />
      </p>
    </td>
    <td valign="top" width="50%">
      <h4>Tooling</h4>
      <p>
        <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" />
        <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black" />
        <img src="https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white" />
      </p>
    </td>
  </tr>
</table>

<br/>

### Arranque local

```bash
pnpm install
pnpm dev
```

Otros comandos útiles:

```bash
pnpm build      # build de producción
pnpm preview    # preview local del build
pnpm lint       # ESLint
pnpm format     # Prettier
```

<br/>

### Contacto y auto-respuesta

| Pieza                                         | Rol                                        |
| --------------------------------------------- | ------------------------------------------ |
| **EmailJS**                                   | Te entrega el mensaje del formulario       |
| **Cloudflare Worker** (`workers/contact-ack`) | Envía el acuse al visitante con **Resend** |
| **Turnstile**                                 | Reduce spam en el formulario               |

Variables públicas del front (ver `.env.example`):

```bash
VITE_CONTACT_ACK_URL=https://portfolio-contact-ack.braulioecheverria.workers.dev
```

Secretos del Worker (Cloudflare, **nunca** en el repo):

```bash
RESEND_API_KEY=re_xxx
RESEND_FROM=Braulio Echeverría <noreply@jbrau.dev>
RESEND_REPLY_TO=braulioecheverria@kinal.org.gt
```

<br/>

### Estructura

```text
public/data/          # Contenido del portafolio (JSON)
src/                  # App React
workers/contact-ack/  # Worker de auto-respuesta (Resend)
functions/            # Borrador previo (Firebase Functions; opcional)
```

<br/>

### Créditos

Basado en el template de portafolio de [Ryan Balieiro](https://github.com/ryanbalieiro).  
Personalizado y mantenido por **Braulio Echeverría**.

<br/>

### Licencia

Código bajo licencia **MIT** — Copyright (c) 2026 **José Braulio Echeverría Montúfar**.  
Ver [`LICENSE`](./LICENSE).

<br/>

<div align="center">

<sub>💬 Siempre abierto a ideas, colaboración y construir cosas interesantes</sub>

<br/>

<sub>
<a href="https://brauporfafolio.web.app">portafolio</a> &nbsp;·&nbsp;
<a href="https://www.jbrau.dev/">jbrau.dev</a> &nbsp;·&nbsp;
<a href="https://github.com/Jbraulio85">github</a> &nbsp;·&nbsp;
<a href="https://www.linkedin.com/in/josebraulioe/">linkedin</a> &nbsp;·&nbsp;
<a href="mailto:braulioecheverria@kinal.org.gt">email</a>
</sub>

</div>
