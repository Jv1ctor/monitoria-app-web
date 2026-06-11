import FormModal from "@/components/shared/FormModal";
import SelectComponent from "@/components/shared/SelectComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";

export default function EditSubjectFormModal() {
    const handleSaveClassroom = () => {
        console.log("Lógica para salvar no banco de dados aqui!");
    };
    const handleCloseModalClassroom = () => {
        console.log("Fechar modal");
    };
    const items = [
        { value: 'mat01', label: 'Matematica' },
        { value: 'mat02', label: 'Fisica' },
        { value: 'mat03', label: 'Quimica' },
        { value: 'mat04', label: 'Redação' },
        { value: 'mat05', label: 'Renato' }
    ]

  return (
    <FormModal
      labelIcon={<EditIcon />}
      title="Editar Disciplina"
      description="MAT0101 - Cálculo I"
      handleSafeChanges={handleSaveClassroom}
      handleCloseModal={handleCloseModalClassroom}
      labelSaveModalButton='Salvar'
      labelCloseModalButton='Fechar'
    >
      <div className="grid gap-3">
        <Label htmlFor="nome">Nome da Turma</Label>
        <Input id="nome" placeholder="Ex: Cálculo I" />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="codigo">Código</Label>
        <Input id="codigo" placeholder="Ex: MAT0101" />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="curso">Curso</Label>
        <SelectComponent
            label="Selecione um curso"
            placeholder="Selecione um curso."
            items={items}
        />
      </div>
    </FormModal>
  );
}