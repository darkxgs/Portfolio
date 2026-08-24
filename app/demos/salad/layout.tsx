import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "GreenBowl — Salad Store Demo",
};

export default function SaladDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={outfit.className}>{children}</div>;
}
