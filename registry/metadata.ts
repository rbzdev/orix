export interface ComponentMetadata {
  usage: string
  props?: {
    name: string
    type: string
    values?: string[]
    default?: string
  }[]
}

export const componentsMetadata: Record<string, ComponentMetadata> = {
  // ==========================================
  // BUTTON
  // ==========================================
  "button": {
    usage: `import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  )
}`,
    props: [
      { name: "variant", type: "enum", values: ["default", "destructive", "outline", "secondary", "ghost", "link"], default: "default" },
      { name: "size", type: "enum", values: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"], default: "default" }
    ]
  },

  // ==========================================
  // THEME TOGGLE
  // ==========================================
  "theme-toggle": {
    usage: `import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  return (
    <ThemeToggle 
      animation="circle" 
      duration={600} 
      origin="center" 
    />
  )
}`,
    props: [
      { name: "animation", type: "enum", values: ["morph", "circle", "diamond", "wipe", "flip"], default: "diamond" },
      { name: "origin", type: "enum", values: ["button", "center", "top-left", "top-right", "bottom-left", "bottom-right", "top", "bottom", "left", "right"], default: "button" },
      { name: "duration", type: "number", default: "500" },
      { name: "morphRays", type: "number", default: "12" }
    ]
  },

  // ==========================================
  // FLOATING ICONS
  // ==========================================
  "floating-icons": {
    usage: `import { FloatingIcons } from "@/components/block/floating-icons"

export default function LandingPage() {
  return (
    <div className="relative h-screen bg-black">
      <FloatingIcons className="opacity-50" />
      <div className="relative z-10 flex items-center justify-center h-full">
         <h1 className="text-white text-6xl font-bold">Orix</h1>
      </div>
    </div>
  )
}`,
    props: [
      { name: "className", type: "string" }
    ]
  },

  // ==========================================
  // MAGNETIC BUTTON
  // ==========================================
  "magnetic-button": {
    usage: `import { MagneticButton } from "@/components/ui/magnetic-button"

export default function Demo() {
  return (
    <MagneticButton strength={40} distance={80}>
      Hover Me
    </MagneticButton>
  )
}`,
    props: [
      { name: "strength", type: "number", default: "30" },
      { name: "distance", type: "number", default: "60" }
    ]
  },

  // ==========================================
  // VELOCITY SCROLL
  // ==========================================
  "velocity-scroll": {
    usage: `import { VelocityScroll } from "@/components/block/velocity-scroll"

export default function Section() {
  return <VelocityScroll text="ORIX UI PREMIUM " />
}`,
    props: [
      { name: "text", type: "string" },
      { name: "default_velocity", type: "number", default: "5" }
    ]
  },

  // ==========================================
  // GOOEY BUTTON
  // ==========================================
  "gooey-button": {
    usage: `import { GooeyButton } from "@/components/ui/gooey-button"

export default function Demo() {
  return <GooeyButton>Join the Club</GooeyButton>
}`,
    props: [
      { name: "variant", type: "enum", values: ["default", "secondary", "destructive", "amber", "emerald"], default: "default" },
      { name: "gooeyColor", type: "string" }
    ]
  },

  // ==========================================
  // LETTER PULL BUTTON
  // ==========================================
  "letter-pull-button": {
    usage: `import { LetterPullButton } from "@/components/ui/letter-pull-button"

export default function Demo() {
  return <LetterPullButton text="EXPLORE" pullDistance={15} />
}`,
    props: [
      { name: "text", type: "string" },
      { name: "pullDistance", type: "number", default: "10" }
    ]
  },

  // ==========================================
  // INTERACTIVE GRID
  // ==========================================
  "interactive-grid": {
    usage: `import { InteractiveGrid } from "@/components/block/interactive-grid"

export default function Section() {
  return <InteractiveGrid gridSize={50} dotSize={3} />
}`,
    props: [
      { name: "gridSize", type: "number", default: "40" },
      { name: "dotSize", type: "number", default: "2" }
    ]
  },

  // ==========================================
  // SPOTLIGHT CARD
  // ==========================================
  "spotlight-card": {
    usage: `import { SpotlightCard } from "@/components/ui/spotlight-card"

export default function Demo() {
  return (
    <SpotlightCard>
      <h3 className="text-xl font-bold">Spotlight</h3>
      <p className="text-muted-foreground mt-2">Interactive card effect.</p>
    </SpotlightCard>
  )
}`,
    props: [
      { name: "spotlightColor", type: "string", default: "rgba(255,255,255,0.1)" }
    ]
  },

  // ==========================================
  // GLITCH TEXT
  // ==========================================
  "glitch-text": {
    usage: `import { GlitchText } from "@/components/ui/glitch-text"

export default function Demo() {
  return <GlitchText text="SYSTEM ERROR" className="text-6xl" />
}`,
    props: [
      { name: "text", type: "string" }
    ]
  },

  // ==========================================
  // TERMINAL
  // ==========================================
  "terminal": {
    usage: `import { Terminal } from "@/components/block/terminal"

export default function Demo() {
  return <Terminal />
}`,
    props: [
      { name: "lines", type: "array" }
    ]
  },

  // ==========================================
  // WARP BUTTON
  // ==========================================
  "warp-button": {
    usage: `import { WarpButton } from "@/components/ui/warp-button"

export default function Demo() {
  return <WarpButton>Trigger Warp</WarpButton>
}`,
    props: []
  },

  // ==========================================
  // SCAN BUTTON
  // ==========================================
  "scan-button": {
    usage: `import { ScanButton } from "@/components/ui/scan-button"

export default function Demo() {
  return <ScanButton>Access Granted</ScanButton>
}`,
    props: []
  },

  // ==========================================
  // HERO BENTO
  // ==========================================
  "hero-bento": {
    usage: `import { HeroBento } from "@/components/block/hero-bento"

export default function Page() {
  return <HeroBento />
}`,
    props: []
  },

  // ==========================================
  // TILT CARD
  // ==========================================
  "tilt-card": {
    usage: `import { TiltCard } from "@/components/ui/tilt-card"

export default function Demo() {
  return (
    <TiltCard rotateXMax={20} rotateYMax={20}>
      <h3 className="text-2xl font-bold">Interactive Tilt</h3>
      <p className="text-muted-foreground">Hover to experience 3D depth.</p>
    </TiltCard>
  )
}`,
    props: [
      { name: "rotateXMax", type: "number", default: "15" },
      { name: "rotateYMax", type: "number", default: "15" }
    ]
  },

  // ==========================================
  // NEON BUTTON
  // ==========================================
  "neon-button": {
    usage: `import { NeonButton } from "@/components/ui/neon-button"

export default function Demo() {
  return <NeonButton neonColor="hsl(var(--primary))">Cyberpunk</NeonButton>
}`,
    props: [
      { name: "neonColor", type: "string" }
    ]
  },

  // ==========================================
  // MAGNETIC TEXT
  // ==========================================
  "magnetic-text": {
    usage: `import { MagneticText } from "@/components/ui/magnetic-text"

export default function Demo() {
  return (
    <h2 className="text-5xl font-black">
      <MagneticText>PULL</MagneticText> ME
    </h2>
  )
}`,
    props: [
      { name: "strength", type: "number", default: "0.4" }
    ]
  },

  // ==========================================
  // NOISE CARD
  // ==========================================
  "noise-card": {
    usage: `import { NoiseCard } from "@/components/ui/noise-card"

export default function Demo() {
  return (
    <NoiseCard noiseOpacity={0.08}>
      <h3 className="text-xl font-bold">Grained Texture</h3>
      <p className="text-muted-foreground">Subtle SVG noise overlay.</p>
    </NoiseCard>
  )
}`,
    props: [
      { name: "noiseOpacity", type: "number", default: "0.05" }
    ]
  },

  // ==========================================
  // GLASS CARD
  // ==========================================
  "glass-card": {
    usage: `import { GlassCard } from "@/components/ui/glass-card"

export default function Demo() {
  return (
    <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-20">
      <GlassCard intensity="medium">
        <h3 className="text-white text-xl font-bold">Frosted Glass</h3>
        <p className="text-white/70">Premium backdrop blur effect.</p>
      </GlassCard>
    </div>
  )
}`,
    props: [
      { name: "intensity", type: "enum", values: ["low", "medium", "high"], default: "medium" }
    ]
  },

  // ==========================================
  // SHIMMER BUTTON
  // ==========================================
  "shimmer-button": {
    usage: `import { ShimmerButton } from "@/components/ui/shimmer-button"

export default function Demo() {
  return <ShimmerButton>Ignite</ShimmerButton>
}`,
    props: []
  },

  // ==========================================
  // PRICING SECTION
  // ==========================================
  "pricing-section": {
    usage: `import { PricingSection } from "@/components/block/pricing-section"

export default function Page() {
  return <PricingSection />
}`,
    props: []
  },

  // ==========================================
  // TESTIMONIALS SECTION
  // ==========================================
  "testimonials-section": {
    usage: `import { TestimonialsSection } from "@/components/block/testimonials-section"

export default function Page() {
  return <TestimonialsSection />
}`,
    props: []
  },

  // ==========================================
  // FAQ SECTION
  // ==========================================
  "faq-section": {
    usage: `import { FaqSection } from "@/components/block/faq-section"

export default function Page() {
  return <FaqSection />
}`,
    props: []
  },

  // ==========================================
  // NUMBER TICKER
  // ==========================================
  "number-ticker": {
    usage: `import { NumberTicker } from "@/components/ui/number-ticker"

export default function Demo() {
  return (
    <div className="text-8xl font-black">
      <NumberTicker value={2500} />+
    </div>
  )
}`,
    props: [
      { name: "value", type: "number" },
      { name: "direction", type: "enum", values: ["up", "down"], default: "up" },
      { name: "delay", type: "number", default: "0" }
    ]
  },

  // ==========================================
  // COPY INPUT
  // ==========================================
  "copy-input": {
    usage: `import { CopyInput } from "@/components/ui/copy-input"

export default function Demo() {
  return <CopyInput value="sk_test_51Mz...789" label="Your Secret Key" />
}`,
    props: [
      { name: "value", type: "string" },
      { name: "label", type: "string" }
    ]
  },

  // ==========================================
  // STATUS BADGE
  // ==========================================
  "status-badge": {
    usage: `import { StatusBadge } from "@/components/ui/status-badge"

export default function Demo() {
  return (
    <div className="flex gap-4">
      <StatusBadge variant="success">System Live</StatusBadge>
      <StatusBadge variant="error" pulse={false}>Offline</StatusBadge>
    </div>
  )
}`,
    props: [
      { name: "variant", type: "enum", values: ["success", "warning", "error", "info", "neutral"], default: "success" },
      { name: "pulse", type: "boolean", default: "true" }
    ]
  },

  // ==========================================
  // SKELETON
  // ==========================================
  "skeleton": {
    usage: `import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}`,
    props: []
  },

  // ==========================================
  // DROPDOWN MENU
  // ==========================================
  "dropdown-menu": {
    usage: `import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function Demo() {
  const items = [
    { label: "Profile", icon: "solar:user-bold", onClick: () => console.log("Profile") },
    { label: "Settings", icon: "solar:settings-bold", shortcut: "⌘S" },
    { label: "Logout", icon: "solar:logout-bold", variant: "destructive" }
  ]

  return (
    <DropdownMenu 
      trigger={<Button>Open Menu</Button>}
      items={items}
    />
  )
}`,
    props: [
      { name: "trigger", type: "ReactNode" },
      { name: "items", type: "array" },
      { name: "align", type: "enum", values: ["left", "right", "center"], default: "right" }
    ]
  },

  // ==========================================
  // CHECKBOX
  // ==========================================
  "checkbox": {
    usage: `import { Checkbox } from "@/components/ui/checkbox"

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Accept terms" variant="bounce" />
      <Checkbox label="Marketing emails" variant="reveal" size="sm" />
    </div>
  )
}`,
    props: [
      { name: "label", type: "string" },
      { name: "size", type: "enum", values: ["sm", "md", "lg"], default: "md" },
      { name: "variant", type: "enum", values: ["bounce", "scale", "reveal"], default: "bounce" }
    ]
  },

  // ==========================================
  // SWITCH
  // ==========================================
  "switch": {
    usage: `import { Switch } from "@/components/ui/switch"

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <Switch label="Dark Mode" size="md" />
      <Switch label="Notifications" size="lg" />
    </div>
  )
}`,
    props: [
      { name: "label", type: "string" },
      { name: "size", type: "enum", values: ["sm", "md", "lg"], default: "md" },
      { name: "disabled", type: "boolean", default: "false" }
    ]
  },

  // ==========================================
  // RADIAL GAUGE
  // ==========================================
  "radial-gauge": {
    usage: `import { RadialGauge } from "@/components/ui/radial-gauge"

export default function Demo() {
  return (
    <div className="flex gap-8">
      <RadialGauge value={75} label="Server Load" color="#3b82f6" />
      <RadialGauge value={92} label="Storage" color="#ef4444" />
    </div>
  )
}`,
    props: [
      { name: "value", type: "number" },
      { name: "max", type: "number", default: "100" },
      { name: "size", type: "number", default: "200" },
      { name: "label", type: "string" },
      { name: "color", type: "string" }
    ]
  },

  // ==========================================
  // EXPANDABLE DOCK
  // ==========================================
  "expandable-dock": {
    usage: `import { ExpandableDock } from "@/components/ui/expandable-dock"

const items = [
  { title: "Home", icon: "solar:home-2-bold-duotone", href: "#" },
  { title: "Products", icon: "solar:widget-bold-duotone", href: "#" },
  { title: "Analytics", icon: "solar:chart-2-bold-duotone", href: "#" },
  { title: "Settings", icon: "solar:settings-bold-duotone", href: "#" }
]

export default function Demo() {
  return <ExpandableDock items={items} />
}`,
    props: [
      { name: "items", type: "array" }
    ]
  },

  // ==========================================
  // INTERACTIVE STACK
  // ==========================================
  "interactive-stack": {
    usage: `import { InteractiveStack } from "@/components/ui/interactive-stack"

const items = [
  { title: "Design System", description: "Atomic components for modern apps.", color: "#3b82f6" },
  { title: "Motion Lab", description: "Physics-based animation engine.", color: "#8b5cf6" },
  { title: "Cloud Edge", description: "Global deployment infrastructure.", color: "#ec4899" }
]

export default function Demo() {
  return <InteractiveStack items={items} />
}`,
    props: [
      { name: "items", type: "array" }
    ]
  },

  // ==========================================
  // INFINITE MARQUEE
  // ==========================================
  "infinite-marquee": {
    usage: `import { InfiniteMarquee } from "@/components/block/infinite-marquee"

const items = [
  { name: "React", icon: "logos:react" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "Framer", icon: "logos:framer" },
  { name: "Tailwind", icon: "logos:tailwindcss-icon" }
]

export default function Demo() {
  return <InfiniteMarquee items={items} />
}`,
    props: [
      { name: "items", type: "array" },
      { name: "direction", type: "enum", values: ["left", "right"], default: "left" },
      { name: "speed", type: "number", default: "40" }
    ]
  },

  // ==========================================
  // INPUT
  // ==========================================
  "input": {
    usage: `import { Input } from "@/components/ui/input"

export default function Demo() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input placeholder="Enter your email" />
      <Input placeholder="Error state" error />
      <Input placeholder="Disabled state" disabled />
    </div>
  )
}`,
    props: [
      { name: "error", type: "boolean", default: "false" }
    ]
  },

  // ==========================================
  // DIALOG
  // ==========================================
  "dialog": {
    usage: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {/* Form content */}
      </DialogContent>
    </Dialog>
  )
}`,
    props: [
      { name: "variant", type: "enum", values: ["default", "expand", "slide-up", "drawer-right", "drawer-bottom"], default: "default" }
    ]
  },

  // ==========================================
  // FEATURE MODERN
  // ==========================================
  "feature-modern": {
    usage: `import { FeatureModern } from "@/components/block/feature-modern"

export default function Demo() {
  return <FeatureModern />
}`,
    props: []
  },

  // ==========================================
  // INTERACTIVE LINES
  // ==========================================
  "interactive-lines": {
    usage: `import { InteractiveLines } from "@/components/block/interactive-lines"

export default function Demo() {
  return <InteractiveLines />
}`,
    props: []
  },

  // ==========================================
  // LIQUID AURA
  // ==========================================
  "liquid-aura": {
    usage: `import { LiquidAura } from "@/components/block/liquid-aura"

export default function Demo() {
  return <LiquidAura />
}`,
    props: [
      { name: "variant", type: "enum", values: ["aurora", "nebula", "magma", "ocean"], default: "aurora" }
    ]
  },

  // ==========================================
  // PARTICLE VORTEX
  // ==========================================
  "particle-vortex": {
    usage: `import { ParticleVortex } from "@/components/block/particle-vortex"

export default function Demo() {
  return (
    <div className="flex flex-col gap-8">
      <ParticleVortex variant="gravity" count={150} />
      <ParticleVortex variant="repel" />
    </div>
  )
}`,
    props: [
      { name: "count", type: "number", default: "100" },
      { name: "variant", type: "enum", values: ["gravity", "repel", "drift"], default: "gravity" }
    ]
  },

  // ==========================================
  // MAGNETIC SURFACE
  // ==========================================
  "magnetic-surface": {
    usage: `import { MagneticSurface } from "@/components/block/magnetic-surface"

export default function Demo() {
  return (
    <div className="space-y-8">
      <MagneticSurface variant="arrows" />
      <MagneticSurface variant="lines" gridSize={40} />
    </div>
  )
}`,
    props: [
      { name: "variant", type: "enum", values: ["arrows", "lines", "crosses"], default: "arrows" },
      { name: "gridSize", type: "number", default: "35" }
    ]
  },

  // ==========================================
  // NOISE MESH
  // ==========================================
  "noise-mesh": {
    usage: `import { NoiseMesh } from "@/components/block/noise-mesh"

export default function Demo() {
  return <NoiseMesh variant="fluid" />
}`,
    props: [
      { name: "variant", type: "enum", values: ["fluid", "topography", "glitch"], default: "fluid" }
    ]
  },

  // ==========================================
  // FLOATING CONSTELLATION
  // ==========================================
  "floating-constellation": {
    usage: `import { FloatingConstellation } from "@/components/block/floating-constellation"

export default function Demo() {
  return <FloatingConstellation variant="connected" count={50} />
}`,
    props: [
      { name: "variant", type: "enum", values: ["connected", "orbit", "dust"], default: "connected" },
      { name: "count", type: "number", default: "40" }
    ]
  },

  // ==========================================
  // PREMIUM CAROUSEL
  // ==========================================
  "carousel": {
    usage: `import { Carousel } from "@/components/block/carousel"

const DEMO_ITEMS = [
  {
    id: 1,
    title: "Celestial Horizons",
    description: "Explore the deep reaches of the neon-lit nebula.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000",
    category: "Space"
  },
  {
    id: 2,
    title: "Urban Cybernetics",
    description: "The intersection of biology and technology.",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=1000",
    category: "Architecture"
  }
]

export default function Demo() {
  return (
    <Carousel 
      items={DEMO_ITEMS} 
      variant="stack" 
      primaryColor="rgb(59, 130, 246)" 
    />
  )
}`,
    props: [
      { name: "items", type: "array" },
      { name: "variant", type: "enum", values: ["default", "stack", "flat", "cards"], default: "default" },
      { name: "orientation", type: "enum", values: ["horizontal", "vertical"], default: "horizontal" },
      { name: "primaryColor", type: "string", default: "rgb(var(--primary))" }
    ]
  },
  "tabs": {
    usage: `import { Tabs } from "@/components/ui/tabs"

export default function Demo() {
  const TABS = [
    { label: "Overview", value: "overview" },
    { label: "Analytics", value: "analytics" },
    { label: "Development", value: "dev" },
    { label: "Settings", value: "settings" }
  ]

  return (
    <div className="flex flex-col gap-12">
      <Tabs tabs={TABS} variant="pills" />
      <Tabs tabs={TABS} variant="underline" />
    </div>
  )
}`,
    props: [
      { name: "tabs", type: "array" },
      { name: "variant", type: "enum", values: ["pills", "underline", "floating", "kinetic"], default: "pills" },
      { name: "defaultValue", type: "string" }
    ]
  },

  // ==========================================
  // TEXT SCRAMBLE
  // ==========================================
  "text-scramble": {
    usage: `import { TextScramble } from "@/components/ui/text-scramble"

export default function Demo() {
  return (
    <h1 className="text-4xl font-bold">
      <TextScramble text="SYSTEM INITIALIZATION" duration={1200} />
    </h1>
  )
}`,
    props: [
      { name: "text", type: "string" },
      { name: "duration", type: "number", default: "800" },
      { name: "trigger", type: "boolean", default: "true" }
    ]
  },

  // ==========================================
  // BORDER BEAM
  // ==========================================
  "border-beam": {
    usage: `import { BorderBeam } from "@/components/ui/border-beam"

export default function Demo() {
  return (
    <div className="relative w-full max-w-sm p-4 rounded-xl border bg-black text-white">
      <BorderBeam />
      <h3 className="text-lg font-bold">Magic Card </h3>
    </div>
  )
}`,
    props: [
      { name: "size", type: "number", default: "200" },
      { name: "duration", type: "number", default: "8" },
      { name: "borderWidth", type: "number", default: "2" },
      { name: "colorFrom", type: "string", default: "#ffaa40" },
      { name: "colorTo", type: "string", default: "#9c40ff" }
    ]
  },

  // ==========================================
  // FLIP WORDS
  // ==========================================
  "flip-words": {
    usage: `import { FlipWords } from "@/components/ui/flip-words"

export default function Demo() {
  return (
    <div className="text-4xl font-bold text-black dark:text-white">
      Build
      <FlipWords words={["better", "faster", "beautiful", "modern"]} />
      websites
    </div>
  )
}`,
    props: [
      { name: "words", type: "string[]" },
      { name: "duration", type: "number", default: "2000" }
    ]
  },

  // ==========================================
  // BLUR FADE
  // ==========================================
  "blur-fade": {
    usage: `import { BlurFade } from "@/components/ui/blur-fade"

export default function Demo() {
  return (
    <BlurFade delay={0.25} inView>
      <h2 className="text-3xl font-bold tracking-tighter">
        Hello World
      </h2>
    </BlurFade>
  )
}`,
    props: [
      { name: "delay", type: "number", default: "0" },
      { name: "duration", type: "number", default: "0.5" },
      { name: "inView", type: "boolean", default: "false" },
      { name: "blur", type: "string", default: "8px" }
    ]
  },

  // ==========================================
  // TOOLTIP
  // ==========================================
  "tooltip": {
    usage: `import { Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <Tooltip content="This is a tooltip!" side="top" variant="dark">
      <Button variant="outline">Hover Me</Button>
    </Tooltip>
  )
}`,
    props: [
      { name: "content", type: "ReactNode" },
      { name: "side", type: "enum", values: ["top", "bottom", "left", "right"], default: "top" },
      { name: "variant", type: "enum", values: ["dark", "light", "glass", "primary"], default: "dark" },
      { name: "delay", type: "number", default: "100" }
    ]
  },

  // ==========================================
  // PROGRESS RING
  // ==========================================
  "progress-ring": {
    usage: `import { ProgressRing } from "@/components/ui/progress-ring"

export default function Demo() {
  return (
    <div className="flex gap-8">
      <ProgressRing value={72} label="CPU" variant="glow" />
      <ProgressRing value={48} label="Memory" variant="gradient" color="#ec4899" />
    </div>
  )
}`,
    props: [
      { name: "value", type: "number" },
      { name: "max", type: "number", default: "100" },
      { name: "size", type: "number", default: "120" },
      { name: "strokeWidth", type: "number", default: "10" },
      { name: "color", type: "string" },
      { name: "label", type: "string" },
      { name: "showValue", type: "boolean", default: "true" },
      { name: "variant", type: "enum", values: ["default", "gradient", "glow"], default: "default" }
    ]
  },

  // ==========================================
  // TYPEWRITER
  // ==========================================
  "typewriter": {
    usage: `import { Typewriter } from "@/components/ui/typewriter"

export default function Demo() {
  return (
    <h2 className="text-4xl font-bold">
      Build{" "}
      <Typewriter
        words={["fast.", "beautiful.", "modern.", "with Orix."]}
        typingSpeed={80}
        className="text-primary"
      />
    </h2>
  )
}`,
    props: [
      { name: "words", type: "string[]" },
      { name: "typingSpeed", type: "number", default: "80" },
      { name: "deletingSpeed", type: "number", default: "40" },
      { name: "pauseDuration", type: "number", default: "1800" },
      { name: "cursorChar", type: "string", default: "|" },
      { name: "loop", type: "boolean", default: "true" }
    ]
  }
}
