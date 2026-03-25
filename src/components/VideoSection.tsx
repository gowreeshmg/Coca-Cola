'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function VideoSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Subtle parallax effect on the video
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <section ref={ref} id="discover" className="relative w-full h-[120vh] overflow-hidden bg-[var(--color-surface)] flex items-center justify-center z-10">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none flex items-center justify-center">
        {/* Using a reliable YouTube embed of a classic Coca-Cola commercial for maximum immersion */}
        <iframe
          src="https://www.youtube.com/embed/-V0E0a8x5Uo?autoplay=1&mute=1&controls=0&loop=1&playlist=-V0E0a8x5Uo&playsinline=1"
          className="w-full h-full object-cover scale-[1.5] opacity-60 mix-blend-screen pointer-events-none"
          allow="autoplay; encrypted-media"
        />
        {/* Fallback image if video fails */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554866585-cd948608855ce?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay -z-10" />
      </motion.div>

      {/* Tonal Layering gradient fades */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-[var(--color-surface)] pointer-events-none" />
      <div className="absolute inset-0 bg-[var(--color-brand-red)]/10 mix-blend-overlay pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-5xl md:text-8xl font-bold text-white mb-6 uppercase tracking-tighter mix-blend-difference">
          Taste The <span className="text-[var(--color-brand-red)]">Feeling</span>
        </h2>
        <p className="text-lg md:text-2xl text-white/80 font-mono tracking-widest uppercase mb-12 mix-blend-difference">
          Refreshment that defies gravity.
        </p>
        <button className="bg-[var(--color-brand-red)] text-white px-10 py-5 rounded-full font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--color-brand-red)] transition-all transform hover:scale-105 shadow-[0_20px_60px_rgba(244,0,9,0.4)] pointer-events-auto">
          Experience Now
        </button>
      </div>
    </section>
  )
}
