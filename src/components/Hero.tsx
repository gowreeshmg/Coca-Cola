'use client'
import { motion } from 'framer-motion'

export function Hero() {
  const text = "THE REAL MAGIC"
  const letters = text.split("")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const child = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 12, stiffness: 100 } }
  }

  return (
    <section className="relative w-full h-[150vh] flex flex-col items-center justify-start pt-[25vh] z-10 pointer-events-none">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-center font-bold text-[12vw] leading-none tracking-tighter text-white overflow-hidden uppercase flex mix-blend-difference"
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index} className="inline-block">
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-white/60 mt-6 text-xl tracking-widest uppercase font-mono max-w-xl text-center mix-blend-difference"
      >
        Experience the impossible. Scroll to pour.
      </motion.p>

      {/* Spacer for GSAP Pour Sequence */}
      <div id="pour-trigger" className="absolute top-[80vh] w-full h-[100vh]" />
    </section>
  )
}
