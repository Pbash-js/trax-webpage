"use client";

import { useEffect, useState } from "react";

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Health",
];

const AMOUNT_STEPS = ["", "4", "48", "480", "480.", "480.00"];

export default function PhoneMockup() {
  const [phase, setPhase] = useState<Phase>(0);
  const [visibleCategories, setVisibleCategories] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [amountStep, setAmountStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setPhase(0);
      setVisibleCategories(0);
      setSelectedCategory(false);
      setAmountStep(0);

      // Phase 0 → stagger categories in
      CATEGORIES.forEach((_, i) => {
        timers.push(
          setTimeout(() => {
            setVisibleCategories(i + 1);
          }, 300 + i * 150)
        );
      });

      // Phase 1 → highlight Food & Dining
      timers.push(setTimeout(() => setPhase(1), 1800));
      timers.push(setTimeout(() => setSelectedCategory(true), 1900));

      // Phase 2 → amount screen
      timers.push(setTimeout(() => { setPhase(2); setSelectedCategory(false); }, 2400));

      // Phase 3 → type amount
      AMOUNT_STEPS.forEach((_, i) => {
        timers.push(
          setTimeout(() => setAmountStep(i + 1), 3000 + i * 250)
        );
      });

      // Phase 4 → confirmation receipt
      timers.push(setTimeout(() => setPhase(4), 4500));

      // Loop restart
      timers.push(setTimeout(run, 7500));
    };

    // Small initial delay before first run
    const init = setTimeout(run, 400);
    return () => {
      clearTimeout(init);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className="relative mx-auto"
      style={{ width: 280, height: 560 }}
      aria-hidden="true"
    >
      {/* Phone frame */}
      <div
        className="absolute inset-0 rounded-[44px] border-2 border-[#2A2825]"
        style={{
          background: "#161616",
          boxShadow:
            "0 0 0 8px #0D0D0D, 0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px #1E1E1E",
          willChange: "transform",
        }}
      >
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0D0D0D] rounded-full" />

        {/* Screen content */}
        <div className="absolute top-14 left-3 right-3 bottom-8 rounded-[32px] overflow-hidden bg-[#0D0D0D]">
          {/* Status bar */}
          <div className="flex justify-between items-center px-4 pt-3 pb-1">
            <span className="font-mono text-[10px] text-[#8A8680]">9:41</span>
            <div className="flex gap-1 items-center">
              <div className="w-3 h-2 border border-[#8A8680] rounded-[2px] relative">
                <div className="absolute inset-[2px] right-auto w-[5px] bg-[#8A8680] rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Category picker — phases 0 & 1 */}
          {(phase === 0 || phase === 1) && (
            <div className="px-4 pt-2">
              <p className="font-mono text-[11px] text-[#8A8680] uppercase tracking-widest mb-3">
                Choose a category
              </p>
              <div className="flex flex-col gap-[6px]">
                {CATEGORIES.map((cat, i) => {
                  const visible = i < visibleCategories;
                  const highlighted = phase === 1 && i === 0 && selectedCategory;
                  return (
                    <div
                      key={cat}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 200ms ease-out, transform 200ms ease-out",
                        background: highlighted ? "#D4A85318" : "transparent",
                        border: highlighted ? "1px solid #D4A85340" : "1px solid transparent",
                      }}
                    >
                      <span
                        className="font-mono text-[13px]"
                        style={{ color: highlighted ? "#D4A853" : "#F0EDE8" }}
                      >
                        {highlighted ? "✓" : "›"} {cat}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Amount input — phase 2 */}
          {phase === 2 && (
            <div className="px-4 pt-6 flex flex-col items-center">
              <p className="font-mono text-[11px] text-[#8A8680] uppercase tracking-widest mb-6">
                Amount?
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl text-[#8A8680]">₹</span>
                <span className="font-mono text-5xl text-[#F0EDE8]">
                  {AMOUNT_STEPS[amountStep - 1] ?? ""}
                </span>
                <span className="cursor-blink font-mono text-4xl text-[#D4A853]">|</span>
              </div>
            </div>
          )}

          {/* Receipt confirmation — phase 4 */}
          {phase === 4 && (
            <div className="px-4 pt-4 flex flex-col items-center">
              <p className="font-mono text-[11px] text-[#8A8680] uppercase tracking-widest mb-4">
                Logged
              </p>
              <div
                className="w-full rounded-xl p-5 border border-[#2A2825] animate-slide-up"
                style={{
                  background: "#1A1814",
                  animation: "slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#4CAF7D20] flex items-center justify-center">
                    <span className="text-[#4CAF7D] text-xs">✓</span>
                  </div>
                  <span className="font-mono text-sm text-[#4CAF7D]">Logged</span>
                </div>
                <div className="h-px bg-[#2A2825] mb-4" />
                <p className="font-mono text-[11px] text-[#8A8680] uppercase tracking-widest mb-1">
                  Category
                </p>
                <p className="font-display text-xl text-[#F0EDE8] mb-3">
                  Food &amp; Dining
                </p>
                <p className="font-mono text-[11px] text-[#8A8680] uppercase tracking-widest mb-1">
                  Amount
                </p>
                <p className="font-display text-3xl italic text-[#D4A853] mb-3">
                  ₹ 480.00
                </p>
                <p className="font-mono text-[10px] text-[#4A4845]">
                  Today, 2:14 PM
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#2A2825] rounded-full" />
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
