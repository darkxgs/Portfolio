import type { Metadata } from "next";
import {
  Archivo,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
/* Only the italic face is ever used (every `font-accent` usage is `italic`),
   so the upright face is not loaded. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["italic"],
});

const siteUrl = "https://www.seifashraf.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Seif Ashraf — Freelance Web Developer for UK & Irish Small Businesses",
    template: "%s — Seif Ashraf",
  },
  description:
    "Freelance full-stack developer in Cairo building websites, booking systems and back-office software for UK and Irish small businesses. Two production systems in daily use, plus five interactive demos you can try in your browser.",
};

/* Runs before first paint. `js` lets globals.css pre-hide the elements the
   reveal components animate, so server-rendered content does not paint,
   vanish and then animate in. `js-settled` lifts that pre-hide after 2.5s:
   anything GSAP has taken over carries inline styles and is unaffected;
   anything it never reached (hydration failed, an effect never ran) becomes
   visible again. */
const preHydrationScript = `document.documentElement.classList.add("js");setTimeout(function(){document.documentElement.classList.add("js-settled")},2500);`;

/* Structured data. Facts only: identity, location, links, service area. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Seif Ashraf",
      url: siteUrl,
      image: `${siteUrl}/seif-portrait.webp`,
      jobTitle: "Freelance Web Developer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
      sameAs: [
        "https://www.linkedin.com/in/seifashraf-dev/",
        "https://www.instagram.com/seif_ashrafg/",
        "https://github.com/darkxgs",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Seif Ashraf — Web Development",
      url: siteUrl,
      email: "hello@seifashraf.dev",
      founder: { "@id": `${siteUrl}/#person` },
      areaServed: ["GB", "IE"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
      serviceType: [
        "Business websites",
        "Business automation",
        "Custom software",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      /* The pre-paint script adds classes to <html> before React hydrates. */
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preHydrationScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="bg-slate-950 font-sans text-slate-300 antialiased">
        {children}
      </body>
    </html>
  );
}
