export function SoftBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-1">
      <div className="absolute top-20 left-1/2 h-120 w-250 -translate-x-1/2 rounded-full bg-linear-to-tr from-primary/30 to-transparent blur-3xl" />
      <div className="absolute right-12 bottom-10 h-50 w-100 rounded-full bg-linear-to-bl from-primary/30 to-transparent blur-3xl" />
    </div>
  );
}
