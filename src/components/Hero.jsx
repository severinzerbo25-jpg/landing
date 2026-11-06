import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Smartphone, ArrowRight } from 'lucide-react'

export default function Hero({ onOpenDownload }) {
  const heroRef   = useRef(null)
  const line1Ref  = useRef(null)
  const line2Ref  = useRef(null)
  const line3Ref  = useRef(null)
  const subRef    = useRef(null)
  const ctaRef    = useRef(null)
  const badgesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 })

      tl.from(line1Ref.current, {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      .from(line2Ref.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      }, '-=0.6')
      .from(line3Ref.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      }, '-=0.7')
      .from(subRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      }, '-=0.5')
      .from(ctaRef.current, {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
      }, '-=0.5')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden"
    >
      {/* Background Image — Véritable atelier de couture, table de coupe, tissus et ciseaux */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=85&fit=crop"
          alt="Atelier de confection et couture"
          className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Gradient overlay profond et chaud pour faire ressortir la typographie */}
        <div className="absolute inset-0 bg-gradient-to-t from-baa-night via-baa-night/80 to-baa-night/40" />
        {/* Warm tinted vignette latérale */}
        <div className="absolute inset-0 bg-gradient-to-r from-baa-night/85 via-baa-night/30 to-transparent" />
      </div>

      {/* Floating ambient accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full
        bg-baa-terracotta/15 blur-[120px] pointer-events-none" />

      {/* Content — pushed to lower left third */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-3xl">

          {/* Hero title */}
          <div className="mb-6 overflow-hidden pt-12">
            <p ref={line1Ref} className="font-sans font-semibold text-lg md:text-xl text-baa-cream/70 tracking-tight leading-none mb-1">
              Baarasobè est l'
            </p>
            <h1 ref={line2Ref} className="font-serif italic font-bold leading-[0.9] text-baa-cream
              text-[clamp(4rem,12vw,9rem)] tracking-tight">
              atelier
            </h1>
            <h1 ref={line3Ref} className="font-serif italic font-bold leading-[0.9] text-baa-terracotta
              text-[clamp(4rem,12vw,9rem)] tracking-tight">
              numérique.
            </h1>
          </div>

          {/* Sub — Précis, professionnel, sans cliché IA */}
          <p ref={subRef} className="font-sans text-baa-cream/80 text-base md:text-lg leading-relaxed
            max-w-xl mb-10 font-light">
            Gérez les mesures de vos clients, planifiez les coupes, contrôlez vos acomptes et relancez sur WhatsApp.
            <strong className="text-white font-medium"> Conçu exclusivement pour les professionnels de la couture.</strong>
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenDownload}
              className="btn-magnetic inline-flex items-center gap-3 bg-baa-terracotta text-white
                font-semibold text-sm md:text-base px-7 py-4 rounded-full shadow-lg shadow-baa-terracotta/25"
            >
              <span className="btn-bg-slide bg-baa-night rounded-full" />
              <Smartphone size={18} />
              <span>Installer l'application</span>
            </button>

            <a
              href="#app-preview"
              className="inline-flex items-center gap-2 text-baa-cream/80 hover:text-baa-cream
                text-sm font-medium transition-all duration-300 group link-lift"
            >
              Voir la démonstration de l'atelier
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Social proof / Atouts atelier */}
          <div className="mt-10 flex items-center gap-6 pt-8 border-t border-baa-cream/10">
            <div className="text-center">
              <p className="font-mono text-baa-terracotta font-semibold text-xl">0 F</p>
              <p className="text-baa-cream/60 text-xs mt-0.5">Pour démarrer</p>
            </div>
            <div className="w-px h-8 bg-baa-cream/10" />
            <div className="text-center">
              <p className="font-mono text-baa-terracotta font-semibold text-xl">100%</p>
              <p className="text-baa-cream/60 text-xs mt-0.5">Mesures sécurisées</p>
            </div>
            <div className="w-px h-8 bg-baa-cream/10" />
            <div className="text-center">
              <p className="font-mono text-baa-terracotta font-semibold text-xl">1 Clic</p>
              <p className="text-baa-cream/60 text-xs mt-0.5">Alertes WhatsApp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 md:right-12 z-10 flex flex-col items-center gap-1.5">
        <span className="text-baa-cream/30 text-[10px] font-mono tracking-widest -rotate-90 origin-center mb-6">
          SCROLL
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-baa-cream/30 to-transparent" />
      </div>
    </section>
  )
}

