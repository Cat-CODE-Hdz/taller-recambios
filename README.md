# Taller Recambios — Demo 01 (CUSTOM Basic)

Landing demo del nivel **Custom Basic** (5 secciones · 149 € + 19 €/mes) para el portafolio de CAT CODE.

Brief canónico: `CATCODE_HANDOFF_WEB_DEMOS_v2.0/05_DEMOS/02_FRONTEND/DEMO01_TALLER_RECAMBIOS_LANDING.md`

## Stack

React 19 · Vite 8 · CSS propio (paleta y tipografía del brief §12) · oxlint

## Arrancar

```bash
npm install
npm run dev
```

## Build y lint

```bash
npm run lint
npm run build
```

## Variables de entorno

`.env.example`:

- `VITE_DEMO_MODE=true` — badge "Proyecto demo" y CTA de WhatsApp en estado demo
- `VITE_WHATSAPP_DEMO_NUMBER=` — número vacío en demo; nunca `wa.me` hardcodeado (`src/lib/whatsapp.js`)

## Estructura (Custom Basic — 5 secciones + cromo)

- **Secciones:** Hero · Sobre nosotros · Servicios (precios publicados) · Confianza (garantía) · Ubicación
- **Cromo:** Announcement bar · Header · Footer (con panel de nivel) · Botón flotante de WhatsApp
- **Extra:** formulario marcado como `EXTRA · a presupuestar` con badge + aviso visible + tooltip, estados `idle → loading → success`, teléfono enmascarado `6XX XXX XXX`, botón "Rellenar con datos de ejemplo", success que declara la demo
- **NO lleva:** galería · FAQ · blog · aviso legal · reseñas ni prueba social inventada

## Reglas aplicadas

- WhatsApp solo vía `createWhatsAppUrl()` (`src/lib/whatsapp.js`)
- Sin envío real, sin datos reales, sin reseñas, sin métricas inventadas
- Teléfono visible como alternativa a WhatsApp
- Panel de nivel en el footer + enlace al siguiente nivel (Casa Nora · Custom Pro)
