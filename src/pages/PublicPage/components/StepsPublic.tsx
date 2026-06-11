import { CardPublic } from "./CardPublic"

function StepsPublic() {
    return (
        <div className="flex flex-col my-20 px-8 gap-5 items-center justify-center w-full">
            <h1>Como funciona?</h1>
            <div className="flex flex-col gap-4 sm:flex-row">
                <CardPublic step='1' title='Crie seu Perfil' description='Cadastre-se com sua matrícula da Unifor e complete seu perfil'/>
                <CardPublic step='2' title='Encontre Monitores' description='Busque por disciplina, horário ou monitor preferido'/>
                <CardPublic step='3' title='Agende e Aprenda' description='Participe das monitorias e registre sua frequência'/>
            </div>
        </div>
    )
}

export { StepsPublic }