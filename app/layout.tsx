import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Seif Ashraf — Full Stack Developer",
    template: "%s — Seif Ashraf",
  },
  description:
    "Full Stack Developer building websites, custom software, and automation systems that help businesses grow.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-slate-950 font-sans text-slate-300 antialiased">
        {children}
      </body>
    </html>
  );
}
