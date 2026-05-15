"use client"

import { Globe } from "@/registry/orix-default/ui/cobe-globe"

export default function GlobeDemo() {
  const markers = [
    { id: "cairo", location: [30.0444, 31.2357] as [number, number], label: "Le Caire" },
    { id: "abidjan", location: [5.3600, -4.0083] as [number, number], label: "Abidjan" },
    { id: "kinshasa", location: [-4.4419, 15.2663] as [number, number], label: "Kinshasa" },
    { id: "lubumbashi", location: [-11.6609, 27.4794] as [number, number], label: "Lubumbashi" },
    { id: "douala", location: [4.0511, 9.7679] as [number, number], label: "Douala" },
    { id: "portonovo", location: [6.4969, 2.6289] as [number, number], label: "Porto-Novo" },
  ]

  const arcs = [
    { id: "cairo-abidjan", from: [30.0444, 31.2357] as [number, number], to: [5.3600, -4.0083] as [number, number], label: "Cairo → Abidjan" },
    { id: "kinshasa-lubumbashi", from: [-4.4419, 15.2663] as [number, number], to: [-11.6609, 27.4794] as [number, number], label: "Kinshasa → Lubumbashi" },
    { id: "douala-portonovo", from: [4.0511, 9.7679] as [number, number], to: [6.4969, 2.6289] as [number, number], label: "Douala → Porto-Novo" },
  ]

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background p-8 overflow-hidden">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl font-bold tracking-tight uppercase italic font-black">
          Global <span className="text-primary">Intelligence</span>
        </h2>
        <div className="flex flex-col gap-2 text-muted-foreground text-sm max-w-lg mx-auto">
          <p>• Use <b>Scroll Wheel</b> to zoom in/out (Three.js style).</p>
          <p>• <b>Click a City Label</b> to focus and auto-rotate to that location.</p>
          <p>• Click the background to reset view.</p>
        </div>
      </div>
      <div className="w-full max-w-2xl relative">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <Globe
          markers={markers}
          arcs={arcs}
          className="w-full"
        />
      </div>
    </div>
  )
}
