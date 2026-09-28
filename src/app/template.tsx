export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] animate-curtain-late bg-[linear-gradient(90deg,#22c55e,#ff6b1a,#ff4d8d,#6c2bd9)]"
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[91] animate-curtain bg-ink" />
      {children}
    </>
  );
}
