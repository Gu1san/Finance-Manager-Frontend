import { ReactNode } from "react";
import "../styles/components/card.css";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

export default function Card({
  title,
  subtitle,
  children,
  className = "",
  footer,
}: CardProps) {
  return (
    <div className={`main ${className}`}>
      {(title || subtitle) && (
        <div className="mb-3">
          {title && (
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          )}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center">{children}</div>

      {footer && <div className="mt-4 border-t pt-3">{footer}</div>}
    </div>
  );
}
