import { ReactNode } from "react";

const colSpanClasses = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
} as const;

const rowSpanClasses = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
} as const;

interface DashboardCardProps {
  children: ReactNode;

  title?: string;
  description?: string;

  colSpan?: keyof typeof colSpanClasses;
  rowSpan?: keyof typeof rowSpanClasses;

  className?: string;
}

export default function DashboardCard({
  children,
  title,
  description,
  colSpan = 1,
  rowSpan = 1,
  className = "",
}: DashboardCardProps) {
  return (
    <section
      className={`
        ${colSpanClasses[colSpan]}
        ${rowSpanClasses[rowSpan]}
        rounded-xl
        border
        border-border
        bg-background-secondary
        p-5
        ${className}
      `}
    >
      {(title || description) && (
        <header className="mb-5">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}

          {description && (
            <p className="mt-1 text-sm text-foreground-secondary">
              {description}
            </p>
          )}
        </header>
      )}

      {children}
    </section>
  );
}
