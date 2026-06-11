import { useEffect, useState } from "react";
import { EditIcon } from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";
import EntityPreview from "@/components/shared/EntityPreview";
import FormModal from "@/components/shared/FormModal";
import SelectComponent from "@/components/shared/SelectComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MonitorLike = {
  name: string;
  course?: string;
  class: string;
  email: string;
};

type EditMonitorValues = {
  class: string;
  email: string;
};

type EditMonitorFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  monitor: MonitorLike | null;
  classes: { value: string; label: string }[];
  onSubmit: (values: EditMonitorValues) => void;
};

export default function EditMonitorFormModal({
  open,
  onOpenChange,
  monitor,
  classes,
  onSubmit,
}: EditMonitorFormModalProps) {
  const [classValue, setClassValue] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (monitor) {
      setClassValue(monitor.class);
      setEmail(monitor.email);
    }
  }, [monitor]);

  const handleSave = () => {
    onSubmit({ class: classValue, email });
  };

  const [firstName = "", lastName = ""] = (monitor?.name ?? "").split(" ");

  return (
    <FormModal
      id="edit-monitor-form"
      open={open}
      onOpenChange={onOpenChange}
      labelIcon={<EditIcon />}
      title="Editar Monitor"
      description="Altere informações e/ou turmas do respectivo monitor."
      handleSafeChanges={handleSave}
      handleCloseModal={() => onOpenChange(false)}
      labelSaveModalButton="Salvar"
      labelCloseModalButton="Fechar"
    >
      {monitor && (
        <EntityPreview
          title={monitor.name}
          leading={<Avatar name={{ firstName, lastName }} />}
          subtitle={monitor.course ?? ""}
        />
      )}

      <div className="grid gap-3">
        <Label htmlFor="monitor-class">Turma responsável</Label>
        <SelectComponent
          label="Selecione uma turma"
          placeholder="Turma"
          items={classes}
          value={classValue}
          onValueChange={setClassValue}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="monitor-email">Email</Label>
        <Input
          id="monitor-email"
          placeholder="monitoremail@edu.unifor.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </FormModal>
  );
}
