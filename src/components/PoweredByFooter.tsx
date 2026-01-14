import { Code } from '@phosphor-icons/react'

export function PoweredByFooter() {
  return (
    <footer className="py-8 mt-16 border-t border-border/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <Code size={20} weight="duotone" className="text-primary" />
            <span>Powered by</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-xl">
              <span className="font-bold text-foreground">Flutter</span>
            </div>
            <span className="text-muted-foreground font-bold">+</span>
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent/20 to-orange/20 border border-accent/30 backdrop-blur-xl">
              <span className="font-bold text-foreground">Serverpod</span>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Built with ❤️ for the Serverpod Flutter Hackathon
        </p>
      </div>
    </footer>
  )
}
