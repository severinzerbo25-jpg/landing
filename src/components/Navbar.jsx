import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Smartphone } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar({ onOpenDownload }) {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      })
    })

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const links = [
    { label: 'Aperçu App',     href: '#app-preview' },
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Pourquoi Baarasobè', href: '#philosophy' },
    { label: 'Tarifs',         href: '#pricing' },
    { label: 'Avis & FAQ',     href: '#faq' },
  ]

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl
        transition-all duration-500 ease-out
        ${scrolled
          ? 'bg-baa-cream/75 backdrop-blur-xl border border-baa-terracotta/15 shadow-lg shadow-baa-night/10'
          : 'bg-transparent border border-white/10'
        }
        rounded-full px-5 py-3`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-baa-night flex items-center justify-center shadow-md">
            <span className="font-serif text-baa-cream font-bold text-sm italic">B</span>
          </div>
          <span
            className={`font-sans font-semibold text-sm tracking-tight transition-colors duration-300
              ${scrolled ? 'text-baa-charcoal' : 'text-white'}`}
          >
            Baarasobe
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className={`link-lift text-sm font-medium transition-colors duration-300
                ${scrolled ? 'text-baa-muted hover:text-baa-terracotta' : 'text-white/80 hover:text-white'}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onOpenDownload}
          className="btn-magnetic hidden md:flex items-center gap-2 bg-baa-terracotta text-white
            text-sm font-semibold px-5 py-2.5 rounded-full"
        >
          <span className="btn-bg-slide bg-baa-night rounded-full" />
          <Smartphone size={15} />
          <span>Télécharger</span>
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors
            ${scrolled ? 'text-baa-charcoal' : 'text-white'}`}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-2 border-t border-baa-terracotta/10 pt-4 flex flex-col gap-3">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-baa-charcoal hover:text-baa-terracotta transition-colors px-1"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); if (onOpenDownload) onOpenDownload(); }}
            className="btn-magnetic flex items-center justify-center gap-2 bg-baa-terracotta
              text-white text-sm font-semibold px-5 py-3 rounded-2xl mt-2 w-full"
          >
            <Smartphone size={15} />
            <span>Télécharger l'app</span>
          </button>
        </div>
      )}
    </nav>
  )
}

