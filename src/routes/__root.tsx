import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/layout/Navbar";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Footer } from "@/components/layout/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="glass-card max-w-md rounded-2xl p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyber">404 · signal lost</p>
        <h1 className="mt-3 text-2xl font-semibold">This page is off the grid</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-5 inline-block rounded-lg bg-gradient-to-r from-cyber to-neon px-4 py-2 text-sm font-semibold text-white"
        >
          Back to safety
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="glass-card max-w-md rounded-2xl p-8 text-center">
        <h1 className="text-xl font-semibold">Something glitched</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back home.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-5 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ScamShield AI — Verify Before You Trust" },
      {
        name: "description",
        content:
          "AI-powered scam detection for phishing, fake recruiters, WhatsApp fraud, and manipulative messages.",
      },
      { name: "theme-color", content: "#fafbfc" },
      { property: "og:title", content: "ScamShield AI — Verify Before You Trust" },
      {
        property: "og:description",
        content:
          "AI-powered scam detection for phishing, fake recruiters, WhatsApp fraud, and manipulative messages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ScamShield AI — Verify Before You Trust" },
      {
        name: "twitter:description",
        content:
          "AI-powered scam detection for phishing, fake recruiters, WhatsApp fraud, and manipulative messages.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/62f207a5-f056-4d5c-88dc-6c8289fa9137",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/62f207a5-f056-4d5c-88dc-6c8289fa9137",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AmbientBackground />
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
