export function ProjectMetrics({ metrics }: { metrics: string[] }) {
  if (metrics.length === 0) return null;

  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {metrics.map((metric) => (
        <div
          key={metric}
          className="rounded-xl border border-border px-5 py-4 text-sm font-medium text-foreground"
        >
          {metric}
        </div>
      ))}
    </dl>
  );
}
