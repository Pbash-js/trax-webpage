"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PhoneMockup from "./PhoneMockup";

const SHORTCUT_LINK = "https://www.icloud.com/shortcuts/SHORTCUT_ID";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

export default function Hero() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Radial gold glow behind phone */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-container mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Left — copy */}
        <div className="flex-1 max-w-xl">
          <motion.p
            {...fadeUp(0)}
            className="font-mono text-[11px] text-[#D4A853] tracking-[0.15em] uppercase mb-6"
          >
            iOS Shortcut · Google Sheets · Free
          </motion.p>

          <h1 className="font-display font-semibold text-[#F0EDE8] mb-6 leading-[1.05]"
            style={{ fontSize: "clamp(48px, 6vw, 72px)" }}
          >
            {["Expense", "tracking", "that gets out", "of your way."].map(
              (word, i) => (
                <motion.span
                  key={word}
                  {...fadeUp(0.1 + i * 0.08)}
                  className="block"
                >
                  {word}
                </motion.span>
              )
            )}
          </h1>

          <motion.p
            {...fadeUp(0.4)}
            className="font-mono text-[15px] text-[#8A8680] leading-[1.7] max-w-[380px] mb-8"
          >
            Five seconds. One tap. Your data lives in your own Google Sheet —
            not our servers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
          >
            <a
              href={SHORTCUT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-shortcut-link
              className="inline-flex items-center justify-center h-[52px] px-8 rounded bg-[#D4A853] text-black font-mono text-sm font-medium hover:brightness-110 transition-all duration-200"
            >
              {isIOS ? "Open in Shortcuts" : "Add to Shortcuts"}
            </a>
            <p className="mt-3 font-mono text-xs text-[#4A4845]">
              Requires iOS 16+ · Free forever
            </p>
          </motion.div>
        </div>

        {/* Right — phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex-shrink-0"
          style={{ willChange: "transform" }}
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}
