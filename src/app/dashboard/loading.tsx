export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4 h-20 bg-black/5 dark:bg-white/5" />
        ))}
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-6 h-36 bg-black/5 dark:bg.white/5" />
        ))}
      </div>
    </div>
  );
}

