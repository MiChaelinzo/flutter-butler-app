# Planning Guide

A sophisticated AI-powered personal butler dashboard that automates daily tasks, provides intelligent assistance, and helps users stay organized and productive through smart automation and personalized insights.

**Experience Qualities**: 
1. **Sophisticated** - The interface should feel refined and premium, like having a professional personal assistant at your fingertips
2. **Intelligent** - Interactions should feel smart and contextual, anticipating user needs and providing proactive suggestions
3. **Effortless** - Complex automation should feel simple and natural, reducing cognitive load rather than adding to it

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a multi-feature personal assistant platform with AI integration, task automation, smart reminders, quick actions, daily briefings, and personalized insights requiring sophisticated state management and multiple interconnected views.

## Essential Features

### AI-Powered Daily Briefing
- **Functionality**: Generates a personalized daily summary with weather, priorities, suggestions, and insights
- **Purpose**: Helps users start their day informed and focused
- **Trigger**: Automatic on page load or manual refresh button
- **Progression**: User opens app → AI generates briefing with current context → displays weather, top priorities, personalized suggestions → user can regenerate for fresh insights
- **Success criteria**: Briefing loads within 3 seconds, contains relevant personalized information, and users find value in the daily insights

### Smart Quick Actions
- **Functionality**: Customizable AI-powered shortcuts for common tasks (email drafts, meeting prep, research summaries)
- **Purpose**: Saves time on repetitive cognitive tasks
- **Trigger**: Click action button in quick actions grid
- **Progression**: User selects action → enters minimal context → AI processes request → displays result with copy/edit options → user can refine or save
- **Success criteria**: Actions complete in under 5 seconds, output is immediately useful, and users regularly use 3+ actions

### Intelligent Task Management
- **Functionality**: Smart task list with priority suggestions, time estimates, and energy-level matching
- **Purpose**: Helps users manage workload effectively based on context and capacity
- **Trigger**: User adds task or requests AI prioritization
- **Progression**: User enters task → AI suggests priority, time estimate, best time to do it → user can accept or modify → tasks organize intelligently → completion tracking
- **Success criteria**: Users complete more tasks, feel less overwhelmed, and trust AI suggestions

### Context-Aware Reminders
- **Functionality**: Smart reminders that understand time, location context, and dependencies
- **Purpose**: Ensures users never miss important items at the right moment
- **Trigger**: User creates reminder with natural language or selects from suggestions
- **Progression**: User describes what to remember → AI extracts time/context → sets smart reminder → notification appears at optimal moment → user completes or snoozes
- **Success criteria**: 90%+ reminder accuracy, users rely on system over other reminder tools

### Personal Automation Studio
- **Functionality**: Visual automation builder for routine workflows (morning routine, meeting prep, end-of-day review)
- **Purpose**: Eliminates repetitive decision-making and task sequences
- **Trigger**: User creates or runs automation
- **Progression**: User selects automation template → customizes steps and timing → saves automation → runs manually or on schedule → receives consolidated output
- **Success criteria**: Users create 2+ custom automations, report significant time savings

### AI Chat Assistant
- **Functionality**: Conversational interface for ad-hoc questions, brainstorming, and quick help
- **Purpose**: Provides instant intelligent assistance for unexpected needs
- **Trigger**: User opens chat panel or asks question
- **Progression**: User types question → AI provides contextual answer considering user's data → conversation continues naturally → user can save important responses
- **Success criteria**: Responses feel accurate and helpful, users return for multiple queries daily

### Habit Tracking
- **Functionality**: Daily habit tracker with streak monitoring and completion tracking
- **Purpose**: Helps users build consistent positive routines and visualize progress
- **Trigger**: User adds new habit or marks daily completion
- **Progression**: User creates habit → checks off daily → streak counter increments → visual feedback reinforces consistency → long-term habit formation
- **Success criteria**: Users maintain 3+ active habits, streaks motivate continued engagement

### Quick Notes with AI
- **Functionality**: Fast note-taking with AI-powered summarization and search
- **Purpose**: Capture fleeting ideas and important information without losing context
- **Trigger**: User clicks to create new note or searches existing notes
- **Progression**: User writes note → can request AI summary → notes saved with timestamps → searchable by content → easy retrieval when needed
- **Success criteria**: Users capture 5+ notes per week, AI summaries save reading time

### Smart Suggestions
- **Functionality**: Context-aware productivity recommendations based on time of day and usage patterns
- **Purpose**: Proactively guide users toward better productivity habits and workflows
- **Trigger**: Automatic generation on dashboard, refreshable on demand
- **Progression**: AI analyzes context → generates 3-5 actionable suggestions → user reviews and acts → dismisses completed items → new suggestions appear
- **Success criteria**: Users act on 40%+ of suggestions, report finding them helpful

## Edge Case Handling

- **Empty States**: First-time users see guided onboarding with sample data and suggested quick actions to try
- **API Failures**: Graceful fallbacks with cached data and clear error messages with retry options
- **Long-Running AI Tasks**: Progress indicators and ability to continue using app while processing
- **Data Loss Prevention**: Auto-save on all inputs, explicit confirmation before deletions
- **Offline Mode**: Core features (task viewing, manual entry) work without connection, sync when online
- **Overwhelm Protection**: Limit AI suggestions to 3-5 items, allow "quiet mode" to reduce notifications

## Design Direction

The design should evoke the feeling of having a highly capable, attentive personal assistant - professional yet warm, powerful yet approachable. It should feel like a premium service that respects the user's time and intelligence. The interface should be calm and uncluttered, with sophistication in the details rather than overwhelming features.

## Color Selection

A refined, professional palette with warm accents that feels personal and trustworthy rather than cold and corporate.

- **Primary Color**: Deep navy blue (oklch(0.25 0.08 250)) - Communicates professionalism, trust, and intelligence without feeling corporate or sterile
- **Secondary Colors**: Warm off-white backgrounds (oklch(0.98 0.005 90)) for main surfaces, soft slate (oklch(0.85 0.01 240)) for cards - creates depth and visual hierarchy while maintaining sophistication
- **Accent Color**: Warm amber/gold (oklch(0.75 0.15 75)) - Highlights important actions and AI-generated insights, feels premium and energizing like morning sunlight
- **Foreground/Background Pairings**: 
  - Background (Warm Off-white oklch(0.98 0.005 90)): Navy text (oklch(0.25 0.08 250)) - Ratio 10.2:1 ✓
  - Primary (Deep Navy oklch(0.25 0.08 250)): Off-white text (oklch(0.98 0.005 90)) - Ratio 10.2:1 ✓
  - Accent (Warm Amber oklch(0.75 0.15 75)): Navy text (oklch(0.25 0.08 250)) - Ratio 5.1:1 ✓
  - Card (Soft Slate oklch(0.85 0.01 240)): Navy text (oklch(0.25 0.08 250)) - Ratio 6.8:1 ✓

## Font Selection

Typography should feel modern and highly readable with a touch of personality - professional enough for work contexts but warm enough for daily personal use.

- **Primary Font**: Plus Jakarta Sans - A geometric sans-serif that feels contemporary, friendly, and highly legible at all sizes. Works beautifully for both UI elements and content.
- **Accent Font**: Space Grotesk - Used sparingly for headings and key labels, adds subtle technical sophistication appropriate for an AI assistant without feeling cold.

- **Typographic Hierarchy**: 
  - H1 (Page Title): Space Grotesk Bold / 32px / tight letter spacing (-0.02em) / leading-tight
  - H2 (Section Headings): Space Grotesk SemiBold / 24px / normal letter spacing / leading-snug
  - H3 (Card Titles): Plus Jakarta Sans Bold / 18px / slight negative letter spacing (-0.01em) / leading-snug
  - Body (Main Content): Plus Jakarta Sans Regular / 15px / normal letter spacing / leading-relaxed (1.6)
  - Small (Metadata): Plus Jakarta Sans Medium / 13px / normal letter spacing / leading-normal
  - Button Text: Plus Jakarta Sans SemiBold / 15px / slight positive letter spacing (0.01em)

## Animations

Animations should reinforce the feeling of intelligence and responsiveness - smooth, purposeful, and slightly anticipatory. Use spring physics for interactive elements to make the interface feel alive and attentive. AI-generated content should fade in with a subtle upward motion to signal "thinking complete." Cards should have gentle hover lifts (2-4px) to feel tangible. Page transitions should be swift (200ms) to respect user time. Loading states should use elegant skeleton screens rather than spinners. Celebrate task completions with satisfying micro-interactions (gentle scale + color shift).

## Component Selection

- **Components**: 
  - **Dialog/Sheet**: For AI chat interface, automation builders, and detailed task editing - provides focused context
  - **Card**: Primary container for all feature modules with subtle shadows for depth
  - **Button**: Extensive use with variants - solid for primary actions (AI generation), outline for secondary (edit), ghost for tertiary (dismiss)
  - **Input/Textarea**: Clean forms with floating labels for task entry and automation configuration
  - **Badge**: Status indicators for task priority, automation status, reminder timing
  - **ScrollArea**: For task lists and chat history ensuring content never feels cramped
  - **Tabs**: Switch between different butler views (dashboard, tasks, automations, insights)
  - **Separator**: Subtle dividers to create breathing room between sections
  - **Skeleton**: Loading states for AI content generation
  - **Avatar**: User profile in header, personalization touch

- **Customizations**: 
  - Custom AI thinking indicator with pulsing dots in accent color
  - Custom quick action cards with icon backgrounds using subtle gradients
  - Custom task card with inline priority editing and smart time display
  - Custom briefing card with weather icon integration and dynamic greetings
  
- **States**: 
  - Buttons: Default soft shadow, hover lifts 2px with deeper shadow, active slight scale (0.98), focus subtle accent glow
  - Cards: Default subtle border, hover lifts 4px with enhanced shadow and slight accent border glow
  - Inputs: Default light border, focus accent border with subtle outer glow, error state with destructive color
  - Quick Actions: Default muted background, hover accent gradient overlay at 10% opacity, active scale feedback

- **Icon Selection**: 
  - Sparkles (AI generation)
  - Lightning (quick actions)
  - Brain (intelligent features)
  - CheckCircle (task completion)
  - Clock (reminders/time)
  - Robot (AI assistant)
  - Calendar (scheduling)
  - Plus (add new)
  - Copy (copy AI output)
  - ArrowsClockwise (regenerate)
  - List (tasks)
  - Gear (settings)

- **Spacing**: 
  - Container padding: p-6 (desktop), p-4 (mobile)
  - Card internal padding: p-6
  - Section gaps: gap-6 (major sections), gap-4 (related items), gap-2 (tight groups)
  - Grid gaps: gap-4 (card grids), gap-3 (quick actions)
  - Typography spacing: mb-6 (section headings), mb-3 (paragraph breaks)

- **Mobile**: 
  - Single column layout on mobile with full-width cards
  - Tabs transform to bottom navigation bar for thumb access
  - Quick actions grid: 2 columns on mobile, 3-4 on tablet, 4+ on desktop
  - Chat opens as full-screen sheet on mobile, side panel on desktop
  - Task list items stack vertically with swipe actions for quick complete/delete
  - Collapsible sections for briefing on mobile to reduce scroll depth
  - Floating action button for most common action (add task) on mobile
