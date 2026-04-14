"use client";

import { motion } from "framer-motion";
import { Lock, Key, EyeOff } from "lucide-react";

const cards = [
  {
    Icon: Lock,
    title: "You own the sheet",
    body: "Your expense data is written directly to a Google Sheet in your own Google Drive account. We never store your financial data anywhere.",
  },
  {
    Icon: Key,
    title: "Tokens, not passwords",
    body: "We use Google's official OAuth 2.0 flow. Your Google password never touches our system. You can revoke access any time from your Google account settings.",
  },
  {
    Icon: EyeOff,
    title: "We see nothing",
    body: "Our backend receives your expense entries only long enough to write them to your sheet. We log no financial data, no spending patterns, no personal information.",
  },
];

export default function DataIsYours() {
  return (
    <section className="py-32 px-6">
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
            Privacy First
          </p>
          <h2
            className="font-display font-semibold text-[#F0EDE8] mb-3"
            style={{ fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 1.1 }}
          >
            Your data lives in your Google Drive.
          </h2>
          <p className="font-mono text-[15px] text-[#8A8680]">
            Not our servers. Not our databases. Yours.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {cards.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-xl p-8 border border-[#2A2825] bg-[#161616]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#D4A85318] border border-[#D4A85340] flex items-center justify-center mb-6">
                <Icon size={18} color="#D4A853" />
              </div>
              <h3 className="font-mono text-sm text-[#F0EDE8] mb-3">{title}</h3>
              <p className="font-mono text-[13px] text-[#8A8680] leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p
            className="font-display italic text-[#F0EDE8] mb-4 mx-auto"
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              lineHeight: 1.4,
              maxWidth: 680,
            }}
          >
            &ldquo;We built this for ourselves. We&rsquo;d never build something
            we wouldn&rsquo;t trust.&rdquo;
          </p>
          <p className="font-mono text-[12px] text-[#4A4845]">
            — The team behind Trax
          </p>
        </motion.div>
      </div>
    </section>
  );
}
