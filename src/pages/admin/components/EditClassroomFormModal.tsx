import { useEffect, useState } from "react";
import { EditIcon } from "lucide-react";
import FormModal from "@/components/shared/FormModal";
import SelectComponent from "@/components/shared/SelectComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ClassResponseDto } from "@/types/class.type";

type SubjectOption = {
  id: number | string;
  name: string;
};

type EditClassroomValues = {
  code: string;
  subject_id: number;
};

type EditClassroomFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classroom: ClassResponseDto | null;
  subjects: SubjectOption[];
  onSubmit: (values: EditClassroomValues) => void;
};

export default function EditClassroomFormModal({
  open,
  onOpenChange,
  classroom,
  subjects,
  onSubmit,
}: EditClassroomFormModalProps) {
  const [code, setCode] = useState("");
  const [subjectId, setSubjectId] = useState("");

  useEffect(() => {
    if (classroom) {
      setCode(classroom.code);
      setSubjectId(String(classroom.subject_id));
    }
  }, [classroom]);

  const handleSave = () => {
    onSubmit({ code, subject_id: Number(subjectId) });
  };

  const subjectItems = subjects.map((subject) => ({
    value: String(subject.id),
    label: subject.name,
  }));

  return (
    <FormModal
      id="edit-classroom-form"
      open={open}
      onOpenChange={onOpenChange}
      labelIcon={<EditIcon />}
      title="Editar Turma"
      description={classroom?.subject?.name ?? classroom?.code ?? ""}
      handleSafeChanges={handleSave}
      handleCloseModal={() => onOpenChange(false)}
      labelSaveModalButton="Salvar"
      labelCloseModalButton="Fechar"
    >
      <div className="grid gap-3">
        <Label htmlFor="classroom-code">Código da Turma</Label>
        <Input
          id="classroom-code"
          placeholder="Ex: CS101-T1"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="classroom-subject">Disciplina</Label>
        <SelectComponent
          label="Selecione uma disciplina"
          placeholder="Disciplina"
          items={subjectItems}
          value={subjectId}
          onValueChange={setSubjectId}
        />
      </div>

      {classroom?.monitor && (
        <div className="grid gap-1">
          <Label>Monitor</Label>
          <p className="text-sm text-muted-foreground">
            {classroom.monitor.first_name} {classroom.monitor.last_name}
          </p>
        </div>
      )}
    </FormModal>
  );
}
