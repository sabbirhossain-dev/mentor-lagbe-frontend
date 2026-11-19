import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MentorLagbe",
  description: "Find Your Ideal Tutor & Learn Without Limits.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${roboto.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
