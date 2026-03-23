const variants = {
    allowed: {
        text: "bg-green-400 text-green-900",
        label: "PERMITIDO",
    },
    notAllowed: {
        text: "bg-red-200 text-red-500",
        label: "NÃO PERMITIDO",
    },
}

const StatusBadge = ({ value }) => {
    const style = variants[value] || variants.notAllowed

    return (
        <span className={`text-xs font-bold px-3 py-1 rounded-lg tracking-wide text-center whitespace-nowrap inline-block w-30 ${style.text}`}>
            {style.label}
        </span>
    )
}

export { variants }
export default StatusBadge