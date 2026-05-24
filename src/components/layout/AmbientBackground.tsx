export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyber/20 blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-neon/20 blur-3xl animate-float [animation-delay:-3s]" />
      <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-cyber/10 blur-3xl animate-float [animation-delay:-5s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,#0B0F19_85%)]" />
    </div>
  );
}
