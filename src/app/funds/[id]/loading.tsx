export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border p-6 h-64 animate-pulse bg-black/5 dark:bg-white/5" />
        <div className="space-y-4">
          <div className="rounded-lg border p-6 h-40 animate-pulse bg-black/5 dark:bg-white/5" />
          <div className="rounded-lg border p-6 h-32 animate-pulse bg-black/5 dark:bg-white/5" />
        </div>
      </div>
    </div>
  );
}

