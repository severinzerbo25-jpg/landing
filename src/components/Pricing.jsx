import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X, Star, Smartphone, Zap, Sparkles } from 'lucide-react'
import { LOGIN_URL } from '../config/links'

gsap.registerPlugin(ScrollTrigger)

const PLANS = [
  {
    name: 'Formule Gratuite',
    subtitle: 'Découverte & Essai standard',
    price: '0',
    unit: 'FCFA / mois',
    badge: null,
    featured: false,
    cardBg: 'bg-white',
    borderColor: 'border-baa-terracotta/15',
    buttonLabel: 'Commencer Gratuitement',
    buttonClass: 'bg-baa-cream text-baa-terracotta border-2 border-baa-terracotta hover:bg-baa-terracotta hover:text-white',
    inclus: [
      { text: "Jusqu'à 15 clients au total", strong: "15 clients" },
      { text: "Jusqu'à 10 commandes par mois", strong: "10 commandes" },
      { text: "5 modèles de vêtements au choix", strong: "5 modèles" },
      { text: "Grille de mesures standard", strong: "Grille de mesures" },
      { text: "Accès 100% hors-ligne (PWA)", strong: "100% hors-ligne" },
    ],
    nonInclus: [
      "Pas de messages WhatsApp automatiques",
      "Pas de photos de tissus ni de modèles",
      "Pas de module caisse",
      "Pas de suivi des impayés",
    ],
  },
  {
    name: 'Formule Essentiel',
    subtitle: 'Atelier en démarrage avec besoin régulier',
    price: '1 900',
    unit: 'FCFA / mois',
    badge: 'Essentiel',
    badgeColor: 'bg-blue-100 text-blue-700',
    featured: false,
    cardBg: 'bg-white',
    borderColor: 'border-blue-200 shadow-md',
    buttonLabel: 'Passer à la Formule Essentiel (1 900 F)',
    buttonClass: 'bg-[#2563EB] text-white hover:bg-blue-700', // Le bouton bleu exact de votre capture d'écran !
    inclus: [
      { text: "✓ Tout le Plan Gratuit inclus", strong: "Tout le Plan Gratuit inclus" },
      { text: "Jusqu'à 30 clients au total", strong: "30 clients" },
      { text: "Jusqu'à 25 commandes par mois", strong: "25 commandes" },
      { text: "15 modèles personnalisés", strong: "15 modèles" },
      { text: "Messages WhatsApp 1 clic", strong: "WhatsApp 1 clic" },
    ],
    nonInclus: [
      "Photos de tissus & modèles limitées",
      "Module caisse basique",
    ],
  },
  {
    name: 'Formule Pro',
    subtitle: 'Atelier actif avec volume régulier et photos',
    price: '3 900',
    unit: 'FCFA / mois',
    badge: '✨ RECOMMANDÉ',
    badgeColor: 'bg-baa-terracotta text-white',
    featured: true,
    cardBg: 'bg-baa-cream',
    borderColor: 'border-baa-terracotta ring-2 ring-baa-terracotta/40 shadow-2xl',
    buttonLabel: '✨ Passer à la Formule Pro (3 900 F)',
    buttonClass: 'bg-baa-terracotta text-white hover:bg-baa-night', // Le bouton terracotta de votre app !
    inclus: [
      { text: "✓ Tout le Plan Essentiel inclus", strong: "Tout le Plan Essentiel inclus" },
      { text: "Jusqu'à 120 clients au total", strong: "120 clients" },
      { text: "Jusqu'à 80 commandes par mois", strong: "80 commandes" },
      { text: "50 modèles personnalisés", strong: "50 modèles" },
      { text: "Photos tissus & modèles illimitées", strong: "illimitées" },
      { text: "Gestion de caisse & Suivi des impayés", strong: "Gestion de caisse & Suivi" },
    ],
    nonInclus: [],
  },
]

export default function Pricing({ onOpenDownload }) {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current && headRef.current.children.length > 0) {
        gsap.from(headRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
        })
      }

      if (cardsRef.current && cardsRef.current.children.length > 0) {
        gsap.from(Array.from(cardsRef.current.children), {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="pricing" className="py-24 md:py-36 px-6 md:px-12 bg-baa-cream/70 border-t border-baa-terracotta/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headRef} className="text-center mb-16 md:mb-20">
          <span className="font-mono text-xs text-baa-terracotta uppercase tracking-widest font-semibold">
            — Tarification Claire & Accessible
          </span>
          <h2 className="font-serif italic text-baa-charcoal text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-tight mt-3">
            Des formules conçues pour<br />
            <span className="text-baa-terracotta">la réalité de votre atelier.</span>
          </h2>
          <p className="text-baa-muted text-base md:text-lg max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Commencez sans engagement avec la formule gratuite. Évoluez au rythme de votre clientèle sans jamais risquer de perdre une seule mesure.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[2.5rem] p-7 md:p-8 flex flex-col justify-between border transition-all duration-300 ${plan.cardBg} ${plan.borderColor} ${
                plan.featured ? 'md:scale-105 shadow-2xl z-10' : 'hover:-translate-y-1'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  {plan.badge ? (
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-baa-muted uppercase tracking-wider">
                      Sans engagement
                    </span>
                  )}
                  {plan.featured && (
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-baa-salmon text-baa-terracotta font-semibold">
                      Volume Actif
                    </span>
                  )}
                </div>

                <h3 className="font-sans font-extrabold text-2xl text-baa-charcoal tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-xs text-baa-muted mt-1 leading-relaxed font-light min-h-[2.5rem]">
                  {plan.subtitle}
                </p>

                {/* Price Display */}
                <div className="my-6 pb-6 border-b border-black/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans font-black text-4xl md:text-5xl text-baa-charcoal tracking-tight">
                      {plan.price}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold text-baa-terracotta uppercase">FCFA</span>
                      <span className="text-[11px] text-baa-muted font-light">/ mois</span>
                    </div>
                  </div>
                </div>

                {/* Inclus List */}
                <div className="mb-6">
                  <p className="font-mono text-[11px] font-bold text-baa-charcoal uppercase tracking-wider mb-3">
                    INCLUS :
                  </p>
                  <ul className="space-y-2.5">
                    {plan.inclus.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-baa-charcoal/90 leading-snug">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Non Inclus List (pour formule gratuite) */}
                {plan.nonInclus.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-black/5">
                    <p className="font-mono text-[11px] font-bold text-baa-muted uppercase tracking-wider mb-2.5">
                      NON INCLUS :
                    </p>
                    <ul className="space-y-2">
                      {plan.nonInclus.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-baa-muted/70 leading-snug">
                          <X size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button - Redirection vers https://baarasobe1.vercel.app/login */}
              <div className="pt-6 border-t border-black/5 mt-auto">
                <a
                  href={LOGIN_URL}
                  className={`btn-magnetic w-full py-3.5 px-4 rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 shadow-sm flex items-center justify-center text-center ${plan.buttonClass}`}
                >
                  <span className="btn-bg-slide rounded-2xl bg-black/10" />
                  <span>{plan.buttonLabel}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Mobile Money Support */}
        <div className="mt-14 p-6 rounded-3xl bg-white border border-baa-terracotta/15 flex flex-wrap items-center justify-between gap-4 text-xs text-baa-muted shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-baa-salmon flex items-center justify-center text-baa-terracotta font-bold text-sm">
              💳
            </span>
            <span>
              Paiement facile par <strong className="text-baa-charcoal">Orange Money, Wave, Moov Money, MTN</strong> ou carte bancaire.
            </span>
          </div>
          <span className="font-mono text-[11px] text-baa-terracotta font-medium">
            Activation instantanée sur votre compte
          </span>
        </div>
      </div>
    </section>
  )
}
