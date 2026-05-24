import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/analyze", label: "Analyzer" },
  { to: "/link-scanner", label: "Link Scanner" },
  { to: "/recruiter", label: "Recruiter" },
  { to: "/feed", label: "Threat Feed" },
  { to: "/quiz", label: "Quiz" },
  { to: "/report", label: "Report" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyber to-neon glow-blue">
            <ShieldCheck className="h-4 w-4 text-background" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Scam<span className="text-gradient">Shield</span> <span className="text-muted-foreground text-xs font-mono">AI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground data-[status=active]:bg-white/5 data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/analyze"
          className="rounded-lg border border-cyber/40 bg-cyber/10 px-3 py-1.5 text-xs font-medium text-foreground shadow-[0_0_30px_-8px_var(--cyber)] transition hover:bg-cyber/20 md:text-sm md:px-4 md:py-2"
        >
          Scan a Message
        </Link>
      </div>
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border/30 px-2 py-1.5 md:hidden">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            className="shrink-0 rounded-md px-3 py-1.5 text-xs text-muted-foreground data-[status=active]:bg-white/5 data-[status=active]:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
