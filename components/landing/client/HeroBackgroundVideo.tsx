"use client"

import { useSyncExternalStore, useState } from "react"
import Image from "next/image"

import { HERO_COPY } from "@/lib/landing-data"

const VIDEO_SRC = "/videos/hero-product.mp4"
const POSTER_SRC = "/images/hero-territorio.jpg"

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", onStoreChange)
  return () => mq.removeEventListener("change", onStoreChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getReducedMotionServerSnapshot() {
  return true
}

/**
 * Fundo do hero: vídeo ~10s em loop quando motion é permitido;
 * fallback estático com prefers-reduced-motion ou falha de vídeo.
 */
export function HeroBackgroundVideo() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )
  const [videoFailed, setVideoFailed] = useState(false)
  const useVideo = !prefersReducedMotion && !videoFailed

  return (
    <>
      <Image
        src={POSTER_SRC}
        alt={HERO_COPY.panel.photoAlt}
        fill
        priority
        sizes="100vw"
        className={
          useVideo
            ? "object-cover object-[58%_center] sm:object-center opacity-0"
            : "hero-cinematic-image object-cover object-[58%_center] sm:object-center"
        }
        aria-hidden={useVideo}
      />

      {useVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : null}
    </>
  )
}
