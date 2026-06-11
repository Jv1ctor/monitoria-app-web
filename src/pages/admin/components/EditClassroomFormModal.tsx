import FormModal from "@/components/shared/FormModal";
import SelectComponent from "@/components/shared/SelectComponent";
import TimeField from "@/components/shared/TimeField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";
import { useState } from "react";

export default function EditClassroomFormModal() {
    // const [dataInicio, setDataInicio] = useState<Date | undefined>(undefined);
    const [inicio, setInicio] = useState("");
    const [termino, setTermino] = useState("");

    const handleSaveClassroom = () => {
        console.log("Lógica para salvar no banco de dados aqui!");
    };
    const handleCloseModalClassroom = () => {
        console.log("Fechar modal");
    };
    const subject = [
      { value: 'mat01', label: 'Mat1' },
      { value: 'mat02', label: 'Fis1' },
      { value: 'mat03', label: 'Bio2' },
      { value: 'mat04', label: 'Qui3' },
      { value: 'mat05', label: 'Lapis3' }
    ]
    const modality = [
      { value: 'pre', label: 'Presencial' },
      { value: 'rem', label: 'Remoto' },
    ]

    const daysWeekend = [
      { value: 'seg', label: 'Segunda' },
      { value: 'ter', label: 'Terça' },
      { value: 'quart', label: 'Quarta' },
      { value: 'quint', label: 'Quinta' },
      { value: 'sext', label: 'Sexta' }
    ]

  return (
    <FormModal
      id="edit-classroom-form"
      labelIcon={<EditIcon />}
      title="Editar Turma"
      description="Cálculo I"
      handleSafeChanges={handleSaveClassroom}
      handleCloseModal={handleCloseModalClassroom}
      labelSaveModalButton='Salvar'
    >
      <div className="grid gap-3">
        <Label htmlFor="nome">Disciplina</Label>
        <SelectComponent
          label="Selecione uma disciplina"
          placeholder="Matematica"
          items={subject}
        />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="codigo">Local / Sala</Label>
        <Input id="codigo" placeholder="Ex: EX: C-201" />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="inicio">Horário de início</Label>
        <TimeField id="inicio" value={inicio} onChange={setInicio} />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="curso">Modalidade</Label>
        <SelectComponent
          label="Selecione uma modalidade"
          placeholder="Editar Turma"
          items={modality}
        />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="curso">Dia de semana</Label>
        <SelectComponent
          label="Selecione um dia da semana"
          placeholder="Segunda"
          items={daysWeekend}
        />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="termino">Horário de término</Label>
        <TimeField id="termino" value={termino} onChange={setTermino} />
      </div>

      {/* <div className="grid gap-3">
        <Label htmlFor="data-inicio">Data de início (semestre)</Label>
        <DatePicker id="data-inicio" value={dataInicio} onChange={setDataInicio} />
      </div> */}
      
    </FormModal>
  );
}