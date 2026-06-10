"use client"

import { useState, useEffect } from "react"

const PHRASES = [
  "Feche negócios.",
  "Decida com dados.",
  "Aprove em comitê.",
  "Gerencie terrenos.",
  "Vença a concorrência.",
]

export function HeroRotatingText() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PHRASES.length)
        setVisible(true)
      }, 350)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className={`inline-block text-secondary transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {PHRASES[index]}
    </span>
  )
}
