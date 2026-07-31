"use client"

import { useId, useState } from "react"
import { ChevronDown } from "lucide-react"

import type { FAQItem } from "@/lib/landing-data"
import { cn } from "@/lib/utils"

type FAQAccordionProps = {
  items: FAQItem[]
  defaultOpenIndex?: number
  startIndex?: number
}

export function FAQAccordion({
  items,
  defaultOpenIndex,
  startIndex = 0,
}: FAQAccordionProps) {
  const accordionId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null
  )

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const itemNumber = startIndex + index + 1
        const panelId = `${accordionId}-panel-${index}`
        const triggerId = `${accordionId}-trigger-${index}`

        return (
          <article
            key={item.question}
            className={cn("faq-item", isOpen && "is-open")}
          >
            <button
              id={triggerId}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="faq-item-index">
                {String(itemNumber).padStart(2, "0")}
              </span>
              <span className="faq-item-question">{item.question}</span>
              <span className="faq-item-toggle">
                <ChevronDown aria-hidden="true" />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="faq-item-panel"
            >
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
