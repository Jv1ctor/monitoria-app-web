import { NavLink, Outlet } from "react-router"
import { List, LogOut } from "lucide-react"

import { Button } from "../ui/button"
import { Topbar } from "./topbar"
import { Footer } from "./footer"
import { Avatar } from "@/components/shared/Avatar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet"
import { cn } from "@/lib/utils"
import { getInitials } from "@/lib/getInitials"
import { useAuth } from "@/hooks/use-auth.hook"
import { useNavigation } from "@/hooks/use-navigation.hook"
import { paths } from "@/routes/paths"

const navLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn(
    "border-b-2 pb-1 border-transparent transition duration-300 ease-in-out", 
    isActive ? "text-primary font-bold border-primary" : "hover:text-primary hover:border-primary"
  )
)

type DashboardLayoutProps = {
  firstName: string,
  lastName: string,
  registration: string,
  navs: {
    label: string,
    path: string,
  }[]
}

function DashboardLayout(props: DashboardLayoutProps) {
  const { logout } = useAuth()
  const { handleNavigateTo } = useNavigation()
  const initials = getInitials({firstName: props.firstName, lastName: props.lastName})

  const handleLogout = () => {
    logout()
    handleNavigateTo(paths.login)
  }

  return (
    <div className="flex flex-col min-h-svh">
      <Topbar
        actions={
          <div className="flex flex-row items-center lg:gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <Avatar initials={initials} className="font-bold" />
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold">{props.firstName} {props.lastName}</p>
                <p className="text-sm text-muted-foreground">{props.registration}</p>
              </div>
              <Button
                size="icon-xl"
                className="cursor-pointer rounded-full border-2 border-muted bg-transparent w-10 h-10 text-foreground hover:border-red-100 hover:bg-red-100 hover:text-red-600"
                onClick={handleLogout}
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
                      {props.navs.map((nav) => (
                        <SheetClose asChild key={nav.label}>
                          <NavLink to={nav.path} end>
                            <Button variant="ghost">{nav.label}</Button>
                          </NavLink>
                        </SheetClose>
                      ))}
                      <div className="flex items-center gap-4 pt-6 border-t">
                        <Avatar initials={initials} className="font-bold" />
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">{props.firstName} {props.lastName}</p>
                          <p className="text-sm text-muted-foreground">
                            {props.registration}
                          </p>
                        </div>
                        <Button
                          size="icon-xl"
                          className="ml-auto cursor-pointer rounded-full border-2 border-muted bg-transparent w-10 h-10 text-foreground hover:border-red-100 hover:bg-red-100 hover:text-red-600"
                          onClick={handleLogout}
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
        navComponents={props.navs.map((nav) => (
          <NavLink className={navLinkClass} to={nav.path} key={nav.label} end>
            {nav.label}
          </NavLink>
        ))}
      />

      <main className="flex-1 bg-muted/50">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export { DashboardLayout }
