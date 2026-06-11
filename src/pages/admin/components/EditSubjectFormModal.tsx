import { useEffect, useState } from "react";
import { EditIcon } from "lucide-react";
import FormModal from "@/components/shared/FormModal";
import SelectComponent from "@/components/shared/SelectComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SubjectResponseDto } from "@/types/subject.type";

type MajorOption = {
  id: number | string;
  name: string;
};

type EditSubjectValues = {
  code: string;
  name: string;
  major_id: number;
};

type EditSubjectFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: SubjectResponseDto | null;
  majors: MajorOption[];
  onSubmit: (values: EditSubjectValues) => void;
};

export default function EditSubjectFormModal({
  open,
  onOpenChange,
  subject,
  majors,
  onSubmit,
}: EditSubjectFormModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [majorId, setMajorId] = useState("");

  useEffect(() => {
    if (subject) {
      setName(subject.name);
      setCode(subject.code);
      setMajorId(String(subject.major_id));
    }
  }, [subject]);

  const handleSave = () => {
    onSubmit({ code, name, major_id: Number(majorId) });
  };

  const majorItems = majors.map((major) => ({
    value: String(major.id),
    label: major.name,
  }));

  return (
    <FormModal
      id="edit-subject-form"
      open={open}
      onOpenChange={onOpenChange}
      labelIcon={<EditIcon />}
      title="Editar Disciplina"
      description={subject ? `${subject.code} - ${subject.name}` : ""}
      handleSafeChanges={handleSave}
      handleCloseModal={() => onOpenChange(false)}
      labelSaveModalButton="Salvar"
      labelCloseModalButton="Fechar"
    >
      <div className="grid gap-3">
        <Label htmlFor="subject-name">Nome da Disciplina</Label>
        <Input
          id="subject-name"
          placeholder="Ex: Cálculo I"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="subject-code">Código</Label>
        <Input
          id="subject-code"
          placeholder="Ex: MAT0101"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="subject-major">Curso</Label>
        <SelectComponent
          label="Selecione um curso"
          placeholder="Selecione um curso"
          items={majorItems}
          value={majorId}
          onValueChange={setMajorId}
        />
      </div>
    </FormModal>
  );
}
