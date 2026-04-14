"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    status: "NOW",
    label: "Available",
    title: "Core expense logging",
    body: "Category selection · Amount entry · Auto-sync to Google Sheets",
    done: true,
  },
  {
    status: "NEXT",
    label: "In development",
    title: "Budget limits",
    body: "Set monthly caps per category. Get notified when you're close.",
    done: false,
  },
  {
    status: "COMING",
    label: "Planned",
    title: "Recurring expenses",
    body: "Mark subscriptions and bills. Never log them again.",
    done: false,
  },
  {
    status: "COMING",
    label: "Planned",
    title: "Dashboard website",
    body: "A beautiful read-only web view of your spending — shareable, embeddable, yours.",
    done: false,
  },
  {
    status: "LATER",
    label: "Exploring",
    title: "Split expenses",
    body: "Log group expenses and track who owes what. Works with the same sheet.",
    done: false,
  },
  {
    status: "LATER",
    label: "Exploring",
    title: "Multi-currency",
    body: "Automatic conversion logged alongside original amount. For the frequent traveller.",
    done: false,
  },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-mono text-[11px] text-[#D4A853] tracking-[0.15em] uppercase mb-4">
            Roadmap
          </p>
          <h2
            className="font-display font-semibold text-[#F0EDE8]"
            style={{ fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 1.1 }}
          >
            This is just the start.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Animated vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#2A2825] overflow-hidden">
            <motion.div
              className="w-full bg-[#D4A853] origin-top"
              style={{ scaleY: lineScaleY, height: "100%" }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {items.map((item, i) => (
              <motion.div
                key={`${item.status}-${item.title}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
                className="relative"
              >
                {/* Dot */}
                <div
                  className="absolute -left-[38px] top-1 w-4 h-4 rounded-full border-2 border-[#D4A853] flex items-center justify-center"
                  style={{
                    background: item.done ? "#D4A853" : "#0D0D0D",
                  }}
                >
                  {item.done && (
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  )}
                </div>

                <div className="flex items-baseline gap-3 mb-1">
                  <span
                    className="font-mono text-[11px] tracking-widest uppercase"
                    style={{
                      color: item.done ? "#D4A853" : "#8A8680",
                    }}
                  >
                    {item.status}
                  </span>
                  <span className="font-mono text-[11px] text-[#4A4845]">
                    — {item.label}
                  </span>
                </div>
                <h3 className="font-display text-xl text-[#F0EDE8] mb-1">
                  {item.title}
                </h3>
                <p className="font-mono text-[13px] text-[#8A8680] leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
