"use client";

import { motion } from "framer-motion";

const firstTimeSteps = [
  {
    n: "01",
    title: "Install the Shortcut",
    body: 'Tap "Add to Shortcuts" above. It opens directly in the Shortcuts app.',
  },
  {
    n: "02",
    title: "Sign in with Google",
    body: "The Shortcut opens a Google login page. Sign in and allow access to your Sheets.",
  },
  {
    n: "03",
    title: "Your sheet is ready",
    body: "A budget sheet is automatically created in your Google Drive. You're done.",
  },
];

const everyTimeSteps = [
  {
    n: "01",
    title: "Tap the Shortcut",
    body: "From your home screen, lock screen widget, or Hey Siri.",
  },
  {
    n: "02",
    title: "Pick a category",
    body: "Food, transport, shopping — seven options, one tap.",
  },
  {
    n: "03",
    title: "Enter the amount",
    body: "Number keypad. That's it. Your sheet updates instantly.",
  },
];

function StepCard({
  steps,
  chip,
  chipColor,
  bg,
  slideFrom,
}: {
  steps: typeof firstTimeSteps;
  chip: string;
  chipColor: string;
  bg: string;
  slideFrom: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: slideFrom }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 rounded-xl p-10 border border-[#2A2825]"
      style={{ background: bg }}
    >
      <span
        className="inline-block font-mono text-[10px] px-3 py-1 rounded-full border mb-8 tracking-widest uppercase"
        style={{ color: chipColor, borderColor: chipColor }}
      >
        {chip}
      </span>

      <div className="flex flex-col gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            className="flex gap-5"
          >
            <span
              className="font-display text-3xl font-semibold leading-none shrink-0 pt-1"
              style={{ color: "#D4A853" }}
            >
              {step.n}
            </span>
            <div>
              <h4 className="font-mono text-sm text-[#F0EDE8] mb-1">
                {step.title}
              </h4>
              <p className="font-mono text-[13px] text-[#8A8680] leading-relaxed">
                {step.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6">
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
            The Setup
          </p>
          <h2
            className="font-display font-semibold text-[#F0EDE8] mb-3"
            style={{ fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 1.1 }}
          >
            Three taps the first time.
          </h2>
          <p className="font-mono text-[15px] text-[#8A8680]">
            One step, every time after.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-6">
          <StepCard
            steps={firstTimeSteps}
            chip="First run only"
            chipColor="#D4A853"
            bg="#161616"
            slideFrom={-60}
          />
          <StepCard
            steps={everyTimeSteps}
            chip="Every run"
            chipColor="#4CAF7D"
            bg="#1E1E1E"
            slideFrom={60}
          />
        </div>
      </div>
    </section>
  );
}
