import { Check } from "lucide-react";

export function SafeStepsChecklist({ steps }: { steps: string[] }) {
  return (
    <section className="glass-card rounded-xl p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Safe Next Steps
      </h3>
      <ul className="space-y-2">
        {steps.map((s, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-lg border border-safe/20 bg-safe/5 p-3"
          >
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-safe/20 text-safe">
              <Check className="h-3 w-3" />
            </span>
            <span className="text-sm text-foreground/90">{s}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
