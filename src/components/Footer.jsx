import { Globe, Share2, Mail, ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  const navCols = [
    {
      title: 'Produit',
      links: [
        { label: 'Fonctionnalités', href: '#features' },
        { label: 'Tarification',   href: '#pricing' },
        { label: 'Télécharger',    href: '#pricing' },
        { label: 'Mises à jour',   href: '#' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos',       href: '#' },
        { label: 'Blog',           href: '#' },
        { label: 'Contact',        href: '#' },
        { label: 'Partenariats',   href: '#' },
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

            {/* App store badges */}
            <div className="flex flex-wrap gap-3 mt-6">
              {['App Store', 'Google Play'].map(store => (
                <a
                  key={store}
                  href="#"
                  className="btn-magnetic inline-flex items-center gap-2 border border-baa-cream/15
                    text-baa-cream/60 hover:text-baa-cream hover:border-baa-cream/30
                    text-xs font-mono px-4 py-2.5 rounded-2xl transition-colors"
                >
                  <span className="btn-bg-slide bg-baa-terracotta/10 rounded-2xl" />
                  <ExternalLink size={12} />
                  <span>{store}</span>
                </a>
              ))}
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
