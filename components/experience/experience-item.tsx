import type { ExperienceRole } from "@/content/site";

export function ExperienceItem({
  role,
  isLast,
}: {
  role: ExperienceRole;
  isLast: boolean;
}) {
  return (
    <div className="relative pl-8 sm:pl-10">
      {/* Timeline Vertical Bar */}
      {!isLast ? (
        <span
          className="absolute left-[11px] top-6 -bottom-8 w-0.5 bg-border sm:left-[15px]"
          aria-hidden="true"
        />
      ) : null}

      {/* Timeline Node Dot */}
      <span
        className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-background ring-4 ring-background sm:h-8 sm:w-8 sm:left-0"
        aria-hidden="true"
      >
        <span className="h-2 w-2 rounded-full bg-accent sm:h-2.5 sm:w-2.5" />
      </span>

      {/* Experience Content Card */}
      <div className="rounded-2xl border border-border bg-card-bg p-6 sm:p-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              {role.role}
            </h3>
            <p className="text-sm font-semibold text-accent">{role.company}</p>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-muted sm:mt-0 sm:text-right">
            <span>
              {role.startDate} — {role.endDate}
            </span>
            {role.location ? (
              <>
                <span>·</span>
                <span>{role.location}</span>
              </>
            ) : null}
          </div>
        </div>

        {/* Bullets */}
        <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted">
          {role.bullets.map((bullet, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
