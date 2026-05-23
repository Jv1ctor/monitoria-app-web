import { Book } from "lucide-react";

function Footer() {
    return (
        <div className="bg-black py-10 text-white">
            <div className="flex flex-col gap-10 items-center justify-between px-15 sm:flex-row text-center">
                <div className="flex flex-col items-center lg:items-start">
                    <div className="flex flex-row gap-2">
                        <Book/>
                        <p>Monitoria</p>
                    </div>
                    <p>Conectando alunos e monitores para uma educação melhor.</p>
                </div>
                <p>© 2026 Monitoria · Universidade de Fortaleza.</p>
            </div>
        </div>
    )
}

export { Footer }