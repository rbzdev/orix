"use client"

import { useEffect, useRef, useCallback, useState, useMemo } from "react"
import createGlobe from "cobe"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

interface Marker {
  id: string
  location: [number, number]
  label: string
  countryCode?: string
}

interface Arc {
  id: string
  from: [number, number]
  to: [number, number]
  label?: string
}

const COUNTRY_SHAPES: Record<string, string> = {
  "CD": "M50,45 L60,35 L85,35 L95,45 L85,95 L40,95 L25,80 L25,60 Z",
  "EG": "M10,10 L90,10 L90,80 L70,95 L10,95 Z",
  "CI": "M20,20 L80,20 L80,85 L20,85 Z",
  "CM": "M50,10 L90,90 L10,90 Z",
  "BJ": "M40,10 L60,10 L60,95 L40,95 Z",
}

interface GlobeProps {
  markers?: Marker[]
  arcs?: Arc[]
  className?: string
  markerColor?: [number, number, number]
  baseColor?: [number, number, number]
  arcColor?: [number, number, number]
  glowColor?: [number, number, number]
  dark?: number
  mapBrightness?: number
  markerSize?: number
  markerElevation?: number
  arcWidth?: number
  arcHeight?: number
  speed?: number
  theta?: number
  diffuse?: number
  mapSamples?: number
  onMarkerClick?: (marker: Marker) => void
}

export function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor,
  baseColor,
  arcColor,
  glowColor,
  dark,
  mapBrightness = 10,
  markerSize = 0.025,
  markerElevation = 0.01,
  arcWidth = 0.5,
  arcHeight = 0.25,
  speed = 0.003,
  theta = 0.2,
  diffuse = 1.5,
  mapSamples = 16000,
  onMarkerClick,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const velocity = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const zoomRef = useRef(1)
  const targetZoomRef = useRef(1)
  const isPausedRef = useRef(false)
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null)
  
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === "dark"
  
  // Refined Color System for Dark/Light
  const config = useMemo(() => {
    if (isDark) {
      return {
        baseColor: baseColor || [0.1, 0.1, 0.15] as [number, number, number],
        glowColor: glowColor || [0.15, 0.15, 0.2] as [number, number, number],
        markerColor: markerColor || [0.4, 0.6, 1.0] as [number, number, number],
        arcColor: arcColor || [0.4, 0.6, 1.0] as [number, number, number],
        dark: dark !== undefined ? dark : 1,
      }
    }
    return {
      baseColor: baseColor || [0.95, 0.95, 0.95] as [number, number, number],
      glowColor: glowColor || [0.9, 0.9, 0.95] as [number, number, number],
      markerColor: markerColor || [0.2, 0.4, 0.8] as [number, number, number],
      arcColor: arcColor || [0.2, 0.4, 0.8] as [number, number, number],
      dark: dark !== undefined ? dark : 0,
    }
  }, [isDark, baseColor, glowColor, markerColor, arcColor, dark])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x
      const deltaY = e.clientY - pointerInteracting.current.y
      dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 }
      const now = Date.now()
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1)
        velocity.current = {
          phi: Math.max(-0.15, Math.min(0.15, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
          theta: Math.max(-0.15, Math.min(0.15, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
        }
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now }
    }
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
      lastPointer.current = null
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const zoomDelta = e.deltaY * -0.001
    targetZoomRef.current = Math.max(0.5, Math.min(3.5, targetZoomRef.current + zoomDelta))
  }, [])

  const handleMarkerSelection = useCallback((marker: Marker) => {
    setActiveMarker(marker)
    const [lat, lng] = marker.location
    const targetPhi = -lng * (Math.PI / 180) - 1.57
    const targetTheta = lat * (Math.PI / 180)

    phiOffsetRef.current = targetPhi
    thetaOffsetRef.current = targetTheta - theta
    targetZoomRef.current = 2.0
    
    if (onMarkerClick) onMarkerClick(marker)
  }, [theta, onMarkerClick])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current || !mounted) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta,
        dark: config.dark,
        diffuse,
        mapSamples,
        mapBrightness: activeMarker ? mapBrightness * 0.5 : mapBrightness,
        baseColor: config.baseColor,
        markerColor: config.markerColor,
        glowColor: config.glowColor,
        markerElevation,
        markers: markers.map((m) => ({ location: m.location, size: markerSize, id: m.id })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor: config.markerColor,
        arcWidth,
        arcHeight,
        opacity: 0.8,
      })

      function animate() {
        zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.1
        if (!isPausedRef.current) {
          phi += speed
          if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
            phiOffsetRef.current += velocity.current.phi
            thetaOffsetRef.current += velocity.current.theta
            velocity.current.phi *= 0.95
            velocity.current.theta *= 0.95
          }
        }
        
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
          dark: config.dark,
          baseColor: config.baseColor,
          glowColor: config.glowColor,
          markerColor: config.markerColor,
          mapBrightness: activeMarker ? mapBrightness * 0.5 : mapBrightness,
          markers: markers.map((m) => ({
            location: m.location,
            size: m.id === activeMarker?.id ? markerSize * 4 : markerSize,
            id: m.id,
          })),
        })
        
        if (canvasRef.current) {
            canvasRef.current.style.transform = `scale(${zoomRef.current})`
        }
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) init()
    else {
      const ro = new ResizeObserver((entries) => { if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init(); } })
      ro.observe(canvas)
    }
    return () => { if (animationId) cancelAnimationFrame(animationId); if (globe) globe.destroy(); }
  }, [mounted, theme, markers, arcs, config, activeMarker])

  if (!mounted) return <div className={`aspect-square ${className}`} />

  return (
    <div 
        className={`relative aspect-square select-none overflow-hidden ${className}`}
        onWheel={handleWheel}
        onClick={(e) => { if (e.target === e.currentTarget) setActiveMarker(null) }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: activeMarker ? 0.4 : 1,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      
      {/* Country Focus Overlay (Sharp) */}
      <AnimatePresence>
        {activeMarker && COUNTRY_SHAPES[activeMarker.countryCode!] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
          >
            <div className="relative flex flex-col items-center">
                <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                    <motion.path
                        d={COUNTRY_SHAPES[activeMarker.countryCode!]}
                        fill="hsl(var(--primary))"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-primary-foreground/30"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                    />
                </svg>
                <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-4 bg-background/80 backdrop-blur-md border px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl"
                >
                    {activeMarker.label}
                </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Markers & Labels */}
      {markers.map((m) => (
        <div
          key={m.id}
          onClick={(e) => { e.stopPropagation(); handleMarkerSelection(m) }}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: 8,
            padding: "4px 10px",
            background: m.id === activeMarker?.id ? "transparent" : (isDark ? "rgba(255,255,255,0.9)" : "rgba(26,26,46,0.9)"),
            color: m.id === activeMarker?.id ? "transparent" : (isDark ? "#1a1a2e" : "#fff"),
            cursor: "pointer",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            transition: "all 0.3s",
            borderRadius: "6px",
            zIndex: m.id === activeMarker?.id ? 50 : 1,
            fontWeight: "bold",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          {m.id !== activeMarker?.id && m.label}
        </div>
      ))}
    </div>
  )
}
