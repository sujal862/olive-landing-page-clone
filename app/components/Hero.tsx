import Image from "next/image";
import { PhoneMockup } from "./PhoneMockup";

const AVATARS = [
  { src: "/avatars/1547592180-85f173990554.jpg", alt: "Olive customer 1" },
  { src: "/avatars/1605522561233-768ad7a8fabf.jpg", alt: "Olive customer 2" },
  { src: "/avatars/1576867757603-05b134ebc379.jpg", alt: "Olive customer 3" },
  { src: "/avatars/1438761681033-6461ffad8d80.jpg", alt: "Olive customer 4" },
];

function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      width="20"
      height="20"
    >
      <path d="M16.365 1.43c0 1.14-.39 2.21-1.14 3.06-.83.95-2.18 1.69-3.5 1.59-.16-1.13.39-2.31 1.13-3.13.83-.93 2.27-1.62 3.51-1.52ZM20.5 17.27c-.55 1.27-.81 1.83-1.51 2.95-.99 1.55-2.39 3.49-4.12 3.5-1.54.02-1.93-1-4.02-.99-2.09.01-2.52 1.01-4.07.99-1.73-.02-3.05-1.77-4.04-3.32-2.78-4.36-3.07-9.49-1.36-12.21 1.21-1.93 3.13-3.06 4.93-3.06 1.83 0 2.98 1 4.49 1 1.46 0 2.36-1 4.47-1 1.6 0 3.29.87 4.5 2.38-3.96 2.17-3.31 7.83.73 9.76Z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative pt-6 md:pt-12 pb-2">
      {/* Social proof row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <div className="flex items-center -space-x-3">
          {AVATARS.map((a, i) => {
            // Earlier avatars overlap later ones (left-on-top stack). Class-based
            // z-index so the hover variant actually overrides the base value.
            const baseZ = ["z-[4]", "z-[3]", "z-[2]", "z-[1]"][i] ?? "z-[1]";
            return (
              <div
                key={i}
                className={`group relative w-8 h-8 rounded-full overflow-hidden border-2 border-white ring-1 ring-neutral-200 ${baseZ} hover:z-40 transition-[box-shadow,ring-color] duration-300 ease-out hover:shadow-[0_6px_20px_-6px_rgba(31,56,36,0.55)] hover:ring-2 hover:ring-white cursor-pointer`}
              >
                <Image
                  src={a.src}
                  alt={a.alt}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            );
          })}
          {/* 3k+ pill — always on top, regardless of hover state on any avatar */}
          <div
            className="relative z-50 h-8 w-8 flex items-center justify-center rounded-full border-2 border-white ring-1 ring-neutral-200"
            style={{
              background:
                "linear-gradient(135deg, rgba(231,230,230,0.7) 0%, rgba(203,203,203,0.7) 97%)",
            }}
          >
            <span className="text-[10px] font-medium text-black/40">3k+</span>
          </div>
        </div>
        <span
          className="text-xs md:text-sm text-neutral-600"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          Trusted by thousands of healthy families
        </span>
      </div>

      {/* Headline */}
      <h1
        className="mx-auto max-w-3xl text-center text-[40px] sm:text-[56px] md:text-[80px] leading-[1.02] tracking-[-0.025em] text-[#1F3824]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700, textWrap: "balance" }}
      >
        The Safest Way to Shop for Groceries
      </h1>

      {/* Sub-copy */}
      <p
        className="mx-auto mt-6 max-w-xl px-4 text-center text-[15px] md:text-[17px] leading-[1.55]"
        style={{ color: "rgba(31,31,31,0.6)" }}
      >
        Use the Olive Food Scanner App to Instantly Eliminate Harmful Ingredients from
        Your Family&apos;s Diet and Get Expert-Backed Food Insights
      </p>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <a
          href="https://apps.apple.com/us/app/olive-holistic-food-scanner/id6739765789"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill-primary px-7 py-3.5 text-base"
        >
          <AppleIcon />
          <span>Download for iOS</span>
        </a>
      </div>

      {/* Phone with carousel */}
      <PhoneMockup />
    </section>
  );
}
