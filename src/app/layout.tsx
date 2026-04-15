import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

export const metadata: Metadata = {
  title: {
    default: "Studytrax | EDC for Academic Research & Disease Organizations",
    template: "%s | Studytrax",
  },
  description:
    "Studytrax puts clinical research data to work. Engage participants, accelerate publication, and build on every project. For academic researchers and disease organizations.",
  metadataBase: new URL("https://www.studytrax.com"),
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Studytrax",
  url: "https://www.studytrax.com",
  description:
    "Electronic data capture platform for academic researchers and disease organizations.",
  sameAs: ["https://www.capterra.com/p/10025029/Studytrax/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ color: "var(--color-text)" }}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ScrollToTop />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
