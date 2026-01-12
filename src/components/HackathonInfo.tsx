import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RocketLaunch, CalendarCheck, Trophy, UsersThree, Lightning } from '@phosphor-icons/react'

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
  'Productivity copilots that plan your day and unblock tasks',
  'AI helpers that summarize meetings, docs, and inboxes',
  'Smart dashboards mixing schedule, tasks, and reminders',
  'Automations that run daily routines with minimal clicks',
  'Experimental assistants that feel fun yet genuinely useful'
]

export function HackathonInfo() {
  return (
    <Card className="shadow-2xl border-2 border-white/10 hover:shadow-accent/30 transition-all duration-300 bg-card backdrop-blur-2xl overflow-hidden">
      <CardHeader className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center border-2 border-white/20 shadow-2xl shadow-primary/30">
            <RocketLaunch className="text-white drop-shadow-lg" size={28} weight="duotone" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Build your Flutter Butler with Serverpod
            </CardTitle>
            <p className="text-muted-foreground font-semibold">
              Global hackathon celebrating Serverpod 3 — build a digital assistant with Flutter + Serverpod.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/30 backdrop-blur">
                Online
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-accent/10 text-accent border border-accent/30 backdrop-blur">
                $10,000+ in prizes
              </span>
            </div>
          </div>
        </div>
        <Button asChild size="lg" className="gap-3 h-12 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary border-2 border-white/20 shadow-lg">
          <a href="https://serverpod.devpost.com/" target="_blank" rel="noreferrer">
            <Lightning size={20} weight="fill" />
            Join the Devpost Hackathon
          </a>
        </Button>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-lg flex items-center gap-3">
            <CalendarCheck className="text-primary" size={28} weight="duotone" />
            <div>
              <p className="text-sm text-muted-foreground font-semibold">Deadline</p>
              <p className="text-lg font-bold text-foreground">Jan 30, 2026 · 7:00pm GMT+3</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 shadow-lg flex items-center gap-3">
            <UsersThree className="text-accent" size={28} weight="duotone" />
            <div>
              <p className="text-sm text-muted-foreground font-semibold">Participation</p>
              <p className="text-lg font-bold text-foreground">Above legal age · Global*</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange/10 to-orange/5 border border-orange/20 shadow-lg flex items-center gap-3">
            <Trophy className="text-orange" size={28} weight="duotone" />
            <div>
              <p className="text-sm text-muted-foreground font-semibold">Awards</p>
              <p className="text-lg font-bold text-foreground">$10,000 cash + credits</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-card/70 shadow-xl space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              What to build
            </h3>
            <p className="text-muted-foreground font-semibold">
              Create a Flutter app powered by Serverpod that acts as a personal assistant or automation partner. Show how Flutter + Serverpod
              combine for useful, delightful workflows.
            </p>
            <ul className="space-y-2 text-foreground font-medium">
              <li>• AI helpers, productivity tools, or automation dashboards</li>
              <li>• New, original project with Flutter front end and Serverpod backend</li>
              <li>• Demonstrate practical impact beyond simple chat</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-card/70 shadow-xl space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">
              Submission checklist
            </h3>
            <ul className="space-y-2 text-foreground font-medium">
              <li>• Working Flutter + Serverpod project (new builds only)</li>
              <li>• Demo video up to 3 minutes</li>
              <li>• Project description with build details</li>
              <li>• Code repository link (share access if private)</li>
              <li>• Optional MVP feedback form for bonus prize</li>
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-card/70 shadow-xl space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Requirement snapshot
          </h3>
          <ul className="space-y-2 text-foreground font-medium">
            <li>• Ship a Flutter app paired with a Serverpod backend</li>
            <li>• Make it a personal assistant, automation, or helpful service</li>
            <li>• Demonstrate Flutter + Serverpod working together in the UX</li>
          </ul>
          <Separator className="bg-white/10" />
          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">Idea starters</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ideaPrompts.map((idea) => (
                <div key={idea} className="p-3 rounded-xl border border-white/10 bg-muted/40 text-sm font-semibold text-foreground/90">
                  {idea}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-card/70 shadow-xl space-y-4">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Trophy className="text-orange" size={26} weight="duotone" />
            Prize pool
          </h3>
          <Separator className="bg-white/10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {prizes.map((prize) => (
              <div
                key={prize.place}
                className="p-4 rounded-xl border border-white/10 bg-gradient-to-br from-background/80 to-accent/5 shadow-md"
              >
                <p className="text-sm text-muted-foreground font-semibold">{prize.place}</p>
                <p className="text-xl font-bold text-foreground">{prize.amount}</p>
                <p className="text-sm text-foreground/80 font-medium">{prize.extras}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            *Standard geographic exceptions apply. See Devpost for full rules and eligibility.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
