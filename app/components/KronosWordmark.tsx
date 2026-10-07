import Link from "next/link";
import { cn } from "@/lib/utils";

type KronosWordmarkProps = {
  className?: string;
  asLink?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "text-xs tracking-[0.14em]",
  md: "text-sm tracking-[0.12em]",
  lg: "text-base tracking-[0.1em]",
};

export default function KronosWordmark({
  className,
  asLink = true,
  size = "md",
}: KronosWordmarkProps) {
  const mark = (
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
      <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
        {mark}
      </Link>
    );
  }

  return mark;
}
