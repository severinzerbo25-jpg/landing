import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Download, LogIn, X, Menu } from 'lucide-react'
import { LOGIN_URL } from '../config/links'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Aperçu',        href: '#app-preview',  section: 'app-preview'  },
  { label: 'Fonctionnalités', href: '#features',   section: 'features'     },
  { label: 'Philosophie',   href: '#philosophy',    section: 'philosophy'   },
  { label: 'Tarifs',        href: '#pricing',       section: 'pricing'      },
  { label: 'Avis & FAQ',    href: '#faq',           section: 'faq'          },
]

export default function Navbar({ onOpenDownload }) {
  const navRef      = useRef(null)
  const [scrollY, setScrollY]       = useState(0)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('')

  /* ─── Suivi du scroll ─────────────────────────────────────────── */
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)

    // Détection de section active
    const sections = NAV_LINKS.map(l => ({
      id: l.section,
      el: document.getElementById(l.section),
    })).filter(s => s.el)

    let current = ''
    for (const { id, el } of sections) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) current = id
    }
    setActiveSection(current)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /* ─── Animation d'entrée ──────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0,   opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
    })
    return () => ctx.revert()
  }, [])

  /* ─── Fermer menu mobile au redimensionnement ─────────────────── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* ─── Bloquer le scroll page quand menu mobile ouvert ────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ─── Variables de style selon le scroll ─────────────────────── */
  // On applique toujours un fond semi-transparent + blur, plus ou moins prononcé
  const atTop      = scrollY < 60
  const glassBg    = atTop
    ? 'bg-baa-night/40 border-white/8'
    : 'bg-baa-cream/80 border-baa-terracotta/12'
  const textColor  = atTop ? 'text-white/85' : 'text-baa-charcoal'
  const mutedColor = atTop ? 'text-white/55' : 'text-baa-muted'
  const hoverColor = atTop ? 'hover:text-white' : 'hover:text-baa-terracotta'

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          NAVBAR DESKTOP
      ══════════════════════════════════════════════════════════ */}
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Navigation principale"
        className={`
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          w-[calc(100%-2rem)] max-w-5xl
          ${glassBg}
          backdrop-blur-2xl
          border
          rounded-full
          px-4 py-2.5
          shadow-[0_8px_32px_rgba(0,0,0,0.18)]
          transition-all duration-500 ease-out
        `}
      >
        <div className="flex items-center justify-between gap-4">

          {/* Logo ──────────────────────────────────────────────── */}
          <a
            href="#"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="Baarasobè — retour en haut"
          >
            <div className={`
              w-8 h-8 rounded-xl flex items-center justify-center shadow-md
              transition-all duration-300
              ${atTop ? 'bg-baa-terracotta' : 'bg-baa-night'}
              group-hover:scale-105
            `}>
              <span className="font-serif text-white font-bold text-sm italic">B</span>
            </div>
            <span className={`
              font-sans font-bold text-sm tracking-tight
              transition-colors duration-300
              ${textColor}
            `}>
              Baarasobè
            </span>
          </a>

          {/* Liens Desktop ─────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => {
              const isActive = activeSection === l.section
              return (
                <a
                  key={l.label}
                  href={l.href}
                  className={`
                    relative px-3.5 py-1.5 rounded-full text-xs font-semibold
                    transition-all duration-200
                    ${isActive
                      ? atTop
                        ? 'bg-white/15 text-white'
                        : 'bg-baa-terracotta/10 text-baa-terracotta'
                      : `${mutedColor} ${hoverColor} hover:bg-white/8`
                    }
                  `}
                >
                  {l.label}
                  {/* Indicateur de section active */}
                  {isActive && (
                    <span className={`
                      absolute bottom-0.5 left-1/2 -translate-x-1/2
                      w-1 h-1 rounded-full
                      ${atTop ? 'bg-white' : 'bg-baa-terracotta'}
                    `} />
                  )}
                </a>
              )
            })}
          </div>

          {/* Boutons d'action Desktop ──────────────────────────── */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {/* Connexion */}
            <a
              href={LOGIN_URL}
              className={`
                flex items-center gap-1.5
                text-xs font-semibold px-3.5 py-2 rounded-full border
                transition-all duration-200
                ${atTop
                  ? 'border-white/20 text-white/85 hover:bg-white/12 hover:border-white/30'
                  : 'border-baa-terracotta/25 text-baa-charcoal hover:bg-baa-terracotta/8 hover:border-baa-terracotta/40'
                }
              `}
            >
              <LogIn size={13} strokeWidth={2.2} />
              <span>Connexion</span>
            </a>

            {/* Télécharger */}
            <button
              onClick={onOpenDownload}
              className="
                flex items-center gap-1.5
                bg-baa-terracotta text-white
                text-xs font-bold px-4 py-2 rounded-full
                shadow-md shadow-baa-terracotta/30
                hover:bg-baa-night hover:shadow-baa-night/30
                active:scale-95
                transition-all duration-200
              "
            >
              <Download size={13} strokeWidth={2.2} />
              <span>Télécharger</span>
            </button>
          </div>

          {/* Burger mobile ─────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className={`
              md:hidden relative z-10
              w-9 h-9 flex items-center justify-center rounded-xl
              transition-all duration-200
              ${atTop
                ? 'text-white hover:bg-white/10'
                : 'text-baa-charcoal hover:bg-baa-terracotta/10'
              }
            `}
          >
            {menuOpen
              ? <X size={18} strokeWidth={2.5} />
              : <Menu size={18} strokeWidth={2.5} />
            }
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          MENU MOBILE — Overlay plein écran
      ══════════════════════════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`
          fixed inset-0 z-40 bg-baa-night/60 backdrop-blur-sm
          transition-opacity duration-300
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* Panel mobile */}
      <div className={`
        fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw]
        bg-baa-cream border-l border-baa-terracotta/10
        shadow-2xl
        flex flex-col
        transition-transform duration-400 ease-out
        ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* En-tête panel mobile */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-baa-terracotta/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-baa-night flex items-center justify-center">
              <span className="font-serif text-white font-bold text-sm italic">B</span>
            </div>
            <span className="font-sans font-bold text-baa-charcoal text-sm tracking-tight">
              Baarasobè
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-baa-muted hover:bg-baa-terracotta/10 hover:text-baa-terracotta transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation links mobile */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <p className="font-mono text-[10px] text-baa-muted uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
          <ul className="space-y-1">
            {NAV_LINKS.map(l => {
              const isActive = activeSection === l.section
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-2xl
                      text-sm font-semibold transition-all duration-200
                      ${isActive
                        ? 'bg-baa-terracotta/10 text-baa-terracotta'
                        : 'text-baa-charcoal hover:bg-baa-terracotta/5 hover:text-baa-terracotta'
                      }
                    `}
                  >
                    {/* Pastille active */}
                    <span className={`
                      w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors
                      ${isActive ? 'bg-baa-terracotta' : 'bg-baa-terracotta/20'}
                    `} />
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Séparateur */}
          <div className="my-5 mx-3 border-t border-baa-terracotta/10" />

          {/* CTA mobile */}
          <div className="px-1 space-y-3">
            <a
              href={LOGIN_URL}
              onClick={() => setMenuOpen(false)}
              className="
                flex items-center justify-center gap-2
                w-full py-3 px-5 rounded-2xl
                border border-baa-terracotta/25
                text-baa-charcoal text-sm font-semibold
                hover:bg-baa-terracotta/5
                transition-colors duration-200
              "
            >
              <LogIn size={16} />
              <span>Connexion à l'Atelier</span>
            </a>

            <button
              onClick={() => { setMenuOpen(false); onOpenDownload?.() }}
              className="
                flex items-center justify-center gap-2
                w-full py-3 px-5 rounded-2xl
                bg-baa-terracotta text-white
                text-sm font-bold
                shadow-md shadow-baa-terracotta/25
                hover:bg-baa-night
                active:scale-[0.98]
                transition-all duration-200
              "
            >
              <Download size={16} />
              <span>Télécharger l'APK</span>
            </button>
          </div>
        </nav>

        {/* Pied du panel */}
        <div className="px-6 py-4 border-t border-baa-terracotta/10">
          <p className="font-mono text-[10px] text-baa-muted/60 text-center">
            © 2026 Baarasobè · Atelier numérique
          </p>
        </div>
      </div>
    </>
  )
}
