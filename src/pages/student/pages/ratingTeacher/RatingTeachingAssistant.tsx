import { useState } from "react"
import { ChevronLeft, Download, FileText } from "lucide-react"
import { Link, useLoaderData } from "react-router"
import type { MaterialsLoaderResult } from "@/loaders/materials.loader"
import { paths } from "@/routes/paths"
import { toast } from "sonner"
import { useRating } from "@/hooks/use-rating.hook"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/shared/StarRating"

export default function RatingTeachingAssistant() {
    const { documents } = useLoaderData<MaterialsLoaderResult>()
    const { submitRating, isLoading } = useRating()
    const [open, setOpen] = useState(false)
    const [nota, setNota] = useState(0)
    const [comentario, setComentario] = useState("")

    const sendRating = () => {
        if (nota === 0) {
            toast.warning("Selecione uma nota antes de enviar")
            return
        }

        // TODO: o backend requer monitor_id, mas ainda não temos esse dado facilmente disponível no frontend
        // Precisamos passar o monitor_id correto da turma/aula atual quando o fluxo for integrado com o backend
        const payload = {
            monitor_id: 0, // placeholder — substituir pelo monitor_id real da turma
            rate: nota,
        }

        submitRating(payload)

        toast.success("Avaliacao enviada com sucesso", {
            description: "Obrigado pelo seu feedback sobre a monitoria.",
        })

        setOpen(false)
        setNota(0)
        setComentario("")
    }

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return "0 B"
        const k = 1024
        const sizes = ["B", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
    }

    return (
        <div className="px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto w-full max-w-5xl space-y-4">
                <Link
                    to={paths.student}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ChevronLeft className="size-4" />
                    Voltar para Conteudos
                </Link>

                <section className="rounded-lg border border-border bg-card p-5 shadow-card">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="rounded-md bg-info/10 p-2 text-info">
                                <FileText className="size-5" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Monitoria
                                </p>
                                <h1 className="mt-1">Materiais da Monitoria</h1>
                            </div>
                        </div>

                        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                            Avaliar Monitor
                        </Button>
                    </div>
                </section>

                <section className="space-y-2">
                    <h2>Materiais publicados</h2>

                    {documents.length === 0 ? (
                        <div className="py-8 text-sm text-muted-foreground border border-dashed rounded-lg text-center">
                            Nenhum material publicado para esta monitoria.
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
                            {documents.map((material, index) => {
                                const dateObj = new Date(material.createdAt)
                                const dateLabel = dateObj.toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                const sizeLabel = formatBytes(material.size)
                                const extLabel = material.mime_type.split("/").pop()?.toUpperCase() ?? "ARQ"

                                return (
                                    <article
                                        key={material.id}
                                        className={[
                                            "flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between",
                                            index !== documents.length - 1 ? "border-b border-border" : "",
                                        ].join(" ")}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-md bg-info/10 p-2 text-info">
                                                <FileText className="size-4" />
                                            </div>

                                            <div>
                                                <p className="font-semibold">{material.filename}</p>
                                                <p className="text-sm text-muted-foreground">{material.description ?? "Sem descrição"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 md:gap-4">
                                            <span className="text-xs text-muted-foreground">
                                                {extLabel} - {sizeLabel}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{dateLabel}</span>
                                            <Button size="sm">
                                                <Download className="size-4" />
                                                Baixar
                                            </Button>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    )}
                </section>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Avaliar Monitor</DialogTitle>
                        <DialogDescription>Deixe sua avaliação sobre a monitoria</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">
                        <p className="text-sm font-medium">Sua avaliacao</p>

                        <StarRating value={nota} onChange={setNota} size="lg" />

                        <div className="space-y-1">
                            <p className="text-sm font-medium">Comentario</p>
                            <Textarea
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                placeholder="Escreva seu feedback"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={sendRating} disabled={isLoading}>
                            Enviar Avaliacao
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
