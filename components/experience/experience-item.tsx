import type { ExperienceRole } from "@/content/site";

export function ExperienceItem({ role }: { role: ExperienceRole }) {
  return (
    <div className="grid gap-2 py-8 sm:grid-cols-[minmax(0,180px)_1fr] sm:gap-8">
      <div>
        <p className="text-sm font-medium text-foreground">
          {role.startDate} — {role.endDate}
        </p>
        {role.location ? (
          <p className="mt-1 text-sm text-muted">{role.location}</p>
        ) : null}
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">
          {role.role} · {role.company}
        </h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          {role.bullets.map((bullet, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
