import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Geometric Animation Components ─────────────────────────────── */

// Card 01 — Rotating double helix
function HelixAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let frame    = 0
    let raf

    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      const cx = W / 2, cy = H / 2
      const points = 24
      const radius = Math.min(W, H) * 0.32

      for (let p = 0; p < points; p++) {
        const t    = (p / points) * Math.PI * 2
        const spin = frame * 0.012

        // Strand A
        const ax = cx + Math.cos(t + spin) * radius * 0.6
        const ay = cy + Math.sin(t * 2 + spin) * radius * 0.3

        // Strand B
        const bx = cx + Math.cos(t + spin + Math.PI) * radius * 0.6
        const by = cy + Math.sin(t * 2 + spin + Math.PI) * radius * 0.3

        ctx.beginPath()
        ctx.arc(ax, ay, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(197, 96, 42, ${0.3 + Math.sin(t + spin) * 0.4})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(44, 24, 16, ${0.4 + Math.cos(t + spin) * 0.3})`
        ctx.fill()

        if (p > 0) {
          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(bx, by)
          ctx.strokeStyle = 'rgba(197, 96, 42, 0.12)'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      frame++
      raf = requestAnimationFrame(draw)
    }

    // Size canvas
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    draw()

    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

// Card 02 — Laser scan grid
function LaserGridAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let frame    = 0
    let raf

    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      const cols = 10, rows = 7
      const cellW = W / cols, cellH = H / rows

      // Draw grid dots
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x    = c * cellW + cellW / 2
          const y    = r * cellH + cellH / 2
          const dist = Math.abs(x - ((frame * 1.2) % (W + 40)) + 20)
          const glow = Math.max(0, 1 - dist / (cellW * 2.5))

          ctx.beginPath()
          ctx.arc(x, y, 2.5 + glow * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(197, 96, 42, ${0.15 + glow * 0.85})`
          ctx.fill()
        }
      }

      // Laser line
      const lx = (frame * 1.2) % (W + 40) - 20
      const grad = ctx.createLinearGradient(lx - 30, 0, lx + 30, 0)
      grad.addColorStop(0, 'rgba(197, 96, 42, 0)')
      grad.addColorStop(0.5, 'rgba(197, 96, 42, 0.8)')
      grad.addColorStop(1, 'rgba(197, 96, 42, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(lx - 30, 0, 60, H)

      frame++
      raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    draw()

    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

// Card 03 — ECG waveform SVG
function ECGAnimation() {
  const pathRef    = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const totalLen = path.getTotalLength()
    gsap.set(path, { strokeDasharray: totalLen, strokeDashoffset: totalLen })

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 })
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: 'power2.inOut',
    })
    .to(path, {
      strokeDashoffset: -totalLen,
      duration: 1,
      ease: 'power2.in',
      delay: 0.4,
    })

    return () => tl.kill()
  }, [])

  const ecgPath = `M 0,60
    L 30,60 L 40,60 L 45,20 L 50,100 L 55,10 L 62,80 L 70,60
    L 100,60 L 110,60 L 115,30 L 120,90 L 125,15 L 132,75 L 140,60
    L 170,60 L 180,60 L 185,35 L 190,95 L 195,18 L 202,78 L 210,60
    L 240,60`

  return (
    <svg viewBox="0 0 240 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      {[20, 40, 60, 80, 100].map(y => (
        <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="rgba(197,96,42,0.07)" strokeWidth="1" />
      ))}
      {[0, 60, 120, 180, 240].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="rgba(197,96,42,0.07)" strokeWidth="1" />
      ))}

      {/* ECG Path */}
      <path
        ref={pathRef}
        d={ecgPath}
        fill="none"
        stroke="#C5602A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ─── Protocol Cards Data ─────────────────────────────────────────── */
const STEPS = [
  {
    num:    '01',
    title:  'Inscrivez-vous en 2 minutes.',
    desc:   "Téléchargez l'app, créez votre atelier numérique. Zéro paperasse, zéro carte bancaire requise.",
    anim:   <HelixAnimation />,
    animLabel: 'Initialisation atelier',
  },
  {
    num:    '02',
    title:  'Ajoutez vos clients & commandes.',
    desc:   'Enregistrez les mesures, les tissus, les délais. Tout est centralisé, accessible en un toucher.',
    anim:   <LaserGridAnimation />,
    animLabel: 'Scan du réseau',
  },
  {
    num:    '03',
    title:  'Encaissez et développez.',
    desc:   'Suivez vos encaissements, gérez les impayés, analysez votre croissance mois par mois.',
    anim:   <ECGAnimation />,
    animLabel: 'Signal caisse',
  },
]

export default function Protocol() {
  const sectionRef = useRef(null)
  const cardsRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current

      cards.forEach((card, i) => {
        if (i === 0) return

        // When card i scrolls in, push card i-1 back
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(cards[i - 1], {
              scale: 0.9,
              filter: 'blur(8px)',
              opacity: 0.45,
              duration: 0.6,
              ease: 'power2.inOut',
            })
          },
          onLeaveBack: () => {
            gsap.to(cards[i - 1], {
              scale: 1,
              filter: 'blur(0px)',
              opacity: 1,
              duration: 0.5,
              ease: 'power2.inOut',
            })
          },
        })

        // Fade in current card
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        })
      })

      // First card
      gsap.from(cards[0], {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: cards[0], start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="protocol" className="py-24 md:py-36 px-6 md:px-12 bg-baa-cream">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <span className="font-mono text-xs text-baa-terracotta uppercase tracking-widest">
            — Comment ça marche
          </span>
          <h2 className="font-serif italic text-baa-charcoal text-[clamp(2.5rem,6vw,5rem)]
            font-bold leading-tight mt-3">
            Trois étapes.<br />
            <span className="text-baa-terracotta">Un atelier transformé.</span>
          </h2>
        </div>

        {/* Stacked cards */}
        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={el => cardsRef.current[i] = el}
              className="protocol-card bg-white rounded-5xl border border-baa-terracotta/10
                shadow-xl overflow-hidden will-change-transform"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px] md:min-h-[440px]">

                {/* Text side */}
                <div className={`flex flex-col justify-center p-10 md:p-14 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="font-mono text-baa-terracotta font-bold text-xs tracking-widest uppercase">
                      ÉTAPE {step.num}
                    </span>
                    <div className="flex-1 h-px bg-baa-terracotta/15" />
                  </div>

                  <h3 className="font-serif italic font-bold text-baa-charcoal leading-tight mb-4
                    text-[clamp(1.8rem,3.5vw,3rem)]">
                    {step.title}
                  </h3>
                  <p className="text-baa-muted text-base leading-relaxed font-light max-w-sm">
                    {step.desc}
                  </p>

                  <div className="mt-8 inline-flex items-center gap-2 text-baa-terracotta text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-baa-terracotta opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-baa-terracotta" />
                    </span>
                    <span className="font-mono text-xs">{step.animLabel}</span>
                  </div>
                </div>

                {/* Animation side */}
                <div
                  className={`bg-baa-cream/60 flex items-center justify-center p-10
                    ${i % 2 === 1 ? 'md:order-1' : ''}`}
                  style={{ minHeight: 260 }}
                >
                  <div className="w-full h-52 md:h-64">
                    {step.anim}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
