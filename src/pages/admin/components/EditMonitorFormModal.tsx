import { Avatar } from "@/components/shared/Avatar";
import EntityPreview from "@/components/shared/EntityPreview";
import FormModal from "@/components/shared/FormModal";
import SelectComponent from "@/components/shared/SelectComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";

export default function EditMonitorFormModal() {
    const handleSaveClassroom = () => {
        console.log("Lógica para salvar no banco de dados aqui!");
    };
    const handleCloseModalClassroom = () => {
        console.log("Fechar modal");
    };
    const items = [
        { value: 'turma1', label: 'Calculo 1' },
        { value: 'turma2', label: 'Calculo 2' },
        { value: 'turma3', label: 'Calculo 3' },
        { value: 'turma4', label: 'Calculo 4' },
        { value: 'turma5', label: 'Calculo 5' }
    ]
    return (
        <FormModal
            id="edit-monitor-form"
            labelIcon={<EditIcon />}
            title="Editar Monitor"
            description="Altere informações e/ou turmas do respectivo monitor."
            handleSafeChanges={handleSaveClassroom}
            handleCloseModal={handleCloseModalClassroom}
            labelSaveModalButton='Salvar'
            labelCloseModalButton='Fechar'
        >
            <EntityPreview
                title="Renato Romano"
                leading={<Avatar name={{ firstName: "Renato", lastName: "Romano" }} />}
                subtitle="teste"
            />

            <div className="grid gap-3">
                <Label htmlFor="curso">Turma responsável</Label>
                <SelectComponent
                    label="Selecione uma turma"
                    placeholder="Turma."
                    items={items}
                />
            </div>

            <div className="grid gap-3">
                <Label htmlFor="nome">Email</Label>
                <Input id="email" placeholder="monitoremail@edu.unifor.br" />
            </div>
        
        </FormModal>
    )
}