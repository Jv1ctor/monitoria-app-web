import { NavLink, Outlet } from "react-router"
import { Button } from "../ui/button"
import { Topbar } from "./topbar"
import { Footer } from "./footer"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { List, LogOut } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet"
import { cn } from "@/lib/utils"

function DashboardLayout() {
  return (
    <div className="flex flex-col">
      <Topbar
        actions={
          <div className="flex flex-row items-center lg:gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <Avatar size="default">
                <AvatarFallback className="bg-primary text-white font-bold">
                  AL
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold">Alex Lima</p>
                <p className="text-sm text-muted-foreground">Mat. 12313512</p>
              </div>

              <Button
                size={"icon-xl"}
                className="cursor-pointer rounded-full border-2 border-muted bg-transparent w-10 h-10 text-foreground hover:border-red-100 hover:bg-red-100 hover:text-red-600"
              >
                <LogOut />
              </Button>
            </div>
            <div className="flex lg:hidden justify-start md:justify-between">
              <Sheet>
                <SheetTrigger asChild>
                  <Button>
                    <List size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top">
                  <SheetHeader>
                    <div className="flex flex-col justify-center gap-5">
                      <SheetClose asChild>
                        <NavLink to={"/student/dashboard"}> 
                          <Button variant="ghost">Inicio</Button>
                        </NavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <NavLink to={"/ds"}>
                          <Button variant="ghost">Minhas Monitorias</Button>
                        </NavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <NavLink to={"/ds"}>
                          <Button variant="ghost">Frequencia</Button>
                        </NavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <NavLink to={"/ds"}>
                          <Button variant="ghost">Buscar Disciplina</Button>
                        </NavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <NavLink to={"/ds"}>
                          <Button variant="ghost">Forum</Button>
                        </NavLink>
                      </SheetClose>
                      <div className="flex items-center gap-4 pt-6 border-t">
                        <Avatar size="default">
                          <AvatarFallback className="bg-primary text-white font-bold">
                            AL
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">Alex Lima</p>
                          <p className="text-sm text-muted-foreground">
                            Mat. 12313512
                          </p>
                        </div>
                        <Button
                          size={"icon-xl"}
                          className="ml-auto cursor-pointer rounded-full border-2 border-muted bg-transparent w-10 h-10 text-foreground hover:border-red-100 hover:bg-red-100 hover:text-red-600"
                        >
                          <LogOut />
                        </Button>
                      </div>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        }
        navComponents={[
          <NavLink
            className={({ isActive }) =>
              cn(
                `border-b-2 pb-1 border-transparent transition duration-300 ease-in-out ${
                  isActive
                    ? "text-primary font-bold border-primary"
                    : "hover:text-primary hover:border-primary"
                }`,
              )
            }
            to={"/student/dashboard"} //alterando para a rota student/dashboard
            key="inicio"
          >
            Inicio
          </NavLink>,
          <NavLink
            className={({ isActive }) =>
              cn(
                `border-b-2 pb-1 border-transparent transition duration-300 ease-in-out ${
                  isActive
                    ? "text-primary font-bold border-primary"
                    : "hover:text-primary hover:border-primary"
                }`,
              )
            }
            to={"/ds"}
            key="minhas_monitorias"
          >
            Minhas Monitorias
          </NavLink>,
          <NavLink
            className={({ isActive }) =>
              cn(
                `border-b-2 pb-1 border-transparent transition duration-300 ease-in-out ${
                  isActive
                    ? "text-primary font-bold border-primary"
                    : "hover:text-primary hover:border-primary"
                }`,
              )
            }
            to={"/ds"}
            key="frequencia"
          >
            Frequencia
          </NavLink>,
          <NavLink
            className={({ isActive }) =>
              cn(
                `border-b-2 pb-1 border-transparent transition duration-300 ease-in-out ${
                  isActive
                    ? "text-primary font-bold border-primary"
                    : "hover:text-primary hover:border-primary"
                }`,
              )
            }
            to={"/ds"}
            key="buscar_disciplinas"
          >
            Buscar Disciplina
          </NavLink>,
          <NavLink
            className={({ isActive }) =>
              cn(
                `border-b-2 pb-1 border-transparent transition duration-300 ease-in-out ${
                  isActive
                    ? "text-primary font-bold border-primary"
                    : "hover:text-primary hover:border-primary"
                }`,
              )
            }
            to={"/ds"}
            key="forum"
          >
            Forum
          </NavLink>,
        ]}
      />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export { DashboardLayout }
