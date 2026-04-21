"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function PageViewTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.origin + url,
      });
    }
  }, [pathname, searchParams, gaId]);

  return null;
}

export default function AnalyticsPageView({ gaId }: { gaId: string }) {
  return (
    <Suspense fallback={null}>
      <PageViewTracker gaId={gaId} />
    </Suspense>
  );
}
