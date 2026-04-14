"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Lock, Mic, ChevronDown } from "lucide-react";

// ── Block 1 data ───────────────────────────────────────────────────────────────

const loggingInputSteps = [
  {
    n: "01",
    title: "Choose a category",
    body: "Seven options: Food & Dining, Transport, Shopping, Entertainment, Bills & Utilities, Health, Other. One tap, no typing.",
  },
  {
    n: "02",
    title: "Enter the amount",
    body: "Number keypad. Decimals work — ₹420.69 is fine.",
  },
  {
    n: "03",
    title: "Logged",
    body: "A confirmation appears. Your sheet updates instantly.",
  },
];

const loggingResultSteps = [
  {
    n: "01",
    title: "A new row appears",
    body: "Timestamp, category, amount, and any notes land in your Transactions tab immediately.",
  },
  {
    n: "02",
    title: "Totals update",
    body: "Your Dashboard recalculates — spend this month, category breakdown, trends.",
  },
  {
    n: "03",
    title: "Nothing to save",
    body: "No confirmation screen. No save button. It's already there.",
  },
];

// ── Block 2 data ───────────────────────────────────────────────────────────────

const sampleRows = [
  { timestamp: "Jan 15, 9:42 AM", category: "Food & Dining", amount: "₹420.69", notes: "Lunch with team" },
  { timestamp: "Jan 15, 6:18 PM", category: "Transport", amount: "₹85.00", notes: "—" },
  { timestamp: "Jan 16, 2:30 PM", category: "Shopping", amount: "₹1,249.00", notes: "New notebook" },
  { timestamp: "Jan 17, 8:05 AM", category: "Food & Dining", amount: "₹65.00", notes: "Coffee" },
  { timestamp: "Jan 17, 1:55 PM", category: "Bills & Utilities", amount: "₹799.00", notes: "Netflix" },
];

const dashboardStats = [
  { category: "Food & Dining", amount: "₹6,240", pct: 42 },
  { category: "Shopping", amount: "₹3,850", pct: 26 },
  { category: "Transport", amount: "₹2,100", pct: 14 },
  { category: "Bills & Utilities", amount: "₹1,598", pct: 11 },
  { category: "Other", amount: "₹1,050", pct: 7 },
];

// ── Block 3 data ───────────────────────────────────────────────────────────────

const runCards = [
  {
    Icon: Home,
    title: "Home screen",
    body: "Add Trax to your home screen like any app. One tap to open.",
  },
  {
    Icon: Lock,
    title: "Lock screen widget",
    body: "Add Trax as a lock screen widget. Log an expense without unlocking your phone.",
  },
  {
    Icon: Mic,
    title: "Siri",
    body: 'Say "Hey Siri, run Trax." The whole flow works hands-free.',
  },
];

// ── Block 4 data ───────────────────────────────────────────────────────────────

const controlBullets = [
  "Edit or delete any entry directly in the sheet",
  "Add your own columns — subcategory, account, tags — Trax ignores them safely",
  "Download as CSV or Excel any time via File → Download",
  "Share the sheet with a partner or accountant like any Google Doc",
  "Revoke Trax's access any time at myaccount.google.com/permissions",
];

// ── Block 5 data ───────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Does Trax work offline?",
    a: "The category and amount input works without a connection. The sync to your sheet requires internet — Trax retries automatically when you're back online.",
  },
  {
    q: "Can I change the categories?",
    a: "Not yet from within the Shortcut — this is on the roadmap. For now, use Other and add a note, or edit the entry directly in your sheet.",
  },
  {
    q: "What if I log a mistake?",
    a: "Open your Google Sheet and edit or delete the row directly. Nothing is locked.",
  },
  {
    q: "Can I use Trax on multiple devices?",
    a: "Yes. Install the Shortcut on each device and sign in with the same Google account on first run. All entries go to the same sheet automatically.",
  },
  {
    q: "What's the Notes field for?",
    a: 'It\'s optional — add context like "Uber home" or "Netflix annual" if you want it. Maybe feed the sheet to Claude to analyze once a month. Or, leave it blank if you don\'t. Logged either way.',
  },
  {
    q: "Is Trax really free?",
    a: "Yes. No subscription, no ads, no premium tier ( for now ; ) ). It's a Shortcut that writes to your own Google Sheet.",
  },
];

// ── StepCard — same pattern as HowItWorks ─────────────────────────────────────

function StepCard({
  steps,
  chip,
  chipColor,
  bg,
  slideFrom,
}: {
  steps: { n: string; title: string; body: string }[];
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
              <h4 className="font-mono text-sm text-[#F0EDE8] mb-1">{step.title}</h4>
              <p className="font-mono text-[13px] text-[#8A8680] leading-relaxed">{step.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Sheet mockup ──────────────────────────────────────────────────────────────

function SheetMockup() {
  const [activeTab, setActiveTab] = useState<"transactions" | "dashboard">("transactions");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-[#2A2825] overflow-hidden"
      style={{ background: "#0F0F0F" }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161616] border-b border-[#2A2825]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2A2825]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2A2825]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2A2825]" />
        <span className="font-mono text-[11px] text-[#4A4845] ml-3 tracking-wide">
          Trax — My Expenses
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-[#2A2825] bg-[#141414]">
        {(["transactions", "dashboard"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-mono text-[11px] px-5 py-2.5 border-b-2 transition-colors duration-150 tracking-wider uppercase ${
              activeTab === tab
                ? "border-[#D4A853] text-[#D4A853]"
                : "border-transparent text-[#4A4845] hover:text-[#8A8680]"
            }`}
          >
            {tab === "transactions" ? "Transactions" : "Dashboard"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "transactions" ? (
          <motion.div
            key="transactions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-x-auto"
          >
            <div className="min-w-[520px]">
              {/* Header row */}
              <div
                className="grid px-4 py-2.5"
                style={{ gridTemplateColumns: "180px 160px 110px 1fr", background: "#1A3558" }}
              >
                {["Timestamp", "Category", "Amount", "Notes"].map((col) => (
                  <span
                    key={col}
                    className="font-mono text-[11px] uppercase tracking-[0.08em]"
                    style={{ color: "#7AB3E0" }}
                  >
                    {col}
                  </span>
                ))}
              </div>
              {/* Data rows */}
              {sampleRows.map((row, i) => (
                <div
                  key={i}
                  className="grid px-4 py-2.5 border-t border-[#1A1A1A]"
                  style={{
                    gridTemplateColumns: "180px 160px 110px 1fr",
                    background: i % 2 === 0 ? "#0D0D0D" : "#101010",
                  }}
                >
                  <span className="font-mono text-[12px] text-[#4A4845]">{row.timestamp}</span>
                  <span className="font-mono text-[12px] text-[#8A8680]">{row.category}</span>
                  <span className="font-mono text-[12px] text-[#F0EDE8]">{row.amount}</span>
                  <span className="font-mono text-[12px] text-[#4A4845]">{row.notes}</span>
                </div>
              ))}
              {/* Footer note */}
              <div className="px-4 py-3 border-t border-[#1A1A1A]">
                <span className="font-mono text-[10px] text-[#2A2825] tracking-wide">
                  Newest entries appear at the bottom · Add your own columns after column D
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="p-6"
          >
            {/* Stat tiles */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-lg p-4 bg-[#161616] border border-[#2A2825]">
                <p className="font-mono text-[10px] text-[#4A4845] uppercase tracking-widest mb-1.5">
                  Total · All time
                </p>
                <p
                  className="font-display font-semibold text-[#F0EDE8]"
                  style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
                >
                  ₹14,838
                </p>
              </div>
              <div className="rounded-lg p-4 bg-[#161616] border border-[#2A2825]">
                <p className="font-mono text-[10px] text-[#4A4845] uppercase tracking-widest mb-1.5">
                  Total · This month
                </p>
                <p
                  className="font-display font-semibold text-[#F0EDE8]"
                  style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
                >
                  ₹2,650
                </p>
              </div>
            </div>
            {/* Category breakdown */}
            <p className="font-mono text-[10px] text-[#4A4845] uppercase tracking-widest mb-3">
              Category breakdown · This month
            </p>
            <div className="flex flex-col gap-2.5">
              {dashboardStats.map((stat) => (
                <div key={stat.category} className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#8A8680] shrink-0 w-36">
                    {stat.category}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-[#1E1E1E] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#D4A853]"
                      style={{ width: `${stat.pct}%`, opacity: 0.25 + (stat.pct / 100) * 0.75 }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-[#4A4845] w-8 text-right shrink-0">
                    {stat.pct}%
                  </span>
                  <span className="font-mono text-[11px] text-[#F0EDE8] w-20 text-right shrink-0">
                    {stat.amount}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-[#2A2825] mt-5 tracking-wide">
              Month-on-month trend · donut chart · line chart — all populate automatically as data grows
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── FAQ accordion item ─────────────────────────────────────────────────────────

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-[#2A2825]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-6"
      >
        <span className="font-mono text-sm text-[#F0EDE8]">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="shrink-0"
        >
          <ChevronDown size={15} color="#4A4845" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-mono text-[13px] text-[#8A8680] leading-relaxed pb-5 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Block subheading ──────────────────────────────────────────────────────────

function BlockHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="font-display font-semibold text-[#F0EDE8] mb-8"
      style={{ fontSize: "clamp(22px, 2.5vw, 30px)", lineHeight: 1.2 }}
    >
      {children}
    </motion.h3>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function HowToUse() {
  return (
    <section id="how-to-use" className="py-32 px-6">
      <div className="max-w-container mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="font-mono text-[11px] text-[#D4A853] tracking-[0.15em] uppercase mb-4">
            How to Use
          </p>
          <h2
            className="font-display font-semibold text-[#F0EDE8] mb-3"
            style={{ fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 1.1 }}
          >
            Everything Trax does, explained.
          </h2>
          <p className="font-mono text-[15px] text-[#8A8680]">
            From first tap to full picture — no manual needed.
          </p>
        </motion.div>

        {/* ── Block 1: Logging an expense ────────────────────────────────── */}
        <div className="mb-24">
          <BlockHeading>Logging an expense</BlockHeading>
          <div className="flex flex-col lg:flex-row gap-6">
            <StepCard
              steps={loggingInputSteps}
              chip="Tap. Choose. Done."
              chipColor="#D4A853"
              bg="#161616"
              slideFrom={-60}
            />
            <StepCard
              steps={loggingResultSteps}
              chip="What happens next"
              chipColor="#4CAF7D"
              bg="#1E1E1E"
              slideFrom={60}
            />
          </div>
        </div>

        {/* ── Block 2: Sheet explained ────────────────────────────────────── */}
        <div className="mb-24">
          <BlockHeading>What lands in your Google Drive</BlockHeading>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[13px] text-[#8A8680] leading-relaxed mb-8 max-w-2xl"
          >
            When you first set up Trax, a spreadsheet called &ldquo;Trax — My Expenses&rdquo; is
            created in your Google Drive with two tabs. Tap Dashboard below to see what
            auto-populates as you log.
          </motion.p>
          <SheetMockup />
        </div>

        {/* ── Block 3: Run from anywhere ──────────────────────────────────── */}
        <div className="mb-24">
          <BlockHeading>Run it from anywhere</BlockHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {runCards.map(({ Icon, title, body }, i) => (
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
                <p className="font-mono text-[13px] text-[#8A8680] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Block 4: Your data, your rules ─────────────────────────────── */}
        <div className="mb-24">
          <BlockHeading>Standard Google Sheet. Full control.</BlockHeading>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl p-8 border border-[#2A2825] bg-[#161616]"
          >
            <p className="font-mono text-[13px] text-[#8A8680] leading-relaxed mb-6">
              Because your expenses live in a plain Google Sheet, you can do anything with them — no
              export, no special format, no asking us:
            </p>
            <ul className="flex flex-col gap-3">
              {controlBullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: i * 0.07, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="font-mono shrink-0 mt-0.5 leading-none select-none"
                    style={{ color: "#D4A853", fontSize: "14px" }}
                  >
                    ·
                  </span>
                  <span className="font-mono text-[14px] text-[#F0EDE8] leading-relaxed">
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Block 5: FAQ ────────────────────────────────────────────────── */}
        <div>
          <BlockHeading>Quick answers</BlockHeading>
          <div className="max-w-2xl">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
