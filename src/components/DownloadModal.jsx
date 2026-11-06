import { X, Smartphone, Download, MessageCircle, ShieldCheck } from 'lucide-react'
import { APK_DOWNLOAD_URL, WHATSAPP_LINK_REQUEST_URL } from '../config/links'

export default function DownloadModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop flouté */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-baa-night/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Boîte de dialogue */}
      <div className="relative w-full max-w-md bg-white rounded-5xl border border-baa-terracotta/20 shadow-2xl p-6 md:p-8 z-10 overflow-hidden">
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-baa-cream flex items-center justify-center text-baa-charcoal hover:bg-baa-salmon hover:text-baa-terracotta transition-colors"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        {/* En-tête modal */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-baa-terracotta/15 flex items-center justify-center text-baa-terracotta flex-shrink-0">
            <Smartphone size={20} />
          </div>
          <div>
            <span className="font-mono text-[11px] text-baa-terracotta uppercase tracking-widest font-semibold">
              Installation Directe
            </span>
            <h3 className="font-serif italic font-bold text-baa-charcoal text-2xl">
              Télécharger l'APK
            </h3>
          </div>
        </div>

        <p className="text-sm text-baa-muted mb-6 leading-relaxed font-light">
          Installez Baarasobè directement sur votre téléphone Android. Fonctionne à 100% hors-ligne.
        </p>

        {/* Bouton Unique : Télécharger l'APK */}
        <div className="space-y-4">
          <a
            href={APK_DOWNLOAD_URL}
            download="baarasobe.apk"
            className="btn-magnetic w-full py-4 px-5 bg-baa-terracotta text-white rounded-2xl font-bold text-sm flex items-center justify-between shadow-lg shadow-baa-terracotta/25 hover:bg-baa-night transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Download size={19} />
              <span>Télécharger l'APK</span>
            </div>
            <span className="text-xs font-mono opacity-85 bg-white/20 px-2.5 py-0.5 rounded-full">
              APK Direct
            </span>
          </a>

          {/* Option WhatsApp pour recevoir le lien */}
          <div className="mt-5 pt-5 border-t border-black/5">
            <p className="text-xs font-sans text-baa-muted mb-3 font-light leading-relaxed">
              Vous préférez recevoir le lien de téléchargement directement sur votre téléphone ?
            </p>
            <a
              href={WHATSAPP_LINK_REQUEST_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 border border-[#25D366]/30 bg-[#25D366]/10 text-green-800 rounded-2xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle size={16} className="text-[#25D366]" />
              <span>Recevoir le lien par WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Badge sécurité */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-baa-muted font-light">
          <ShieldCheck size={13} className="text-green-600" />
          <span>Fichier APK officiel, garanti sans virus</span>
        </div>
      </div>
    </div>
  )
}
