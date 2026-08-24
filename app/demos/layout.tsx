import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live demo",
};

export default function DemosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-slate-800 bg-slate-900/80 px-4 py-2 text-xs text-slate-400 sm:px-6">
        <p>
          <span className="font-medium text-slate-200">Demo build</span> by Seif
          Ashraf — all data is fictional and resets on refresh.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="transition-colors hover:text-white">
            All projects
          </Link>
          <Link
            href="/contact"
            className="font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            Want one like this?
          </Link>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
