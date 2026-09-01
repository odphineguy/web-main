import Link from "next/link";
import type { MouseEventHandler } from "react";

import { cn } from "@/lib/utils";

export default function AuditCta({
  locale,
  label,
  className,
  onClick,
}: {
  locale: string;
  label: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={`/${locale}#free-ai-audit`}
      className={cn("audit-cta", className)}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
