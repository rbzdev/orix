import Link from "next/link"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { FloatingIcons } from "@/components/block/floating-icons"
import { Button } from "../ui/button"
import { Icon } from "@iconify/react"

interface Header01Props {
  badge?: string
  title?: string
  description?: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  className?: string
}

export function Header({
  badge = "Open-source • v1.0",
  description = "Build beautiful, accessible, and customizable user interfaces with our open-source components.",
  primaryAction = { label: "Explore Blocks", href: "/blocks" },
  secondaryAction = { label: "Documentation", href: "/docs" },
  className,
}: Header01Props) {
  return (
    <header
      className={cn(
        "relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 pt-16",
        className
      )}
    >
      {/* Floating Icons Background */}
      <FloatingIcons className="z-10" />

      {/* Background Grid */}
      <div className="absolute inset-0 z-5 h-full w-full bg-background bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-size-[4rem_4rem] ">

        <div className="absolute inset-0 bg-linear-to-b from-secondary via-transparent to-background" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center z-20">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>{badge}</span>
        </div>

        {/* Title */}
        <h1 className="mb-6 bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-4xl tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Modern <span className="corner-border corner-border-primary font-semibold px-1 text-primary inline-block"> UI components </span> for Tailwind CSS
        </h1>

        {/* Description */}
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={primaryAction.href}
            className=""
          >
            <Button
              size="lg"
              className="rounded-full group"
            >
              Explore blocks
              <Icon icon={"guidance:left-arrow"} className="group-hover:translate-x-2 transition-all" />
            </Button>


          </Link>
          <Link
            href={secondaryAction.href}
            className=""
          >
            <Button
              size="lg"
              variant="outline"
              className="rounded-full "
            >
              Documentation
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </header>
  )
}
