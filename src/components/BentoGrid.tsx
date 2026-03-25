'use client'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

const cards = [
  {
    title: '1886',
    subtitle: 'The Beginning',
    desc: 'The classic formula drafted by John S. Pemberton in Atlanta, Georgia. A timeless taste was born.',
    colSpan: 'md:col-span-2',
    bg: 'bg-[#353534]/50', // surface_container_highest
  },
  {
    title: 'Iconic',
    subtitle: 'The Contour Bottle',
    desc: 'Designed to be recognized in the dark or broken on the ground. A masterclass in packaging.',
    colSpan: 'md:col-span-1',
    bg: 'bg-[#F40009]/20', // primary with transparency
  },
  {
    title: 'Global',
    subtitle: 'Universal Community',
    desc: 'Connecting people from every corner of the world through a shared moment of refreshment.',
    colSpan: 'md:col-span-3',
    bg: 'bg-[#353534]/50',
  }
]

export function BentoGrid() {
  return (
    <section id="history" className="relative z-10 w-full min-h-screen bg-[var(--color-surface)] py-32 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-white text-left tracking-tight">
          A Legacy of <span className="text-[var(--color-brand-red)]">Refreshment</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <BentoCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BentoCard({ title, subtitle, desc, colSpan, bg }: any) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Tilt effect calculation
    const rotateXValue = ((y - centerY) / centerY) * -10
    const rotateYValue = ((x - centerX) / centerX) * 10
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
       ref={cardRef}
       onMouseMove={handleMouseMove}
       onMouseLeave={handleMouseLeave}
       animate={{ rotateX, rotateY }}
       transition={{ type: 'spring', stiffness: 300, damping: 30 }}
       className={`relative md:min-h-[400px] p-10 rounded-3xl backdrop-blur-xl border border-white/10 ${bg} ${colSpan} flex flex-col justify-end overflow-hidden group shadow-[0_40px_100px_rgba(244,0,9,0.05)]`}
       style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <h3 className="text-sm md:text-lg text-[var(--color-brand-red-heat)] font-bold mb-2 tracking-[0.2em] uppercase" style={{ transform: 'translateZ(30px)' }}>{subtitle}</h3>
      <h4 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ transform: 'translateZ(50px)' }}>{title}</h4>
      <p className="text-white/70 text-lg leading-relaxed max-w-md" style={{ transform: 'translateZ(40px)' }}>{desc}</p>
    </motion.div>
  )
}
