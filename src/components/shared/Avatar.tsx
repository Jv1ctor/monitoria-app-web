import { getInitials, type FullName } from "@/lib/getInitials";
import { cn } from "@/lib/utils";

export function Avatar({ name }: { name: FullName}) {
  return (
    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground")}>
      {getInitials(name)}
    </span>
  );
}