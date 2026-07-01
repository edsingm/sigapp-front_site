"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FAQItem } from "@/lib/landing-data"

type FAQAccordionProps = {
  items: FAQItem[]
  defaultOpenIndex?: number
}

export function FAQAccordion({ items, defaultOpenIndex }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null
  )

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className={cn(
              "px-1 transition-colors sm:px-0",
              isOpen && "bg-accent/30"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left sm:py-5"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "pr-2 text-sm leading-relaxed font-medium text-foreground transition-colors sm:text-base",
                  isOpen && "text-primary"
                )}
              >
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180 text-primary"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
