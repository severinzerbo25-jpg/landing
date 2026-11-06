import { Globe, Share2, Mail, Download, MessageCircle, ExternalLink } from 'lucide-react'
import { LOGIN_URL, WHATSAPP_SUPPORT_URL } from '../config/links'

export default function Footer({ onOpenDownload }) {
  const year = new Date().getFullYear()

  const navCols = [
    {
      title: 'Produit',
      links: [
        { label: 'Connexion Atelier', href: LOGIN_URL },
        { label: 'Fonctionnalités',   href: '#features' },
        { label: 'Pourquoi Baarasobè',href: '#philosophy' },
        { label: 'Tarification',      href: '#pricing' },
      ],
    },
    {
      title: 'Assistance & Contact',
      links: [
        { label: 'Support WhatsApp (+226)', href: WHATSAPP_SUPPORT_URL, external: true },
        { label: 'Questions fréquentes',    href: '#faq' },
        { label: 'Télécharger l\'APK',      href: '#download', onClick: onOpenDownload },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Confidentialité', href: '#' },
        { label: 'Conditions',      href: '#' },
        { label: 'Cookies',         href: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-baa-night rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden">

      {/* Top section */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 md:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-baa-terracotta flex items-center justify-center shadow-lg">
                <span className="font-serif text-white font-bold text-sm italic">B</span>
              </div>
              <span className="font-sans font-bold text-baa-cream text-lg tracking-tight">
                Baarasobe
              </span>
            </div>

            <p className="text-baa-cream/40 text-sm leading-relaxed font-light max-w-xs">
              L'atelier numérique pour les tailleurs africains.
              Gérez, encaissez, grandissez — depuis votre téléphone.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                              { icon: <Globe  size={16} />, href: '#', label: 'Instagram' },
                { icon: <Share2 size={16} />, href: '#', label: 'Twitter' },
                { icon: <Mail  size={16} />, href: '#', label: 'Email' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="link-lift w-9 h-9 rounded-2xl border border-baa-cream/10 flex items-center
                    justify-center text-baa-cream/40 hover:text-baa-terracotta hover:border-baa-terracotta/30
                    transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Bouton Télécharger APK Direct & WhatsApp Support */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={onOpenDownload}
                className="btn-magnetic inline-flex items-center gap-2 bg-baa-terracotta text-white text-xs font-mono px-4 py-2.5 rounded-2xl transition-colors shadow-sm"
              >
                <Download size={13} />
                <span>Télécharger l'APK</span>
              </button>

              <a
                href={WHATSAPP_SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-magnetic inline-flex items-center gap-2 border border-[#25D366]/40 bg-[#25D366]/10 text-green-300 hover:text-green-200 text-xs font-mono px-4 py-2.5 rounded-2xl transition-colors"
              >
                <MessageCircle size={13} className="text-[#25D366]" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map(col => (
            <div key={col.title}>
              <h4 className="font-mono text-xs text-baa-cream/35 uppercase tracking-widest mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="link-lift text-sm text-baa-cream/50 hover:text-baa-terracotta transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-baa-cream/8 mx-8 md:mx-16">
        <div className="max-w-7xl mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* System status */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-baa-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-baa-success" />
            </div>
            <span className="font-mono text-xs text-baa-cream/35 uppercase tracking-wider">
              Système Opérationnel
            </span>
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-baa-cream/25">
            © {year} Baarasobe · Tous droits réservés
          </p>

          {/* Version */}
          <span className="font-mono text-xs text-baa-cream/20">
            v2.0.0
          </span>
        </div>
      </div>
    </footer>
  )
}
