# PRD — Expense Tracker Shortcut · Marketing & Compliance Website

**Version:** 1.0  
**Date:** April 2026  
**Author:** Product  
**Status:** Ready for engineering handoff

---

## 1. Product Overview

### 1.1 What we're building

A single-page marketing and compliance website for **Trax** (working title — a zero-friction iOS expense tracker powered by a Siri Shortcut, Google Sheets, and Firebase). The website serves three simultaneous goals:

1. **Conversion** — get visitors to download and install the Shortcut in one tap
2. **Trust** — demonstrate to ordinary users (and to Google's OAuth review team) that this is a legitimate, privacy-respecting product
3. **Compliance** — host the Privacy Policy required for Google's OAuth verification of sensitive scopes (`drive.file`, `spreadsheets`)

### 1.2 The product being marketed

**Trax** is an iOS Shortcut that lets users log expenses in under five seconds — category pick, amount entry, done. It syncs to a personal Google Sheet (owned by the user, in their own Drive) via a Firebase + n8n backend. Setup is one-time and guided entirely within the Shortcut: Google OAuth, sheet creation from a template, and token management all happen automatically. Subsequent runs are pure input — no friction.

### 1.3 Target users

- People who already track expenses casually and want less friction
- iPhone users comfortable with Shortcuts
- Fintech-adjacent early adopters who care about data ownership

---

## 2. Design Direction

### 2.1 Aesthetic

**Tone:** Refined utility. Not another fintech app in neon green. Not a Silicon Valley SaaS landing page. Think: the design language of a well-made physical object — a quality wallet, a precise watch. Dark-dominant, typographically led, with moments of warmth.

**One-sentence design brief:** *What if your expense tracker felt like it was made by someone who reads Monocle and owns a Leica?*

**Color palette:**
```
Background:       #0D0D0D  (near black, not pure)
Surface:          #161616
Surface elevated: #1E1E1E
Accent:           #D4A853  (warm gold — not yellow, not orange)
Accent muted:     #D4A85340
Text primary:     #F0EDE8  (warm white)
Text secondary:   #8A8680
Text tertiary:    #4A4845
Border:           #2A2825
Success:          #4CAF7D
```

**Typography:**
- Display / hero: `Cormorant Garamond` — editorial, high contrast, distinctly non-tech
- Body / UI: `DM Mono` — clean monospaced, reinforces the "data tool" feel without being cold
- Numerals (for animated counters): `Cormorant Garamond` italic — numbers look beautiful in this face

**Motion philosophy:**
- Everything enters. Nothing pops. Reveals should feel like paper unfolding, not elements exploding in.
- Staggered fade-up on scroll with a very slight vertical translate (24px → 0, opacity 0 → 1, 600ms ease-out)
- No bounce easing anywhere. Ease-in-out or custom cubic-bezier(0.16, 1, 0.3, 1) for hero
- Micro-interactions: deliberate, short (120–200ms), felt not seen

**What makes this unforgettable:** The hero section shows a live, animated mock Shortcut running — category list appearing, amount being typed, a receipt card sliding in with the logged entry. It's not a screenshot. It's a choreographed demo of the exact UX the user is about to get.

---

## 3. Site Architecture

Single page. Smooth scroll. No page navigations except the Privacy Policy, which is a separate `/privacy` route.

```
/
  ├── [Nav]
  ├── [Hero]
  ├── [How it works]
  ├── [The data is yours]
  ├── [What's coming]
  ├── [Get it]
  └── [Footer]

/privacy
  └── [Full Privacy Policy]
```

---

## 4. Section Specifications

---

### 4.1 Navigation

**Layout:** Fixed top. Blurred glass background (`backdrop-filter: blur(20px)`, background `#0D0D0D80`). Full-width. Height: 56px.

**Left:** Logo — wordmark "Trax" in Cormorant Garamond, weight 600, tracked slightly, gold accent on the period: `trax·`

**Right:**
- "How it works" — smooth scroll anchor
- "Privacy" — links to `/privacy`
- "Get the Shortcut" — pill button, gold border, transparent fill, hover fills gold with black text, 200ms transition

**Scroll behavior:** Nav border-bottom fades in (opacity 0 → 1) after user scrolls 40px. Before that, no border — floats over hero seamlessly.

**Mobile:** Hamburger menu. Drawer slides in from right. Same links stacked vertically.

---

### 4.2 Hero Section

**Layout:** Full viewport height. Vertically centered. Two-column on desktop (content left, device mockup right), single column stacked on mobile (content top, mockup below).

**Left column — content:**

Eyebrow text (DM Mono, 11px, gold, letter-spacing 0.15em, uppercase):
```
iOS SHORTCUT · GOOGLE SHEETS · FREE
```

Headline (Cormorant Garamond, 72px desktop / 48px mobile, weight 600, warm white, line-height 1.05):
```
Expense tracking
that gets out
of your way.
```

Subheadline (DM Mono, 15px, text secondary, line-height 1.7, max-width 380px):
```
Five seconds. One tap. Your data lives in your 
own Google Sheet — not our servers.
```

CTA button (large, 52px height, gold background, black text, DM Mono 14px, border-radius 4px):
```
[ Add to Shortcuts ]
```
Below the button, small text in text-tertiary:
```
Requires iOS 16+  ·  Free forever
```

**Right column — animated Shortcut mockup:**

This is the hero's centerpiece. A stylized iPhone frame (SVG or CSS, not a real image) with an animated sequence playing inside it, looping every ~8 seconds:

```
Animation sequence:
  0.0s — Screen fades in showing "Choose a category"
          List items appear staggered (150ms between each):
          › Food & Dining
          › Transport  
          › Shopping
          › Entertainment
          › Bills & Utilities
          › Health

  1.8s — "Food & Dining" row highlights (gold tint background, slight scale)
          Checkmark animates in

  2.4s — Screen transitions (cross-dissolve) to "Amount?"
          A number input field, cursor blinking in DM Mono

  3.0s — Numbers type themselves: "0" → "4" → "48" → "480" → "480."  → "480.00"
          Each keystroke: very subtle haptic-like flash on the key

  4.5s — Screen transitions to confirmation
          A receipt card slides up from bottom:
          ┌──────────────────┐
          │  ✓ Logged        │
          │                  │
          │  Food & Dining   │
          │  ₹ 480.00        │
          │  Today, 2:14 PM  │
          └──────────────────┘
          Card has a slight paper texture, warm background

  6.0s — Card sits. Subtle breathing animation (scale 1 → 1.005 → 1, 2s)

  7.5s — Fade out. Loop restarts.
```

Implementation: CSS animations with JS sequencing (not a video file — keeps it crisp at all resolutions and allows dark/light theming).

**Hero entrance animation:**
- Eyebrow: fade up, 400ms, delay 0ms
- Headline word 1: fade up, 500ms, delay 100ms
- Headline word 2: fade up, 500ms, delay 180ms
- Headline word 3: fade up, 500ms, delay 260ms
- Subheadline: fade up, 500ms, delay 400ms
- CTA: fade up + slight scale (0.97 → 1), 400ms, delay 600ms
- Phone mockup: fade in + translate right (40px → 0), 700ms, delay 300ms, ease-out

**Background:** Subtle radial gradient emanating from behind the phone — gold, very low opacity (3–5%), large radius. Gives depth without being garish.

---

### 4.3 How It Works

**Section header:**
Eyebrow: `THE SETUP`
Title (Cormorant Garamond, 48px): `Three taps the first time.`
Subtitle (DM Mono, 15px): `One step, every time after.`

**Layout:** Two-phase split.

**Phase A — First time (left card, ~48% width):**

Card background: `#161616`, border `#2A2825`, border-radius 12px, padding 40px.

Header chip: small pill, text "FIRST RUN ONLY", DM Mono 10px, gold text, gold border.

Steps (numbered with large Cormorant Garamond numerals in gold):

```
01  Install the Shortcut
    Tap "Add to Shortcuts" above. 
    It opens directly in the Shortcuts app.

02  Sign in with Google
    The Shortcut opens a Google login page. 
    Sign in and allow access to your Sheets.

03  Your sheet is ready
    A budget sheet is automatically created 
    in your Google Drive. You're done.
```

Each step: number animates in first (count up from 0, 300ms), then text fades up.

**Phase B — Every time after (right card, ~48% width):**

Same card style, slightly elevated (`#1E1E1E`).

Header chip: "EVERY RUN", green text + border.

```
01  Tap the Shortcut
    From your home screen, lock screen widget, 
    or Hey Siri.

02  Pick a category
    Food, transport, shopping — 
    seven options, one tap.

03  Enter the amount
    Number keypad. That's it.
    Your sheet updates instantly.
```

**Scroll-triggered entrance:** Cards slide in from opposite sides (left card from left, right card from right), opacity 0 → 1, translateX ±60px → 0, 600ms staggered.

---

### 4.4 The Data Is Yours

**Purpose:** Build trust. This is the section Google's reviewers will also read.

**Section header:**
Eyebrow: `PRIVACY FIRST`
Title (Cormorant Garamond, 48px): `Your data lives in your Google Drive.`
Subtitle (DM Mono, 15px): `Not our servers. Not our databases. Yours.`

**Layout:** Three feature cards in a row (stack on mobile).

**Card 1 — Icon: a lock**
```
Title: "You own the sheet"
Body: Your expense data is written directly to a 
Google Sheet in your own Google Drive account. 
We never store your financial data anywhere.
```

**Card 2 — Icon: a key**
```
Title: "Tokens, not passwords"
Body: We use Google's official OAuth 2.0 flow. 
Your Google password never touches our system. 
You can revoke access any time from your 
Google account settings.
```

**Card 3 — Icon: an eye with a line through it**
```
Title: "We see nothing"
Body: Our backend receives your expense entries 
only long enough to write them to your sheet. 
We log no financial data, no spending patterns, 
no personal information.
```

**Below the cards — a single bold statement:**

Large, centered, Cormorant Garamond italic, 32px, warm white:
```
"We built this for ourselves. We'd never 
build something we wouldn't trust."
```

Micro-attribution below in DM Mono, text-tertiary:
```
— The team behind Trax
```

**Animation:** Cards stagger in on scroll (150ms between each), slight scale 0.96 → 1 + fade.

---

### 4.5 What's Coming

**Section header:**
Eyebrow: `ROADMAP`
Title (Cormorant Garamond, 48px): `This is just the start.`

**Layout:** Vertical timeline. A thin gold vertical line runs down the left. Items attach to it with a small gold dot.

**Timeline items:**

```
● NOW — Available
  Core expense logging
  Category selection · Amount entry · Auto-sync to Google Sheets

○ NEXT — In development  
  Budget limits
  Set monthly caps per category. Get notified when you're close.

○ COMING — Planned
  Recurring expenses
  Mark subscriptions and bills. Never log them again.

○ COMING — Planned
  Dashboard website
  A beautiful read-only web view of your spending — shareable, 
  embeddable, yours.

○ LATER — Exploring
  Split expenses
  Log group expenses and track who owes what. 
  Works with the same sheet.

○ LATER — Exploring
  Multi-currency
  Automatic conversion logged alongside original amount. 
  For the frequent traveller.
```

**Animation:** As user scrolls through the timeline, the vertical gold line draws itself downward (SVG stroke-dashoffset animation), and each item fades in as the line reaches it.

**Completed item** (NOW) has solid gold dot. Future items have hollow dots that fill as user scrolls to them.

---

### 4.6 Get It

**Full-width CTA section.**

**Background:** Slightly lighter than page (`#161616`), thin top border.

**Content (centered):**

Eyebrow (DM Mono, 11px, gold): `FREE · OPEN SOURCE · NO ACCOUNT NEEDED`

Title (Cormorant Garamond, 56px):
```
Ready to stop 
overthinking it?
```

**Large CTA button:**
Gold background, black text, DM Mono 16px, 60px height, border-radius 6px, min-width 280px.

```
[ Add to Shortcuts  →  ]
```

Hover state: slight glow (box-shadow: 0 0 24px #D4A85360), scale 1.02, 200ms.

Below button, three trust signals in a row (DM Mono, 12px, text-tertiary):
```
✓ No account needed      ✓ iOS 16+      ✓ Takes 60 seconds
```

**Background detail:** Very faint grid pattern (1px lines, 5% opacity, 40px grid) — reinforces the "spreadsheet" theme subtly.

---

### 4.7 Footer

**Two-column layout.**

**Left:**
Logo wordmark (`trax·` in Cormorant Garamond)
Small body text in text-tertiary (DM Mono, 12px):
```
A simple iOS Shortcut for people who 
want to track spending without thinking about it.
```

**Right (links, DM Mono, 13px, stacked):**
```
Privacy Policy  →
How it works  ↑
Get the Shortcut  ↗
```

**Bottom bar (full width, border-top):**
```
Left: © 2026 Trax. All rights reserved.
Right: Made with ♥ for people who hate expense apps.
```

Both in DM Mono, 11px, text-tertiary.

---

## 5. Privacy Policy Page (`/privacy`)

**This page is required for Google OAuth verification. It must be thorough, specific, and use plain language.**

**URL:** `https://trax.pragmatixstudio.com/privacy`  
**Page title:** Privacy Policy — Trax

**Layout:** Clean reading layout. Max-width 720px, centered. White background (or very slightly off-white `#F8F6F2`). Black text. No animations — this is a compliance document. Serif body text (Cormorant Garamond 18px or Georgia fallback) for readability.

---

### Full Privacy Policy Text:

```
Privacy Policy
Last updated: April 2026

---

1. Who we are

Trax is an iOS Shortcut application that helps you log 
personal expenses directly to your own Google Sheets account. 
We are an independent developer product, not a company. 
References to "we", "us", or "our" refer to the Trax 
development team.

Our website: trax.pragmatixstudio.com
Contact: purnanshu@trax.pragmatixstudio.com

---

2. What data we collect and why

2.1 Google account information

When you connect Trax to your Google account, we receive:
  - Your Google account email address
  - An OAuth access token and refresh token

We use your email address solely to identify your account 
in our system and to associate your Google Sheet with your 
device. We use the tokens solely to write expense data to 
your Google Sheet on your behalf.

We do not receive or store your Google password at any point.

2.2 Expense data

When you log an expense using the Shortcut, you provide:
  - A category (selected from a predefined list)
  - An amount (a number you enter)

This data is transmitted over an encrypted HTTPS connection 
to our backend, which immediately writes it to your Google 
Sheet and does not retain a copy. We do not log, analyse, 
aggregate, sell, or otherwise process your expense data.

2.3 Device identifier

The first time you run the Shortcut, a random unique 
identifier (UUID) is generated and stored in your iCloud 
Drive. This identifier is used to associate your device 
with your Google Sheet. It contains no personal information 
and cannot be used to identify you individually.

2.4 Technical logs

Our servers may automatically log standard technical 
information such as IP addresses, timestamps, and HTTP 
response codes as part of normal server operation. These 
logs are retained for a maximum of 7 days and are used 
only for diagnosing technical issues. They are not linked 
to your identity or your expense data.

---

3. How we use your data

We use the information described above exclusively to 
provide the core functionality of the Trax Shortcut:

  - To authenticate you with Google on your behalf
  - To create a Google Sheet in your Drive on first setup
  - To write expense entries to your Sheet when you log them
  - To refresh your Google access token when it expires

We do not use your data for advertising, analytics, 
profiling, or any purpose other than the above.

---

4. How we share your data

We do not sell, trade, rent, or share your personal 
information with third parties, except in the following 
limited circumstances:

4.1 Google

Your expense data is written to Google Sheets via the 
Google Sheets API. Your file is created in Google Drive 
via the Google Drive API. This data transfer is the core 
purpose of the application. Google's own privacy policy 
governs how Google handles data within their services:
https://policies.google.com/privacy

4.2 Infrastructure providers

We use Firebase (Google) for token storage and n8n for 
workflow automation. Both operate under strict data 
processing agreements. We configure these services to 
store only the minimum data necessary (device ID, 
encrypted tokens, sheet ID). No expense content is 
stored in these systems.

4.3 Legal requirements

We may disclose information if required to do so by law 
or in response to valid legal process.

---

5. Google API scopes we request

Trax requests the following Google OAuth scopes:

  - https://www.googleapis.com/auth/spreadsheets
    Used to: append expense rows to your Google Sheet

  - https://www.googleapis.com/auth/drive.file
    Used to: create a new Google Sheet from a template 
    on your first setup. This scope provides access only 
    to files created by our app — not your entire Drive.

  - email (OpenID Connect)
    Used to: identify your account

  - profile (OpenID Connect)
    Used to: display your name during setup

Trax's use of Google API data adheres to the 
Google API Services User Data Policy, including the 
Limited Use requirements:
https://developers.google.com/terms/api-services-user-data-policy

---

6. Data storage and security

6.1 Your expense data

Your expense data is stored in your own Google Sheet, 
in your own Google Drive account, under your own Google 
account's security. We do not have a secondary copy.

6.2 Your OAuth tokens

Your Google OAuth tokens are stored in Firebase Firestore, 
encrypted at rest. They are associated with your device's 
UUID identifier, not your personal identity. Access to 
Firestore is restricted to our backend server only.

6.3 Your device UUID

Your device UUID is stored in a plain text file in your 
iCloud Drive. It is protected by your iCloud account 
security. We store no copy of it beyond our Firestore 
record linking it to your sheet.

---

7. Data retention

We retain your records (device UUID → sheet ID → tokens) 
for as long as you use the Shortcut. You can delete your 
records at any time by:

  1. Revoking Trax's Google access at 
     https://myaccount.google.com/permissions
  2. Deleting the device UUID file from your iCloud Drive
  3. Emailing us at purnanshu@trax.pragmatixstudio.com 
     to request deletion of your Firestore record

Upon receiving a deletion request, we will purge your 
Firestore record within 7 business days.

---

8. Children's privacy

Trax is not directed at children under the age of 13. 
We do not knowingly collect personal information from 
children. If you believe a child has provided us with 
personal information, please contact us and we will 
delete it promptly.

---

9. Changes to this policy

We may update this Privacy Policy from time to time. 
We will notify users of significant changes by updating 
the "Last updated" date at the top of this page. 
Continued use of the Shortcut after changes are posted 
constitutes acceptance of the updated policy.

---

10. Contact us

If you have questions, concerns, or requests regarding 
your privacy or this policy, please contact us at:

purnanshu@trax.pragmatixstudio.com

We aim to respond to all privacy-related enquiries 
within 5 business days.
```

---

## 6. Technical Stack (for Claude Code)

```
Framework:      Next.js 14 (App Router)
Styling:        Tailwind CSS + CSS custom properties for the palette
Animations:     Framer Motion (scroll-triggered) + CSS keyframes (looping)
Fonts:          Google Fonts — Cormorant Garamond + DM Mono
Icons:          Lucide React (minimal set)
Deployment:     Vercel (zero-config, free tier)
Domain:         pragatixstudio.com
```

**Key implementation notes for Claude Code:**

- The phone mockup in the hero is **not an image**. It is a CSS/JS animated component. Build it as a `<PhoneMockup />` React component with internal state managing animation phase (0–4) via `useEffect` + `setTimeout`.

- All scroll-triggered animations use **Framer Motion's `whileInView`** with `once: true` and `viewport: { margin: "-100px" }`. No IntersectionObserver boilerplate needed.

- The timeline section's line-drawing animation: SVG `<line>` or `<path>` with `pathLength` animated via Framer Motion's `useScroll` + `useTransform` mapped to scroll position within the section.

- The privacy policy page at `/privacy` is a **separate layout** — no animations, no dark background, clean reading mode. Use Next.js route groups or a separate layout file.

- **Shortcut link format:** `https://www.icloud.com/shortcuts/[SHORTCUT_ID]` — this opens directly in the Shortcuts app on iOS. Add a `data-shortcut-link` attribute and detect iOS via `navigator.userAgent` to show an "Open in Shortcuts" button on iOS vs "View Shortcut" on desktop.

- **Font loading:** Use `next/font/google` with `display: swap`. Cormorant Garamond weights: 400, 600 italic. DM Mono weights: 400.

---

## 7. Google OAuth Verification Checklist

This section exists to ensure the website satisfies all requirements for Google's OAuth verification of sensitive scopes.

| Requirement | Implementation |
|---|---|
| Privacy Policy URL | `/privacy` — linked in footer nav |
| Privacy Policy covers all scopes | ✅ Section 5 explicitly names each scope and its use |
| Google API Limited Use statement | ✅ Section 5, final paragraph |
| App name matches OAuth consent screen | Ensure "Trax" matches exactly |
| Homepage URL matches OAuth domain | Ensure domain matches what's registered in GCP |
| Contact email on privacy page | ✅ Section 10 |
| Data retention policy | ✅ Section 7 |
| No claims of data sale | ✅ Section 4 explicitly states we do not sell |
| Scope justification (drive.file) | ✅ "create a new Google Sheet from a template" |
| Scope justification (spreadsheets) | ✅ "append expense rows to your Google Sheet" |

**When submitting for verification:**
- Set OAuth consent screen app name: `Trax`
- Homepage: `https://trax.pragmatixstudio.com`
- Privacy Policy: `https://trax.pragmatixstudio.com/privacy`
- Authorized domains: `trax.pragmatixstudio.com`
- Scope justification for `drive.file`: "Used to create one Google Sheet per user from a template on first-time setup only. The app never accesses any other Drive files."
- Scope justification for `spreadsheets`: "Used to append expense records (category + amount + timestamp) to the user's own Sheet. The app never reads sheet data from the user's spreadsheets."

---

## 8. Page Performance Requirements

- Lighthouse score: ≥ 90 on all categories
- LCP (Largest Contentful Paint): < 2.5s
- No layout shift from font loading (use `font-display: swap` + size-adjust)
- Phone mockup animation must be `will-change: transform` to stay on GPU
- No autoplay video, no heavy GIFs — all animation is CSS/JS

---

## 9. Responsive Breakpoints

```
Mobile:   < 640px   — single column, 24px horizontal padding
Tablet:   640–1024px — single column, phone mockup below hero text
Desktop:  > 1024px  — two-column hero, three-column feature cards
Wide:     > 1440px  — max-width 1280px container, centered
```

---


*End of PRD*