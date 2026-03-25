'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

const bentoCards = [
  { title: '1886', subtitle: 'Atlanta Origins', desc: 'Crafted by Dr. John S. Pemberton. A timeless, perfectly balanced taste was born.' },
  { title: 'Crisp', subtitle: 'The Secret Formula', desc: 'The effervescence and secret blend of flavors that refreshes the world.' },
  { title: 'Global', subtitle: 'Universal Refreshment', desc: 'Bringing people together in every corner of the world, every single day.' }
]

export function OverlayUI() {
  const { scrollYProgress } = useScroll()
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const marqueeXReverse = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col w-full font-sans">
      
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 w-full p-4 md:px-12 md:py-8 flex justify-between items-center z-50 pointer-events-auto mix-blend-difference">
         <div className="text-white font-black text-2xl md:text-3xl tracking-tighter">COCA-COLA®</div>
         <div className="hidden md:flex gap-12 text-white font-bold uppercase tracking-[0.2em] text-xs">
           <a href="#" className="hover:text-[#F40009] transition-colors">Brands</a>
           <a href="#" className="hover:text-[#F40009] transition-colors">Discover</a>
           <a href="#" className="hover:text-[#F40009] transition-colors">Impact</a>
         </div>
         <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-xs tracking-widest hover:scale-105 hover:bg-[#F40009] hover:text-white transition-all cursor-pointer">SIGN IN</button>
      </nav>

      {/* 1. Immersive 3D ONLY Introduction */}
      <section className="h-[100vh] w-full flex items-center justify-center relative">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce mix-blend-difference text-white">
           <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Scroll To Discover</p>
           <div className="w-[1px] h-16 bg-white/50" />
        </div>
      </section>

      {/* 2. The Pour & Bento Grid */}
      <section className="h-[100vh] w-full flex items-center justify-start px-4 md:px-20 relative pointer-events-auto bg-gradient-to-b from-transparent via-black/40 to-black/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-[#F40009]/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="w-full max-w-lg grid grid-cols-1 gap-4 md:gap-6 relative z-10 mt-32 md:mt-20">
          {bentoCards.map((card, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: i * 0.15 }}
               viewport={{ once: false, margin: "-100px" }}
               className="backdrop-blur-3xl bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl hover:bg-white/10 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#F40009]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-[#F40009] font-black mb-1 md:mb-2 tracking-[0.2em] uppercase text-[10px] md:text-xs">{card.subtitle}</h3>
              <h4 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-2 md:mb-3 tracking-tight">{card.title}</h4>
              <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. History of Coca-Cola (Rich Text Layout) */}
      <section className="h-[100vh] w-full flex items-end md:items-center justify-center md:justify-end px-6 pb-24 md:pb-0 md:px-24 relative pointer-events-auto bg-black">
        {/* Abstract Red Glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#F40009] rounded-full blur-[200px] opacity-20 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl relative z-10 flex flex-col items-center text-center md:items-start md:text-left"
        >
          <div className="w-20 h-1 bg-[#F40009] mb-6 md:mb-8" />
          <h2 className="text-5xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter mix-blend-difference leading-none">OUR<br/>LEGACY</h2>
          <p className="text-lg md:text-2xl text-white/80 leading-snug mb-6 md:mb-8 font-light max-w-xl">
            Born in an Atlanta pharmacy in <span className="text-[#F40009] font-bold">1886</span>, Dr. John S. Pemberton crafted a distinctive syrup that forever changed the world.
          </p>
          <p className="text-sm md:text-lg text-white/50 leading-relaxed font-light max-w-xl mb-8 md:mb-12">
            What started as a single fountain drink has grown into the most universally recognized emblem of refreshment. For over a century, Coca-Cola has been the catalyst for simple moments of joy, connecting billions of people across cultures and continents.
          </p>
          <a href="#" className="uppercase tracking-[0.2em] text-[#F40009] font-bold text-xs md:text-sm hover:text-white transition-colors flex items-center gap-4 cursor-pointer">
            Read The Full Story <span className="text-xl">→</span>
          </a>
        </motion.div>
      </section>

      {/* 4. The Varieties (Bold Red Section) */}
      <section className="h-[100vh] w-full flex flex-col justify-center items-center relative pointer-events-auto overflow-hidden bg-[#F40009]">
        {/* Giant Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden select-none">
           <h2 className="text-[35vw] font-black leading-none text-black whitespace-nowrap">FLAVOR</h2>
        </div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="relative z-10 w-full flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-16 uppercase tracking-tighter text-center mt-12">Find Your Taste</h2>
          
          <div className="flex gap-6 md:gap-8 overflow-x-auto overflow-y-hidden pb-12 w-full max-w-7xl px-8 snap-x hide-scrollbar pointer-events-auto items-stretch">
            {[
              { name: 'Classic', desc: 'Original Taste', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Coca_Cola_Flasche_-_Original_Taste.jpg/960px-Coca_Cola_Flasche_-_Original_Taste.jpg' },
              { name: 'Zero Sugar', desc: 'Zero Calories', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Coca_cola_zero_1.jpg/960px-Coca_cola_zero_1.jpg' },
              { name: 'Diet Coke', desc: 'Crisp & Light', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Diet_coke_1.jpg/960px-Diet_coke_1.jpg' },
              { name: 'Cherry', desc: 'A Dash of Cherry', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Coca-Cola_Cherry_Poland.png/960px-Coca-Cola_Cherry_Poland.png' },
              { name: 'Vanilla', desc: 'Smooth Vanilla', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Vanilla_Coca-Cola.jpg/960px-Vanilla_Coca-Cola.jpg' },
              { name: 'BlāK', desc: 'Coffee Infused', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80' }
            ].map((flavor, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 className="min-w-[280px] md:min-w-[320px] snap-center aspect-[4/5] bg-white rounded-[2rem] flex flex-col items-center justify-end p-8 hover:-translate-y-4 transition-all duration-500 cursor-pointer shadow-2xl group border border-white/10 relative overflow-hidden"
               >
                 {/* Real Picture Background seamlessly blended onto white */}
                 <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center p-8 pb-32">
                    <img 
                      src={flavor.img} 
                      alt={flavor.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" 
                    />
                 </div>
                 
                 <h3 className="text-4xl font-black text-black uppercase text-center mb-2 tracking-tight relative z-10 drop-shadow-md">{flavor.name}</h3>
                 <p className="text-black/60 font-black tracking-widest uppercase text-xs relative z-10">{flavor.desc}</p>
               </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. Brand & Culture */}
      <section className="h-[100vh] w-full flex items-end md:items-center justify-center md:justify-start px-6 pb-24 md:pb-0 md:px-24 relative pointer-events-auto bg-black">
        {/* Scrolling Marquees Background */}
        <div className="absolute inset-0 flex flex-col justify-center opacity-5 pointer-events-none overflow-hidden select-none gap-8">
           <motion.div style={{ x: marqueeX }} className="text-[10vw] font-black text-white whitespace-nowrap">POP CULTURE • GLOBAL ICON • REAL MAGIC • POP CULTURE • GLOBAL ICON • REAL MAGIC •</motion.div>
           <motion.div style={{ x: marqueeXReverse, WebkitTextStroke: '2px white' }} className="text-[10vw] font-black text-transparent stroke-text whitespace-nowrap">TASTE THE FEELING • REFRESH THE WORLD • TASTE THE FEELING • REFRESH THE WORLD •</motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl relative z-10 flex flex-col items-center text-center md:items-start md:text-left"
        >
          <div className="w-20 h-1 bg-white mb-6 md:mb-8" />
          <h2 className="text-5xl md:text-8xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter leading-none">Culture<br/>& Canvas</h2>
          <p className="text-lg md:text-2xl text-white/80 leading-snug mb-6 md:mb-8 font-light max-w-xl">
            From iconic Christmas campaigns to unforgettable summer anthems, Coca-Cola is deeply woven into the fabric of global culture.
          </p>
          <p className="text-sm md:text-lg text-white/50 leading-relaxed font-light max-w-xl mb-12">
            We don't just create a beverage. We curate experiences, build memories, and sponsor the world's most massive sporting and musical events. The Coca-Cola contour bottle has been painted by Andy Warhol and held by millions, proving that great design is truly universal.
          </p>
        </motion.div>
      </section>

      {/* 6. Video Advertisement */}
      <section className="h-[100vh] w-full flex items-center justify-center relative pointer-events-auto bg-black overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] z-20">
         <div className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none z-10">
           {/* Place ad.mp4 in the public folder to display your Gemini Veo video */}
           <video
             src="/ad.mp4"
             autoPlay
             muted
             loop
             playsInline
             className="w-full h-full object-cover scale-[1.1] opacity-60 mix-blend-screen pointer-events-none"
             poster="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1600&q=80"
           />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none z-10" />
         
         <div className="absolute top-12 left-0 w-full flex justify-between px-12 z-20 text-white/50 font-black uppercase tracking-[0.5em] text-xs">
            <span>A Veo Original</span>
            <span>01:18:86</span>
         </div>
         
         <div className="relative z-30 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
            <h2 className="text-[12vw] leading-[0.85] font-black text-transparent stroke-text mb-6 uppercase tracking-tighter mix-blend-difference" style={{ WebkitTextStroke: '2px white' }}>
              FUTURE <br /> <span className="text-white drop-shadow-[0_0_50px_rgba(244,0,9,0.8)]" style={{ WebkitTextStroke: '0px' }}>UNCAPPED</span>
            </h2>
            <p className="text-white/80 text-xl md:text-2xl font-light tracking-widest max-w-2xl mb-10">
              The next generation of refreshment. Fully realized by Gemini Veo.
            </p>
            <button className="bg-white text-black hover:bg-[#F40009] hover:text-white px-12 py-5 rounded-full font-black tracking-[0.3em] uppercase transition-all transform hover:scale-110 shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_50px_rgba(244,0,9,0.5)] pointer-events-auto cursor-pointer">
              Play Full Film
            </button>
         </div>
      </section>

      {/* 7. Sustainability & Global Footer */}
      <section className="h-[100vh] w-full flex flex-col justify-end pb-12 relative bg-[#0a0a0a] pointer-events-auto overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent opacity-80 pointer-events-none" />
        
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-end relative z-10 flex-1 py-32">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             className="text-center md:text-left flex flex-col md:items-start items-center"
           >
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">World Without<br/>Waste</h2>
              <p className="text-xl text-white/60 leading-relaxed mb-10 font-light max-w-xl">
                Our global sustainability goal: Collect and recycle a bottle or can for every one we sell by 2030, and make our packaging 100% recyclable worldwide.
              </p>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer">
                Learn Our Goals
              </button>
           </motion.div>
        </div>
        
        {/* Actual Footer links */}
        <div className="w-full max-w-7xl mx-auto px-6 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4">
           <div className="text-white font-black text-2xl tracking-tighter mix-blend-overlay opacity-50">COCA-COLA</div>
           <p className="text-white/40 text-xs uppercase tracking-widest font-bold text-center">© 2026 The Coca-Cola Company. All rights reserved.</p>
        </div>
      </section>
    </div>
  )
}
