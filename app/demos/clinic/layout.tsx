import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "BrightSmile Dental — Demo",
};

export default function ClinicDemoLayout({ children }: { children: ReactNode }) {
  return <div className={jakarta.className}>{children}</div>;
}
