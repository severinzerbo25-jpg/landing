import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Eye } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SCREENS = [
  {
    title: "Tableau de bord atelier",
    category: "Vue d'ensemble",
    desc: "Suivez vos commandes actives, délais de confection et recettes du mois avec statut Admin.",
    image: "/app-screens/dashboard_pro.jpg",
  },
  {
    title: "Gestion des clients & mesures",
    category: "Clients",
    desc: "Carnet de mesures numérique infalsifiable avec contact WhatsApp direct pour chaque client.",
    image: "/app-screens/media_1793970831262_bc96a273.jpg",
  },
  {
    title: "Suivi des confections & ateliers",
    category: "Production",
    desc: "Classement par statut de coupe : À traiter, En atelier, Prêt, avec acomptes et reliquats.",
    image: "/app-screens/orders_large.jpg",
  },
  {
    title: "Caisse & Finances sans impayé",
    category: "Trésorerie",
    desc: "Contrôle des encaissements en temps réel et suivi rigoureux du reste à payer par commande.",
    image: "/app-screens/media_1793970831290_9f656173.jpg",
  },
  {
    title: "Formules adaptées à votre atelier",
    category: "Abonnements",
    desc: "Passez du mode Gratuit aux formules Essentiel et Pro avec sauvegarde de vos modèles et photos.",
    image: "/app-screens/media_1793970831262_ed2e4134.jpg",
  },
]

export default function AppShowcase() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="app-preview" className="py-24 md:py-36 px-6 md:px-12 bg-baa-cream/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-baa-salmon/60 border border-baa-terracotta/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={14} className="text-baa-terracotta" />
            <span className="font-mono text-xs text-baa-terracotta font-semibold uppercase tracking-wider">
              Immersion Haute-Fidélité
            </span>
          </div>
          <h2 className="font-serif italic font-bold text-baa-charcoal text-[clamp(2.5rem,5vw,4.5rem)] leading-tight">
            L'application réelle.<br />
            <span className="text-baa-terracotta">Sans filtre, sur votre écran.</span>
          </h2>
          <p className="font-sans text-baa-muted text-base md:text-lg mt-4 font-light leading-relaxed">
            Chaque pixel de cette landing page découle directement de l'expérience native de Baarasobe.
            Découvrez l'interface conçue pour simplifier la vie des maîtres-tailleurs.
          </p>
        </div>

        {/* Interactive Device Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Navigation / Feature Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {SCREENS.map((screen, idx) => (
              <button
                key={screen.title}
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-5 rounded-3xl transition-all duration-300 border ${
                  activeIndex === idx
                    ? 'bg-white border-baa-terracotta/30 shadow-lg shadow-baa-terracotta/10 scale-[1.02]'
                    : 'bg-white/40 border-baa-terracotta/5 hover:bg-white/80 text-baa-charcoal'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                    activeIndex === idx ? 'bg-baa-salmon text-baa-terracotta font-bold' : 'text-baa-muted bg-black/5'
                  }`}>
                    {screen.category}
                  </span>
                  {activeIndex === idx && (
                    <span className="flex items-center gap-1 text-xs text-baa-terracotta font-mono font-medium">
                      <Eye size={13} /> Actif
                    </span>
                  )}
                </div>
                <h3 className={`font-sans font-bold text-base md:text-lg transition-colors ${
                  activeIndex === idx ? 'text-baa-charcoal' : 'text-baa-charcoal/80'
                }`}>
                  {screen.title}
                </h3>
                <p className="text-baa-muted text-xs md:text-sm mt-1 leading-relaxed font-light">
                  {screen.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Realistic Mobile Mockup with Real App Screenshot */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[9/19.5] rounded-[3.2rem] bg-baa-night p-3.5 shadow-2xl shadow-baa-night/30 ring-1 ring-white/20">
              {/* Phone Speaker & Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-baa-night rounded-full z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Screen container */}
              <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden bg-baa-cream border border-black/10">
                <img
                  key={SCREENS[activeIndex].image}
                  src={SCREENS[activeIndex].image}
                  alt={SCREENS[activeIndex].title}
                  className="w-full h-full object-cover object-top transition-opacity duration-500 animate-fadeIn"
                />

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
              </div>

              {/* Reflection effect */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-baa-terracotta/20 blur-xl rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

