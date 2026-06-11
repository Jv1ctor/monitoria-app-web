import type { FormEvent, ReactNode } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

type FormModalProps = {
    id: string,
    open?: boolean,
    onOpenChange?: (open: boolean) => void,
    labelButton?: string,
    labelIcon?: ReactNode
    title: string,
    description?: string,
    handleSafeChanges: (event: FormEvent<HTMLFormElement>) => void,
    handleCloseModal: () => void,
    children: ReactNode
    labelSaveModalButton?: string
    labelCloseModalButton?: string
}

export default function FormModal({
  id,
  open,
  onOpenChange,
  labelButton = "Abrir",
  labelIcon,
  title,
  description = "",
  handleSafeChanges,
  handleCloseModal,
  children,
  labelSaveModalButton = "Salvar",
  labelCloseModalButton = "Cancelar"
}: FormModalProps) {
  const isControlled = open !== undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSafeChanges(event);
  };

  return (
    <Sheet modal={true} open={open} onOpenChange={onOpenChange}>
      {!isControlled && (
        <SheetTrigger asChild>
          <Button variant="outline">
            {labelIcon}
            {labelButton}
          </Button>
        </SheetTrigger>
      )}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        <form id={id} onSubmit={handleSubmit} className="flex flex-col gap-4 px-8">
          {children}
        </form>
        <SheetFooter>
          <Button type="submit" form={id}>{labelSaveModalButton}</Button>
          <SheetClose asChild>
            <Button type="button" variant="outline" onClick={handleCloseModal}>{labelCloseModalButton}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}