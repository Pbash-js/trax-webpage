import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="max-w-[720px] mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-block text-sm mb-12"
        style={{ color: "#8A8680", fontFamily: "monospace", textDecoration: "none" }}
      >
        ← Back to Trax
      </Link>

      <h1
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "2.5rem",
          fontWeight: 600,
          lineHeight: 1.2,
          marginBottom: "0.5rem",
          color: "#111",
        }}
      >
        Privacy Policy
      </h1>
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "0.8rem",
          color: "#8A8680",
          marginBottom: "3rem",
          borderBottom: "1px solid #E0DDD8",
          paddingBottom: "1.5rem",
        }}
      >
        Last updated: April 2026
      </p>

      <PolicySection number="1" title="Who we are">
        <p>
          Trax is an iOS Shortcut application that helps you log personal
          expenses directly to your own Google Sheets account. We are an
          independent developer product, not a company. References to
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo; refer to
          the Trax development team.
        </p>
        <p>
          Our website:{" "}
          <span style={{ fontFamily: "monospace" }}>
            trax.pragmatixstudio.com
          </span>
          <br />
          Contact:{" "}
          <a
            href="mailto:purnanshu@trax.pragmatixstudio.com"
            style={{ color: "#555" }}
          >
            purnanshu@trax.pragmatixstudio.com
          </a>
        </p>
      </PolicySection>

      <PolicySection number="2" title="What data we collect and why">
        <h3>2.1 Google account information</h3>
        <p>When you connect Trax to your Google account, we receive:</p>
        <ul>
          <li>Your Google account email address</li>
          <li>An OAuth access token and refresh token</li>
        </ul>
        <p>
          We use your email address solely to identify your account in our
          system and to associate your Google Sheet with your device. We use
          the tokens solely to write expense data to your Google Sheet on your
          behalf.
        </p>
        <p>We do not receive or store your Google password at any point.</p>

        <h3>2.2 Expense data</h3>
        <p>When you log an expense using the Shortcut, you provide:</p>
        <ul>
          <li>A category (selected from a predefined list)</li>
          <li>An amount (a number you enter)</li>
        </ul>
        <p>
          This data is transmitted over an encrypted HTTPS connection to our
          backend, which immediately writes it to your Google Sheet and does
          not retain a copy. We do not log, analyse, aggregate, sell, or
          otherwise process your expense data.
        </p>

        <h3>2.3 Device identifier</h3>
        <p>
          The first time you run the Shortcut, a random unique identifier
          (UUID) is generated and stored in your iCloud Drive. This identifier
          is used to associate your device with your Google Sheet. It contains
          no personal information and cannot be used to identify you
          individually.
        </p>

        <h3>2.4 Technical logs</h3>
        <p>
          Our servers may automatically log standard technical information such
          as IP addresses, timestamps, and HTTP response codes as part of
          normal server operation. These logs are retained for a maximum of 7
          days and are used only for diagnosing technical issues. They are not
          linked to your identity or your expense data.
        </p>
      </PolicySection>

      <PolicySection number="3" title="How we use your data">
        <p>
          We use the information described above exclusively to provide the
          core functionality of the Trax Shortcut:
        </p>
        <ul>
          <li>To authenticate you with Google on your behalf</li>
          <li>To create a Google Sheet in your Drive on first setup</li>
          <li>To write expense entries to your Sheet when you log them</li>
          <li>To refresh your Google access token when it expires</li>
        </ul>
        <p>
          We do not use your data for advertising, analytics, profiling, or
          any purpose other than the above.
        </p>
      </PolicySection>

      <PolicySection number="4" title="How we share your data">
        <p>
          We do not sell, trade, rent, or share your personal information with
          third parties, except in the following limited circumstances:
        </p>

        <h3>4.1 Google</h3>
        <p>
          Your expense data is written to Google Sheets via the Google Sheets
          API. Your file is created in Google Drive via the Google Drive API.
          This data transfer is the core purpose of the application.
          Google&rsquo;s own privacy policy governs how Google handles data
          within their services:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#555" }}
          >
            https://policies.google.com/privacy
          </a>
        </p>

        <h3>4.2 Infrastructure providers</h3>
        <p>
          We use Firebase (Google) for token storage and n8n for workflow
          automation. Both operate under strict data processing agreements. We
          configure these services to store only the minimum data necessary
          (device ID, encrypted tokens, sheet ID). No expense content is
          stored in these systems.
        </p>

        <h3>4.3 Legal requirements</h3>
        <p>
          We may disclose information if required to do so by law or in
          response to valid legal process.
        </p>
      </PolicySection>

      <PolicySection number="5" title="Google API scopes we request">
        <p>Trax requests the following Google OAuth scopes:</p>
        <ul>
          <li>
            <code>https://www.googleapis.com/auth/spreadsheets</code>
            <br />
            <em>Used to:</em> append expense rows to your Google Sheet
          </li>
          <li>
            <code>https://www.googleapis.com/auth/drive.file</code>
            <br />
            <em>Used to:</em> create a new Google Sheet from a template on
            your first setup. This scope provides access only to files created
            by our app — not your entire Drive.
          </li>
          <li>
            <code>email</code> (OpenID Connect)
            <br />
            <em>Used to:</em> identify your account
          </li>
          <li>
            <code>profile</code> (OpenID Connect)
            <br />
            <em>Used to:</em> display your name during setup
          </li>
        </ul>
        <p>
          Trax&rsquo;s use of Google API data adheres to the Google API
          Services User Data Policy, including the Limited Use requirements:{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#555" }}
          >
            https://developers.google.com/terms/api-services-user-data-policy
          </a>
        </p>
      </PolicySection>

      <PolicySection number="6" title="Data storage and security">
        <h3>6.1 Your expense data</h3>
        <p>
          Your expense data is stored in your own Google Sheet, in your own
          Google Drive account, under your own Google account&rsquo;s security.
          We do not have a secondary copy.
        </p>

        <h3>6.2 Your OAuth tokens</h3>
        <p>
          Your Google OAuth tokens are stored in Firebase Firestore, encrypted
          at rest. They are associated with your device&rsquo;s UUID
          identifier, not your personal identity. Access to Firestore is
          restricted to our backend server only.
        </p>

        <h3>6.3 Your device UUID</h3>
        <p>
          Your device UUID is stored in a plain text file in your iCloud Drive.
          It is protected by your iCloud account security. We store no copy of
          it beyond our Firestore record linking it to your sheet.
        </p>
      </PolicySection>

      <PolicySection number="7" title="Data retention">
        <p>
          We retain your records (device UUID → sheet ID → tokens) for as long
          as you use the Shortcut. You can delete your records at any time by:
        </p>
        <ol>
          <li>
            Revoking Trax&rsquo;s Google access at{" "}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#555" }}
            >
              https://myaccount.google.com/permissions
            </a>
          </li>
          <li>
            Deleting the device UUID file from your iCloud Drive
          </li>
          <li>
            Emailing us at{" "}
            <a
              href="mailto:purnanshu@trax.pragmatixstudio.com"
              style={{ color: "#555" }}
            >
              purnanshu@trax.pragmatixstudio.com
            </a>{" "}
            to request deletion of your Firestore record
          </li>
        </ol>
        <p>
          Upon receiving a deletion request, we will purge your Firestore
          record within 7 business days.
        </p>
      </PolicySection>

      <PolicySection number="8" title="Children's privacy">
        <p>
          Trax is not directed at children under the age of 13. We do not
          knowingly collect personal information from children. If you believe
          a child has provided us with personal information, please contact us
          and we will delete it promptly.
        </p>
      </PolicySection>

      <PolicySection number="9" title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify
          users of significant changes by updating the &ldquo;Last
          updated&rdquo; date at the top of this page. Continued use of the
          Shortcut after changes are posted constitutes acceptance of the
          updated policy.
        </p>
      </PolicySection>

      <PolicySection number="10" title="Contact us">
        <p>
          If you have questions, concerns, or requests regarding your privacy
          or this policy, please contact us at:
        </p>
        <p>
          <a
            href="mailto:purnanshu@trax.pragmatixstudio.com"
            style={{ color: "#555" }}
          >
            purnanshu@trax.pragmatixstudio.com
          </a>
        </p>
        <p>
          We aim to respond to all privacy-related enquiries within 5 business
          days.
        </p>
      </PolicySection>

      <div
        style={{
          borderTop: "1px solid #E0DDD8",
          paddingTop: "2rem",
          marginTop: "3rem",
          fontFamily: "monospace",
          fontSize: "0.75rem",
          color: "#8A8680",
        }}
      >
        <Link href="/" style={{ color: "#8A8680", textDecoration: "none" }}>
          ← Back to Trax
        </Link>
      </div>
    </main>
  );
}

function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        marginBottom: "2.5rem",
        paddingBottom: "2.5rem",
        borderBottom: "1px solid #E0DDD8",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "1rem",
          color: "#111",
        }}
      >
        {number}. {title}
      </h2>
      <div className="policy-body">{children}</div>
    </section>
  );
}
