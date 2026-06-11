export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-brand px-6 py-10 text-center text-white">
      <ul className="mb-6 flex items-center justify-center gap-6">
        <li>
          <a
            href="https://twitter.com/saucelabs"
            data-test="social-twitter"
            aria-label="Twitter"
            className="opacity-90 hover:opacity-100"
          >
            <Social>
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </Social>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/saucelabs"
            data-test="social-facebook"
            aria-label="Facebook"
            className="opacity-90 hover:opacity-100"
          >
            <Social>
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </Social>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/sauce-labs/"
            data-test="social-linkedin"
            aria-label="LinkedIn"
            className="opacity-90 hover:opacity-100"
          >
            <Social>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </Social>
          </a>
        </li>
      </ul>
      <div className="footer_copy mx-auto max-w-xl text-sm">
        © {year} Sauce Labs. All Rights Reserved. Terms of Service | Privacy
        Policy
      </div>
    </footer>
  );
}

function Social({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}
