export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false'
export const WHATSAPP_DEMO_NUMBER = import.meta.env.VITE_WHATSAPP_DEMO_NUMBER || ''

export function createWhatsAppUrl(message) {
  const number = WHATSAPP_DEMO_NUMBER.replace(/\D/g, '')
  if (DEMO_MODE || !number) return null
  const text = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${text}`
}

export function openWhatsAppOrDemo(message) {
  const url = createWhatsAppUrl(message)
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
    return true
  }
  return false
}
