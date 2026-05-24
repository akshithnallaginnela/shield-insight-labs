import { ShieldCheck, Github, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/40 bg-background/50 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-cyber to-neon">
              <ShieldCheck className="h-4 w-4 text-background" />
            </span>
            <span className="text-sm font-semibold">ScamShield AI</span>
          </div>
          <p className="mt-3 max-w-sm text-xs text-muted-foreground">
            AI-powered scam detection for the messaging-first generation. Verify before you trust.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-xs">
          <div>
            <p className="mb-2 font-medium text-foreground">Product</p>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to="/analyze" className="hover:text-foreground">Analyzer</Link></li>
              <li><Link to="/recruiter" className="hover:text-foreground">Recruiter Verifier</Link></li>
              <li><Link to="/feed" className="hover:text-foreground">Threat Feed</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-medium text-foreground">Company</p>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>About</li>
              <li>Privacy</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start gap-3 md:justify-end">
          <a href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-muted-foreground hover:text-foreground"><Github className="h-4 w-4" /></a>
          <a href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-muted-foreground hover:text-foreground"><Twitter className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="border-t border-border/30 py-4 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} ScamShield AI · Built for a safer messaging web.
      </div>
    </footer>
  );
}
