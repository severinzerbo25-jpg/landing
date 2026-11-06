import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Scissors, Sparkles, FolderHeart, Plus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CREATIONS = [
  {
    title: "Grand Boubou Brodé 3 Pièces",
    fabric: "Bazin Riche Teinté",
    time: "4 jours de confection",
    client: "Commande Mariage",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85&fit=crop",
    tag: "Haute Couture",
  },
  {
    title: "Ensemble Veste Tailleur & Pantalon",
    fabric: "Laine Fine & Doublure Satin",
    time: "3 jours de confection",
    client: "Tenue Cérémonie",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=85&fit=crop",
    tag: "Coupe Moderne",
  },
  {
    title: "Robe Longue Galbée & Évasée",
    fabric: "Soie & Dentelle Perlée",
    time: "2 jours de confection",
    client: "Robe de Soirée",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=85&fit=crop",
    tag: "Sur-Mesure",
  },
  {
    title: "Chemise Col Officier & Finitions Main",
    fabric: "Coton Égyptien Peigné",
    time: "24h en atelier",
    client: "Collection Urbaine",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=85&fit=crop",
    tag: "Prêt-à-Porter",
  },
]

export default function AtelierLookbook() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 35,
        opacity: 0,
        duration: 0.8,
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
    <section ref={sectionRef} id="lookbook" className="py-24 md:py-36 px-6 md:px-12 bg-baa-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-baa-salmon/70 border border-baa-terracotta/20 rounded-full px-4 py-1.5 mb-4">
              <Scissors size={14} className="text-baa-terracotta" />
              <span className="font-mono text-xs text-baa-terracotta font-semibold uppercase tracking-wider">
                Catalogue Modèles & Tissus
              </span>
            </div>
            <h2 className="font-serif italic font-bold text-baa-charcoal text-[clamp(2.5rem,5vw,4.5rem)] leading-tight">
              Gardez vos inspirations<br />
              <span className="text-baa-terracotta">à portée d'aiguille.</span>
            </h2>
          </div>
          <p className="text-baa-muted text-base md:text-lg max-w-md font-light leading-relaxed">
            Photographiez les tissus confiés par vos clients et associez chaque modèle à son patron directement dans l'application Baarasobè.
          </p>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREATIONS.map((item, idx) => (
            <div
              key={item.title}
              className="group bg-white rounded-4xl overflow-hidden border border-baa-terracotta/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-baa-night/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Badge Tag */}
                <div className="absolute top-4 left-4 bg-baa-night/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full">
                  {item.tag}
                </div>
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-xs font-mono flex items-center gap-1.5">
                    <FolderHeart size={14} className="text-baa-salmon" /> Modèle archivé dans Baarasobè
                  </span>
                </div>
              </div>

              {/* Information Card */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-xs font-mono text-baa-terracotta font-medium uppercase tracking-wider">
                    {item.fabric}
                  </span>
                  <h3 className="font-sans font-bold text-baa-charcoal text-base md:text-lg mt-1 group-hover:text-baa-terracotta transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-baa-muted">
                  <span>⏱ {item.time}</span>
                  <span className="font-medium text-baa-charcoal">{item.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Pill beneath */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-baa-terracotta/15 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-baa-salmon flex items-center justify-center text-baa-terracotta flex-shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-sans font-bold text-sm text-baa-charcoal">
                Jusqu'à 50 modèles enregistrés et photos de tissus illimitées
              </p>
              <p className="text-xs text-baa-muted font-light">
                Ne confondez plus jamais les coupons de pagne ou les rouleaux de bazin déposés par vos clients.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-semibold px-4 py-2 rounded-full bg-baa-cream text-baa-terracotta border border-baa-terracotta/20 whitespace-nowrap">
            Inclus dès la Formule Pro
          </span>
        </div>
      </div>
    </section>
  )
}

