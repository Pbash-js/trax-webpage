import Link from "next/link";

const SHORTCUT_LINK = "https://www.icloud.com/shortcuts/SHORTCUT_ID";

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2825] px-6 pt-12 pb-6">
      <div className="max-w-container mx-auto">
        {/* Two-column */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Left */}
          <div>
            <p className="font-display text-xl font-semibold text-[#F0EDE8] mb-3">
              trax<span className="text-[#D4A853]">·</span>
            </p>
            <p className="font-mono text-xs text-[#4A4845] leading-relaxed max-w-[260px]">
              A simple iOS Shortcut for people who want to track spending without
              thinking about it.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3">
            <Link
              href="/privacy"
              className="font-mono text-[13px] text-[#8A8680] hover:text-[#F0EDE8] transition-colors duration-200"
            >
              Privacy Policy →
            </Link>
            <a
              href="#how-it-works"
              className="font-mono text-[13px] text-[#8A8680] hover:text-[#F0EDE8] transition-colors duration-200"
            >
              How it works ↑
            </a>
            <a
              href={SHORTCUT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-[#8A8680] hover:text-[#F0EDE8] transition-colors duration-200"
            >
              Get the Shortcut ↗
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2A2825] pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-mono text-[11px] text-[#4A4845]">
            © 2026 Trax. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-[#4A4845]">
            Made with ♥ for people who hate expense apps.
          </p>
        </div>
      </div>
    </footer>
  );
}
