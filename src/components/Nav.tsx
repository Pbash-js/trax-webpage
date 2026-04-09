"use client";

import { useEffect, useState } from "react";
import { X, Menu } from "lucide-react";
import Link from "next/link";

const SHORTCUT_LINK = "https://www.icloud.com/shortcuts/SHORTCUT_ID";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 transition-all duration-300"
        style={{
          backdropFilter: "blur(20px)",
          backgroundColor: "#0D0D0D80",
          borderBottom: scrolled ? "1px solid #2A2825" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <div className="flex-1">
          <a
            href="#"
            className="font-display text-xl font-semibold tracking-wider text-[#F0EDE8]"
          >
            trax<span className="text-[#D4A853]">·</span>
          </a>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="font-mono text-sm text-[#8A8680] hover:text-[#F0EDE8] transition-colors duration-200"
          >
            How it works
          </a>
          <Link
            href="/privacy"
            className="font-mono text-sm text-[#8A8680] hover:text-[#F0EDE8] transition-colors duration-200"
          >
            Privacy
          </Link>
          <a
            href={SHORTCUT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-4 py-2 rounded-full border border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853] hover:text-black transition-all duration-200"
          >
            Get the Shortcut
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#8A8680] hover:text-[#F0EDE8] transition-colors"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          drawerOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            drawerOpen ? "opacity-60" : "opacity-0"
          }`}
          onClick={() => setDrawerOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#161616] border-l border-[#2A2825] p-8 flex flex-col gap-6 transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="self-end text-[#8A8680] hover:text-[#F0EDE8] transition-colors"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
          <a
            href="#how-it-works"
            className="font-mono text-base text-[#F0EDE8]"
            onClick={() => setDrawerOpen(false)}
          >
            How it works
          </a>
          <Link
            href="/privacy"
            className="font-mono text-base text-[#F0EDE8]"
            onClick={() => setDrawerOpen(false)}
          >
            Privacy
          </Link>
          <a
            href={SHORTCUT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-base px-4 py-3 rounded-full border border-[#D4A853] text-[#D4A853] text-center hover:bg-[#D4A853] hover:text-black transition-all duration-200"
            onClick={() => setDrawerOpen(false)}
          >
            Get the Shortcut
          </a>
        </div>
      </div>
    </>
  );
}
