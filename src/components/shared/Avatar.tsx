import { getInitials, type FullName } from "@/lib/getInitials";
import { cn } from "@/lib/utils";

type AvatarProps = {
  /** Deriva as iniciais quando `initials` não é informado. */
  name?: FullName;
  /** Iniciais já calculadas; têm precedência sobre `name`. */
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "size-8 text-xs",
  md: "size-9 text-xs",
  lg: "size-10 text-sm",
};

export function Avatar({ name, initials, size = "md", className }: AvatarProps) {
  const content = initials ?? (name ? getInitials(name) : "");

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground",
        sizeMap[size],
        className,
      )}
    >
      {content}
    </span>
  );
}
