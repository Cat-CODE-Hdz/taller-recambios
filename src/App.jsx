import { useState } from 'react'
import { DEMO_MODE, openWhatsAppOrDemo } from './lib/whatsapp'

const BUSINESS = {
  name: 'TALLER RECAMBIOS',
  address: 'Calle Feria 118',
  city: '41003 Sevilla',
  phoneDisplay: '954 000 000',
  phoneHref: '+34954000000',
  mapsUrl: 'https://maps.google.com/?q=Calle+Feria+118+Sevilla',
}

const WHATSAPP_MSG = 'Hola, quiero presupuesto para mi bici.'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmIaPwB8WimIqmHG_4CmKbKK4wJ2DxVXwltw70zMoXFTjYiwFGWYLyYIHtkJEJw1hK4pJGEV94jHclNFh1Jay8mtMsfSsGMBctBX9SNedJ7XSAwp7xscEEt9jkDFOvqLgtYN2SQVrhTgwl3kcwI9QyuumjerZdwE0LrCBbd_gJ6s5v4t5_rWdlLTYHIqRzDURvlVe0BLLIC23Jb7dVBwOmQ64UQ6GUcscMdT3E8xM6jh6ABmJ4_CPzg'

const MAP_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDnUa89N-ZC_qpXpgqxUcbVusVGon1v-6a6i1C8ksb5eWReunlpHa-cz6jKeyCmofGTNqRBBFYaAcBu2Z1FNA_foEIUhG3PvkttkMHVZj6BZ-Bns1uzB_ZvuF8VOU2IwaezYAHqGOfd153wCxWECjmUlkIxaxPBWD8X126TxMXTwFdggoIW5_x9GaaQfZ5wVh1wKQ8ZaOF_jdsO1GZ1Pi0upNwGjuhVpOzj9f-MH-zbTfnP6fVbAp9NbA'

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

const SECTION_PAD = 'px-margin md:px-margin-tablet lg:px-margin-desktop'
const WRAP = 'mx-auto w-full max-w-[1200px]'
const H2_DESKTOP = 'lg:text-headline-lg lg:leading-[36px]'
const BODY_DESKTOP = 'lg:text-body-lg lg:leading-[26px]'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio', icon: 'home' },
  { label: 'Nosotros', href: '#nosotros', icon: 'handyman' },
  { label: 'Servicios', href: '#servicios', icon: 'build' },
  { label: 'Garantía', href: '#confianza', icon: 'verified' },
  { label: 'Ubicación', href: '#ubicacion', icon: 'pin_drop' },
]

const SERVICES = [
  { name: 'Revisión completa', price: '35 €', note: 'Frenos, transmisión, ruedas, luces' },
  { name: 'Cambio de cámara y cubierta', price: '40 €', note: 'Material incluido en el precio' },
  { name: 'Parche de pinchazo', price: '25 €', note: 'En caliente, si la cámara es de caucho' },
  { name: 'Cambio de cable y maneta', price: '30 €', note: 'Mountain y carretera' },
  { name: 'Ajuste de frenos de disco', price: '35 €', note: 'Incluye bleed' },
  { name: 'Montaje de bici completa', price: '60 €', note: 'A partir de componentes existentes' },
]

const BIKE_TYPES = ['Ciudad', 'Montaña', 'Carretera', 'Eléctrica']

function useWhatsApp() {
  const [toast, setToast] = useState(false)

  function send(message) {
    const ok = openWhatsAppOrDemo(message)
    if (!ok) {
      setToast(true)
      window.setTimeout(() => setToast(false), 4500)
    }
  }

  const Toast = toast ? (
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-28 z-[1200] w-[calc(100%-2.5rem)] max-w-[420px] bg-[#1B1F24] text-white p-3.5 rounded-[4px] border border-[#1B1F24] border-l-4 border-l-[#C2410C] shadow-lg"
      role="status"
    >
      <span className="font-badge-technical text-badge-technical uppercase tracking-wider text-[#C2410C] block mb-1">
        Estado demo
      </span>
      <p className="font-body-sm text-body-sm text-slate-200">
        <strong className="text-white">Esto es una demo de portafolio.</strong>{' '}
        El WhatsApp del taller no está conectado: así se abriría la
        conversación con tu mensaje predefinido.
      </p>
    </div>
  ) : null

  return { send, Toast }
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 w-full z-50 pt-safe">
        <div className={`bg-[#1B1F24] text-white ${SECTION_PAD} py-1.5 flex items-center justify-between`}>
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-1.5 h-1.5 bg-[#C2410C] shrink-0" />
            <span className="font-badge-technical text-badge-technical uppercase tracking-wider text-slate-200 truncate">
              Presupuesto cerrado antes de empezar · Sin sorpresas
            </span>
          </div>
          <a
            className="font-badge-technical text-badge-technical uppercase underline tracking-wider text-[#C2410C] hover:text-white transition-colors shrink-0 ml-2"
            href="#confianza"
          >
            Detalles
          </a>
        </div>

        <div className={`h-20 bg-[#1B1F24]/95 backdrop-blur-xl ${SECTION_PAD} flex items-center justify-between`}>
          <div className="flex items-center gap-space-sm">
            <button
              aria-label="Abrir menú de navegación"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-[#C2410C] transition-colors lg:hidden"
              onClick={() => setOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <div className="flex flex-col justify-center">
              <span className="font-headline-md text-headline-md uppercase tracking-tight text-white leading-none">
                {BUSINESS.name}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-badge-technical text-badge-technical uppercase tracking-widest text-slate-400 bg-white/5 px-1 py-0.5 rounded-lg border border-white/10">
                  Sevilla · C/ Feria
                </span>
                {DEMO_MODE && (
                  <span className="font-badge-technical text-badge-technical uppercase tracking-wider text-[#C2410C] border border-[#C2410C]/40 px-1 py-0.5 rounded-lg">
                    Proyecto conceptual
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <nav aria-label="Navegación principal" className="hidden lg:flex items-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  className="min-h-[44px] px-3 flex items-center font-label-md text-label-md uppercase tracking-wider text-slate-300 hover:text-[#C2410C] transition-colors"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              className="min-h-[44px] px-3.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-label-md text-label-md uppercase tracking-wider rounded-lg flex items-center justify-center transition-colors"
              href="#servicios"
            >
              Tarifas
            </a>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#1B1F24] text-white flex flex-col justify-between transition-transform duration-200 shadow-2xl ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex items-center justify-between pb-space-sm">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm uppercase text-white tracking-tight">
                Menú taller
              </span>
              <span className="font-badge-technical text-badge-technical uppercase text-slate-400 tracking-wider">
                Calle Feria, Sevilla
              </span>
            </div>
            <button
              aria-label="Cerrar menú"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-white"
              onClick={() => setOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`min-h-[44px] flex items-center px-space-md font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors ${
                  i === 0
                    ? 'bg-white/10 text-white border-l-2 border-[#C2410C]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined mr-3 text-[20px]">
                  {link.icon}
                </span>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="p-space-lg bg-black/20 flex flex-col gap-space-xs">
          <span className="font-badge-technical text-badge-technical uppercase text-slate-400 tracking-wider">
            Horario taller
          </span>
          <p className="font-body-sm text-body-sm text-slate-200">
            Lunes a Viernes: 9:30 – 14:00 / 16:30 – 20:00
            <br />
            Sábados: 10:00 – 14:00
          </p>
        </div>
      </aside>
    </>
  )
}

function Hero({ onWhatsApp }) {
  return (
    <section
      id="inicio"
      className={`scroll-mt-28 bg-[#1B1F24] text-white ${SECTION_PAD} pt-6 pb-8 lg:py-14`}
    >
      <div className={`${WRAP} flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center`}>
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 self-start bg-white/10 px-2.5 py-1 rounded-[4px] border border-white/20">
            <span className="w-1.5 h-1.5 bg-[#C2410C]" />
            <span className="font-badge-technical text-badge-technical uppercase tracking-wider text-slate-200">
              Taller de bicicletas · Sevilla · Desde 2019
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-display-lg-mobile text-display-lg-mobile uppercase tracking-tight text-white leading-none lg:text-display-lg lg:leading-[52px]">
              Tu bici, como nueva.
            </h1>
            <p className={`font-body-md text-body-md text-slate-300 ${BODY_DESKTOP}`}>
              Reparamos y mantenemos bicicletas de ciudad, montaña y carretera.
              Trabajo a mano y recambios de calidad. Si no queda bien, la vuelvo a
              hacer.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 w-full pt-1 sm:flex-row sm:justify-center lg:justify-start">
            <button
              className="w-full sm:w-auto sm:px-6 min-h-[48px] bg-[#C2410C] hover:bg-[#9A3412] text-white font-label-md text-label-md uppercase tracking-wider rounded-[4px] flex items-center justify-center gap-2 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_#000000]"
              onClick={onWhatsApp}
              type="button"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.006.55 1.764.846 2.806.846 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.629-5.768-5.629zm3.42 8.167c-.145.405-.838.774-1.171.823-.334.05-.758.077-2.348-.544-1.905-.744-3.134-2.693-3.23-2.821-.095-.129-.769-1.023-.769-1.95 0-.928.486-1.385.66-1.575.174-.19.38-.238.508-.238.127 0 .253.002.365.008.117.005.274-.045.428.327.16.386.548 1.336.595 1.433.048.097.08.21.016.337-.064.127-.096.206-.191.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.388.111.19.493.813 1.058 1.317.728.648 1.341.85 1.531.945.19.096.302.08.413-.048.112-.127.477-.555.604-.746.127-.19.254-.159.429-.095.175.064 1.112.524 1.303.62.19.095.317.143.365.222.048.08.048.46-.097.865z" />
              </svg>
              <span>Pedir presupuesto por WhatsApp</span>
            </button>
            <a
              className="w-full sm:w-auto sm:px-6 min-h-[46px] bg-transparent hover:bg-white/5 text-white border border-[#D7DBDF] font-label-md text-label-md uppercase tracking-wider rounded-[4px] flex items-center justify-center active:translate-y-0.5 transition-all"
              href="#servicios"
            >
              Ver servicios y precios
            </a>
          </div>
        </div>

        <div className="relative w-full h-36 lg:h-[420px] rounded-[4px] overflow-hidden border border-white/10 mt-1 lg:mt-0">
          <img
            src={HERO_LOCAL}
            alt="Banco de trabajo del taller con herramientas"
            className="w-full h-full object-cover"
            onError={(e) => swapOnError(e, HERO_IMG)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1F24] via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2 font-badge-technical text-badge-technical text-slate-300 uppercase bg-[#1B1F24]/80 px-2 py-0.5 rounded-[2px] border border-white/10">
            Muelle 01 · Banco de centrado y ajuste
          </span>
        </div>
      </div>
    </section>
  )
}

function About() {
  const facts = [
    { icon: 'calendar_today', label: 'Trayectoria', value: 'Abierto desde 2019' },
    { icon: 'location_on', label: 'Localización', value: 'Barrio: Feria, Sevilla' },
    { icon: 'schedule', label: 'Disponibilidad', value: 'Lun–Vie 10:00–14:00 y 16:30–20:00 · Sáb 10:00–14:00' },
  ]

  return (
    <section
      id="nosotros"
      className={`scroll-mt-28 bg-[#F2F3F4] ${SECTION_PAD} py-8 lg:py-14 flex flex-col gap-5 border-b border-[#D7DBDF]`}
    >
      <div className={`${WRAP} flex flex-col gap-5 lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-10 lg:items-start`}>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[#C2410C]">
            <span className="material-symbols-outlined text-[18px]">build</span>
            <span className="font-badge-technical text-badge-technical uppercase tracking-widest text-[#1B1F24]">
              Mecánica de barrio
            </span>
          </div>
          <h2 className={`font-headline-lg-mobile text-headline-lg-mobile uppercase text-[#1B1F24] ${H2_DESKTOP}`}>
            Quién está detrás de las llaves
          </h2>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-[4px] border border-[#D7DBDF] flex flex-col gap-4">
          <p className={`font-body-md text-body-md text-[#1B1F24] leading-relaxed ${BODY_DESKTOP}`}>
            Llevamos desde 2019 en el mismo barrio, con el mismo criterio: si una
            reparación no está justificada, te lo decimos. No cambiamos piezas por
            vender recambios.
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1 lg:grid-cols-3 lg:pt-0">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-center gap-3 p-3 bg-[#F2F3F4] rounded-[4px] border border-[#D7DBDF]"
              >
                <span className="material-symbols-outlined text-[#C2410C] text-[22px]">
                  {fact.icon}
                </span>
                <div className="flex flex-col">
                  <span className="font-badge-technical text-badge-technical uppercase text-[#515659]">
                    {fact.label}
                  </span>
                  <span className="font-label-md text-label-md text-[#1B1F24] uppercase">
                    {fact.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section
      id="servicios"
      className={`scroll-mt-28 bg-white ${SECTION_PAD} py-8 lg:py-14 flex flex-col gap-5 border-b border-[#D7DBDF]`}
    >
      <div className={`${WRAP} flex flex-col gap-5`}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[#C2410C]">
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            <span className="font-badge-technical text-badge-technical uppercase tracking-widest text-[#1B1F24]">
              Tarifas directas
            </span>
          </div>
          <h2 className={`font-headline-lg-mobile text-headline-lg-mobile uppercase text-[#1B1F24] ${H2_DESKTOP}`}>
            Lo que hacemos, y lo que cuesta
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:items-start md:gap-3">
          {SERVICES.map((service) => (
            <article
              key={service.name}
              className="p-4 bg-white rounded-[4px] border border-[#D7DBDF] flex items-center justify-between gap-3 shadow-[1px_1px_0px_#D7DBDF]"
            >
              <div className="flex flex-col min-w-0 pr-2">
                <span className="font-headline-sm text-headline-sm uppercase text-[#1B1F24] tracking-tight">
                  {service.name}
                </span>
                <span className="font-body-sm text-body-sm text-[#515659] mt-0.5">
                  {service.note}
                </span>
              </div>
              <div className="shrink-0 text-right">
                <span className="font-price-callout text-price-callout text-[#C2410C] tracking-tight">
                  {service.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trust() {
  const points = [
    {
      title: 'Garantía por escrito',
      text: 'Si una reparación no te convence, la volvemos a hacer sin discutir. Si el problema vuelve a aparecer por nuestra parte, no te cobramos la segunda vez.',
    },
    {
      title: 'Precio cerrado antes de empezar',
      text: 'El precio que te damos antes de empezar es el precio que pagas. Sin sorpresas al recoger.',
    },
    {
      title: 'Desde 2019 en el mismo barrio',
      text: 'Llevamos desde 2019 en el mismo barrio, con el mismo criterio: si una reparación no está justificada, te lo decimos.',
    },
  ]

  return (
    <section
      id="confianza"
      className={`scroll-mt-28 bg-[#F2F3F4] ${SECTION_PAD} py-8 lg:py-14 flex flex-col gap-5 border-b border-[#D7DBDF]`}
    >
      <div className={`${WRAP} flex flex-col gap-5`}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[#27548D]">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="font-badge-technical text-badge-technical uppercase tracking-widest text-[#1B1F24]">
              Compromiso mecánico
            </span>
          </div>
          <h2 className={`font-headline-lg-mobile text-headline-lg-mobile uppercase text-[#1B1F24] ${H2_DESKTOP}`}>
            La garantía, escrita
          </h2>
        </div>

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:items-stretch">
          {points.map((point) => (
            <div
              key={point.title}
              className="bg-white p-4 lg:p-5 rounded-[4px] border-2 border-[#27548D] flex flex-col gap-2 shadow-[2px_2px_0px_rgba(39,84,141,0.15)]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#27548D]" />
                <span className="font-label-md text-label-md uppercase tracking-wider text-[#27548D]">
                  {point.title}
                </span>
              </div>
              <p className={`font-body-md text-body-md text-[#1B1F24] leading-snug ${BODY_DESKTOP}`}>
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location({ onWhatsApp }) {
  return (
    <section
      id="ubicacion"
      className={`scroll-mt-28 bg-white ${SECTION_PAD} py-8 lg:py-14 flex flex-col gap-5 border-b border-[#D7DBDF]`}
    >
      <div className={`${WRAP} flex flex-col gap-5`}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[#C2410C]">
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            <span className="font-badge-technical text-badge-technical uppercase tracking-widest text-[#1B1F24]">
              Punto de entrega
            </span>
          </div>
          <h2 className={`font-headline-lg-mobile text-headline-lg-mobile uppercase text-[#1B1F24] ${H2_DESKTOP}`}>
            Ubicación
          </h2>
        </div>

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">
          <div className="flex flex-col gap-3">
            <div className="p-3.5 bg-[#F2F3F4] rounded-[4px] border border-[#D7DBDF] flex items-center gap-3">
              <span className="material-symbols-outlined text-[#C2410C] text-[24px]">
                pin_drop
              </span>
              <div className="flex flex-col">
                <span className="font-badge-technical text-badge-technical uppercase text-[#515659]">
                  Dirección taller
                </span>
                <span className="font-headline-sm text-headline-sm uppercase text-[#1B1F24]">
                  {BUSINESS.address} · {BUSINESS.city}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-[#F2F3F4] rounded-[4px] border border-[#D7DBDF] flex flex-col gap-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#D7DBDF]">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#1B1F24] font-bold">
                  Horario de apertura
                </span>
                <span className="font-badge-technical text-badge-technical text-[#27548D] uppercase">
                  Taller activo
                </span>
              </div>
              <div className="flex flex-col gap-1 font-body-sm text-body-sm text-[#1B1F24]">
                <div className="flex justify-between items-center py-0.5">
                  <span className="font-medium">Lun–Vie:</span>
                  <span>9:30–14:00 / 16:30–20:00</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-t border-[#D7DBDF]/60">
                  <span className="font-medium">Sáb:</span>
                  <span>10:00–14:00</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-t border-[#D7DBDF]/60 text-[#515659]">
                  <span className="font-medium">Dom:</span>
                  <span className="font-bold uppercase text-error">cerrado</span>
                </div>
              </div>
            </div>

            <a
              className="p-3.5 bg-white rounded-[4px] border border-[#1B1F24] flex items-center justify-between active:bg-[#F2F3F4] transition-colors"
              href={`tel:${BUSINESS.phoneHref}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#1B1F24] text-[22px]">
                  call
                </span>
                <span className="font-label-md text-label-md uppercase text-[#1B1F24]">
                  Teléfono de taller:
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-[#1B1F24] font-bold tracking-tight">
                {BUSINESS.phoneDisplay}
              </span>
            </a>

            <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
              <button
                className="w-full min-h-[46px] bg-[#C2410C] hover:bg-[#9A3412] text-white font-label-md text-label-md uppercase tracking-wider rounded-[4px] flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
                onClick={onWhatsApp}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Escribir por WhatsApp</span>
              </button>
              <a
                className="w-full min-h-[46px] bg-white hover:bg-[#F2F3F4] text-[#27548D] border-2 border-[#27548D] font-label-md text-label-md uppercase tracking-wider rounded-[4px] flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">directions</span>
                <span>Cómo llegar</span>
              </a>
            </div>
          </div>

          <div className="w-full h-48 lg:h-[440px] rounded-[4px] border border-[#D7DBDF] relative overflow-hidden mt-1 lg:mt-0">
            <img
              src={MAP_LOCAL}
              alt="Exterior del taller en Calle Feria, Sevilla"
              className="w-full h-full object-cover"
              onError={(e) => swapOnError(e, MAP_IMG)}
            />
            <div className="absolute bottom-2 left-2 bg-[#1B1F24] text-white px-2 py-1 rounded-[2px] border border-white/20 font-badge-technical text-badge-technical uppercase flex items-center gap-1.5 shadow">
              <span className="w-2 h-2 bg-[#C2410C] rounded-full" />
              <span>Coord: 37.3995° N, 5.9902° W · Calle Feria</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExtraForm() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [popover, setPopover] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    tipoBici: 'Ciudad',
    necesita: '',
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
      tipoBici: 'Carretera',
      necesita:
        'Crujido en el eje del pedalier al pedalear fuerte en subida y desajuste en el piñón pequeño.',
      telefono: '600 000 000',
    })
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.telefono && !/^6\d{2} \d{3} \d{3}$/.test(form.telefono)) {
      setError('El teléfono debe tener el formato 6XX XXX XXX.')
      return
    }
    setError('')
    setStatus('loading')
    window.setTimeout(() => {
      setStatus('success')
      const box = document.getElementById('demo-feedback')
      if (box) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 900)
  }

  return (
    <section className={`bg-[#F2F3F4] ${SECTION_PAD} py-8 lg:py-14 flex flex-col gap-4 border-b border-[#D7DBDF]`}>
      <div className={`${WRAP} flex flex-col gap-4`}>
        <div className="flex items-center justify-between">
          <span className="font-badge-technical text-badge-technical uppercase tracking-widest text-white bg-[#1B1F24] px-2 py-0.5 rounded-[2px] border border-[#1B1F24]">
            Extra · a presupuestar
          </span>

          <div className="relative inline-block">
            <button
              aria-label="Información del extra"
              className="text-[#515659] hover:text-[#1B1F24] flex items-center justify-center"
              title="No viene incluido en tu nivel: el contacto es WhatsApp. Pídenoslo como extra."
              type="button"
              onClick={() => setPopover(!popover)}
            >
              <span className="material-symbols-outlined text-[20px]">info</span>
            </button>

            {popover && (
              <div className="absolute right-0 top-6 z-20 w-64 bg-[#1B1F24] text-white p-2.5 rounded-[4px] shadow-lg border border-white/10 font-body-sm text-body-sm">
                <strong className="block mb-1 font-semibold">
                  El formulario no va incluido en este nivel.
                </strong>
                El contacto de esta landing es un botón de WhatsApp: te escriben y
                presupuesto ahí mismo, sin esperas. Un formulario te obligaría a
                redactar tu propia política de privacidad y la de cookies, y a
                mantenerlas al día cada vez que cambies algo. Si lo quieres, es un
                extra: tú nos das el texto legal redactado y nosotros lo montamos.
                Esto es una demo de cómo se vería.
              </div>
            )}
          </div>
        </div>

        <div className="p-3 bg-white rounded-[4px] border-l-4 border-[#C2410C] border-y border-r border-[#D7DBDF] flex items-start gap-2 shadow-[1px_1px_0px_#D7DBDF] max-w-[880px]">
          <span className="material-symbols-outlined text-[#C2410C] text-[18px] shrink-0 mt-0.5">
            warning
          </span>
          <p className="font-body-sm text-body-sm text-[#1B1F24] font-medium">
            Demostración. Este formulario no envía nada a ningún sitio.
          </p>
        </div>

        <form
          className="bg-white p-4 lg:p-6 rounded-[4px] border border-[#D7DBDF] flex flex-col gap-3.5 shadow-[1px_1px_0px_#D7DBDF] max-w-[880px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:gap-4 md:items-start">
            <div className="flex flex-col gap-1">
              <label
                className="font-label-sm text-label-sm uppercase text-[#1B1F24] tracking-wider font-bold"
                htmlFor="input-nombre"
              >
                Nombre
              </label>
              <input
                className="w-full bg-white border border-[#D7DBDF] rounded-[4px] px-3 py-2.5 font-body-md text-body-md text-[#1B1F24] focus:outline-none focus:border-[#1B1F24]"
                id="input-nombre"
                name="nombre"
                placeholder="Tu nombre o apodo"
                type="text"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="font-label-sm text-label-sm uppercase text-[#1B1F24] tracking-wider font-bold"
                htmlFor="select-tipo"
              >
                Tipo de bici
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white border border-[#D7DBDF] rounded-[4px] px-3 py-2.5 font-body-md text-body-md text-[#1B1F24] focus:outline-none focus:border-[#1B1F24] appearance-none pr-8"
                  id="select-tipo"
                  name="tipoBici"
                  value={form.tipoBici}
                  onChange={handleChange}
                >
                  {BIKE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-3 text-[#515659] pointer-events-none text-[20px]">
                  arrow_drop_down
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="font-label-sm text-label-sm uppercase text-[#1B1F24] tracking-wider font-bold"
              htmlFor="textarea-necesidad"
            >
              Qué necesita
            </label>
            <textarea
              className="w-full bg-white border border-[#D7DBDF] rounded-[4px] px-3 py-2 font-body-md text-body-md text-[#1B1F24] focus:outline-none focus:border-[#1B1F24] resize-none"
              id="textarea-necesidad"
              name="necesita"
              placeholder="Describe el ruido o la avería..."
              rows={3}
              value={form.necesita}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1 md:max-w-[50%]">
            <div className="flex justify-between items-center">
              <label
                className="font-label-sm text-label-sm uppercase text-[#1B1F24] tracking-wider font-bold"
                htmlFor="input-tel"
              >
                Teléfono
              </label>
              <span className="font-badge-technical text-badge-technical uppercase text-[#515659]">
                (opcional)
              </span>
            </div>
            <input
              className="w-full bg-white border border-[#D7DBDF] rounded-[4px] px-3 py-2.5 font-body-md text-body-md text-[#1B1F24] focus:outline-none focus:border-[#1B1F24]"
              id="input-tel"
              name="telefono"
              inputMode="numeric"
              placeholder="6XX XXX XXX"
              type="tel"
              value={form.telefono}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="font-body-sm text-body-sm text-error font-medium" role="alert">
              {error}
            </p>
          )}

          <button
            className="w-full min-h-[38px] bg-[#F2F3F4] hover:bg-[#ebeef5] text-[#1B1F24] border border-[#D7DBDF] font-label-sm text-label-sm uppercase tracking-wider rounded-[4px] flex items-center justify-center gap-1.5 transition-colors active:translate-y-0.5 md:self-start md:w-auto md:px-5"
            onClick={fillExample}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            <span>Rellenar con datos de ejemplo</span>
          </button>

          <button
            className="w-full min-h-[46px] bg-[#C2410C] hover:bg-[#9A3412] text-white font-label-md text-label-md uppercase tracking-wider rounded-[4px] flex items-center justify-center gap-2 transition-all active:translate-y-0.5 shadow-[2px_2px_0px_#1B1F24] disabled:opacity-70 disabled:cursor-wait md:self-start md:w-auto md:px-8"
            type="submit"
            disabled={status === 'loading' || status === 'success'}
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>
              {status === 'loading'
                ? 'Enviando…'
                : status === 'success'
                  ? 'Solicitud enviada'
                  : 'Solicitar valoración previa'}
            </span>
          </button>

          {status === 'success' && (
            <div
              className="p-3 bg-[#1B1F24] text-white rounded-[4px] border border-[#C2410C] flex flex-col gap-1"
              id="demo-feedback"
              role="status"
            >
              <div className="flex items-center gap-1.5 text-[#C2410C]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                  Estado del sistema
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-slate-200">
                <strong className="text-white">Esto es una demostración.</strong>{' '}
                Así se vería la confirmación si el formulario estuviera activo.{' '}
                <strong className="text-white">No hemos recibido nada.</strong>
              </p>
              <button
                className="mt-1 self-start font-label-sm text-label-sm uppercase tracking-wider text-[#C2410C] hover:text-white transition-colors"
                type="button"
                onClick={() => {
                  setStatus('idle')
                  setForm({
                    nombre: '',
                    tipoBici: 'Ciudad',
                    necesita: '',
                    telefono: '',
                  })
                }}
              >
                Rellenar otra vez →
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Footer({ onWhatsApp }) {
  return (
    <footer className={`bg-[#1B1F24] text-white ${SECTION_PAD} pt-8 pb-16 flex flex-col gap-6`}>
      <div className={`${WRAP} flex flex-col gap-6`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-2 pb-5 border-b border-white/10 lg:pb-0 lg:border-b-0 lg:max-w-[460px]">
            <span className="font-headline-md text-headline-md uppercase text-white tracking-tight">
              {BUSINESS.name}
            </span>
            <p className="font-body-sm text-body-sm text-slate-300">
              {BUSINESS.address}, {BUSINESS.city} · Tel.{' '}
              <a className="underline text-[#C2410C]" href={`tel:${BUSINESS.phoneHref}`}>
                {BUSINESS.phoneDisplay}
              </a>
            </p>
            <span className="font-badge-technical text-badge-technical uppercase text-slate-400">
              Mecánica artesanal de bicicletas sin intermediarios
            </span>
          </div>

          <div className="bg-black/30 p-4 rounded-[4px] border border-white/10 flex flex-col gap-3 lg:w-[600px] lg:shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 flex-wrap gap-2">
              <span className="font-label-md text-label-md uppercase text-[#C2410C] font-bold">
                CUSTOM Basic
              </span>
              <span className="font-badge-technical text-badge-technical uppercase text-white bg-white/10 px-2 py-0.5 rounded-[2px]">
                149 € + 19 €/mes
              </span>
            </div>

            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-slate-300">
              <p>
                <strong className="text-white font-medium">Incluye:</strong> 5
                secciones, hero con WhatsApp, sobre nosotros, servicios, confianza,
                ubicación, hosting, responsive, SEO básico, 1 ronda de cambios.
              </p>
              <p className="text-slate-400">
                <strong className="text-slate-300 font-medium">No incluye:</strong>{' '}
                galería y FAQ → Custom Pro (+100 €) · formulario → extra, a
                presupuestar · blog y aviso legal → Premium
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
              <a
                className="font-label-md text-label-md uppercase text-[#C2410C] hover:text-white transition-colors flex items-center gap-2"
                href="https://cat-code-hdz.github.io/casa-nora/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>¿Ver el siguiente nivel? → Casa Nora</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <button
                className="font-label-sm text-label-sm uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                onClick={onWhatsApp}
                type="button"
              >
                Escribir por WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 flex-wrap font-body-sm text-body-sm text-slate-400">
          <span>© 2026 Taller Recambios · Demo de portafolio de CAT CODE</span>
          <span className="font-badge-technical text-badge-technical uppercase">
            Personaje de una demo de portafolio de CAT CODE
          </span>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppFab({ onWhatsApp }) {
  return (
    <div className="fixed bottom-6 right-4 z-40 flex items-center gap-2">
      <div className="bg-[#1B1F24] text-white px-2 py-1 rounded-[4px] border border-white/20 shadow-md font-badge-technical text-badge-technical uppercase tracking-wider hidden sm:block">
        Escríbenos
      </div>
      <button
        aria-label="Escríbenos por WhatsApp"
        className="w-12 h-12 bg-[#25D366] text-[#0b3319] rounded-[6px] flex items-center justify-center shadow-[2px_2px_0px_#1B1F24] active:scale-95 transition-transform hover:bg-[#20ba59]"
        onClick={onWhatsApp}
        type="button"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.006.55 1.764.846 2.806.846 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.629-5.768-5.629zm3.42 8.167c-.145.405-.838.774-1.171.823-.334.05-.758.077-2.348-.544-1.905-.744-3.134-2.693-3.23-2.821-.095-.129-.769-1.023-.769-1.95 0-.928.486-1.385.66-1.575.174-.19.38-.238.508-.238.127 0 .253.002.365.008.117.005.274-.045.428.327.16.386.548 1.336.595 1.433.048.097.08.21.016.337-.064.127-.096.206-.191.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.388.111.19.493.813 1.058 1.317.728.648 1.341.85 1.531.945.19.096.302.08.413-.048.112-.127.477-.555.604-.746.127-.19.254-.159.429-.095.175.064 1.112.524 1.303.62.19.095.317.143.365.222.048.08.048.46-.097.865z" />
        </svg>
      </button>
    </div>
  )
}

export default function App() {
  const { send, Toast } = useWhatsApp()

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-28 pb-16 bg-surface min-h-screen">
        <Hero onWhatsApp={() => send(WHATSAPP_MSG)} />
        <About />
        <Services />
        <Trust />
        <Location onWhatsApp={() => send(WHATSAPP_MSG)} />
        <ExtraForm />
        <Footer onWhatsApp={() => send(WHATSAPP_MSG)} />
      </main>
      <WhatsAppFab onWhatsApp={() => send(WHATSAPP_MSG)} />
      {Toast}
    </>
  )
}
