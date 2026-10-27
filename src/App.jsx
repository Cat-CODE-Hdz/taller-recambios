import { useState } from 'react'
import { DEMO_MODE, openWhatsAppOrDemo } from './lib/whatsapp'

const BUSINESS = {
  name: 'TALLER RECAMBIOS',
  address: 'Calle Feria 118',
  city: '41003 Sevilla',
  phoneDisplay: '954 000 000',
  phoneHref: 'tel:954000000',
  mapsUrl: 'https://maps.google.com/?q=Calle+Feria+118+Sevilla',
}

const WHATSAPP_MSG = 'Hola, quiero presupuesto para mi bici.'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAsTlOFDPaBiI7SOKP3zfDYv7ZtQpRVjrzercCOOp9nboPPFeUzvXE-v-0ULp4Et0u3O2HLsJOMtNCuVj5TD33DlYc8mjeZpA76jLCApxDCkUVZc2X6RIUFHIASWBV5WSoBJFK-OfrE-CIRwocBLDWT4ecNn6geL2cgwIp3QL8PY0pJqnS-Ih8RFpZOu0eq01ie6yqyMRokps12XM1GKpVpQHZNEY3YWZdRfCJXzjnZ'

const MAP_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDsBI4xe979dfnoWiAWAfZH9SrsqGfvSdAR8H_WOQKJGChgoyJboyn-g5SMiwRkF2RM125AcuR4de1aejZ2wt7FI2fPMzENLT1Ulo1AV7rC-Qa2aLq_EsY4GAjdP5p7U7z5-BQB8Skjcl2DBA9PzxgeRDa8Hpf79RLk3zoq7S82f1nkslSZxPtEY0RbWlAnQvTuiKXta0If2FDHbESlb7Pcnyvr6F1IW1zBPB4XHluv'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`
const HERO_LOCAL = asset('images/hero/hero-desktop.webp')
const MAP_LOCAL = asset('images/location/exterior.webp')

function swapOnError(event, fallbackSrc) {
  const el = event.currentTarget
  if (el.dataset.fallback !== 'done') {
    el.dataset.fallback = 'done'
    el.src = fallbackSrc
  } else {
    el.style.display = 'none'
  }
}

const NAV_LINKS = [
  { num: '01.', label: 'Inicio', href: '#inicio' },
  { num: '02.', label: 'Nosotros', href: '#nosotros' },
  { num: '03.', label: 'Servicios', href: '#servicios' },
  { num: '04.', label: 'Garantía', href: '#confianza' },
  { num: '05.', label: 'Ubicación', href: '#ubicacion' },
]

const SERVICES = [
  {
    code: 'SRV-01 · Transmisión',
    price: '35 €',
    name: 'Revisión completa',
    note: 'Frenos, transmisión, ruedas, luces.',
    check: 'Diagnóstico incluido',
    aria: 'Consultar Revisión Completa',
    msg: 'Hola, me interesa la Revisión completa (35 €) para mi bicicleta.',
  },
  {
    code: 'SRV-02 · Rodadura',
    price: '40 €',
    name: 'Cambio de cámara y cubierta',
    note: 'Material incluido en el precio.',
    check: 'Material incluido',
    aria: 'Consultar Cambio de Cámara',
    msg: 'Hola, necesito Cambio de cámara y cubierta (40 €).',
  },
  {
    code: 'SRV-03 · Urgencia',
    price: '25 €',
    name: 'Parche de pinchazo',
    note: 'En caliente, si la cámara es de caucho.',
    check: 'Vulcano caliente',
    aria: 'Consultar Parche Pinchazo',
    msg: 'Hola, tengo un pinchazo y quiero parche en caliente (25 €).',
  },
  {
    code: 'SRV-04 · Control',
    price: '30 €',
    name: 'Cambio de cable y maneta',
    note: 'Mountain y carretera.',
    check: 'Acero inoxidable',
    aria: 'Consultar Cable y Maneta',
    msg: 'Hola, necesito Cambio de cable y maneta (30 €) para mi bici.',
  },
  {
    code: 'SRV-05 · Hidráulica',
    price: '35 €',
    name: 'Ajuste de frenos de disco',
    note: 'Incluye bleed.',
    check: 'Purga mineral / DOT',
    aria: 'Consultar Frenos Disco',
    msg: 'Hola, quiero Ajuste de frenos de disco con bleed (35 €).',
  },
  {
    code: 'SRV-06 · Ensamblaje',
    price: '60 €',
    name: 'Montaje de bici completa',
    note: 'A partir de componentes existentes.',
    check: 'Par de apriete verificado',
    aria: 'Consultar Montaje Completo',
    msg: 'Hola, quiero montar una bici completa con mis componentes (60 €).',
  },
]

const GUARANTEES = [
  {
    icon: 'assignment_turned_in',
    title: 'Garantía por escrito',
    text: 'Si una reparación no te convence, la volvemos a hacer sin discutir. Si el problema vuelve a aparecer por nuestra parte, no te cobramos la segunda vez.',
  },
  {
    icon: 'receipt_long',
    title: 'Precio cerrado antes de empezar',
    text: 'El precio que te damos antes de empezar es el precio que pagas. Sin sorpresas al recoger.',
  },
  {
    icon: 'store',
    title: 'Desde 2019 en el mismo barrio',
    text: 'Llevamos desde 2019 en el mismo barrio, con el mismo criterio: si una reparación no está justificada, te lo decimos.',
  },
]

const BIKE_TYPES = [
  { value: '', label: 'Selecciona tipo de montura…' },
  { value: 'Ciudad', label: 'Ciudad (Paseo / Fixie / Plegable)' },
  { value: 'Montaña', label: 'Montaña (MTB / Rígida / Doble)' },
  { value: 'Carretera', label: 'Carretera / Gravel' },
  { value: 'Eléctrica', label: 'Eléctrica (e-Bike / Pedelec)' },
]

function useDemoContact() {
  const [modalMsg, setModalMsg] = useState(null)
  const [toast, setToast] = useState(false)

  function contact(message) {
    if (openWhatsAppOrDemo(message)) return
    setModalMsg(message)
  }

  function notify(message) {
    if (openWhatsAppOrDemo(message)) return
    setToast(true)
    window.setTimeout(() => setToast(false), 4500)
  }

  const Modal = modalMsg ? (
    <div
      aria-labelledby="wa-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={() => setModalMsg(null)}
      role="dialog"
    >
      <div
        className="max-w-md w-full bg-white text-[#1B1F24] p-6 rounded-xl border border-[#D7DBDF] shadow-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#D7DBDF] pb-3">
          <span
            className="font-mono-tech text-xs uppercase text-[#C2410C] font-bold flex items-center gap-1.5"
            id="wa-modal-title"
          >
            <span className="material-symbols-outlined text-[17px]">info</span>
            ESTADO DEMO — Portafolio CAT CODE
          </span>
          <button
            aria-label="Cerrar modal"
            className="text-[#7A808A] hover:text-[#1B1F24]"
            onClick={() => setModalMsg(null)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <div className="space-y-3 font-body text-xs sm:text-sm">
          <p className="text-[#515659]">
            Esto es una demo de portafolio. El WhatsApp del taller no está
            conectado: así se abriría la conversación con tu mensaje
            predefinido:
          </p>
          <div className="p-3 bg-[#F2F3F4] rounded border-l-2 border-[#C2410C] font-mono-tech text-xs text-[#1B1F24] italic">
            {`"${modalMsg}"`}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            className="px-4 py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white font-mono-tech text-xs uppercase font-bold rounded transition-colors"
            onClick={() => setModalMsg(null)}
            type="button"
          >
            Entendido, cerrar
          </button>
        </div>
      </div>
    </div>
  ) : null

  const Toast = toast ? (
    <div className="fixed bottom-20 right-6 z-[1200] max-w-sm bg-white text-[#1B1F24] p-4 rounded-lg shadow-2xl border border-[#D7DBDF]">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[#C2410C] text-[20px] flex-shrink-0">
          info
        </span>
        <div className="flex-1">
          <p className="font-mono-tech text-xs uppercase font-bold text-[#1B1F24] mb-1">
            Aviso de Demostración
          </p>
          <p className="font-body text-xs text-[#515659]">
            Este es un botón de demostración para el portfolio de CAT CODE. La
            integración directa de WhatsApp se habilita en despliegue final.
          </p>
        </div>
        <button
          aria-label="Cerrar aviso"
          className="text-[#7A808A] hover:text-[#1B1F24]"
          onClick={() => setToast(false)}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  ) : null

  return { contact, notify, Modal, Toast }
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-[#1B1F24] text-white py-1.5 px-4 text-center font-mono-tech text-[11px] tracking-wider uppercase flex items-center justify-center gap-3 border-b border-black">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#C2410C] rounded-full animate-pulse" />
          <span className="font-medium text-slate-100">
            Presupuesto cerrado antes de empezar · Sin sorpresas
          </span>
        </div>
        <span className="text-stone-500">|</span>
        <a
          className="underline text-[#FFB396] hover:text-white transition-colors"
          href="#confianza"
        >
          Detalles
        </a>
      </div>

      <header className="w-full bg-white/95 backdrop-blur-md border-b border-[#D7DBDF] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="h-16 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <a
              className="font-display-tech font-bold text-2xl tracking-tighter uppercase text-[#1B1F24] hover:text-[#C2410C] transition-colors flex items-center gap-2"
              href="#inicio"
            >
              {BUSINESS.name}
            </a>
            <div className="hidden sm:flex items-center gap-1.5 font-mono-tech text-[10px]">
              <span className="px-2 py-0.5 bg-[#F2F3F4] border border-[#D7DBDF] text-[#515659] rounded uppercase tracking-wide font-medium">
                Sevilla · C/ Feria
              </span>
              {DEMO_MODE && (
                <span className="px-2 py-0.5 bg-[#FDECE4] border border-[#ECCAB6] text-[#C2410C] rounded uppercase tracking-wide font-bold">
                  Proyecto conceptual
                </span>
              )}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 font-display-tech font-semibold tracking-wider text-[13px] uppercase">
            {NAV_LINKS.map((link, i) => (
              <a
                aria-current={i === 0 ? 'page' : undefined}
                className={
                  i === 0
                    ? 'text-[#C2410C] border-b-2 border-[#C2410C] py-1 flex items-center gap-1 transition-colors'
                    : 'text-[#515659] hover:text-[#1B1F24] transition-colors py-1 flex items-center gap-1'
                }
                href={link.href}
                key={link.href}
              >
                <span className="text-xs opacity-60">{link.num}</span> {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-mono-tech text-xs uppercase font-bold tracking-wider rounded border border-[#C2410C] shadow-sm transition-all active:translate-y-0.5"
              href="#servicios"
            >
              Tarifas
            </a>
            <button
              aria-label="Abrir menú"
              className="lg:hidden p-2 text-[#1B1F24] hover:bg-[#F2F3F4] border border-[#D7DBDF] rounded transition-colors"
              onClick={() => setOpen((v) => !v)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            <div className="w-8 h-8 rounded bg-[#F2F3F4] border border-[#D7DBDF] flex items-center justify-center text-[#C2410C]">
              <span className="material-symbols-outlined text-[18px]">build</span>
            </div>
          </div>
        </div>

        <div
          className={`${open ? 'block' : 'hidden'} lg:hidden w-full bg-white border-t border-[#D7DBDF] px-5 py-4 shadow-xl`}
        >
          <nav className="flex flex-col gap-2 mb-4 font-display-tech font-semibold tracking-wider text-sm uppercase">
            {NAV_LINKS.map((link, i) => (
              <a
                className={
                  i === 0
                    ? 'py-1 text-[#C2410C]'
                    : 'py-1 text-[#515659] hover:text-[#1B1F24]'
                }
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="p-3 bg-[#F2F3F4] border border-[#D7DBDF] rounded mb-4 font-mono-tech">
            <div className="text-[11px] uppercase text-[#1B1F24] font-bold mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#C2410C]">
                schedule
              </span>
              Horario de Taller
            </div>
            <p className="text-[11px] text-[#515659]">
              Lun a Vie: 9:30–14:00 / 16:30–20:00
              <br />
              Sáb: 10:00–14:00
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3 font-mono-tech text-[10px]">
            <span className="px-2 py-0.5 bg-[#F2F3F4] text-[#515659] border border-[#D7DBDF] rounded uppercase">
              Sevilla · C/ Feria
            </span>
            {DEMO_MODE && (
              <span className="px-2 py-0.5 bg-[#FDECE4] border border-[#ECCAB6] text-[#C2410C] rounded uppercase font-bold">
                Proyecto conceptual
              </span>
            )}
          </div>
          <a
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#C2410C] text-white font-mono-tech text-xs uppercase font-bold rounded text-center shadow-sm"
            href="#servicios"
            onClick={() => setOpen(false)}
          >
            Tarifas
          </a>
        </div>
      </header>
    </div>
  )
}

function Hero({ onContact }) {
  return (
    <section
      className="w-full bg-white relative overflow-hidden py-14 md:py-20 lg:py-24 border-b border-[#D7DBDF] bg-grid-architectural"
      id="inicio"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D7DBDF] rounded-full font-mono-tech text-[11px] uppercase tracking-wide text-[#515659] shadow-sm">
              <span className="inline-block w-2 h-2 bg-[#C2410C] rounded-full animate-ping" />
              <span>Taller de bicicletas · Sevilla · Desde 2019</span>
            </div>

            <div className="space-y-2">
              <div className="font-mono-tech text-xs tracking-widest text-[#C2410C] uppercase font-bold">
                [BANCO-01 // SERVICIO OFICIAL]
              </div>
              <h1 className="font-display-tech font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[78px] uppercase tracking-tight text-[#1B1F24] leading-[0.92]">
                Tu bici, <br className="hidden sm:inline" />
                <span className="text-[#C2410C]">como nueva.</span>
              </h1>
            </div>

            <p className="font-body text-[#515659] text-lg md:text-xl font-normal max-w-xl leading-relaxed">
              Reparamos y mantenemos bicicletas de ciudad, montaña y carretera.
              Trabajo a mano y recambios de calidad. Si no queda bien, la vuelvo
              a hacer.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-mono-tech text-xs md:text-sm font-bold uppercase tracking-wider rounded border border-[#C2410C] shadow-[0_4px_14px_rgba(194,65,12,0.25)] transition-all active:scale-[0.98] group"
                onClick={() => onContact(WHATSAPP_MSG)}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] group-hover:rotate-6 transition-transform">
                  chat
                </span>
                Pedir presupuesto por WhatsApp
              </button>
              <a
                className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-white hover:bg-[#F2F3F4] text-[#1B1F24] font-mono-tech text-xs md:text-sm uppercase font-semibold tracking-wider rounded border border-[#D7DBDF] shadow-sm transition-all"
                href="#servicios"
              >
                <span className="material-symbols-outlined text-[19px] text-[#27548D]">
                  build
                </span>
                Ver servicios y precios
              </a>
            </div>

            <div className="pt-6 border-t border-[#D7DBDF] grid grid-cols-3 gap-3 font-mono-tech text-[11px] sm:text-xs text-[#515659] uppercase">
              <div className="flex items-center gap-2 p-2.5 bg-white rounded border border-[#D7DBDF] shadow-xs">
                <span className="material-symbols-outlined text-[17px] text-[#C2410C]">
                  verified
                </span>
                <span className="truncate font-semibold">Presupuesto Previo</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-white rounded border border-[#D7DBDF] shadow-xs">
                <span className="material-symbols-outlined text-[17px] text-[#27548D]">
                  handyman
                </span>
                <span className="truncate font-semibold">Ajuste a Mano</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-white rounded border border-[#D7DBDF] shadow-xs">
                <span className="material-symbols-outlined text-[17px] text-[#27548D]">
                  location_on
                </span>
                <span className="truncate font-semibold">C/ Feria 118</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative corner-mark p-2.5 bg-white rounded-lg border border-[#D7DBDF] shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#F2F3F4] rounded-t border-b border-[#D7DBDF] text-[10px] font-mono-tech text-[#515659]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C2410C]" />
                  <span className="text-[#1B1F24] font-bold uppercase tracking-wider">
                    BANCO DE TRABAJO // CÉLULA MECÁNICA
                  </span>
                </div>
                <span className="text-[#27548D] font-bold bg-[#ECF1F6] px-1.5 py-0.5 rounded border border-[#AEC5DF]">
                  STATUS: OPERATIVO
                </span>
              </div>

              <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden rounded bg-stone-100">
                <img
                  alt="Banco de trabajo del taller con herramientas de precisión"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => swapOnError(e, HERO_IMG)}
                  src={HERO_LOCAL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/95 text-[#1B1F24] font-mono-tech text-[10px] rounded tracking-wider uppercase backdrop-blur-sm shadow flex items-center gap-1.5 border border-white">
                    <span className="material-symbols-outlined text-[14px] text-[#C2410C]">
                      straighten
                    </span>
                    CALIBRACIÓN EN BANCO
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono-tech text-[11px] bg-[#1B1F24]/90 border border-white/20 px-3 py-2 rounded backdrop-blur-sm shadow">
                  <span className="flex items-center gap-1.5 text-stone-200">
                    <span className="material-symbols-outlined text-[15px] text-[#FF9E7A]">
                      precision_manufacturing
                    </span>
                    Muelle 01 · Banco de centrado y ajuste
                  </span>
                  <span className="text-[#FF9E7A] font-bold">
                    TOLERANCIA &lt; 0.2mm
                  </span>
                </div>
              </div>

              <div className="px-3.5 py-2 bg-[#F2F3F4] rounded-b mt-1 flex items-center justify-between text-[10px] font-mono-tech text-[#7A808A]">
                <span>INSPECCIÓN POR GALGA Y DINAMÓMETRO</span>
                <span className="font-medium text-[#1B1F24]">
                  ESTÁNDAR DIN EN 14764
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section
      className="w-full bg-[#F2F3F4] py-16 md:py-24 border-b border-[#D7DBDF]"
      id="nosotros"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs text-[#C2410C] font-bold uppercase tracking-wider">
              [SEC-02 // REGISTRO_TALLER]
            </span>
            <span className="h-px w-10 bg-[#D7DBDF]" />
            <span className="px-2 py-0.5 bg-white border border-[#D7DBDF] text-[#515659] font-mono-tech text-[10px] uppercase rounded font-medium">
              Criterio Profesional
            </span>
          </div>
          <h2 className="font-display-tech font-bold text-3xl sm:text-4xl md:text-5xl uppercase text-[#1B1F24] tracking-tight leading-none">
            Quién está detrás de las llaves
          </h2>
          <p className="text-[#515659] text-base md:text-lg leading-relaxed font-normal">
            Llevamos desde 2019 en el mismo barrio, con el mismo criterio: si
            una reparación no está justificada, te lo decimos. No cambiamos
            piezas por vender recambios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#D7DBDF] hover:border-[#C2410C]/50 p-6 rounded-lg relative overflow-hidden flex flex-col justify-between transition-all shadow-sm group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C2410C]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between text-[#7A808A] font-mono-tech text-[11px] uppercase tracking-wider mb-2">
                <span>Registro de Actividad</span>
                <span className="text-[#C2410C] font-bold font-mono-tech">
                  REF_019
                </span>
              </div>
              <div className="font-display-tech font-extrabold text-6xl lg:text-7xl text-[#C2410C] tracking-tight">
                2019
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-[#D7DBDF] bg-white p-3 rounded font-body text-xs md:text-sm text-[#515659]">
              Año ininterrumpido de apertura en el casco norte sevillano.
            </div>
          </div>

          <div className="bg-white border border-[#D7DBDF] hover:border-[#27548D]/50 p-6 rounded-lg relative overflow-hidden flex flex-col justify-between transition-all shadow-sm group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#27548D]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between text-[#7A808A] font-mono-tech text-[11px] uppercase tracking-wider mb-2">
                <span>Área Operativa</span>
                <span className="text-[#27548D] font-bold font-mono-tech">
                  ZONA_41003
                </span>
              </div>
              <div className="font-display-tech font-bold text-3xl sm:text-4xl text-[#1B1F24] tracking-tight uppercase mt-2">
                Feria, Sevilla
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-[#D7DBDF] bg-white p-3 rounded font-body text-xs md:text-sm text-[#515659]">
              Enlace peatonal Calle Feria con Alameda de Hércules.
            </div>
          </div>

          <div className="bg-white border border-[#D7DBDF] hover:border-[#27548D]/50 p-6 rounded-lg relative overflow-hidden flex flex-col justify-between transition-all shadow-sm group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#27548D]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between text-[#7A808A] font-mono-tech text-[11px] uppercase tracking-wider mb-2">
                <span>Disponibilidad en Banco</span>
                <span className="text-[#27548D] bg-[#ECF1F6] px-1.5 py-0.5 rounded border border-[#AEC5DF] font-bold font-mono-tech text-[10px]">
                  ABIERTO
                </span>
              </div>
              <div className="font-display-tech font-bold text-3xl sm:text-4xl text-[#1B1F24] tracking-tight uppercase mt-2">
                Horario Semanal
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-[#D7DBDF] bg-white p-3 rounded font-mono-tech text-xs text-[#515659] space-y-1">
              <p className="text-[#1B1F24] font-bold">
                Lun–Vie: 9:30–14:00 / 16:30–20:00
              </p>
              <p className="text-[#7A808A]">
                Sáb: 10:00–14:00 · Dom cerrado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services({ onContact }) {
  return (
    <section
      className="w-full bg-white py-16 md:py-24 border-b border-[#D7DBDF] bg-dot-technical"
      id="servicios"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#D7DBDF] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-xs text-[#C2410C] font-bold uppercase tracking-wider">
                [SEC-03 // TARIFARIO_MECÁNICO]
              </span>
              <span className="px-2 py-0.5 bg-[#C2410C] text-white font-mono-tech text-[10px] uppercase rounded font-bold">
                Tarifario Público y Transparente
              </span>
            </div>
            <h2 className="font-display-tech font-bold text-3xl sm:text-4xl md:text-5xl uppercase text-[#1B1F24] tracking-tight">
              Lo que hacemos, y lo que cuesta
            </h2>
          </div>
          <p className="text-[#515659] font-body text-sm max-w-sm">
            Todos los precios incluyen mano de obra e impuestos. Presupuesto
            cerrado antes de desmontar un solo tornillo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              className="group bg-white hover:bg-[#FDECE4]/40 border border-[#D7DBDF] hover:border-[#C2410C] p-6 rounded-lg transition-all duration-200 flex flex-col justify-between shadow-sm relative"
              key={service.code}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b border-[#D7DBDF] pb-3">
                  <span className="font-mono-tech text-xs font-semibold text-[#7A808A] group-hover:text-[#C2410C] transition-colors">
                    {service.code}
                  </span>
                  <span className="font-display-tech font-extrabold text-3xl text-[#C2410C] tracking-tight">
                    {service.price}
                  </span>
                </div>
                <div>
                  <h3 className="font-display-tech font-bold text-xl uppercase text-[#1B1F24] tracking-wide">
                    {service.name}
                  </h3>
                  <p className="font-body text-[#515659] text-sm mt-1">
                    {service.note}
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#D7DBDF] flex items-center justify-between">
                <span className="font-mono-tech text-[11px] uppercase text-[#27548D] font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px]">
                    check_circle
                  </span>
                  {service.check}
                </span>
                <button
                  aria-label={service.aria}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#F2F3F4] hover:bg-[#C2410C] text-[#1B1F24] hover:text-white font-mono-tech text-xs uppercase font-semibold rounded border border-[#D7DBDF] hover:border-[#C2410C] transition-all"
                  onClick={() => onContact(service.msg)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    chat
                  </span>
                  Consultar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section
      className="w-full bg-[#F2F3F4] py-16 md:py-24 border-b border-[#D7DBDF]"
      id="confianza"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono-tech text-xs text-[#27548D] font-bold uppercase tracking-wider">
              [SEC-04 // PROTOCOLO_GARANTÍA]
            </span>
            <span className="px-2 py-0.5 bg-[#ECF1F6] border border-[#AEC5DF] text-[#27548D] font-mono-tech text-[10px] uppercase rounded font-bold">
              Compromiso Técnico Real
            </span>
          </div>
          <h2 className="font-display-tech font-bold text-3xl sm:text-4xl md:text-5xl uppercase text-[#1B1F24] tracking-tight">
            La garantía, escrita
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {GUARANTEES.map((point) => (
            <div
              className="bg-white border border-[#D7DBDF] p-6 rounded-lg relative overflow-hidden space-y-4 shadow-sm hover:border-[#27548D] transition-colors"
              key={point.title}
            >
              <div className="w-10 h-10 rounded bg-[#ECF1F6] border border-[#AEC5DF] flex items-center justify-center text-[#27548D]">
                <span className="material-symbols-outlined text-[22px]">
                  {point.icon}
                </span>
              </div>
              <h3 className="font-display-tech font-bold text-xl uppercase text-[#1B1F24] tracking-wide">
                {point.title}
              </h3>
              <p className="font-body text-[#515659] text-sm leading-relaxed">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        <div className="relative bg-white border-l-4 border-l-[#C2410C] border-y border-r border-[#D7DBDF] p-6 sm:p-8 lg:p-10 rounded-r-lg shadow-sm">
          <div className="space-y-3">
            <span className="font-mono-tech text-xs uppercase text-[#C2410C] block font-bold tracking-widest">
              [DECLARACIÓN DEL MECÁNICO] · NUESTRA PALABRA EN EL TALLER
            </span>
            <blockquote className="font-display-tech font-bold text-xl sm:text-2xl md:text-3xl uppercase text-[#1B1F24] leading-snug">
              “Un taller de barrio se juega la reputación cada día. Por eso aquí
              no hay sorpresas: te decimos qué cuesta antes de empezar, y si el
              trabajo no te convence, lo volvemos a hacer sin discutir.”
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

function Location({ onContact }) {
  return (
    <section
      className="w-full bg-white py-16 md:py-24 border-b border-[#D7DBDF]"
      id="ubicacion"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono-tech text-xs text-[#C2410C] font-bold uppercase tracking-wider">
              [SEC-05 // PLANO_TALLER]
            </span>
            <span className="px-2 py-0.5 bg-[#F2F3F4] border border-[#D7DBDF] text-[#515659] font-mono-tech text-[10px] uppercase rounded font-bold">
              Taller Físico
            </span>
          </div>
          <h2 className="font-display-tech font-bold text-3xl sm:text-4xl md:text-5xl uppercase text-[#1B1F24] tracking-tight">
            Ubicación
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 space-y-6 bg-white border border-[#D7DBDF] p-6 sm:p-8 rounded-lg shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="font-mono-tech text-xs text-[#7A808A] uppercase tracking-wider block font-bold">
                  Dirección
                </span>
                <p className="font-display-tech font-bold text-2xl sm:text-3xl uppercase text-[#1B1F24]">
                  {BUSINESS.address} · {BUSINESS.city}
                </p>
                <p className="text-[#515659] text-sm">
                  Frente a la encrucijada de San Juan de la Palma, acceso
                  directo ciclista.
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-[#D7DBDF]">
                <span className="font-mono-tech text-xs text-[#7A808A] uppercase tracking-wider block font-bold">
                  Horario de Taller
                </span>
                <p className="font-mono-tech text-sm sm:text-base text-[#1B1F24] font-semibold">
                  Lun–Vie 9:30–14:00 / 16:30–20:00 · Sáb 10:00–14:00 · Dom
                  cerrado
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-[#D7DBDF]">
                <span className="font-mono-tech text-xs text-[#7A808A] uppercase tracking-wider block font-bold">
                  Teléfono de Contacto
                </span>
                <a
                  className="inline-flex items-center gap-3 font-display-tech font-bold text-3xl sm:text-4xl text-[#C2410C] hover:text-[#9A3412] transition-colors"
                  href={BUSINESS.phoneHref}
                >
                  <span className="material-symbols-outlined text-[32px]">
                    call
                  </span>
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#D7DBDF]">
              <button
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#C2410C] hover:bg-[#9A3412] text-white font-mono-tech text-xs uppercase font-bold tracking-wider rounded border border-[#C2410C] shadow-sm transition-all active:scale-[0.98]"
                onClick={() =>
                  onContact('Hola, quiero pasarme por el taller en Calle Feria 118.')
                }
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chat
                </span>
                Escribir por WhatsApp
              </button>
              <a
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#F2F3F4] hover:bg-[#E9ECEF] text-[#1B1F24] font-mono-tech text-xs uppercase font-semibold tracking-wider rounded border border-[#D7DBDF] transition-all"
                href={BUSINESS.mapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px] text-[#27548D]">
                  directions
                </span>
                Cómo llegar
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full h-full min-h-[360px] rounded-lg overflow-hidden border border-[#D7DBDF] bg-[#F2F3F4] shadow-sm">
              <img
                alt="Exterior del taller en Calle Feria 118, Sevilla"
                className="w-full h-full min-h-[360px] object-cover brightness-[0.95]"
                onError={(e) => swapOnError(e, MAP_IMG)}
                src={MAP_LOCAL}
              />
              <div className="absolute top-3 left-3 bg-white/95 text-[#1B1F24] font-mono-tech text-[10px] sm:text-[11px] uppercase px-3 py-1.5 rounded border border-[#D7DBDF] backdrop-blur-md shadow-xs flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-[#C2410C] rounded-full animate-ping" />
                <span>Coord: 37.3995° N, 5.9902° W · Calle Feria</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-[#C2410C] text-white font-mono-tech text-xs uppercase px-3.5 py-1.5 rounded-full shadow-[0_4px_16px_rgba(194,65,12,0.4)] border border-white flex items-center gap-1.5 transform hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[17px]">
                    pedal_bike
                  </span>
                  Taller Recambios 118
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-white/95 text-[#7A808A] font-mono-tech text-[10px] px-2.5 py-1 rounded border border-[#D7DBDF]">
                MAP_SYS // DISTRITO CASCO ANTIGUO
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExtraForm() {
  const [status, setStatus] = useState('idle')
  const [popover, setPopover] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    bici: '',
    necesidad: '',
    telefono: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'telefono') {
      const digits = value.replace(/\D/g, '').slice(0, 9)
      if (digits.length > 0 && !digits.startsWith('6')) return
      const formatted = digits.replace(
        /(\d{3})(\d{0,3})(\d{0,3})/,
        (_, a, b, c) => [a, b, c].filter(Boolean).join(' '),
      )
      setForm({ ...form, telefono: formatted })
      return
    }
    setForm({ ...form, [name]: value })
  }

  function fillExample() {
    setForm({
      nombre: 'Ejemplo Demo',
      bici: 'Carretera',
      necesidad:
        'Crujido en el eje del pedalier al pedalear fuerte en subida y desajuste en el piñón pequeño.',
      telefono: '600 000 000',
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    window.setTimeout(() => setStatus('success'), 700)
  }

  function resetDemoForm() {
    setForm({ nombre: '', bici: '', necesidad: '', telefono: '' })
    setStatus('idle')
  }

  const inputClass =
    'w-full px-3.5 py-2.5 bg-white border border-[#D7DBDF] focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] text-[#1B1F24] rounded font-body text-sm placeholder-[#7A808A] focus:outline-none transition-colors'

  return (
    <section
      className="w-full bg-[#F2F3F4] py-16 md:py-20 border-b border-[#D7DBDF]"
      id="demo-formulario"
    >
      <div className="max-w-[840px] mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#D7DBDF] rounded-xl p-6 sm:p-8 lg:p-10 shadow-md relative">
          <div className="space-y-4 pb-6 border-b border-[#D7DBDF]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-[#FDECE4] border border-[#ECCAB6] text-[#C2410C] font-mono-tech text-[11px] uppercase rounded font-bold tracking-wider">
                EXTRA · a presupuestar
              </span>

              <div className="relative inline-flex items-center">
                <button
                  aria-label="Información sobre este añadido opcional"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase text-[#27548D] hover:text-[#C2410C] bg-[#F2F3F4] border border-[#D7DBDF] px-2.5 py-1 rounded cursor-pointer transition-colors font-semibold"
                  onClick={() => setPopover((v) => !v)}
                  title="No viene incluido en tu nivel: el contacto es WhatsApp. Pídenoslo como extra."
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    info
                  </span>
                  ¿Por qué es extra?
                </button>

                {popover && (
                  <div className="absolute right-0 top-9 w-72 sm:w-80 bg-white border border-[#D7DBDF] text-[#1B1F24] p-4 rounded-lg shadow-xl z-50 text-left font-body text-xs leading-relaxed">
                    <div className="flex items-start justify-between gap-2 mb-2 pb-1 border-b border-[#D7DBDF]">
                      <span className="font-mono-tech text-[11px] uppercase text-[#C2410C] font-bold">
                        Especificación Técnica
                      </span>
                      <button
                        aria-label="Cerrar información"
                        className="text-[#7A808A] hover:text-[#1B1F24]"
                        onClick={() => setPopover(false)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          close
                        </span>
                      </button>
                    </div>
                    <p className="text-[#515659]">
                      El formulario no va incluido en este nivel. El contacto de
                      esta landing es un botón de WhatsApp: te escriben y
                      presupuesto ahí mismo, sin esperas. Un formulario te
                      obligaría a redactar tu propia política de privacidad y la
                      de cookies, y a mantenerlas al día cada vez que cambies
                      algo. Si lo quieres, es un extra: tú nos das el texto legal
                      redactado y nosotros lo montamos. Esto es una demo de cómo
                      se vería.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <h3 className="font-display-tech font-bold text-2xl sm:text-3xl uppercase text-[#1B1F24] tracking-tight">
              Valoración Previa Online
            </h3>

            <div className="p-3 bg-[#FDECE4] border border-[#ECCAB6] text-[#9A3412] rounded font-mono-tech text-xs uppercase font-semibold flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#C2410C] flex-shrink-0">
                warning
              </span>
              <span>
                Demostración. Este formulario no envía nada a ningún sitio.
              </span>
            </div>
          </div>

          <div className="pt-6">
            {status === 'success' ? (
              <div className="space-y-4 p-6 bg-[#ECF1F6] border border-[#AEC5DF] rounded-lg text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#D4E2EF] border border-[#AEC5DF] text-[#27548D] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">
                    task_alt
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display-tech font-bold text-xl uppercase text-[#1B1F24]">
                    Simulación completada
                  </h4>
                  <p className="font-body text-[#515659] text-sm max-w-md mx-auto">
                    Esto es una demostración. Así se vería la confirmación si el
                    formulario estuviera activo. No hemos recibido nada.
                  </p>
                </div>
                <button
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#ECF1F6] text-[#27548D] font-mono-tech text-xs uppercase rounded border border-[#AEC5DF] transition-colors font-bold"
                  onClick={resetDemoForm}
                  type="button"
                >
                  Rellenar otra vez →
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="flex justify-end">
                  <button
                    className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase text-[#27548D] hover:text-[#C2410C] cursor-pointer font-bold"
                    onClick={fillExample}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      auto_fix_high
                    </span>
                    Rellenar con datos de ejemplo
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label
                    className="font-mono-tech text-xs uppercase text-[#515659] block font-bold"
                    htmlFor="f-nombre"
                  >
                    Nombre <span className="text-[#C2410C]">*</span>
                  </label>
                  <input
                    className={inputClass}
                    id="f-nombre"
                    name="nombre"
                    onChange={handleChange}
                    placeholder="Tu nombre y apellidos"
                    required
                    type="text"
                    value={form.nombre}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    className="font-mono-tech text-xs uppercase text-[#515659] block font-bold"
                    htmlFor="f-bici"
                  >
                    Tipo de bicicleta <span className="text-[#C2410C]">*</span>
                  </label>
                  <select
                    className={inputClass}
                    id="f-bici"
                    name="bici"
                    onChange={handleChange}
                    required
                    value={form.bici}
                  >
                    {BIKE_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    className="font-mono-tech text-xs uppercase text-[#515659] block font-bold"
                    htmlFor="f-necesidad"
                  >
                    ¿Qué necesita la bicicleta?{' '}
                    <span className="text-[#C2410C]">*</span>
                  </label>
                  <textarea
                    className={inputClass}
                    id="f-necesidad"
                    name="necesidad"
                    onChange={handleChange}
                    placeholder="Describe el síntoma, ruido, holgura o mantenimiento deseado…"
                    required
                    rows={3}
                    value={form.necesidad}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    className="font-mono-tech text-xs uppercase text-[#515659] block font-bold"
                    htmlFor="f-tel"
                  >
                    Teléfono{' '}
                    <span className="text-[#7A808A] font-normal">
                      (Opcional · Ej. 6XX XXX XXX)
                    </span>
                  </label>
                  <input
                    className={inputClass}
                    id="f-tel"
                    inputMode="numeric"
                    name="telefono"
                    onChange={handleChange}
                    placeholder="600 000 000"
                    type="tel"
                    value={form.telefono}
                  />
                </div>

                <div className="pt-2">
                  <button
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-mono-tech text-xs uppercase font-bold tracking-wider rounded border border-[#C2410C] shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
                    disabled={status === 'loading'}
                    id="form-submit-btn"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      send
                    </span>
                    <span>
                      {status === 'loading'
                        ? 'Enviando…'
                        : 'Solicitar valoración previa'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ onNotify }) {
  return (
    <footer className="w-full bg-[#1B1F24] text-stone-300 border-t border-black">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#23282E] border border-stone-800 rounded-lg p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#C2410C] text-white font-mono-tech text-[10px] uppercase font-bold rounded">
                Nivel Web
              </span>
              <span className="font-display-tech font-bold text-xl uppercase text-white tracking-wide">
                CUSTOM Basic
              </span>
            </div>
            <span className="font-mono-tech font-bold text-base text-[#FF9E7A]">
              149 € + 19 €/mes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-stone-800">
            <div className="space-y-1.5">
              <span className="font-mono-tech text-xs uppercase text-stone-400 block font-bold">
                Alcance Incluido
              </span>
              <p className="font-body text-xs sm:text-sm text-stone-300 leading-relaxed">
                5 secciones · hero con WhatsApp · sobre nosotros · servicios ·
                confianza · ubicación · hosting · responsive · SEO básico · 1
                ronda de cambios
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="font-mono-tech text-xs uppercase text-stone-400 block font-bold">
                Exclusiones de Nivel
              </span>
              <p className="font-body text-xs sm:text-sm text-stone-400 leading-relaxed">
                No incluye: galería y FAQ → Custom Pro (+100 €) | formulario →
                extra, a presupuestar | blog y aviso legal → Premium
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
            <a
              className="font-mono-tech text-xs uppercase text-[#93C5FD] hover:text-white underline flex items-center gap-1.5 font-bold"
              href="https://cat-code-hdz.github.io/casa-nora/"
              rel="noopener noreferrer"
              target="_blank"
            >
              ¿Ver el siguiente nivel? → Casa Nora
              <span className="material-symbols-outlined text-[15px]">
                north_east
              </span>
            </a>
            <span className="font-mono-tech text-[11px] text-stone-500 uppercase">
              Especificación Técnica Taller
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-10 border-b border-stone-800">
          <div className="space-y-2">
            <span className="font-display-tech font-bold text-xl uppercase text-white block tracking-wide">
              Taller Recambios
            </span>
            <p className="font-body text-sm text-stone-400">
              Mecánica rigurosa y ajuste artesanal en el corazón del casco
              histórico.
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="font-mono-tech text-xs uppercase text-stone-400 block font-bold">
              Taller Físico
            </span>
            <p className="font-body text-sm text-stone-200">
              {BUSINESS.address} · {BUSINESS.city}
            </p>
            <a
              className="font-mono-tech font-bold text-lg text-[#FF9E7A] hover:text-white transition-colors block"
              href={BUSINESS.phoneHref}
            >
              {BUSINESS.phoneDisplay}
            </a>
          </div>
          <div className="space-y-2">
            <span className="font-mono-tech text-xs uppercase text-stone-400 block font-bold">
              Canal Directo
            </span>
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BA59] text-white font-mono-tech text-xs uppercase font-bold tracking-wider rounded border border-[#1DA855] shadow transition-all"
              onClick={() => onNotify(WHATSAPP_MSG)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                chat
              </span>
              WhatsApp Taller (Demo)
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono-tech text-xs text-stone-500 uppercase">
          <p>© 2026 Taller Recambios · Demo de portafolio de CAT CODE</p>
          <p className="text-stone-500">
            Personaje de una demo de portafolio de CAT CODE
          </p>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppFab({ onNotify }) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        aria-label="Escríbenos por WhatsApp"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20BA59] text-white font-mono-tech text-xs uppercase font-bold tracking-wider rounded shadow-[0_4px_16px_rgba(5,150,105,0.35)] border border-[#1DA855] active:scale-95 transition-all"
        onClick={() => onNotify(WHATSAPP_MSG)}
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">chat</span>
        Escríbenos
      </button>
    </div>
  )
}

export default function App() {
  const { contact, notify, Modal, Toast } = useDemoContact()

  return (
    <div className="bg-white text-[#1B1F24] antialiased selection:bg-[#C2410C] selection:text-white">
      <Header />
      <main className="w-full pt-[88px] min-h-[calc(100vh-24rem)]">
        <Hero onContact={contact} />
        <About />
        <Services onContact={contact} />
        <Trust />
        <Location onContact={contact} />
        <ExtraForm />
      </main>
      <Footer onNotify={notify} />
      <WhatsAppFab onNotify={notify} />
      {Toast}
      {Modal}
    </div>
  )
}
