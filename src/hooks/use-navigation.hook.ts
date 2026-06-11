import { useNavigate, type NavigateOptions } from "react-router"

export function useNavigation() {
  const navigate = useNavigate()

  const handleNavigateTo = (path: string, options?: NavigateOptions) =>
    navigate(path, options)

  return { handleNavigateTo }
}
