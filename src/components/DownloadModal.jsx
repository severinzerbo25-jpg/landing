import { useState } from 'react'
import { X, Smartphone, ArrowRight, CheckCircle2, ShieldCheck, Download, Sparkles } from 'lucide-react'

export default function DownloadModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('android')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [sent, setSent] = useState(false)

  if (!isOpen) return null

  const handleSendLink = (e) => {
    e.preventDefault()
    if (!phoneNumber) return
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setPhoneNumber('')
      onClose()
    }, 2800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-baa-night/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-5xl border border-baa-terracotta/20 shadow-2xl p-6 md:p-8 z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-baa-cream flex items-center justify-center text-baa-charcoal hover:bg-baa-salmon hover:text-baa-terracotta transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-baa-terracotta/15 flex items-center justify-center text-baa-terracotta">
            <Smartphone size={20} />
          </div>
          <div>
            <span className="font-mono text-[11px] text-baa-terracotta uppercase tracking-widest font-semibold">
              Accès Immédiat
            </span>
            <h3 className="font-serif italic font-bold text-baa-charcoal text-2xl">
              Télécharger Baarasobè
            </h3>
          </div>
        </div>

        <p className="text-sm text-baa-muted mb-6 leading-relaxed font-light">
          Disponible sur Android (APK direct & Google Play) et iOS. Choisissez votre méthode de téléchargement.
        </p>

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-baa-cream rounded-2xl mb-6">
          <button
            onClick={() => setActiveTab('android')}
            className={`py-2 text-xs font-mono font-medium rounded-xl transition-all ${
              activeTab === 'android'
                ? 'bg-white text-baa-terracotta shadow-sm font-bold'
                : 'text-baa-muted hover:text-baa-charcoal'
            }`}
          >
            🤖 Android (APK & Play)
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`py-2 text-xs font-mono font-medium rounded-xl transition-all ${
              activeTab === 'ios'
                ? 'bg-white text-baa-terracotta shadow-sm font-bold'
                : 'text-baa-muted hover:text-baa-charcoal'
            }`}
          >
            🍏 Apple iOS
          </button>
        </div>

        {/* Content Tab Android */}
        {activeTab === 'android' && (
          <div className="space-y-4">
            <a
              href="#apk-download"
              onClick={() => alert("Le téléchargement de Baarasobè APK v2.0 démarrera ici.")}
              className="btn-magnetic w-full py-3.5 px-5 bg-baa-terracotta text-white rounded-2xl font-semibold text-sm flex items-center justify-between shadow-md shadow-baa-terracotta/20"
            >
              <div className="flex items-center gap-2.5">
                <Download size={18} />
                <span>Télécharger l'APK Direct (v2.0)</span>
              </div>
              <span className="text-xs font-mono opacity-80">28 Mo</span>
            </a>

            <a
              href="https://play.google.com"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-5 border border-baa-terracotta/20 rounded-2xl font-medium text-xs text-baa-charcoal flex items-center justify-between hover:bg-baa-cream transition-colors"
            >
              <span>Ouvrir sur le Google Play Store</span>
              <ArrowRight size={14} className="text-baa-terracotta" />
            </a>
          </div>
        )}

        {/* Content Tab iOS */}
        {activeTab === 'ios' && (
          <div className="space-y-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noreferrer"
              className="btn-magnetic w-full py-3.5 px-5 bg-baa-night text-white rounded-2xl font-semibold text-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Download size={18} />
                <span>Installer via l'App Store</span>
              </div>
              <ArrowRight size={16} />
            </a>
            <p className="text-[11px] text-baa-muted text-center font-light">
              Nécessite iOS 15.0 ou une version ultérieure.
            </p>
          </div>
        )}

        {/* SMS / WhatsApp Direct Link option */}
        <div className="mt-6 pt-5 border-t border-black/5">
          <p className="text-xs font-mono text-baa-charcoal font-medium mb-3">
            📲 Recevoir le lien par SMS ou WhatsApp :
          </p>
          {sent ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-2 text-green-700 text-xs font-medium">
              <CheckCircle2 size={16} />
              <span>Lien envoyé avec succès sur votre numéro !</span>
            </div>
          ) : (
            <form onSubmit={handleSendLink} className="flex gap-2">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+226 / +225 / +223..."
                className="flex-1 px-4 py-2.5 bg-baa-cream rounded-xl text-xs font-mono border border-baa-terracotta/15 focus:outline-none focus:border-baa-terracotta"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-baa-terracotta text-white rounded-xl text-xs font-semibold hover:bg-baa-night transition-colors"
              >
                Envoyer
              </button>
            </form>
          )}
        </div>

        {/* Security badge */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-baa-muted font-light">
          <ShieldCheck size={13} className="text-green-600" />
          <span>Fichier vérifié, garanti sans logiciel malveillant</span>
        </div>
      </div>
    </div>
  )
}

