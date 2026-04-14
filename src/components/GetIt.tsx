"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SHORTCUT_LINK = "https://www.icloud.com/shortcuts/SHORTCUT_ID";

export default function GetIt() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));
  }, []);

  return (
    <section
      id="get-it"
      className="relative py-32 px-6 border-t border-[#2A2825] overflow-hidden"
      style={{ background: "#161616" }}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="relative z-10 max-w-container mx-auto flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] text-[#D4A853] tracking-[0.15em] uppercase mb-6"
        >
          Free · Open Source · No account needed
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold text-[#F0EDE8] mb-10"
          style={{ fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.1 }}
        >
          Ready to stop
          <br />
          overthinking it?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href={SHORTCUT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-shortcut-link
            className="inline-flex items-center justify-center gap-2 h-[60px] px-10 rounded-md bg-[#D4A853] text-black font-mono text-base font-medium min-w-[280px] transition-all duration-200 hover:brightness-110"
            style={{
              willChange: "transform",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 24px #D4A85360";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
            }}
          >
            {isIOS ? "Open in Shortcuts" : "Add to Shortcuts"} →
          </a>

          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-[#4A4845]">
            <span>✓ No account needed</span>
            <span>✓ iOS 16+</span>
            <span>✓ Takes 60 seconds</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
