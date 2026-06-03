const formatData = (dataISO: string) =>
    new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(dataISO))

const formatHora = (dataISO: string) =>
    new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(dataISO))

const hoje = (dataISO: string) => {
    const data = new Date(dataISO)
    const hoje = new Date()

    return (
        data.getDate() === hoje.getDate() &&
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
    )
}

export { formatData, formatHora, hoje }