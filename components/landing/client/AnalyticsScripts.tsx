"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { getConsent, type CookieConsent } from "@/lib/cookie-consent"
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics"

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

function resolveConsent() {
  const c = getConsent()
  return {
    analytics: !!(c?.categories.analytics && GA4_ID),
    marketing: !!(c?.categories.marketing && PIXEL_ID),
  }
}

export function AnalyticsScripts() {
  const [consent, setConsent] = useState({ analytics: false, marketing: false })

  useEffect(() => {
    // leitura do localStorage só existe client-side — necessário para hidratação
    setConsent(resolveConsent()) // eslint-disable-line react-hooks/set-state-in-effect

    function onConsentChanged(e: Event) {
      const detail = (e as CustomEvent<CookieConsent>).detail
      setConsent({
        analytics: !!(detail.categories.analytics && GA4_ID),
        marketing: !!(detail.categories.marketing && PIXEL_ID),
      })
    }

    window.addEventListener("sigapp:consent-changed", onConsentChanged)
    return () => window.removeEventListener("sigapp:consent-changed", onConsentChanged)
  }, [])

  // Listener delegado: qualquer clique em elemento com [data-analytics-event] dispara trackEvent
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element).closest("[data-analytics-event]") as HTMLElement | null
      if (!el) return
      const name = el.dataset.analyticsEvent as AnalyticsEvent
      const params: Record<string, string> = {}
      if (el.dataset.analyticsLocation) params.location = el.dataset.analyticsLocation
      if (el.dataset.analyticsPlan) params.plan = el.dataset.analyticsPlan
      trackEvent(name, params)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <>
      {consent.analytics && GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA4_ID}');`}
          </Script>
        </>
      )}
      {consent.marketing && PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  )
}
