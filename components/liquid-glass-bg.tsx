export function LiquidGlassBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="blob-drift-a absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[140px] bg-fuchsia-500/25 dark:bg-fuchsia-600/10" />
      <div className="blob-drift-b absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full blur-[130px] bg-rose-500/20 dark:bg-rose-600/[0.09]" />
      <div className="blob-drift-c absolute bottom-1/4 left-1/4 w-[420px] h-[420px] rounded-full blur-[120px] bg-amber-400/[0.18] dark:bg-amber-500/[0.07]" />
    </div>
  );
}
