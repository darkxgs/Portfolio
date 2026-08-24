import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./motion.css";

const body = Instrument_Sans({ subsets: ["latin"] });
const money = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-money",
});

export const metadata = {
  title: "FlowDesk — CRM & Automation Demo",
};

export default function CrmDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={body.className + " " + money.variable}>{children}</div>;
}
