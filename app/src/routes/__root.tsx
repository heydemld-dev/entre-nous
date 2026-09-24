import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import appMetaJson from "../app-meta.json";

declare const __HF_DESIGN_INSPECTOR__: boolean;

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? "ENTRE NOUS";
  const description = meta.og_description ?? "SLOW BURN. Первый аромат ENTRE NOUS.";
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "ENTRE NOUS" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: meta.og_image_url ? "summary_large_image" : "summary" },
      ...(meta.og_image_url ? [{ property: "og:image", content: meta.og_image_url }, { name: "twitter:image", content: meta.og_image_url }] : []),
      ...(meta.og_video_url ? [{ property: "og:video", content: meta.og_video_url }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      ...(meta.favicon_url ? [{ rel: "icon", href: meta.favicon_url }] : []),
    ],
  };
}

function NotFoundComponent() {
  return <main className="system-page"><h1>Здесь ничего нет.</h1><a href="/">Вернуться</a></main>;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportHiggsfieldError(error, { boundary: "root_error" }); }, [error]);
  return <main className="system-page"><h1>Страница не открылась.</h1><button onClick={() => { router.invalidate(); reset(); }}>Попробовать снова</button></main>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="ru" style={{ colorScheme: "dark" }}><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) return;
    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => installHiggsfieldDesignInspector())
      .catch((error) => reportHiggsfieldError(error instanceof Error ? error : new Error("Inspector failed"), { boundary: "design_inspector" }));
  }, []);
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
