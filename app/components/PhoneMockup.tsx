"use client";

import Image from "next/image";
import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PRODUCTS } from "./products";

const ROTATE_MS = 1800;

// Outer (around phone) carousel sizing
const OUTER_THUMB = 100;
const OUTER_GAP = 8;

// Inner (inside phone) carousel sizing
const INNER_ITEM_W = 150;
const INNER_ITEM_H = 168;
const INNER_GAP = 6;

export function PhoneMockup() {
  const [active, setActive] = useState(0);
  const [hoverPause, setHoverPause] = useState(false);
  const [dragPause, setDragPause] = useState(false);
  const paused = hoverPause || dragPause;

  const dragRef = useRef<{ startX: number; lastX: number; pointerId: number | null }>({
    startX: 0,
    lastX: 0,
    pointerId: null,
  });
  const [dragOffset, setDragOffset] = useState(0);

  // Triple the list so both inner & outer strips can loop seamlessly
  const tripled = useMemo(() => [...PRODUCTS, ...PRODUCTS, ...PRODUCTS], []);
  const baseLen = PRODUCTS.length;
  const centerIndex = baseLen + active;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % baseLen);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, baseLen]);

  const goNext = useCallback(() => setActive((i) => (i + 1) % baseLen), [baseLen]);
  const goPrev = useCallback(
    () => setActive((i) => (i - 1 + baseLen) % baseLen),
    [baseLen]
  );

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { startX: e.clientX, lastX: e.clientX, pointerId: e.pointerId };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setDragPause(true);
  };
  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== e.pointerId) return;
    dragRef.current.lastX = e.clientX;
    setDragOffset(e.clientX - dragRef.current.startX);
  };
  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== e.pointerId) return;
    const delta = dragRef.current.lastX - dragRef.current.startX;
    dragRef.current.pointerId = null;
    setDragOffset(0);
    setDragPause(false);
    if (Math.abs(delta) > 50) {
      if (delta < 0) goNext();
      else goPrev();
    }
  };

  const outerStride = OUTER_THUMB + OUTER_GAP;
  const innerStride = INNER_ITEM_W + INNER_GAP;

  return (
    <div className="relative z-10 mx-auto mt-8 md:mt-12 max-w-5xl select-none">
      <div className="relative h-[640px] md:h-[660px]">
        {/* OUTER carousel — sits behind the phone at the same vertical row as the
            inner carousel inside the phone (~158px down: 8 phone-top + 6 padding +
            44 notch space + 100 half of 200px carousel). Products fade out toward
            the edges via the triangular mask. */}
        <div
          className="absolute left-1/4 right-1/4 top-[158px] -translate-y-1/2 z-[1] flex justify-center overflow-hidden fade-mask-x pointer-events-none"
          aria-hidden
        >
          <div
            className="flex items-center gap-2 transition-transform duration-[800ms] ease-in-out"
            style={{
              transform: `translateX(calc(50% - ${
                centerIndex * outerStride + OUTER_THUMB / 2
              }px + ${dragOffset * 0.5}px))`,
            }}
          >
            {tripled.map((p, i) => {
              const isCenter = i === centerIndex;
              return (
                <div
                  key={`outer-${p.id}-${i}`}
                  className="shrink-0 transition-all duration-[800ms] ease-in-out"
                  style={{
                    width: OUTER_THUMB,
                    height: OUTER_THUMB,
                    opacity: isCenter ? 1 : 0.45,
                    transform: isCenter ? "scale(1.15)" : "scale(0.85)",
                    filter: isCenter ? "blur(0px)" : "blur(1.5px)",
                  }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={p.thumb}
                      alt={p.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phone frame */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-2 w-[300px] h-[600px] rounded-[40px] z-[3]"
          style={{
            background:
              "linear-gradient(180deg, rgba(88,88,88,0.24) 0%, rgba(255,255,255,0.24) 100%)",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.18)",
            padding: 6,
          }}
          onMouseEnter={() => setHoverPause(true)}
          onMouseLeave={() => setHoverPause(false)}
        >
          <div
            className="relative w-full h-full rounded-[36px] bg-white overflow-hidden touch-pan-y"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Dynamic Island / notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center justify-end bg-black h-[26px] w-[100px] rounded-full pr-[6px]">
              <div
                className="h-[14px] w-[14px] rounded-full"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.04) 70%, rgba(255,255,255,0.16) 100%)",
                }}
              />
            </div>

            {/* INNER carousel — large product images at top of phone screen */}
            <div className="absolute top-[44px] left-0 right-0 h-[200px] z-20 overflow-hidden cursor-grab active:cursor-grabbing">
              <div
                className="absolute top-1/2 -translate-y-1/2 left-1/2 flex items-center gap-1.5 transition-transform duration-[700ms] ease-in-out"
                style={{
                  transform: `translateX(calc(-${
                    centerIndex * innerStride + INNER_ITEM_W / 2
                  }px + ${dragOffset * 0.6}px))`,
                }}
              >
                {tripled.map((p, i) => {
                  const isCenter = i === centerIndex;
                  return (
                    <div
                      key={`inner-${p.id}-${i}`}
                      className="shrink-0 transition-all duration-[700ms] ease-in-out"
                      style={{
                        width: INNER_ITEM_W,
                        height: INNER_ITEM_H,
                        opacity: isCenter ? 1 : 0.7,
                        transform: isCenter ? "scale(1.05)" : "scale(0.88)",
                        filter: isCenter ? "blur(0px)" : "blur(1.8px)",
                      }}
                    >
                      <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                        <Image
                          src={p.thumb}
                          alt={p.name}
                          fill
                          sizes="180px"
                          className="object-cover"
                          draggable={false}
                          priority={i === baseLen}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Small horizontal grab-handle indicator */}
            <div className="absolute top-[238px] left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-neutral-300 z-20" />

            {/* Detail card area — image starts from the product title down */}
            <div className="absolute top-[252px] left-0 right-0 bottom-0 z-10">
              {PRODUCTS.map((p, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={`detail-${p.id}`}
                    aria-hidden={!isActive}
                    className="absolute inset-0 transition-all duration-[700ms] ease-in-out will-change-transform"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(60px)",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={p.detail}
                        alt={p.name}
                        fill
                        sizes="280px"
                        className="object-cover object-top"
                        draggable={false}
                        priority={i === 0}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Soft phone shadow plate */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-6 w-[320px] h-[610px] rounded-[44px] z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 70%, rgba(31,56,36,0.10) 0%, rgba(31,56,36,0) 80%)",
          }}
        />
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center gap-1.5">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to product ${i + 1}`}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 22 : 6,
              background: i === active ? "#1F3824" : "rgba(31,56,36,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
