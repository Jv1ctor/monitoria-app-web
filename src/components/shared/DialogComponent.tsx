import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type DialogComponentProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  icon?: ReactNode;
  children: ReactNode;
};

export default function DialogComponent({
  title,
  description,
  isOpen,
  onOpenChange,
  icon,
  children,
}: DialogComponentProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-3">
            {icon && (
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive [&_svg]:size-5">
                {icon}
              </span>
            )}
            <div className="flex flex-col gap-1">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}