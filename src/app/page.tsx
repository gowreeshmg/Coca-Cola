import { SmoothScroll } from '@/components/SmoothScroll'
import { CanvasContainer } from '@/components/CanvasContainer'
import { OverlayUI } from '@/components/OverlayUI'

export default function Home() {
  return (
    <SmoothScroll>
      {/* 700vh allows for 7 distinct, incredibly rich scroll sections */}
      <main id="main-scroll" className="relative w-full bg-[#0a0a0a] min-h-[700vh]">
        <CanvasContainer />
        <OverlayUI />
      </main>
    </SmoothScroll>
  )
}
