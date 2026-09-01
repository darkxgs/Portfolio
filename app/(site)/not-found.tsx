import NotFoundContent from "@/components/not-found-content";

/* Catches notFound() thrown inside (site) pages, e.g. an unknown project slug.
   The (site) layout already renders nav and footer around this. */
export default function SiteNotFound() {
  return <NotFoundContent />;
}
