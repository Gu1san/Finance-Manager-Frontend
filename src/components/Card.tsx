import { CardProps } from "../types";

export default function Card({
  title,
  subtitle,
  children,
  className = "",
  footer,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow p-5 flex flex-col ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          )}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="flex-1">{children}</div>

      {footer && <div className="mt-4 border-t pt-3">{footer}</div>}
    </div>
  );
}
