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
      <CursorDot />
    </SmoothScroll>
  );
}
