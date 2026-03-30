"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FloatingIcons } from "@/components/block/floating-icons"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { MagneticButton } from "@/registry/orix-default/ui/magnetic-button"
import { VelocityScroll } from "@/registry/orix-default/block/velocity-scroll"
import { GooeyButton } from "@/registry/orix-default/ui/gooey-button"
import { LetterPullButton } from "@/registry/orix-default/ui/letter-pull-button"
import { InteractiveGrid } from "@/registry/orix-default/block/interactive-grid"
import { SpotlightCard } from "@/registry/orix-default/ui/spotlight-card"
import { TextScramble } from "@/registry/orix-default/ui/text-scramble"
import { BorderBeam } from "@/registry/orix-default/ui/border-beam"
import { FlipWords } from "@/registry/orix-default/ui/flip-words"
import { BlurFade } from "@/registry/orix-default/ui/blur-fade"
import { Loader } from "@/registry/orix-default/ui/loader"
import { Terminal } from "@/registry/orix-default/block/terminal"
import { WarpButton } from "@/registry/orix-default/ui/warp-button"
import { ScanButton } from "@/registry/orix-default/ui/scan-button"
import { HeroBento } from "@/registry/orix-default/block/hero-bento"

// New UI Components
import { TiltCard } from "@/registry/orix-default/ui/tilt-card"
import { NeonButton } from "@/registry/orix-default/ui/neon-button"
import { MagneticText } from "@/registry/orix-default/ui/magnetic-text"
import { NoiseCard } from "@/registry/orix-default/ui/noise-card"
import { GlassCard } from "@/registry/orix-default/ui/glass-card"
import { GlitchText } from "@/registry/orix-default/ui/glitch-text"
import { ShimmerButton } from "@/registry/orix-default/ui/shimmer-button"

// Essential UI Components
import { NumberTicker } from "@/registry/orix-default/ui/number-ticker"
import { CopyInput } from "@/registry/orix-default/ui/copy-input"
import { StatusBadge } from "@/registry/orix-default/ui/status-badge"
import { Skeleton } from "@/registry/orix-default/ui/skeleton"
import { DropdownMenu } from "@/registry/orix-default/ui/dropdown-menu"
import { Checkbox } from "@/registry/orix-default/ui/checkbox"
import { Switch } from "@/registry/orix-default/ui/switch"
import { Input } from "@/registry/orix-default/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/registry/orix-default/ui/dialog"
import { RadialGauge } from "@/registry/orix-default/ui/radial-gauge"
import { ExpandableDock } from "@/registry/orix-default/ui/expandable-dock"
import { InteractiveStack } from "@/registry/orix-default/ui/interactive-stack"

// New Blocks
import { PricingSection } from "@/registry/orix-default/block/pricing-section"
import { TestimonialsSection } from "@/registry/orix-default/block/testimonials-section"
import { FaqSection } from "@/registry/orix-default/block/faq-section"
import { InfiniteMarquee } from "@/registry/orix-default/block/infinite-marquee"
import { FeatureModern } from "@/registry/orix-default/block/feature-modern"
import { InteractiveLines } from "@/registry/orix-default/block/interactive-lines"
import { LiquidAura } from "@/registry/orix-default/block/liquid-aura"
import { ParticleVortex } from "@/registry/orix-default/block/particle-vortex"
import { MagneticSurface } from "@/registry/orix-default/block/magnetic-surface"
import { NoiseMesh } from "@/registry/orix-default/block/noise-mesh"
import { FloatingConstellation } from "@/registry/orix-default/block/floating-constellation"
import { Carousel } from "@/registry/orix-default/block/carousel"
import { Tabs } from "@/registry/orix-default/ui/tabs"

// New 4 components
import { Tooltip } from "@/registry/orix-default/ui/tooltip"
import { ProgressRing } from "@/registry/orix-default/ui/progress-ring"
import { Typewriter } from "@/registry/orix-default/ui/typewriter"
import { MagicSpells } from "@/registry/orix-default/ui/magic-spells"

interface ComponentPreviewProps {
    name: string
    className?: string
}

export function ComponentPreview({ name, className }: ComponentPreviewProps) {
    const [selectedVariant, setSelectedVariant] = React.useState<any>("default")
    const [selectedOrientation, setSelectedOrientation] = React.useState<any>("horizontal")
    const [selectedColor, setSelectedColor] = React.useState<any>("rgb(var(--primary))")

    const [selectedSize, setSelectedSize] = React.useState<any>("default")
    const [selectedAnimation, setSelectedAnimation] = React.useState<any>("diamond")
    const [selectedOrigin, setSelectedOrigin] = React.useState<any>("center")

    const renderComponent = () => {
        switch (name) {
            case "button":
                return (
                    <div className="flex flex-col items-center gap-8 px-4 py-6 lg:p-10 w-full">
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <Button size={selectedSize}>
                                {selectedSize === "icon" ? <Icon icon="solar:gallery-send-broken" /> : "Push Me"}
                            </Button>

                            <Button variant={"secondary"} size={selectedSize}>
                                {selectedSize === "icon" ? <Icon icon="f7:bell" /> : "Secondary"}
                            </Button>

                            <Button variant={"outline"} size={selectedSize}>
                                {selectedSize === "icon" ? <Icon icon="arcticons:openai-chatgpt" /> : "Outline"}
                            </Button>

                            <Button variant={"destructive"} size={selectedSize}>
                                {selectedSize === "icon" ? <Icon icon="mynaui:trash" /> : "Destructive"}
                            </Button>

                            <Button variant={"ghost"} size={selectedSize}>
                                {selectedSize === "icon" ? <Icon icon="fa7-brands:snapchat" /> : "Ghost"}
                            </Button>

                            <Button variant={"link"} size={selectedSize}>
                                {selectedSize === "icon" ? <Icon icon="line-md:link" /> : "Link"}
                            </Button>
                        </div>

                        <div className="w-full space-y-4 border-t pt-6">

                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sizes</span>
                                <div className="flex flex-wrap gap-2">
                                    {["xs", "sm", "default", "lg", "icon"].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={cn(
                                                "px-2 py-1 text-xs rounded border transition-colors",
                                                selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80"
                                            )}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "theme-toggle":
                return (
                    <div className="flex flex-col items-center gap-8 px-4 py-12 lg:p-10 w-full">
                        <div className="flex items-center justify-center p-8 scale-150">
                            <ThemeToggle animation={selectedAnimation} origin={selectedOrigin} />
                        </div>

                        <div className="w-full space-y-4 border-t pt-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Animations</span>
                                <div className="flex flex-wrap gap-2">
                                    {["morph", "circle", "diamond", "wipe", "flip"].map((a) => (
                                        <button
                                            key={a}
                                            onClick={() => setSelectedAnimation(a)}
                                            className={cn(
                                                "px-2 py-1 text-xs rounded border transition-colors",
                                                selectedAnimation === a ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80"
                                            )}
                                        >
                                            {a}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Origin</span>
                                <div className="flex flex-wrap gap-2">
                                    {["button", "center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"].map((a) => (
                                        <button
                                            key={a}
                                            onClick={() => setSelectedOrigin(a)}
                                            className={cn(
                                                "px-2 py-1 text-xs rounded border transition-colors",
                                                selectedOrigin === a ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80"
                                            )}
                                        >
                                            {a}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "magnetic-button":
                return (
                    <div className="flex items-center justify-center p-20 w-full">
                        <MagneticButton strength={40} distance={100}>
                            Hover Me
                        </MagneticButton>
                    </div>
                )
            case "velocity-scroll":
                return (
                    <div className="w-full py-10">
                        <VelocityScroll text="ORIX UI • PREMIUM • EXCLUSIF • BY RUBUZ • " default_velocity={3} />
                    </div>
                )
            case "gooey-button":
                return (
                    <div className="flex flex-col items-center gap-8 p-6 lg:p-10 w-full">
                        <div className="flex flex-wrap items-center justify-center gap-12">
                            <GooeyButton variant={"default"}>Hover me</GooeyButton>

                            <GooeyButton variant={"destructive"}>Destructive</GooeyButton>

                            <GooeyButton variant={"amber"}>Amber</GooeyButton>

                            <GooeyButton variant={"emerald"}>Emerald</GooeyButton>
                        </div>
                    </div>
                )
            case "letter-pull-button":
                return (
                    <div className="flex flex-wrap items-center justify-center px-4 py-12 lg:p-20 gap-16 w-full">
                        <LetterPullButton
                            text="Hover me"
                            variant={"pull"}
                            className="py-2 "
                        />
                        <LetterPullButton
                            text="Waving text"
                            variant={"wave"}
                            className=" "
                        />
                        <LetterPullButton
                            text="Flip me"
                            variant={"flip"}
                        />
                        <LetterPullButton
                            text="Hover to Jiggle"
                            variant={"jiggle"}
                            className=" "

                        />
                    </div>
                )
            case "warp-button":
                return (
                    <div className="flex items-center justify-center px-4 py-16 lgp-20 w-full">
                        <WarpButton>Trigger Warp</WarpButton>
                    </div>
                )
            case "scan-button":
                return (
                    <div className="flex items-center justify-center px-4 py-12 lg:p-20 w-full">
                        <ScanButton>Access Granted</ScanButton>
                    </div>
                )
            case "interactive-grid":
                return (
                    <div className="w-full">
                        <InteractiveGrid />
                    </div>
                )
            case "hero-bento":
                return (
                    <div className="w-full py-12">
                        <HeroBento />
                    </div>
                )
            case "spotlight-card":
                return (
                    <div className="flex items-center justify-center px-4 py-12 lg:p-12 w-full dark:bg-zinc-950 rounded-xl overflow-hidden">
                        <SpotlightCard className="max-w-sm">
                            <h3 className="text-2xl tracking-tighter">ORIX PREMIUM</h3>
                            <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                                Experience the future of UI with our lightning-fast, highly interactive components.
                            </p>
                            <div className="mt-6 flex gap-2">
                                <div className="h-2 w-8 rounded-full bg-primary" />
                                <div className="h-2 w-2 rounded-full bg-zinc-800" />
                                <div className="h-2 w-2 rounded-full bg-zinc-800" />
                            </div>
                        </SpotlightCard>
                    </div>
                )
            case "terminal":
                return (
                    <div className="w-full p-6">
                        <Terminal />
                    </div>
                )
            case "floating-icons":
                return (
                    <div className="relative h-[400px] w-full border rounded-xl overflow-hidden bg-muted/10">
                        <FloatingIcons />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center space-y-2 relative z-10 bg-background/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
                                <h3 className="text-2xl font-bold tracking-tight">Floating Icons Block</h3>
                                <p className="text-muted-foreground max-w-[200px]">A dynamic background for your landing pages.</p>
                            </div>
                        </div>
                    </div>
                )
            case "tilt-card":
                return (
                    <div className="flex items-center justify-center px-4 py-20 lg:p-20 w-full bg-linear-to-br from-indigo-500/10 to-purple-500/10 overflow-hidden rounded-xl">
                        <TiltCard className="max-w-xs">
                            <div className="space-y-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                                    <div className="h-6 w-6 rounded-lg bg-primary animate-pulse" />
                                </div>
                                <h3 className="text-xl font-bold">3D Perspective</h3>
                                <p className="text-sm text-muted-foreground">This card reacts to your mouse movement with realistic depth.</p>
                            </div>
                        </TiltCard>
                    </div>
                )
            case "neon-button":
                return (
                    <div className="flex flex-col items-center gap-12 px-4 py-12 lg:p-12 w-full  rounded-2xl overflow-hidden border ">
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <NeonButton neonColor="gold">Yellow Pulse</NeonButton>
                            <NeonButton neonColor="#ec4899">Pink Vapor</NeonButton>
                            <NeonButton neonColor="#10b981">Green Lime</NeonButton>
                        </div>
                        <div className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
                            Neon System V1.0 - Interactive Bloom Enabled
                        </div>
                    </div>
                )
            case "magnetic-text":
                return (
                    <div className="flex items-center justify-center px-4 py-12 lg:p-20 w-full">
                        <h2 className="text-6xl tracking-tighter font-black">
                            <MagneticText className="text-primary italic">Hover Me</MagneticText>, Orix IS HERE
                        </h2>
                    </div>
                )
            case "noise-card":
                return (
                    <div className="flex items-center justify-center px-4 py-12 lg:p-20 w-full" >
                        <NoiseCard className="max-w-sm">
                            <h3 className="text-xl font-bold">Grained Texture</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                A subtle SVG fractal noise overlay that adds character to your UI.
                            </p>
                        </NoiseCard>
                    </div>
                )
            case "glass-card":
                return (
                    <div className="relative flex items-center justify-center p-4 lg:p-20 w-full rounded-xl overflow-hidden bg-[url('https://images.unsplash.com/photo-1771520719118-9a6fc6e04574?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center saturate-100 dark:saturate-10 min-h-[40vh]! lg:min-h-[70vh]! ">

                        <div className="absolute inset-0 bg-black/20" />

                        <GlassCard className="max-w-sm p-4 lg:p-6" intensity="low">
                            <h3 className="text-white text-xl font-bold italic underline decoration-white/30 decoration-2 underline-offset-4">Frosted Glass</h3>
                            <p className="text-white/80 text-sm mt-3 leading-relaxed">
                                Beautifully blurred backgrounds that maintain context while providing focus.
                            </p>
                        </GlassCard>
                    </div>
                )
            case "glitch-text":
                return (
                    <div className="flex items-center justify-center p-6 lg:p-20 w-full bg-black ">
                        <GlitchText text="TikTok" className="text-6xl lg:text-8xl font-black text-white " />
                    </div>
                )
            case "shimmer-button":
                return (
                    <div className="flex items-center justify-center p-20 w-full">
                        <ShimmerButton>Ignite Innovation</ShimmerButton>
                    </div>
                )
            case "number-ticker":
                return (
                    <div className="flex flex-col items-center justify-center px-4 py-20 lg:p-20 w-full">
                        <div className="text-7xl tracking-tighter">
                            <NumberTicker value={2500} />
                            <span className="text-primary">+</span>
                        </div>
                        <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mt-4">Active Deployments</p>
                    </div>
                )
            case "copy-input":
                return (
                    <div className="flex items-center justify-center px-4 py-12 lg:p-20 w-full">
                        <CopyInput value="Your_Secret_Key-sk-orix-1234567890" label="API Key" />
                    </div>
                )
            case "status-badge":
                return (
                    <div className="flex flex-wrap items-center justify-center gap-6 px-4 py-12 lg:p-20 w-full">
                        <StatusBadge variant="success">System Online</StatusBadge>
                        <StatusBadge variant="warning">Maintenance Mode</StatusBadge>
                        <StatusBadge variant="error">Critical Failure</StatusBadge>
                        <StatusBadge variant="info">Deploying...</StatusBadge>
                        <StatusBadge variant="neutral" pulse={false}>Legacy</StatusBadge>
                    </div>
                )
            case "pricing-section":
                return (
                    <div className="w-full origin-top">
                        <PricingSection />
                    </div>
                )
            case "testimonials-section":
                return (
                    <div className="w-full">
                        <TestimonialsSection />
                    </div>
                )
            case "faq-section":
                return (
                    <div className="w-full">
                        <FaqSection />
                    </div>
                )
            case "skeleton":
                return (
                    <div className="flex flex-col gap-8 px-4 py-20 lg:p-20 w-full max-w-md">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[220px]" />
                                <Skeleton className="h-4 w-[180px]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Skeleton className="h-20 rounded-xl" />
                            <Skeleton className="h-20 rounded-xl" />
                            <Skeleton className="h-20 rounded-xl" />
                        </div>
                    </div>
                )
            case "dropdown-menu":
                return (
                    <div className="flex items-center justify-center p-10 pb-50 w-full group">
                        <DropdownMenu
                            trigger={
                                <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2">
                                    Quick Actions
                                    <Icon icon="ep:arrow-down" />
                                </button>
                            }
                            items={[
                                { label: "Project Settings", icon: "solar:settings-bold-duotone", shortcut: "⌘S" },
                                { label: "Team Management", icon: "solar:users-group-rounded-bold-duotone" },
                                { label: "Billing & Plans", icon: "solar:wallet-bold-duotone" },
                                { label: "Delete Project", icon: "solar:trash-bin-trash-bold-duotone", variant: "destructive" }
                            ]}
                        />
                    </div>
                )
            case "checkbox":
                return (
                    <div className="flex flex-col gap-10 p-10 w-full max-w-sm">
                        <div className="space-y-4">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Animation Variants</span>
                            <div className="flex flex-col gap-3">
                                <Checkbox label="Bounce Effect" variant="bounce" defaultChecked />
                                <Checkbox label="Scale Reveal" variant="scale" defaultChecked />
                                <Checkbox label="Path Draw" variant="reveal" defaultChecked />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Sizes</span>
                            <div className="flex items-center gap-6">
                                <Checkbox size="sm" defaultChecked />
                                <Checkbox size="md" defaultChecked />
                                <Checkbox size="lg" defaultChecked />
                            </div>
                        </div>
                    </div>
                )
            case "switch":
                return (
                    <div className="flex flex-col gap-10 p-10 w-full max-w-sm">
                        <div className="space-y-4">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Tactile Switches</span>
                            <div className="flex flex-col gap-4">
                                <Switch label="Automatic Updates" size="md" defaultChecked />
                                <Switch label="Beta Features" size="md" />
                                <Switch label="Disabled State" size="md" disabled defaultChecked />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Sizes</span>
                            <div className="flex items-center gap-8">
                                <Switch size="sm" defaultChecked />
                                <Switch size="md" defaultChecked />
                                <Switch size="lg" defaultChecked />
                            </div>
                        </div>
                    </div>
                )
            case "input":
                return (
                    <div className="flex flex-col gap-6 p-6 lg:p-10 w-full max-w-md">
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">Default Input</label>
                            <Input placeholder="Enter your full name..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-red-500">Error State</label>
                            <Input placeholder="name@example.com" error defaultValue="invalid-email" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">Disabled State</label>
                            <Input placeholder="Locked field" disabled />
                        </div>
                    </div>
                )
            case "dialog":
                return (
                    <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-8 lg:p-20 w-full">
                        {[
                            { id: "default", label: "Standard Pop", icon: "solar:maximize-bold-duotone" },
                            { id: "expand", label: "Spring Expand", icon: "lineicons:expand-square-4" },
                            { id: "slide-up", label: "Fluid Slide", icon: "fluent:slide-text-20-regular" },
                            { id: "drawer-right", label: "Side Sheet", icon: "solar:sidebar-minimalistic-bold-duotone" },
                            { id: "drawer-bottom", label: "Mobile Drawer", icon: "solar:smartphone-bold-duotone" }
                        ].map((variant) => (
                            <Dialog key={variant.id}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="">
                                        <Icon icon={variant.icon} className="size-3" />
                                        {variant.label}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent variant={variant.id as any} className={cn(
                                    variant.id.includes('drawer') ? "max-w-full sm:max-w-md " : "max-w-[95%] sm:max-w-lg ",
                                    "flex flex-col items-center justify-center "
                                )}>
                                    <DialogHeader>
                                        <DialogTitle>{variant.label} Mode</DialogTitle>
                                        <DialogDescription>
                                            Experience the high-fidelity {variant.id} transition. Managed with pure Tailwind CSS.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-6 py-4 w-full">
                                        <div className="space-y-2">
                                            <label className="text-sm text-muted-foreground">Email Address</label>
                                            <Input placeholder="name@example.com" autoFocus={false} />
                                        </div>
                                    </div>
                                    <DialogFooter className=" w-full flex flex-row justify-center gap-2">
                                        <DialogClose asChild className="w-[40%] ">
                                            <Button variant="outline"> Cancel </Button>
                                        </DialogClose>
                                        <Button type="submit" className="flex-1">Confirm Selection</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                )
            case "radial-gauge":
                return (
                    <div className="flex flex-wrap items-center justify-center gap-12 px-4 py-16 lg:p-20 w-full">
                        <RadialGauge value={75} label="Server Load" color="#3b82f6" strokeWidth={14} />
                        <RadialGauge value={92} label="GPU Usage" color="#ef4444" size={160} />
                    </div>
                )
            case "expandable-dock":
                return (
                    <div className="flex flex-wrap items-center justify-center gap-24 p-10 lg:p-20 pb-10 w-full overflow-x-auto">
                        <ExpandableDock
                            items={[
                                { title: "Home", icon: "solar:home-2-bold-duotone", href: "#" },
                                { title: "Products", icon: "solar:widget-bold-duotone", href: "#" },
                                { title: "Analytics", icon: "solar:chart-2-bold-duotone", href: "#" },
                                { title: "Settings", icon: "solar:settings-bold-duotone", href: "#" },
                                { title: "Messages", icon: "solar:chat-round-dots-bold-duotone", href: "#" }
                            ]}
                        />

                        <ExpandableDock
                            items={[
                                { title: "Apple", icon: "wpf:macos", href: "#" },
                                { title: "Store", icon: "ion:logo-apple-appstore", href: "#" },
                                { title: "Finder", icon: "streamline-logos:mac-finder-logo", href: "#" },
                                { title: "Command", icon: "qlementine-icons:key-cmd-16", href: "#" },
                                { title: "Wallet", icon: "lineicons:apple-pay", href: "#" }
                            ]}
                        />

                        <ExpandableDock
                            items={[
                                { title: "Windows", icon: "devicon:windows8", href: "#" },
                                { title: "Folder", icon: "flat-color-icons:folder", href: "#" },
                                { title: "VLC", icon: "flat-color-icons:vlc", href: "#" },
                                { title: "Word", icon: "vscode-icons:file-type-word", href: "#" },
                                { title: "Excel", icon: "vscode-icons:file-type-excel", href: "#" },

                                { title: "PhotoShop", icon: "devicon:photoshop", href: "#" },
                                { title: "vs Code", icon: "material-icon-theme:vscode", href: "#" },

                                { title: "YouTube", icon: "logos:youtube-icon", href: "#" },
                                { title: "illustator", icon: "devicon:illustrator", href: "#" },

                                { title: "Chrome", icon: "logos:chrome", href: "#" },
                                { title: "Bitcoin", icon: "logos:bitcoin", href: "#" }
                            ]}

                        />
                    </div>


                )
            case "interactive-stack":
                return (
                    <div className="flex items-center justify-center px-4 py-12 lg:p-20 w-full">
                        <InteractiveStack
                            items={[
                                { title: "Architecture", description: "Strategic design for scalable infrastructure.", color: "#3b82f6", icon: <Icon icon="solar:structure-bold-duotone" /> },
                                { title: "Neural Ops", description: "AI-driven deployment pipelines.", color: "#8b5cf6", icon: <Icon icon="solar:cpu-bold-duotone" /> },
                                { title: "Edge Proxy", description: "Low-latency global edge network.", color: "#ec4899", icon: <Icon icon="solar:globus-bold-duotone" /> }
                            ]}
                        />
                    </div>
                )
            case "infinite-marquee":
                return (
                    <div className="w-full">
                        <InfiniteMarquee
                            items={[
                                { name: "React", icon: "logos:react" },
                                { name: "Next.js", icon: "logos:nextjs-icon" },
                                { name: "Vercel", icon: "logos:vercel-icon" },
                                { name: "Framer", icon: "logos:framer" },
                                { name: "Tailwind", icon: "logos:tailwindcss-icon" },
                                { name: "TypeScript", icon: "logos:typescript-icon" },
                                { name: "Radix UI", icon: "simple-icons:radixui" }
                            ]}
                            className=" py-44"
                        />
                    </div>
                )
            case "feature-modern":
                return (
                    <div className="w-full">
                        <FeatureModern />
                    </div>
                )
            case "interactive-lines":
                return (
                    <div className="flex flex-col gap-8 w-full px-2 py-6">
                        <InteractiveLines variant="grid" className="tracking-tighter uppercase font-black italic h-100" />
                        <InteractiveLines variant="beams" color="rgb(236, 72, 153)" className="tracking-tighter uppercase font-black h-100" />
                        <InteractiveLines variant="dots" color="rgb(168, 85, 247)" className="tracking-tighter uppercase italic h-100" />
                    </div>
                )
            case "liquid-aura":
                return (
                    <div className="flex flex-col gap-8 w-full px-4 py-12">
                        <LiquidAura variant="aurora" />
                        <LiquidAura variant="nebula" />
                        <LiquidAura variant="magma" />
                    </div>
                )
            case "particle-vortex":
                return (
                    <div className="flex flex-col gap-8 w-full px-4 py-6">
                        <ParticleVortex variant="gravity" count={120} className="h-100" />
                        <ParticleVortex variant="repel" count={200} className="h-100" />
                        <ParticleVortex variant="drift" className="h-100" />
                    </div>
                )
            case "magnetic-surface":
                return (
                    <div className="flex flex-col gap-8 w-full px-4 py-12">
                        <MagneticSurface variant="arrows" className="h-100" />
                        <MagneticSurface variant="lines" gridSize={40} />
                        <MagneticSurface variant="crosses" gridSize={50} />
                    </div>
                )
            case "noise-mesh":
                return (
                    <div className="flex flex-col gap-8 w-full text-zinc-950 dark:text-white px-2 py-6">
                        <NoiseMesh variant="fluid" className="lg:h-100" />
                        <NoiseMesh variant="topography" className="lg:h-100" />
                        <NoiseMesh variant="glitch" className="lg:h-100" />
                    </div>
                )
            case "floating-constellation":
                return (
                    <div className="flex flex-col gap-8 w-full px-4 py-8">
                        <FloatingConstellation variant="connected" className="h-[200px] lg:h-100 " />
                        <FloatingConstellation variant="orbit" count={60} className="h-[200px] lg:h-100 " />
                        <FloatingConstellation variant="dust" count={100} className="h-[200px] lg:h-100 " />
                    </div>
                )
            case "carousel":
                const carouselItems = [
                    {
                        id: 1,
                        title: "Celestial Horizons",
                        description: "Explore the deep reaches of the neon-lit nebula where stars are born and dreams take flight.",
                        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000",
                        category: "Space Exploration"
                    },
                    {
                        id: 2,
                        title: "Urban Cybernetics",
                        description: "The intersection of biology and technology in the heart of the future's brightest megalopolis.",
                        image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        category: "Architecture"
                    },
                    {
                        id: 3,
                        title: "Digital Ecosystems",
                        description: "Synthesizing nature and code to build sustainable virtual worlds for the next generation of users.",
                        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
                        category: "Virtual Reality"
                    }
                ]
                return (
                    <div className="flex flex-col gap-8 px-4 py-16 lg:p-10 w-full">
                        <Carousel
                            items={carouselItems}
                            variant={selectedVariant}
                            orientation={selectedOrientation}
                            primaryColor={selectedColor}
                            className="h-10"
                        />

                        <div className="w-full space-y-6 border-t pt-8">
                            <div className="flex flex-col gap-3">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Visual Physics</span>
                                <div className="flex flex-wrap gap-2">
                                    {["default", "stack", "flat", "cards"].map((v) => (
                                        <button
                                            key={v}
                                            onClick={() => setSelectedVariant(v)}
                                            className={cn(
                                                "px-4 py-2 text-xs rounded-xl border transition-all tracking-wider",
                                                selectedVariant === v ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-muted hover:bg-muted/80"
                                            )}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Orientation</span>
                                <div className="flex flex-wrap gap-2">
                                    {["horizontal", "vertical"].map((o) => (
                                        <button
                                            key={o}
                                            onClick={() => setSelectedOrientation(o)}
                                            className={cn(
                                                "px-4 py-2 text-xs rounded-xl border transition-all tracking-wider",
                                                selectedOrientation === o ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-muted hover:bg-muted/80"
                                            )}
                                        >
                                            {o}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Chromatic Signature</span>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { name: "Neon Blue", value: "rgb(59, 130, 246)" },
                                        { name: "Vapor Pink", value: "rgb(236, 72, 153)" },
                                        { name: "Emerald", value: "rgb(16, 185, 129)" },
                                        { name: "Amber", value: "rgb(245, 158, 11)" }
                                    ].map((c) => (
                                        <button
                                            key={c.value}
                                            onClick={() => setSelectedColor(c.value)}
                                            className={cn(
                                                "px-4 py-2 text-xs rounded-xl border transition-all flex items-center gap-2",
                                                selectedColor === c.value ? "bg-white dark:bg-zinc-900 border-zinc-900 dark:border-white shadow-xl" : "bg-muted border-transparent hover:bg-muted/80"
                                            )}
                                        >
                                            <div className="size-3 rounded-full" style={{ backgroundColor: c.value }} />
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "tabs":
                const TABS = [
                    { label: "Overview", value: "overview", icon: <Icon icon="solar:home-2-bold-duotone" /> },
                    { label: "Analytics", value: "analytics", icon: <Icon icon="solar:chart-2-bold-duotone" /> },
                    { label: "Development", value: "dev", icon: <Icon icon="solar:code-bold-duotone" /> },
                    { label: "Settings", value: "settings", icon: <Icon icon="solar:settings-bold-duotone" /> }
                ]
                return (
                    <div className="flex flex-col items-start gap-20 px-4 py-12 lg:p-12 w-full overflow-x-auto">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Pill Variant</span>
                            <Tabs tabs={TABS} variant="pills" />
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Underline Variant</span>
                            <Tabs tabs={TABS} variant="underline" />
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Floating Variant</span>
                            <Tabs tabs={TABS} variant="floating" />
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Kinetic Variant</span>
                            <Tabs tabs={TABS} variant="kinetic" />
                        </div>
                    </div>
                )
            case "pricing-section":
                return <PricingSection />
            case "testimonials-section":
                return <TestimonialsSection />
            case "faq-section":
                return <FaqSection />
            case "tooltip":
                return (
                    <div className="flex flex-col items-center gap-16 px-4 py-12 lg:p-20 w-full">
                        <div className="flex flex-wrap items-center justify-center gap-10">
                            {(["top", "bottom", "left", "right"] as const).map((side) => (
                                <Tooltip key={side} content={`Side: ${side}`} side={side} variant={selectedVariant || "dark"}>
                                    <button className="px-5 py-2.5 rounded-xl border bg-muted text-sm font-medium hover:bg-muted/80 transition-colors capitalize">
                                        {side}
                                    </button>
                                </Tooltip>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {["dark", "light", "glass", "primary"].map((v) => (
                                <Button
                                    key={v}
                                    variant={selectedVariant === v ? "default" : "outline"}
                                    onClick={() => setSelectedVariant(v)}
                                // className={cn(
                                //     selectedVariant === v ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80"
                                // )}
                                >
                                    {v}
                                </Button>
                            ))}
                        </div>
                    </div>
                )
            case "text-scramble":
                return (
                    <div className="flex flex-col items-center justify-center px-4 py-20 lg:p-20 w-full bg-zinc-950 text-white rounded-xl">
                        <TextScramble text="ACCESS GRANTED" className="text-3xl tracking-widest text-[#10b981]" trigger={true} />
                        <p className="mt-4 text-xs text-zinc-500 max-w-[250px] text-center">
                            Hover over the text below to trigger manually:
                        </p>
                        <TextScramble text="HOVER_TO_DECRYPT" className="mt-2 text-sm text-zinc-300 cursor-crosshair border border-dashed border-zinc-700 px-4 py-2" trigger={false} />
                    </div>
                )
            case "loader":
                return (
                    <div className="flex flex-wrap items-center justify-evenly w-full min-h-76 gap-16 px-4 py-12">
                        <Loader variant={"ring"} size="lg" />
                        <Loader variant={"dots"} size="lg" />
                        <Loader variant={"bars"} size="lg" />
                        <Loader variant={"pulse"} size="lg" />
                        <Loader variant={"spinner"} size="lg" />
                        <Loader variant={"orbit"} size="lg" />
                        <Loader variant={"wave"} size="lg" />
                        <Loader variant={"bounce"} size="lg" />
                        <Loader variant={"dash"} size="lg" />
                    </div>
                )
            case "magic-spells":
                return (
                    <div className="flex flex-col gap-10 w-full max-w-4xl mx-auto px-4 py-8">
                        {/* Interactive Selection */}
                        <div className="flex flex-wrap gap-2 justify-center bg-muted/30 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
                            {["warp", "glitch", "magnify", "dissolve", "vortex", "pixelate", "ripple"].map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setSelectedVariant(v)}
                                    className={cn(
                                        "px-6 py-2 text-xs font-bold rounded-xl transition-all uppercase tracking-[0.2em]",
                                        selectedVariant === v
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                            : "bg-transparent text-muted-foreground hover:bg-white/5"
                                    )}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>

                        {/* Preview Container */}
                        <div className="border rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 shadow-2xl relative">
                            {/* Theme Indicator */}
                            <div className="absolute top-4 right-4 z-50 flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-white/5 backdrop-blur-md pointer-events-none">
                                <div className="size-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-mono text-muted-foreground uppercase">Adaptive.OS</span>
                            </div>

                            <MagicSpells
                                type={selectedVariant === "glitch" ? "void" : selectedVariant === "magnify" ? "ice" : "arcane"}
                                variant={selectedVariant || "warp"}
                                distortionStrength={60}
                                radius={250}
                                particleDensity={1.5}
                                className="min-h-[600px] flex items-center justify-center"
                            >
                                <div className="p-12 w-full max-w-2xl space-y-16">
                                    <div className="space-y-6 text-center">
                                        <h2 className="text-7xl font-black tracking-tighter uppercase italic leading-none transition-colors">
                                            {selectedVariant === "glitch" ? "SYSTEM_FAILURE" : "Beyond Reality"}
                                        </h2>
                                        <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-lg mx-auto">
                                            A sophisticated {selectedVariant} field that adapts to light and dark environments. Every pixel within the ritual circle is redefined by arcane mathematics.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="aspect-square rounded-3xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center gap-4 group">
                                            <div className="size-16 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:rotate-12 transition-transform">
                                                <Icon icon="solar:magic-stick-3-bold-duotone" className="size-10 text-white" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Spellcaster</span>
                                        </div>
                                        <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
                                            <img
                                                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                                alt="Abstraction"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center gap-4">
                                        <Button className="rounded-full px-12 py-6 text-lg font-black italic uppercase tracking-tighter">
                                            Execute {selectedVariant}
                                        </Button>
                                    </div>
                                </div>
                            </MagicSpells>
                        </div>

                        <p className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.4em] mb-4">
                            Experimental Flux Engine v1.1
                        </p>
                    </div>
                )
            case "border-beam":
                return (
                    <div className="flex flex-col items-center justify-center p-4 lg:p-20 w-full dark:bg-black gap-16">
                        <div className="relative  flex h-[300px] w-full max-w-[300px] flex-col items-center justify-center overflow-hidden rounded-5xl bg-white dark:bg-zinc-950 ">

                            <span className="pointer-events-none whitespace-pre-wrap bg-linear-to-b from-black to-zinc-400/80 bg-clip-text text-center text-5xl font-black leading-none text-transparent dark:from-white dark:to-zinc-200/50">
                                MAGIC
                            </span>
                            <BorderBeam size={200} duration={8} delay={0} colorFrom="#6366f1" colorTo="#fcd34d" variant={selectedVariant || "default"} />
                        </div>



                        <div className="flex flex-wrap gap-3 justify-center">
                            {["default", "reverse", "flash"].map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setSelectedVariant(v)}
                                    className={cn(
                                        "px-4 py-2 text-xs rounded-xl border transition-all capitalize",
                                        selectedVariant === v ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80"
                                    )}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                )
            case "flip-words":
                return (
                    <div className="flex items-center justify-center px-4 py-12 lg:p-20 w-full">

                        <h2 className="text-3xl lg:text-5xl font-black text-center leading-tight">
                            Build <br />
                            <FlipWords words={["beautiful", "modern", "scalable", "lightning fast"]} className="text-primary italic px-0" /> <br />
                            interfaces with Orix
                        </h2>
                    </div>
                )
            case "blur-fade":
                return (
                    <div className="flex flex-col items-center justify-center gap-6 p-4 lg:p-20 w-full">
                        <BlurFade delay={0} inView={true}>
                            <h2 className="text-4xl font-bold tracking-tighter text-center">Welcome to the future.</h2>
                        </BlurFade>

                        <BlurFade delay={0.2} inView={true}>
                            <p className="text-muted-foreground text-center">Seamlessly animate elements as they enter the viewport</p>
                        </BlurFade>

                        <BlurFade delay={0.4} inView={true}>
                            <Button className="mt-4 shadow-xl shadow-primary/20">Get Started</Button>
                        </BlurFade>
                    </div>
                )
            case "progress-ring":
                return (
                    <div className="flex flex-col items-center gap-12 px-4 py-16 lg:p-16 w-full">
                        <div className="flex flex-wrap items-end justify-center gap-10">
                            <ProgressRing value={72} label="CPU" variant="glow" color="hsl(var(--primary))" size={140} strokeWidth={12} />
                            <ProgressRing value={48} label="Memory" variant="gradient" color="#ec4899" size={120} />
                            <ProgressRing value={91} label="Storage" variant="default" color="#f59e0b" size={100} strokeWidth={8} />
                            <ProgressRing value={33} label="Network" variant="glow" color="#10b981" size={90} strokeWidth={8} />
                        </div>
                    </div>
                )
            case "typewriter":
                return (
                    <div className="flex items-center justify-center px-4 py-16 lgp-20 w-full">
                        <div className="text-center space-y-6">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">Orix is built for</p>
                            <h2 className="text-5xl font-black">
                                <Typewriter
                                    words={["speed.", "beauty.", "accessibility.", "your next idea."]}
                                    className="text-primary"
                                    typingSpeed={70}
                                    pauseDuration={2000}
                                />
                            </h2>
                        </div>
                    </div>
                )
            default:
                return <div className="p-10 text-center text-muted-foreground">Component not found</div>
        }
    }

    return (
        <div className={cn(" relative my-4 flex flex-col space-y-2", className)}>
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">Interactive Preview</span>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-center">
                    {renderComponent()}
                </div>
            </div>
        </div>
    )
}