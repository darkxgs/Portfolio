import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import NotFoundContent from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "Page not found",
};

/* Root 404 for unmatched URLs. It renders inside the root layout only, which
   has no nav or footer, so both are added here to match the rest of the site. */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
