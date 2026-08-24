import { Figtree, Space_Grotesk } from "next/font/google";
import "./motion.css";

const body = Figtree({ subsets: ["latin"] });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "Metricly — SaaS Analytics & Billing Demo",
};

export default function SaasDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={body.className + " " + display.variable}>{children}</div>;
}
