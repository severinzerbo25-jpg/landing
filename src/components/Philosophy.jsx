import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AlertCircle, Clock, BookOpen, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const line3Ref   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background image
      gsap.to('.philosophy-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text reveal — word by word stagger
      const revealWords = (el, delay = 0) => {
        const words = el.querySelectorAll('.word')
        gsap.from(words, {
          y: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        })
      }

      revealWords(line1Ref.current, 0)
      revealWords(line2Ref.current, 0.1)
      revealWords(line3Ref.current, 0.25)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const wordify = (text, className = '') =>
    text.split(' ').map((w, i) => (
      <span key={i} className="word inline-block overflow-hidden mr-[0.3em]">
        <span className={`inline-block ${className}`}>{w}</span>
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative bg-baa-night overflow-hidden py-28 md:py-44 px-6 md:px-20"
    >
      {/* Parallax texture background — Atelier de couture authentique : bobines de fil professionnel, ciseaux de coupe, mètre ruban et machine à coudre */}
      <div
        className="philosophy-bg absolute inset-0 opacity-[0.16] scale-110 pointer-events-none"
        style={{
          backgroundImage: `url('/tailor-workshop-full.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[600px] h-[400px] rounded-full bg-baa-terracotta/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <div className="mb-14">
          <span className="font-mono text-xs text-baa-terracotta font-semibold uppercase tracking-[0.2em]">
            — La Raison d'Être de Baarasobè
          </span>
        </div>

        {/* Problème du quotidien des ateliers : carnet papier égaré, retards, disputes */}
        <div ref={line1Ref} className="mb-6 overflow-hidden">
          <p className="font-sans text-baa-cream/50 text-xs md:text-sm font-mono uppercase tracking-widest">
            {wordify('Dans un atelier de couture traditionnel :')}
          </p>
          <p className="font-sans text-baa-cream/75 text-xl md:text-2xl font-light leading-snug mt-2">
            {wordify('Un carnet de mesures égaré, une date de livraison oubliée ou un acompte mal noté peuvent briser la confiance d\'un client fidèle.')}
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-baa-terracotta/40 my-10" />

        {/* Contrast statement 2 — massive serif italic */}
        <div ref={line2Ref} className="overflow-hidden">
          <p className="font-sans text-baa-cream/60 text-xs md:text-sm font-mono uppercase tracking-widest mb-4">
            {wordify('Ce que résout Baarasobè :')}
          </p>
          <h2 className="font-serif italic font-bold leading-[1.05] text-baa-cream
            text-[clamp(2.6rem,7vw,5.5rem)] tracking-tight">
            {wordify('Zéro mesure perdue.')}<br />
            {wordify('Zéro commande')}
            <span className="word inline-block mr-[0.3em]">
              <span className="text-baa-terracotta">oubliée.</span>
            </span>
          </h2>
        </div>

        {/* Les 3 piliers concrets pour l'atelier */}
        <div ref={line3Ref} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-baa-cream/10 pt-12">
          {[
            {
              icon: <BookOpen size={18} className="text-baa-terracotta" />,
              label: 'Mémoire Inaltérable',
              body:  "Chaque tour de poitrine, longueur de manche et stature reste archivé sous le nom du client. Même si votre téléphone tombe, vous ne perdez rien.",
            },
            {
              icon: <Clock size={18} className="text-baa-terracotta" />,
              label: 'Délais & Fêtes Maîtrisés',
              body:  "Fini le stress des veilles de Tabaski, mariages ou rentrées. Vos confections sont ordonnées par date exacte de livraison avec statuts clairs.",
            },
            {
              icon: <CheckCircle2 size={18} className="text-baa-terracotta" />,
              label: 'Comptes Clairs, Zéro Gêne',
              body:  "Prix total, acompte versé et solde restant sont calculés automatiquement. Vos clients reçoivent leur récapitulatif par WhatsApp sans dispute.",
            },
          ].map(item => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-3">
                {item.icon}
                <p className="font-mono text-baa-cream font-bold text-xs uppercase tracking-wider">{item.label}</p>
              </div>
              <p className="font-sans text-baa-cream/65 text-xs md:text-sm leading-relaxed font-light">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
