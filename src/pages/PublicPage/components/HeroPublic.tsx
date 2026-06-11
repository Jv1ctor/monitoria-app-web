import { Button } from "@/components/ui/button"
import { NavLink } from "react-router"
import { paths } from "@/routes/paths"

function HeroPublic() {
  return (
    <div className="flex flex-col my-20 px-8 gap-5 items-center justify-center w-full">
      <h1 className="text-5xl text-center font-bold">
        Conectando Alunos e Monitores
      </h1>
      <p className="max-w-2xl text-center">
        Encontre monitores qualificados ou ofereça suas habilidades para ajudar
        outros estudantes a alcançarem seus objetivos.
      </p>
      <div className="flex items-center justify-center gap-2">
        <NavLink to={paths.login}>
          <Button>Encontrar Monitor</Button>
        </NavLink>
        <NavLink to={paths.login}>
          <Button variant="outline">Sou monitor</Button>
        </NavLink>
      </div>
    </div>
  )
}

export { HeroPublic }
