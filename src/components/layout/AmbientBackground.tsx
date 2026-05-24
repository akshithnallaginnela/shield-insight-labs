export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#fafbfc]">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full bg-blue-400/25 blur-3xl animate-blob" />
      <div className="absolute top-1/4 -right-32 h-[480px] w-[480px] rounded-full bg-purple-400/25 blur-3xl animate-blob [animation-delay:-4s]" />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-pink-300/20 blur-3xl animate-blob [animation-delay:-7s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_55%,#fafbfc_95%)]" />
    </div>
  );
}
