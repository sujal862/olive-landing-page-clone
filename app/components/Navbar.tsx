"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

// frontend clone : all nav links are placeholders and do not lead anywhere.. 
const navLinks: { label: string; href: string; hasMenu?: boolean }[] = [
  { label: "Solutions", href: "#", hasMenu: true },
  { label: "Features", href: "#", hasMenu: false },
  { label: "Pricing", href: "#", hasMenu: false },
  { label: "Blog", href: "#", hasMenu: true },
  { label: "Restaurants", href: "#" },
  { label: "Food", href: "#", hasMenu: true },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#1F3824]"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </>
      )}
    </svg>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-[100] w-full">
      {/* Desktop nav */}
      <div className="hidden lg:flex w-full flex-row items-center justify-between rounded-full px-2 py-2">
        <Link
          href="/"
          aria-label="Olive home"
          className="relative z-20 flex items-center px-2 py-1"
        >
          <Logo className="w-[180px] h-auto" />
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-2 font-[var(--font-inter)]">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="nav-link inline-flex items-center gap-1 text-[15px]"
            >
              <span>{l.label}</span>
              {l.hasMenu && <ChevronDown className="opacity-70" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 pr-1">
          <Link
            href="#"
            className="text-[#1F3824] text-[15px] font-medium px-3 py-2 hover:opacity-70 transition"
          >
            Sign in
          </Link>
          <a
            href="https://apps.apple.com/us/app/olive-holistic-food-scanner/id6739765789"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-primary"
          >
            <span>Get Olive</span>
            <ArrowRight />
          </a>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="lg:hidden flex w-full items-center justify-between px-2 py-2">
        <Link href="/" aria-label="Olive home" className="flex items-center">
          <Logo className="w-[140px] h-auto" />
        </Link>
        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-md hover:bg-black/5 transition"
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden mt-2 mx-2 rounded-2xl bg-white/95 backdrop-blur border border-neutral-200 shadow-lg p-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg text-[#1F3824] hover:bg-black/5 inline-flex items-center justify-between"
            >
              <span>{l.label}</span>
              {l.hasMenu && <ChevronDown />}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-neutral-200">
            <Link
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-[#1F3824] font-medium"
            >
              Sign in
            </Link>
            <a
              href="https://apps.apple.com/us/app/olive-holistic-food-scanner/id6739765789"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-primary"
            >
              <span>Get Olive</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
