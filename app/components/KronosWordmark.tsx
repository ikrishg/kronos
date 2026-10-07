import Link from "next/link";
import { cn } from "@/lib/utils";

type KronosWordmarkProps = {
  className?: string;
  asLink?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
  /** Show mono “K” below md; full KRONOS from md up */
  collapseBelowMd?: boolean;
};

const sizeClasses = {
  sm: "text-xs tracking-[0.14em]",
  md: "text-sm tracking-[0.12em]",
  lg: "text-base tracking-[0.1em]",
};

export default function KronosWordmark({
  className,
  asLink = true,
  href = "/",
  size = "md",
  collapseBelowMd = false,
}: KronosWordmarkProps) {
  const mark = collapseBelowMd ? (
    <>
      <span
        className={cn(
          "font-mono font-normal uppercase text-foreground md:hidden",
          sizeClasses[size],
          className
        )}
        aria-hidden
      >
        K
      </span>
      <span
        className={cn(
          "hidden font-mono font-normal uppercase text-foreground md:inline",
          sizeClasses[size],
          className
        )}
      >
        KRONOS
      </span>
    </>
  ) : (
    <span
      className={cn(
        "font-mono font-normal uppercase text-foreground",
        sizeClasses[size],
        className
      )}
    >
      KRONOS
    </span>
  );

  if (asLink) {
    return (
      <Link
        href={href}
        className="inline-flex items-center hover:opacity-90 transition-opacity"
        {...(collapseBelowMd ? { "aria-label": "Kronos home" } : {})}
      >
        {mark}
      </Link>
    );
  }

  return mark;
}
