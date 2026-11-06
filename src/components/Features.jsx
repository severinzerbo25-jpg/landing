import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, ClipboardList, Scissors } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── CARD 1: Mixer — Client Cards Cycling ────────────────────────── */
function ClientMixerCard() {
  const [clients] = useState([
    { name: 'KOUAME', phone: '+225 07 48 92 11', cmd: '2 confections', mesure: '12 mesures', status: 'Prêt',       statusColor: 'bg-green-100 text-green-700' },
    { name: 'ALI',    phone: '+226 70 23 45 67', cmd: '1 commande',   mesure: 'Taille basse', status: 'En atelier', statusColor: 'bg-amber-100 text-amber-700' },
    { name: 'ZERBO',  phone: '+226 76 12 89 00', cmd: '1 commande',   mesure: 'Boubou 3 pcs', status: 'À traiter',  statusColor: 'bg-orange-100 text-orange-700' },
  ])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % clients.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [clients.length])

  return (
    <div className="bg-baa-cream rounded-4xl border border-baa-terracotta/10 shadow-xl p-6 md:p-8 flex flex-col h-full min-h-[340px]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users size={15} className="text-baa-terracotta" />
            <span className="font-mono text-xs text-baa-muted uppercase tracking-widest">Fiches Mesures</span>
          </div>
          <h3 className="font-sans font-bold text-baa-charcoal text-xl">Carnet de coupe 100% Hors-ligne</h3>
          <p className="text-sm text-baa-muted mt-1 leading-snug">Épaule, poitrine, longueur : zéro carnet papier égaré.</p>
        </div>
      </div>

      {/* Stacked cycling cards */}
      <div className="relative flex-1 mt-2" style={{ minHeight: 160 }}>
        {clients.map((c, i) => {
          const offset = (i - active + clients.length) % clients.length
          const isTop  = offset === 0
          const isMid  = offset === 1
          return (
            <div
              key={c.name}
              className="absolute w-full bg-white rounded-3xl border border-baa-terracotta/10 p-4 shadow-md"
              style={{
                top: isTop ? 0 : isMid ? 10 : 20,
                transform: isTop ? 'scale(1)' : isMid ? 'scale(0.97)' : 'scale(0.94)',
                zIndex: isTop ? 10 : isMid ? 5 : 1,
                opacity: isTop ? 1 : isMid ? 0.7 : 0.4,
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-baa-salmon flex items-center justify-center">
                    <span className="font-bold text-baa-terracotta text-sm">{c.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-baa-charcoal">{c.name}</p>
                    <p className="text-xs text-baa-muted">{c.phone} · {c.cmd}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.statusColor}`}>
                  {c.status}
                </span>
              </div>
              {c.mesure && (
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="text-xs bg-baa-salmon text-baa-terracotta px-2 py-0.5 rounded-full font-medium">
                    ✂ {c.mesure}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex gap-1.5 mt-auto pt-4 justify-center">
        {clients.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-baa-terracotta' : 'w-2 bg-baa-terracotta/25'}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── CARD 2: Typewriter — Live Command Feed ──────────────────────── */
const MESSAGES = [
  'Commande #0042 • ALI • Robe brodée → En atelier ✂',
  'Acompte reçu: 25 000 FCFA • Reste: 10 000 FCFA • Enregistré hors-ligne ✓',
  'Client ZERBO: Confection sur-mesure • Prêt pour essayage',
  'Notification WhatsApp: "Bonjour M. KOUAME, votre tenue est prête."',
  'Caisse atelier: 125 000 FCFA encaissés cette semaine',
]

function TypewriterCard() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting]  = useState(false)

  useEffect(() => {
    const msg = MESSAGES[msgIndex]
    if (!deleting) {
      if (charIdx < msg.length) {
        const t = setTimeout(() => {
          setDisplayed(msg.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        }, 38)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), 2200)
        return () => clearTimeout(t)
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayed(msg.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        }, 18)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setMsgIndex(m => (m + 1) % MESSAGES.length)
      }
    }
  }, [charIdx, deleting, msgIndex])

  return (
    <div className="bg-baa-cream rounded-4xl border border-baa-terracotta/10 shadow-xl p-6 md:p-8 flex flex-col h-full min-h-[340px]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList size={15} className="text-baa-terracotta" />
            <span className="font-mono text-xs text-baa-muted uppercase tracking-widest">Commandes</span>
          </div>
          <h3 className="font-sans font-bold text-baa-charcoal text-xl">Suivi en temps réel</h3>
          <p className="text-sm text-baa-muted mt-1 leading-snug">Statuts, délais et paiements en un coup d'œil.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-mono text-green-700 font-medium">FLUX EN DIRECT</span>
        </div>
      </div>

      {/* Terminal display */}
      <div className="flex-1 bg-baa-night rounded-3xl p-5 font-mono text-sm flex flex-col justify-start">
        <div className="text-baa-muted/50 text-xs mb-3">$ baarasobe --flux commandes</div>
        <div className="text-baa-terracotta leading-relaxed min-h-[4rem]">
          <span>{displayed}</span>
          <span className="cursor-blink ml-0.5 inline-block w-0.5 h-4 bg-baa-terracotta align-middle" />
        </div>
        {/* Stats row */}
        <div className="mt-auto pt-4 border-t border-white/5 grid grid-cols-3 gap-2">
          {[
            { label: 'Total',   value: '8' },
            { label: 'En cours', value: '5' },
            { label: 'Prêtes',  value: '3' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-bold text-white text-lg leading-none">{s.value}</div>
              <div className="text-baa-muted/60 text-[10px] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── CARD 3: Protocol Planner — Weekly Calendar Cursor ───────────── */
const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function PlannerCard() {
  const [activeDay, setActiveDay] = useState(null)
  const [saved, setSaved]         = useState(false)
  const [phase, setPhase]         = useState(0) // 0=hovering, 1=clicking, 2=saved

  useEffect(() => {
    const sequence = async () => {
      await sleep(600)
      setActiveDay(3) // Thursday
      setPhase(1)
      await sleep(500)
      setPhase(2)
      setSaved(true)
      await sleep(2000)
      setSaved(false)
      setActiveDay(null)
      setPhase(0)
      await sleep(1000)
      setActiveDay(1) // Tuesday
      setPhase(1)
      await sleep(500)
      setPhase(2)
      setSaved(true)
      await sleep(2000)
      setSaved(false)
      setActiveDay(null)
      setPhase(0)
    }

    const loop = setInterval(sequence, 7000)
    sequence()
    return () => clearInterval(loop)
  }, [])

  return (
    <div className="bg-baa-cream rounded-4xl border border-baa-terracotta/10 shadow-xl p-6 md:p-8 flex flex-col h-full min-h-[340px]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scissors size={15} className="text-baa-terracotta" />
            <span className="font-mono text-xs text-baa-muted uppercase tracking-widest">Atelier</span>
          </div>
          <h3 className="font-sans font-bold text-baa-charcoal text-xl">Planifiez vos délais</h3>
          <p className="text-sm text-baa-muted mt-1 leading-snug">Organisez vos livraisons semaine par semaine.</p>
        </div>
      </div>

      {/* Weekly grid */}
      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {DAYS.map((d, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all duration-300
              ${activeDay === i
                ? phase === 1
                  ? 'bg-baa-terracotta/80 scale-95'
                  : 'bg-baa-terracotta scale-100'
                : 'bg-white hover:bg-baa-salmon/40'
              }`}
          >
            <span className={`text-[10px] font-mono font-medium transition-colors
              ${activeDay === i ? 'text-white' : 'text-baa-muted'}`}>
              {d}
            </span>
            {activeDay === i && (
              <div className="w-1 h-1 rounded-full bg-white animate-ping" />
            )}
          </div>
        ))}
      </div>

      {/* Command item */}
      <div className="bg-white rounded-3xl border border-baa-terracotta/10 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm text-baa-charcoal">DIALLO Mamadou</span>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">En atelier</span>
        </div>
        <p className="text-xs text-baa-muted">Grand Boubou Bazin · {activeDay !== null ? `Livraison ${DAYS[activeDay]}` : 'Choisir un jour...'}</p>
      </div>

      {/* Save Button */}
      <button
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-3xl font-semibold text-sm
          transition-all duration-500
          ${saved
            ? 'bg-green-500 text-white scale-95'
            : 'bg-baa-terracotta text-white hover:bg-baa-night'
          }`}
      >
        {saved ? '✓ Livraison planifiée !' : 'Sauvegarder la livraison'}
      </button>
    </div>
  )
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

/* ─── SECTION WRAPPER ─────────────────────────────────────────────── */
export default function Features() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const cardsRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
      })

      gsap.from(Array.from(cardsRef.current.children), {
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section header */}
      <div ref={headRef} className="mb-16 md:mb-20">
        <span className="font-mono text-xs text-baa-terracotta uppercase tracking-widest">
          — Fonctionnalités
        </span>
        <h2 className="font-serif italic text-baa-charcoal text-[clamp(2.5rem,6vw,5rem)]
          font-bold leading-tight mt-3">
          Votre atelier,<br />
          <span className="text-baa-terracotta">orchestré.</span>
        </h2>
        <p className="text-baa-muted text-lg max-w-lg mt-4 font-light leading-relaxed">
          Trois outils qui fonctionnent ensemble — comme une équipe dans votre poche.
        </p>
      </div>

      {/* Bannière Argument Clé : 100% Fonctionnel Hors-Ligne */}
      <div className="mb-14 p-8 rounded-5xl bg-baa-night text-baa-cream border border-baa-terracotta/25 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-baa-terracotta/15 blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 bg-baa-terracotta/20 border border-baa-terracotta/40 rounded-full px-3.5 py-1 mb-4 text-xs font-mono text-baa-terracotta font-semibold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-baa-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-baa-success" />
              </span>
              Argument Essentiel Atelier
            </div>
            <h3 className="font-serif italic font-bold text-3xl md:text-4xl text-baa-cream leading-tight">
              100% Autonome Hors-Ligne.<br />
              <span className="text-baa-terracotta">Zéro coupure, zéro dépendance réseau.</span>
            </h3>
            <p className="font-sans text-baa-cream/70 text-sm md:text-base mt-3 max-w-2xl leading-relaxed font-light">
              Dans l'atelier, pas besoin de Wifi ni de forfait données actif pour travailler. 
              Enregistrez un nouveau client, notez ses 14 mesures anatomiques, encaissez un acompte et éditez un reçu : 
              l'application répond instantanément et synchronise tout en arrière-plan dès qu'un réseau réapparaît.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-4 flex items-center gap-3.5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-2xl bg-baa-terracotta/20 flex items-center justify-center text-baa-terracotta flex-shrink-0 font-mono font-bold text-sm">
                01
              </div>
              <div>
                <p className="text-xs font-bold text-baa-cream">Accès mesures immédiat</p>
                <p className="text-[11px] text-baa-cream/50">Même en sous-sol ou zone blanche</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-4 flex items-center gap-3.5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-2xl bg-baa-terracotta/20 flex items-center justify-center text-baa-terracotta flex-shrink-0 font-mono font-bold text-sm">
                02
              </div>
              <div>
                <p className="text-xs font-bold text-baa-cream">Zéro perte de données</p>
                <p className="text-[11px] text-baa-cream/50">Stockage local sécurisé sur votre téléphone</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Cards grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ClientMixerCard />
        <TypewriterCard />
        <PlannerCard />
      </div>
    </section>
  )
}

