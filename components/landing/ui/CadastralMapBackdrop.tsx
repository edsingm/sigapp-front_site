import { cn } from "@/lib/utils"

type CadastralParcel = {
  d: string
  active?: boolean
  focus?: boolean
}

const PARCELS: CadastralParcel[] = [
  { d: "M72 78 146 64 214 88 196 146 116 152Z", active: true },
  { d: "M146 64 226 52 302 84 286 144 196 146Z" },
  { d: "M226 52 316 44 398 82 386 142 286 144Z", active: true },
  { d: "M316 44 414 56 500 102 480 160 386 142Z" },
  { d: "M500 102 574 142 554 198 480 160Z", active: true },
  { d: "M116 152 196 146 184 214 100 224 62 176Z" },
  { d: "M196 146 286 144 278 210 184 214Z", active: true },
  { d: "M286 144 386 142 380 208 278 210Z", focus: true },
  { d: "M386 142 480 160 468 226 380 208Z", active: true },
  { d: "M480 160 554 198 536 250 468 226Z" },
  { d: "M100 224 184 214 176 286 92 298 48 250Z" },
  { d: "M184 214 278 210 274 280 176 286Z", active: true },
  { d: "M278 210 380 208 376 278 274 280Z", active: true },
  { d: "M380 208 468 226 460 292 376 278Z", active: true },
  { d: "M468 226 536 250 522 308 460 292Z" },
  { d: "M92 298 176 286 170 350 96 364 54 324Z" },
  { d: "M176 286 274 280 270 342 170 350Z" },
  { d: "M274 280 376 278 372 338 270 342Z", active: true },
  { d: "M376 278 460 292 454 348 372 338Z", active: true },
  { d: "M460 292 522 308 512 356 454 348Z" },
]

const PINS = [
  { cx: 327, cy: 176, focus: true },
  { cx: 424, cy: 242, focus: false },
  { cx: 322, cy: 309, focus: false },
]

export function CadastralMapBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "brand-map pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="brand-map__glow brand-map__glow--top" />
      <div className="brand-map__glow brand-map__glow--bottom" />
      <div className="brand-map__grid" />
      <div className="brand-map__scan" />

      <svg
        viewBox="0 0 640 420"
        className="brand-map__svg absolute inset-0 h-full w-full"
        fill="none"
      >
        <path
          d="M24 108C128 68 242 74 348 116c100 39 186 54 268 34"
          className="brand-map__contour"
        />
        <path
          d="M18 168c110-34 206-22 312 18 104 38 198 50 292 22"
          className="brand-map__contour brand-map__contour--delay"
        />
        <path
          d="M12 232c112-30 220-14 330 26 94 34 186 44 286 12"
          className="brand-map__contour"
        />
        <path
          d="M28 304c104-24 214-12 322 18 102 28 188 32 272 2"
          className="brand-map__contour brand-map__contour--delay"
        />

        <polyline
          points="424,242 327,176 322,309"
          className="brand-map__route"
        />

        {PARCELS.map((parcel) => (
          <path
            key={parcel.d}
            d={parcel.d}
            className={cn("brand-map__parcel", {
              "brand-map__parcel--active": parcel.active,
              "brand-map__parcel--focus": parcel.focus,
            })}
          />
        ))}

        {PINS.map((pin) => (
          <g
            key={`${pin.cx}-${pin.cy}`}
            className={cn("brand-map__pin", {
              "brand-map__pin--focus": pin.focus,
            })}
          >
            <circle className="brand-map__pin-halo" cx={pin.cx} cy={pin.cy} r="20" />
            <circle className="brand-map__pin-dot" cx={pin.cx} cy={pin.cy} r={pin.focus ? 6 : 4.5} />
            <circle className="brand-map__pin-core" cx={pin.cx} cy={pin.cy} r={pin.focus ? 2.4 : 1.8} />
          </g>
        ))}
      </svg>
    </div>
  )
}
