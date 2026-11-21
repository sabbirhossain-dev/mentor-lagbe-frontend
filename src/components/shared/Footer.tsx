import Link from "next/link";
import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

// Modern X Logo SVG
function XLogo({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Facebook SVG
function FacebookLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// LinkedIn SVG
function LinkedinLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Socials */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <GraduationCap size={24} />
              </span>

              <span className="text-2xl font-extrabold text-white">
                Mentor<span className="text-blue-500">Lagbe</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Connecting qualified academic tutors and students across Bangladesh and worldwide for concept-driven mentorship.
            </p>

            {/* Social Links with new X logo */}
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <XLogo size={14} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition hover:bg-blue-600 hover:text-white"
              >
                <FacebookLogo size={14} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition hover:bg-blue-700 hover:text-white"
              >
                <LinkedinLogo size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Platform Links</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/" className="transition hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tuitions" className="transition hover:text-blue-400">
                  Browse Tuitions
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-blue-400">
                  Pro Plans & Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-blue-400">
                  About MentorLagbe
                </Link>
              </li>
            </ul>
          </div>

          {/* Stakeholders */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Stakeholders</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/sign-up" className="transition hover:text-blue-400">
                  Join as Student
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="transition hover:text-blue-400">
                  Join as Tutor
                </Link>
              </li>
              <li>
                <Link href="/dashboard/student" className="transition hover:text-blue-400">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/tutor" className="transition hover:text-blue-400">
                  Tutor Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Direct Support</h3>

            <div className="mt-5 space-y-3.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-blue-500" />
                <span>support@mentorlagbe.com</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-blue-500" />
                <span>+880 1800-MENTOR (8am - 10pm)</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-500" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MentorLagbe. All rights reserved.</p>
          <p>Smart Tuition & Mentorship Platform built for academic excellence.</p>
        </div>
      </div>
    </footer>
  );
}
