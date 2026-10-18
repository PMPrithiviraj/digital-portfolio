import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  active: boolean
  onComplete?: () => void
}

export default function StaircaseTransition({ active, onComplete }: Props) {
  if (!active) return null

  return (
    <AnimatePresence onExitComplete={onComplete}>
      <div className="pointer-events-none fixed inset-0 z-[95] flex select-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{
              scaleY: [0, 1, 1, 0],
              originY: [0, 0, 1, 1],
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.45, 0.55, 1],
              delay: i * 0.045,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="h-full flex-1 bg-accent border-r border-black/20 shadow-2xl"
          />
        ))}
      </div>
    </AnimatePresence>
  )
}
