import { createBrowserRouter } from "react-router"
import { Example } from "./pages/Example"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Example />,
    loader: () => console.log("Executa sempre quando carrega uma page")
  }
])
