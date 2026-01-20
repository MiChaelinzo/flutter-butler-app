import { Code, CloudArrowUp, Database } from '@phosphor-icons/react'

export function PoweredByFooter() {
  return (
    <footer className="py-10 mt-20 border-t border-primary/30 backdrop-blur-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 text-muted-foreground font-medium">
            <Code size={24} weight="duotone" className="text-primary" />
            <span className="text-base tracking-[0.02em]">Powered by</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="group relative px-8 py-4 rounded-2xl bg-gradient-to-br from-accent/25 to-accent/10 border-2 border-accent/40 backdrop-blur-xl shadow-[0_0_30px_rgba(173,77,213,0.2)] hover:shadow-[0_0_45px_rgba(173,77,213,0.4)] transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <CloudArrowUp size={28} weight="duotone" className="text-accent" />
                <span className="font-black text-xl tracking-[0.04em] uppercase text-gradient-cyber">Flutter</span>
              </div>
            </div>
            
            <span className="text-3xl font-bold text-primary">+</span>
            
            <div className="group relative px-8 py-4 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/10 border-2 border-primary/40 backdrop-blur-xl shadow-[0_0_30px_rgba(114,192,255,0.2)] hover:shadow-[0_0_45px_rgba(114,192,255,0.4)] transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <Database size={28} weight="duotone" className="text-primary" />
                <span className="font-black text-xl tracking-[0.04em] uppercase text-gradient-cyber">Serverpod</span>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-2 mt-2">
            <p className="text-sm text-muted-foreground font-semibold tracking-[0.02em]">
              Built for the Serverpod Flutter Hackathon
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime animate-pulse shadow-[0_0_10px_rgba(209,237,114,0.8)]" />
              <p className="text-xs text-muted-foreground uppercase tracking-[0.06em]">
                Real-time collaboration • AI-powered productivity
              </p>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(114,192,255,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
