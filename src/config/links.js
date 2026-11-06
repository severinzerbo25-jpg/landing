// Constantes de redirection officielles Baarasobè
export const LOGIN_URL = 'https://baarasobe1.vercel.app/login'
export const WHATSAPP_PHONE = '22644559048' // Format international sans '+' pour wa.me

// Liens WhatsApp avec messages pré-remplis encodés
export const WHATSAPP_SUPPORT_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  'Bonjour, je souhaite en savoir plus sur l\'application Baarasobé.'
)}`

export const WHATSAPP_LINK_REQUEST_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  'Bonjour, je souhaite recevoir le lien direct pour télécharger et accéder à l\'application Baarasobè.'
)}`

// URL de téléchargement direct de l'APK (ou fallback sur l'app web / build APK)
export const APK_DOWNLOAD_URL = 'https://baarasobe1.vercel.app/baarasobe.apk'

