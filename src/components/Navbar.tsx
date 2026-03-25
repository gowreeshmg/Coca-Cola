'use client'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-auto"
    >
      <div className="flex-1">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" 
          alt="Coca-Cola Logo" 
          className="h-8 md:h-12 w-auto object-contain filter invert brightness-0"
        />
      </div>
      <div className="hidden md:flex gap-12 text-sm font-bold tracking-[0.2em] uppercase text-white mix-blend-difference">
        <a href="#history" className="hover:text-[var(--color-brand-red)] transition-colors">History</a>
        <a href="#discover" className="hover:text-[var(--color-brand-red)] transition-colors">Discover</a>
        <button className="bg-[var(--color-brand-red)] text-white px-6 py-2 rounded-full hover:bg-[var(--color-brand-red-heat)] transition-all transform hover:scale-105">
          Taste The Magic
        </button>
      </div>
    </motion.nav>
  )
}
