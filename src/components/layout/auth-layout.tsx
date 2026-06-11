import { useAuth } from "@/hooks/use-auth.hook"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export type NavItem = { label: string; path: string }

type LayoutProps = {
  navs: NavItem[]
}

export function Layout({ navs }: LayoutProps) {
  const { user } = useAuth()

  return (
    <DashboardLayout
      firstName={user?.firstName ?? ""}
      lastName={user?.lastName ?? ""}
      registration={user?.registration ?? ""}
      navs={navs}
    />
  )
}
