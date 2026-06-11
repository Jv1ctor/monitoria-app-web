import { useNavigate, useRouteError } from "react-router";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";
import { ApiError } from "@/lib/handle-request";
import { useAuth } from "@/hooks/use-auth.hook";

export function RouteErrorFallback() {
  const error = useRouteError() as unknown;
  const navigate = useNavigate();
  const { user } = useAuth();

  const homePath = (() => {
    const role = user?.roles?.[0]?.role;
    if (role === "monitor") return paths.monitor;
    if (role === "admin") return paths.admin;
    return paths.student;
  })();

  const message =
    error instanceof ApiError
      ? error.message
      : error instanceof Error
        ? error.message
        : "Erro inesperado ao carregar a página.";
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-lg font-semibold">Não foi possível carregar</h2>
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button onClick={() => navigate(homePath)}>
        Voltar ao início
      </Button>
    </div>
  );
}
