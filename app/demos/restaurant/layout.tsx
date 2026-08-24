import { Work_Sans, Bricolage_Grotesque } from "next/font/google";
import "./motion.css";

const body = Work_Sans({ subsets: ["latin"] });
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "TasteBite — Order Online & Kitchen Demo",
};

export default function RestaurantDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={body.className + " " + display.variable}>{children}</div>
  );
}
