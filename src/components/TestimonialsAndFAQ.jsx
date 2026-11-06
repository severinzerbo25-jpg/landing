import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, HelpCircle, ChevronDown, MessageCircle, Star, Quote } from 'lucide-react'
import { WHATSAPP_SUPPORT_URL } from '../config/links'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    author: "Moussa Traoré",
    atelier: "Atelier Haute Couture Traoré",
    city: "Ouagadougou",
    quote: "Avant Baarasobè, je perdais des fiches de mesures sur papier chaque semaine. Maintenant, tout est dans ma poche. Mes clients reçoivent même leurs notifications WhatsApp !",
    avatar: "M",
    rating: 5,
    tag: "Utilisateur Pro",
  },
  {
    author: "Aïcha Diallo",
    atelier: "Créations Aïcha Style",
    city: "Abidjan",
    quote: "Le suivi des acomptes et impayés a complètement assaini ma trésorerie. Je sais exactement qui me doit quoi sans aucune gêne lors des livraisons.",
    avatar: "A",
    rating: 5,
    tag: "Formule Essentiel",
  },
  {
    author: "Ibrahim Sanogo",
    atelier: "Sanogo Confection Homme",
    city: "Bamako",
    quote: "La planification des commandes par semaine me permet de ne plus jamais être en retard sur les confections de mariages ou fêtes religieuses.",
    avatar: "I",
    rating: 5,
    tag: "Utilisateur Pro",
  },
]

const FAQS = [
  {
    q: "L'application fonctionne-t-elle sans connexion Internet permanente ?",
    a: "Oui, vous pouvez consulter vos fiches clients et enregistrer des commandes en atelier même sans réseau. Dès que votre connexion se rétablit, vos données sont synchronisées de façon sécurisée.",
  },
  {
    q: "Comment mes clients reçoivent-ils leurs notifications ?",
    a: "Baarasobè intègre un bouton d'envoi en 1 clic vers WhatsApp avec des messages pré-formatés pour confirmer les commandes, signaler un vêtement prêt ou rappeler un solde restant.",
  },
  {
    q: "Que se passe-t-il si je perds ou change de téléphone ?",
    a: "Toutes vos mesures, historiques de commandes et relevés de caisse sont liés à votre compte en ligne sécurisé. Il suffit de vous reconnecter sur votre nouveau smartphone pour tout retrouver instantanément.",
  },
  {
    q: "Quels sont les modes de paiement acceptés pour les formules payantes ?",
    a: "Vous pouvez régler vos abonnements via Mobile Money (Orange Money, Wave, Moov Money, MTN) ou carte bancaire selon votre pays de résidence.",
  },
]

export default function TestimonialsAndFAQ() {
  const [openFaq, setOpenFaq] = useState(0)
  const containerRef = useRef(null)

  return (
    <section ref={containerRef} id="faq" className="py-24 md:py-36 px-6 md:px-12 bg-baa-cream/40 border-t border-baa-terracotta/10">
      <div className="max-w-7xl mx-auto">
        {/* Témoignages Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-baa-terracotta uppercase tracking-widest">
            — Témoignages
          </span>
          <h2 className="font-serif italic text-baa-charcoal text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-tight mt-3">
            Adopté par les ateliers<br />
            <span className="text-baa-terracotta">de référence.</span>
          </h2>
          <p className="text-baa-muted text-base md:text-lg mt-4 font-light">
            Découvrez comment Baarasobè transforme le quotidien des maîtres-tailleurs et créateurs de mode en Afrique.
          </p>
        </div>

        {/* Témoignages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.author}
              className="bg-white rounded-4xl p-8 border border-baa-terracotta/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-baa-salmon text-baa-terracotta">
                    {t.tag}
                  </span>
                </div>
                <Quote size={28} className="text-baa-terracotta/20 mb-3" />
                <p className="text-baa-charcoal/85 text-sm md:text-base leading-relaxed font-light italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 border-t border-black/5">
                <div className="w-11 h-11 rounded-2xl bg-baa-night flex items-center justify-center text-baa-cream font-bold font-serif text-lg">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-baa-charcoal leading-none">
                    {t.author}
                  </h4>
                  <p className="text-xs text-baa-muted mt-1">
                    {t.atelier} · <span className="font-medium text-baa-terracotta">{t.city}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-mono text-xs text-baa-terracotta uppercase tracking-widest">
              — Questions fréquentes
            </span>
            <h3 className="font-serif italic font-bold text-baa-charcoal text-3xl md:text-4xl mt-2">
              Tout ce que vous devez savoir.
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-3xl border border-baa-terracotta/10 overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-sans font-bold text-base md:text-lg text-baa-charcoal hover:text-baa-terracotta transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`p-2 rounded-full bg-baa-cream text-baa-terracotta transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-baa-terracotta text-white' : ''
                    }`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-baa-muted text-sm md:text-base leading-relaxed font-light border-t border-black/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Quick Support banner WhatsApp */}
          <div className="mt-12 bg-baa-night text-baa-cream rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-baa-terracotta/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-base md:text-lg">Une question sur votre atelier ou vos commandes ?</h4>
                <p className="text-xs md:text-sm text-baa-cream/60 mt-0.5">Notre équipe d'assistance vous répond directement sur WhatsApp au +226 44 55 90 48.</p>
              </div>
            </div>
            <a
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-magnetic px-6 py-3.5 rounded-full bg-[#25D366] text-slate-900 font-bold text-sm whitespace-nowrap flex items-center gap-2 hover:bg-green-400 shadow-md"
            >
              <span className="btn-bg-slide bg-white/30 rounded-full" />
              <MessageCircle size={17} />
              <span>Contacter le support WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

