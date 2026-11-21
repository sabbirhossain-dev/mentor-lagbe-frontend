import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/shared/ToastProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MentorLagbe - Smart Tuition & Mentorship Platform",
  description: "Find verified tutors, explore subject-wise batches, or offer 1-on-1 mentorship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.className} antialiased bg-background text-foreground transition-colors duration-200`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
