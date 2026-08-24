import Nav from "@/components/nav";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/site-motion/smooth-scroll";
import CursorDot from "@/components/site-motion/cursor-dot";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SmoothScroll>
      <Nav />
      <main>{children}</main>
      <Footer />
      {/* Full-viewport film grain — sits above content, below cursor dot */}
      <div aria-hidden="true" className="film-grain" />
      <CursorDot />
    </SmoothScroll>
  );
}
