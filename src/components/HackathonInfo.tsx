import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Lightning, UsersThree } from '@phosphor-icons/react'

const prizes = [
  { place: '1st Place', amount: '$5,000', extras: '$2,500 Serverpod Cloud credit' },
  { place: '2nd Place', amount: '$3,000', extras: '$2,000 Serverpod Cloud credit' },
  { place: '3rd Place', amount: '$1,000', extras: '$1,500 Serverpod Cloud credit' },
  { place: '4th Place', amount: '$500', extras: '$1,500 Serverpod Cloud credit' },
  { place: '5th Place', amount: '$0', extras: '$1,500 Serverpod Cloud credit' },
  { place: 'Popular Choice', amount: '$0', extras: '$500 Serverpod Cloud credit' },
  { place: 'Most Valuable Feedback', amount: '$500', extras: '$500 Serverpod Cloud credit' },
]

const ideaPrompts = [
  'AI helpers that summarize meetings, docs, and inboxes',
  'Automations that run daily routines with minimal clicks',
  'Smart assistants for scheduling and reminders',
  'Tools to track habits, goals, or personal metrics',
  'Productivity dashboards with insights',
  'Workflow builders that save time',
]

export function HackathonInfo() {
  return (
    <Card className="bg-card/80 backdrop-blur-xl border-2 border-white/10 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl flex items-center gap-3">
          <Lightning size={28} weight="fill" className="text-primary" />
          Hackathon Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <UsersThree className="text-accent" size={24} weight="duotone" />
            <p className="text-lg font-bold text-foreground">Event Details</p>
          </div>
          <p className="text-muted-foreground font-medium">
            Join the Serverpod Flutter Hackathon! Build amazing apps and win prizes.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange/10 to-orange/5 border border-orange/20">
          <p className="text-lg font-bold text-foreground mb-2">What to Build</p>
          <p className="text-muted-foreground font-medium mb-3">
            Create tools that help people be more productive and combine them with AI capabilities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ideaPrompts.map((idea) => (
              <div key={idea} className="p-2 rounded-lg border border-white/10 bg-muted/40 text-sm text-foreground">
                {idea}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-card/70 shadow-xl space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Trophy size={24} weight="fill" className="text-yellow" />
            Prizes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {prizes.map((prize) => (
              <div
                key={prize.place}
                className="p-4 rounded-xl border border-border bg-background/50 hover:border-primary/50 transition-colors"
              >
                <p className="text-sm text-muted-foreground font-semibold">{prize.place}</p>
                <p className="text-xl font-bold text-foreground">{prize.amount}</p>
                <p className="text-xs text-foreground/80 font-medium">{prize.extras}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
