import { NavLink } from "react-router"
import { Button } from "@/components/ui/button"

function GetStartPublic() {
    return (
        <div className="flex flex-col py-20 px-8 gap-5 items-center justify-center bg-primary w-full text-center">
            <h1 className="text-white text-3xl">Pronto para começar?</h1>
            <p className="text-white text-sm font-extralight">Junte-se a centenas de estudantes e monitores que já fazem parte da nossa comunidade.</p>
            <NavLink to='/register'>
                <Button variant='secondary' className="text-primary">Cadastre-se Gratuitamente</Button>
            </NavLink>
        </div>
    )
}

export { GetStartPublic }