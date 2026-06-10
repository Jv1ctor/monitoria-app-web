import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

type FormModalProps = {
    labelButton: string,
    title: string,
    description?: string, 
    handleSafeChanges: () => void,
    handleCloseModal: () => void,
    children: ReactNode
    labelSaveModalButton: string
    labelCloseModalButton: string
}

export default function FormModal(props: FormModalProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{props.labelButton}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{props.title}</SheetTitle>
          <SheetDescription>
            {props.description}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 flex flex-col gap-4">
          {props.children}
        </div>
        <SheetFooter>
          <Button type="submit" onClick={props.handleSafeChanges}>{props.labelSaveModalButton}</Button>
          <SheetClose asChild>
            <Button variant="outline" onClick={props.handleCloseModal}>{props.labelCloseModalButton}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}