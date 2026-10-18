/**
 * Procedural Web Audio API Sound Engine & Synthwave BGM Loop
 * Zero external audio assets required. All procedural synthesis.
 */

let audioCtx: AudioContext | null = null
let bgmInterval: number | null = null
let bgmGainNode: GainNode | null = null
let bgmPlaying = false

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    void audioCtx.resume()
  }
  return audioCtx
}

export function isAudioMuted(): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem('hud_audio_muted') === 'true'
}

export function setAudioMuted(muted: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('hud_audio_muted', muted ? 'true' : 'false')
  if (muted && bgmPlaying) {
    stopBgm()
  }
}

export function toggleAudio(): boolean {
  const current = isAudioMuted()
  setAudioMuted(!current)
  return !current
}

/* Micro-Haptic UI Sound Synthesizers */

export function playHoverTick(): void {
  if (isAudioMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // 2400Hz crisp micro-chirp
    osc.type = 'sine'
    osc.frequency.setValueAtTime(2400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.015)

    // Ultra-subtle gain
    gain.gain.setValueAtTime(0.015, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.016)
  } catch (err) {
    void err
  }
}

export function playClickActuate(): void {
  if (isAudioMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(800, now)
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.035)

    gain.gain.setValueAtTime(0.035, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.04)
  } catch (err) {
    void err
  }
}

export function playAlert(): void {
  if (isAudioMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(140, now)
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.12)

    gain.gain.setValueAtTime(0.04, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.13)
  } catch (err) {
    void err
  }
}

export function playSuccess(): void {
  if (isAudioMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [587.33, 880, 1174.66]

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const start = now + idx * 0.04

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, start)

      gain.gain.setValueAtTime(0.02, start)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.14)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(start)
      osc.stop(start + 0.15)
    })
  } catch (err) {
    void err
  }
}

export function playBootHum(): void {
  if (isAudioMuted()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(110, now)
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.6)

    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.025, now + 0.3)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.62)
  } catch (err) {
    void err
  }
}

/* Procedural Synthwave BGM Loop Engine */

export function isBgmPlaying(): boolean {
  return bgmPlaying
}

export function startBgm(): void {
  if (typeof window === 'undefined' || bgmPlaying) return
  const ctx = getAudioContext()
  if (!ctx) return

  bgmPlaying = true

  // Master BGM gain node
  bgmGainNode = ctx.createGain()
  bgmGainNode.gain.setValueAtTime(0.025, ctx.currentTime)
  bgmGainNode.connect(ctx.destination)

  // 16-step Synthwave Bassline Notes in D minor (Hz)
  const bassNotes = [73.42, 73.42, 87.31, 73.42, 98.00, 73.42, 87.31, 110.0, 73.42, 73.42, 87.31, 73.42, 130.81, 110.0, 98.0, 87.31]
  const arpNotes = [293.66, 349.23, 440.0, 523.25, 440.0, 349.23, 293.66, 220.0]

  let step = 0
  const tempoMs = 150 // ~100 BPM 16th notes

  bgmInterval = window.setInterval(() => {
    if (!bgmPlaying || !ctx || !bgmGainNode) return

    const now = ctx.currentTime
    const bassFreq = bassNotes[step % bassNotes.length]
    const arpFreq = arpNotes[step % arpNotes.length]

    // Bass Synth Voice
    const oscBass = ctx.createOscillator()
    const gainBass = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(450, now)

    oscBass.type = 'sawtooth'
    oscBass.frequency.setValueAtTime(bassFreq, now)

    gainBass.gain.setValueAtTime(0.03, now)
    gainBass.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)

    oscBass.connect(filter)
    filter.connect(gainBass)
    gainBass.connect(bgmGainNode)

    oscBass.start(now)
    oscBass.stop(now + 0.15)

    // Ambient High Arp Voice (every 2nd step)
    if (step % 2 === 0) {
      const oscArp = ctx.createOscillator()
      const gainArp = ctx.createGain()
      oscArp.type = 'sine'
      oscArp.frequency.setValueAtTime(arpFreq, now)
      gainArp.gain.setValueAtTime(0.015, now)
      gainArp.gain.exponentialRampToValueAtTime(0.0001, now + 0.25)
      oscArp.connect(gainArp)
      gainArp.connect(bgmGainNode)
      oscArp.start(now)
      oscArp.stop(now + 0.26)
    }

    step++
  }, tempoMs)
}

export function stopBgm(): void {
  bgmPlaying = false
  if (bgmInterval !== null) {
    clearInterval(bgmInterval)
    bgmInterval = null
  }
  if (bgmGainNode && audioCtx) {
    try {
      bgmGainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1)
    } catch (err) {
      void err
    }
    bgmGainNode = null
  }
}

export function toggleBgm(): boolean {
  if (bgmPlaying) {
    stopBgm()
  } else {
    startBgm()
  }
  return bgmPlaying
}
