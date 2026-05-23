import { NavLink } from "react-router"
import { Button } from "../ui/button"
import { Topbar } from "./topbar"
import { Footer } from "./footer"
import { List } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

function PublicLayout() {
  return (
    <div className="flex flex-col">

      <Topbar
        className="mx-0 md:mx-25"
        actions={
          <div className="flex flex-row items-center lg:gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <Button variant='ghost'>
                <NavLink to={'/login'}>
                  Entrar
                </NavLink>
              </Button>
              <Button>
                <NavLink to={'/register'}>
                  Cadastrar
                </NavLink>
              </Button>
            </div>
            <div className="flex lg:hidden justify-start md:justify-between">
              <Sheet>
                <SheetTrigger asChild>
                  <Button>
                    <List size={20}/>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Navegação</SheetTitle>
                    <SheetDescription>Navegue entre as paginas de autenticação</SheetDescription>
                    <div className="flex flex-col justify-center gap-10">
                      <SheetClose asChild>
                        <NavLink to={'/ds'}>
                          <Button variant="outline">Entrar</Button>
                        </NavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <NavLink to={'/ds'}>
                          <Button>Cadastrar</Button>
                        </NavLink>
                      </SheetClose>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        }/>
        {/* Outlet */}
      <Footer/>
    </div>
  )
}

export { PublicLayout }
