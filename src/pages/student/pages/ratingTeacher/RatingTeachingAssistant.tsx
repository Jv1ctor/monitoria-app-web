import { useState } from "react"
import { ChevronLeft, Download, FileText } from "lucide-react"
import { Link } from "react-router"
import type { Material } from "@/types/student/Material.type"
import { toast } from "sonner"

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


const MATERIAIS: Material[] = [
    {
        id: 1,
        titulo: "Apostila de Limites",
        descricao: "Material de apoio sobre conceitos iniciais de limites.",
        extensao: "PDF",
        tamanho: "2.1 MB",
        data: "12/05/2026",
    },
    {
        id: 2,
        titulo: "Lista de Exercicios - Derivadas",
        descricao: "Exercicios para praticar o conteudo da monitoria.",
        extensao: "DOCX",
        tamanho: "649 KB",
        data: "14/05/2026",
    },
    {
        id: 3,
        titulo: "Slides - Integral por partes",
        descricao: "Slides utilizados durante a explicacao do monitor.",
        extensao: "PDF",
        tamanho: "3.8 MB",
        data: "15/05/2026",
    },
]




export default function RatingTeachingAssistant() {
    const [open, setOpen] = useState(false)
    const [nota, setNota] = useState(0)
    const [comentario, setComentario] = useState("")

    const sendRating = () => {
        if (nota === 0) {
            toast.warning("Selecione uma nota antes de enviar")
            return
        }

        console.log({ nota, comentario })

        toast.success("Avaliacao enviada com sucesso", {
            description: "Obrigado pelo seu feedback sobre a monitoria.",
        })

        setOpen(false)
        setNota(0)
        setComentario("")
    }

    return (
        <div className="px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto w-full max-w-5xl space-y-4">
                <Link
                    to="/student/dashboard"
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
                                    Calculo I - Monitor Joao Luiz
                                </p>
                                <h1 className="mt-1">Derivada</h1>
                            </div>
                        </div>

                        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                            Avaliar Monitor
                        </Button>
                    </div>
                </section>

                <section className="space-y-2">
                    <h2>Materiais publicados</h2>

                    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
                        {MATERIAIS.map((material, index) => (
                            <article
                                key={material.id}
                                className={[
                                    "flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between",
                                    index !== MATERIAIS.length - 1 ? "border-b border-border" : "",
                                ].join(" ")}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="rounded-md bg-info/10 p-2 text-info">
                                        <FileText className="size-4" />
                                    </div>

                                    <div>
                                        <p className="font-semibold">{material.titulo}</p>
                                        <p className="text-sm text-muted-foreground">{material.descricao}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 md:gap-4">
                                    <span className="text-xs text-muted-foreground">
                                        {material.extensao} - {material.tamanho}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{material.data}</span>
                                    <Button size="sm">
                                        <Download className="size-4" />
                                        Baixar
                                    </Button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Avaliar Monitor</DialogTitle>
                        <DialogDescription>Calculo I - Joao Luiz</DialogDescription>
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
                        <Button onClick={sendRating}>Enviar Avaliacao</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}