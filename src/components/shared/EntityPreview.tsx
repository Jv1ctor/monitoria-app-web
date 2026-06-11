import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EntityPreviewProps = {
  title: string;
  subtitle?: string;
  upSubtitle?: string;
  leading?: ReactNode;       // avatar, ícone, imagem... o que for
  className?: string;
};

export default function EntityPreview({ title, subtitle, upSubtitle, leading, className }: EntityPreviewProps) {
  return (
    <div className={cn("flex items-start gap-3 rounded-lg border bg-muted/40 p-4 text-sm", className)}>
      {leading}
      <div className="flex flex-col gap-0.5">
        {upSubtitle && <span className="text-muted-foreground">{upSubtitle}</span>}
        <span className="font-semibold text-foreground">{title}</span>
        {subtitle && <span className="text-muted-foreground">{subtitle}</span>}
      </div>
    </div>
  );
}