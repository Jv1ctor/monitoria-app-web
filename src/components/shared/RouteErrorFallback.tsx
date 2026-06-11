import { useNavigate, useRouteError } from "react-router";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/paths";
import { ApiError } from "@/lib/handle-request";

export function RouteErrorFallback() {
  const error = useRouteError() as unknown;
  const navigate = useNavigate();
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
      <Button onClick={() => navigate(paths.monitor)}>
        Voltar ao início
      </Button>
    </div>
  );
}
