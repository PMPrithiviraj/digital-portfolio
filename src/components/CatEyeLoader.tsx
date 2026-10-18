import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { playBootHum, playClickActuate } from '../lib/soundEngine'

type Props = {
  active: boolean
  onComplete: () => void
}

// 24 Radial Iris Striation Ray Angles
const irisRays = [
  0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165,
  180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345,
]

export default function CatEyeLoader({ active, onComplete }: Props) {
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [blinking, setBlinking] = useState(false)
  const [showStaircase, setShowStaircase] = useState(false)

  useEffect(() => {
    if (!active) return

    playBootHum()

    if (reduceMotion) {
      const t = setTimeout(() => onComplete(), 300)
      return () => clearTimeout(t)
    }

    const duration = 2200 // 2.2 seconds total immersive boot
    const intervalTime = 25
    const step = 100 / (duration / intervalTime)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + step)

        // Realistic predatory blink right at ~95% - 99%
        if (next >= 94 && next < 100) {
          setBlinking(true)
        } else {
          setBlinking(false)
        }

        if (next >= 100) {
          clearInterval(interval)
          setBlinking(true)
          setTimeout(() => {
            setBlinking(false)
            setShowStaircase(true)
            setTimeout(() => {
              onComplete()
            }, 900)
          }, 150)
        }

        return next
      })
    }, intervalTime)

    return () => clearInterval(interval)
  }, [active, onComplete, reduceMotion])

  if (!active) return null

  const progressRatio = progress / 100
  // Pupil constricts from dilated (18px wide) in total darkness down to razor-sharp (2.5px wide) at full illumination
  const pupilWidth = Math.max(2.5, 18 - progressRatio * 15.5)
  const eyeOpacity = Math.max(0.15, Math.min(1, 0.18 + progressRatio * 0.82))
  const eyeGlow = 8 + progressRatio * 36

  return (
    <AnimatePresence>
      <div
        data-nosnippet
        aria-hidden="true"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black px-4 select-none cursor-pointer"
        onClick={() => {
          playClickActuate()
          setProgress(100)
          setShowStaircase(true)
          setTimeout(() => onComplete(), 500)
        }}
      >
        {/* Subtle Ambient Feline Glow in Deep Abyss */}
        <div
          className="pointer-events-none absolute h-[400px] w-[600px] rounded-full blur-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, var(--color-accent-dim) 0%, transparent 70%)`,
            opacity: progressRatio * 0.25,
          }}
        />

        {/* Anatomical Panther / Black Cat Eyes SVG */}
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{
              scaleY: blinking ? 0.04 : 1,
              scaleX: 1,
            }}
            transition={{ duration: 0.12, ease: 'easeInOut' }}
            style={{
              filter: `drop-shadow(0 0 ${eyeGlow}px var(--color-accent)) drop-shadow(0 0 ${eyeGlow * 1.5}px rgba(251, 191, 36, ${progressRatio * 0.4}))`,
              opacity: eyeOpacity,
            }}
            className="w-80 sm:w-[500px] md:w-[600px]"
          >
            <svg
              viewBox="0 0 600 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <defs>
                {/* Multi-Layered Golden Iris Gradient */}
                <radialGradient id="catIrisGoldLeft" cx="45%" cy="48%" r="55%">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="25%" stopColor="#fbbf24" />
                  <stop offset="65%" stopColor="#d97706" />
                  <stop offset="90%" stopColor="#78350f" />
                  <stop offset="100%" stopColor="#1a0c02" />
                </radialGradient>

                <radialGradient id="catIrisGoldRight" cx="55%" cy="48%" r="55%">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="25%" stopColor="#fbbf24" />
                  <stop offset="65%" stopColor="#d97706" />
                  <stop offset="90%" stopColor="#78350f" />
                  <stop offset="100%" stopColor="#1a0c02" />
                </radialGradient>

                {/* Cyber Neon Green Fallback / Iris Gradient */}
                <radialGradient id="catIrisGreen" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#00ff88" />
                  <stop offset="70%" stopColor="#00aa5b" />
                  <stop offset="100%" stopColor="#02140a" />
                </radialGradient>

                {/* Soft Vignette Mask for Left Eye Clip */}
                <clipPath id="leftEyeClip">
                  <path d="M 100 135 C 130 85, 205 78, 265 118 C 240 162, 175 170, 100 135 Z" />
                </clipPath>

                {/* Soft Vignette Mask for Right Eye Clip */}
                <clipPath id="rightEyeClip">
                  <path d="M 500 135 C 470 85, 395 78, 335 118 C 360 162, 425 170, 500 135 Z" />
                </clipPath>
              </defs>

              {/* 1. Subtle Black Cat Fur, Ears & Brow Silhouette in Darkness */}
              <g opacity={Math.min(0.65, 0.2 + progressRatio * 0.45)}>
                {/* Left Ear Silhouette */}
                <path
                  d="M 60 140 L 90 20 L 160 70"
                  stroke="#12151c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                {/* Right Ear Silhouette */}
                <path
                  d="M 540 140 L 510 20 L 440 70"
                  stroke="#12151c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                {/* Brow Ridge Curves */}
                <path
                  d="M 110 82 C 160 62, 220 66, 268 96"
                  stroke="#0e1117"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 490 82 C 440 62, 380 66, 332 96"
                  stroke="#0e1117"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Medial Canthus Nose Bridge Lines */}
                <path
                  d="M 265 118 C 280 150, 285 190, 280 230"
                  stroke="#0d1015"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 335 118 C 320 150, 315 190, 320 230"
                  stroke="#0d1015"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Nose Pad Tip Hint */}
                <path
                  d="M 285 230 Q 300 238 315 230"
                  stroke="#141820"
                  strokeWidth="2.5"
                  fill="none"
                />
              </g>

              {/* 2. LEFT FELINE EYE */}
              <g>
                {/* Dark Eye Socket Shadow Rim */}
                <path
                  d="M 96 137 C 128 82, 208 74, 270 116 C 243 165, 173 174, 96 137 Z"
                  fill="#040507"
                />

                {/* Sclera & Iris Base */}
                <path
                  d="M 100 135 C 130 85, 205 78, 265 118 C 240 162, 175 170, 100 135 Z"
                  fill="url(#catIrisGoldLeft)"
                />

                {/* 24+ Radial Iris Striation Ray Fibers */}
                <g clipPath="url(#leftEyeClip)" opacity={0.35 + progressRatio * 0.45}>
                  {irisRays.map((deg) => {
                    const rad = (deg * Math.PI) / 180
                    const x1 = 185 + Math.cos(rad) * 12
                    const y1 = 125 + Math.sin(rad) * 12
                    const x2 = 185 + Math.cos(rad) * 52
                    const y2 = 125 + Math.sin(rad) * 52
                    return (
                      <line
                        key={`left-ray-${deg}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#fffbeb"
                        strokeWidth="0.8"
                        strokeOpacity="0.6"
                      />
                    )
                  })}
                </g>

                {/* Dynamic Vertical Slit Pupil */}
                <path
                  d={`M 185 86 C ${185 + pupilWidth} 105, ${185 + pupilWidth} 145, 185 164 C ${185 - pupilWidth} 145, ${185 - pupilWidth} 105, 185 86 Z`}
                  fill="#000000"
                />

                {/* Realistic Upper-Left Specular Corneal Catchlights */}
                <ellipse
                  cx="168"
                  cy="108"
                  rx="7"
                  ry="3.5"
                  fill="#ffffff"
                  opacity="0.9"
                  transform="rotate(-25 168 108)"
                />
                <circle cx="178" cy="116" r="2.5" fill="#ffffff" opacity="0.6" />

                {/* Eyelid Contour Rim (Upper Lid Shadow) */}
                <path
                  d="M 98 135 C 128 82, 207 75, 267 117"
                  stroke="#050608"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 98 135 C 172 172, 239 164, 267 117"
                  stroke="#080a0e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* 3. RIGHT FELINE EYE */}
              <g>
                {/* Dark Eye Socket Shadow Rim */}
                <path
                  d="M 504 137 C 472 82, 392 74, 330 116 C 357 165, 427 174, 504 137 Z"
                  fill="#040507"
                />

                {/* Sclera & Iris Base */}
                <path
                  d="M 500 135 C 470 85, 395 78, 335 118 C 360 162, 425 170, 500 135 Z"
                  fill="url(#catIrisGoldRight)"
                />

                {/* 24+ Radial Iris Striation Ray Fibers */}
                <g clipPath="url(#rightEyeClip)" opacity={0.35 + progressRatio * 0.45}>
                  {irisRays.map((deg) => {
                    const rad = (deg * Math.PI) / 180
                    const x1 = 415 + Math.cos(rad) * 12
                    const y1 = 125 + Math.sin(rad) * 12
                    const x2 = 415 + Math.cos(rad) * 52
                    const y2 = 125 + Math.sin(rad) * 52
                    return (
                      <line
                        key={`right-ray-${deg}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#fffbeb"
                        strokeWidth="0.8"
                        strokeOpacity="0.6"
                      />
                    )
                  })}
                </g>

                {/* Dynamic Vertical Slit Pupil */}
                <path
                  d={`M 415 86 C ${415 + pupilWidth} 105, ${415 + pupilWidth} 145, 415 164 C ${415 - pupilWidth} 145, ${415 - pupilWidth} 105, 415 86 Z`}
                  fill="#000000"
                />

                {/* Realistic Upper-Left Specular Corneal Catchlights */}
                <ellipse
                  cx="398"
                  cy="108"
                  rx="7"
                  ry="3.5"
                  fill="#ffffff"
                  opacity="0.9"
                  transform="rotate(-25 398 108)"
                />
                <circle cx="408" cy="116" r="2.5" fill="#ffffff" opacity="0.6" />

                {/* Eyelid Contour Rim (Upper Lid Shadow) */}
                <path
                  d="M 502 135 C 472 82, 393 75, 333 117"
                  stroke="#050608"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 502 135 C 428 172, 361 164, 333 117"
                  stroke="#080a0e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </svg>
          </motion.div>

          {/* Minimalist Monospace Progress Bar */}
          <div className="mt-8 w-64 sm:w-72 font-mono text-center">
            <div className="mb-2 flex items-center justify-between text-xs text-ink-muted">
              <span className="text-accent font-bold tracking-wider">
                PORTFOLIO_OS // BOOT
              </span>
              <span className="font-bold text-white">
                [{Math.round(progress)}%]
              </span>
            </div>

            {/* Smooth Track */}
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent shadow-[0_0_10px_var(--color-accent)] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-[10px] text-ink-muted uppercase tracking-widest">
              [ Tap anywhere to skip ]
            </p>
          </div>
        </div>

        {/* Phase B: 8-Column Staircase Wipe Transition */}
        {showStaircase && (
          <div className="pointer-events-none fixed inset-0 z-[110] flex overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0, originY: 0 }}
                animate={{
                  scaleY: [0, 1, 1, 0],
                  originY: [0, 0, 1, 1],
                }}
                transition={{
                  duration: 0.85,
                  times: [0, 0.45, 0.55, 1],
                  delay: i * 0.04,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="h-full flex-1 bg-accent border-r border-black/20"
              />
            ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  )
}
