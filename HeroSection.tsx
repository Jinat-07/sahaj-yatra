'use client'

export function HeroSection() {
  return (
    <div className="relative min-h-[320px] bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center p-4 rounded-2xl overflow-hidden">
      {/* Glassmorphism effect background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
          আপনার যাত্রা হোক আরও সহজ
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-2 text-pretty">
          Your Journey Made Easy
        </p>
        <p className="text-base text-white/80">
          Find and book buses across India with just a few taps
        </p>
      </div>
    </div>
  )
}
