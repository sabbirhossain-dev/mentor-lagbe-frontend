import Link from "next/link";
import {
  //   Facebook,
  GraduationCap,
  //   Instagram,
  //   Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={25} />
              </span>

              <span className="text-2xl font-extrabold text-white">
                Mentor<span className="text-blue-500">Lagbe</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Connecting students and tutors to create better learning
              opportunities for everyone.
            </p>

            {/* <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={["Facebook", "Instagram", "LinkedIn"][index]}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 transition hover:bg-blue-600 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white">Quick Links</h3>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link href="/" className="transition hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tuitions"
                  className="transition hover:text-blue-400"
                >
                  Browse Tuitions
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="transition hover:text-blue-400"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-blue-400">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="font-bold text-white">For Everyone</h3>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  href="/sign-up"
                  className="transition hover:text-blue-400"
                >
                  Join as Student
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="transition hover:text-blue-400"
                >
                  Join as Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="transition hover:text-blue-400"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white">Contact Us</h3>

            <div className="mt-6 space-y-5 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-blue-500" />
                <span>Contact email will be added here.</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-blue-500" />
                <span>Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-slate-800 pt-7 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} MentorLagbe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
