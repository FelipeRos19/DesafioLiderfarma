import StatusDropdown from "../../inputs/StatusDropdown"
import useRowStatus from "../../../hooks/useRowStatus"
import useRowQuantity from "../../../hooks/useRowQuantity"

const TruncatedCell = ({ text, maxLength }) => {
    const truncated = text?.length > maxLength ? text.slice(0, maxLength) + "..." : text

    return (
        <td className="px-4 py-3 text-sm text-gray-700">
            <span title={text} className="cursor-default">
                {truncated}
            </span>
        </td>
    )
}

const TableRow = ({ row }) => {
    const { status, updateStatus } = useRowStatus(row.status, row.produto_id)
    const { quantity, updateQuantity } = useRowQuantity(row.quantidade, row.produto_id)

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm text-gray-700">{row.id}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{row.produto_id}</td>
            <TruncatedCell text={row.descricao} maxLength={26} />
            <TruncatedCell text={row.loja_origem} maxLength={22} />
            <TruncatedCell text={row.loja_destino} maxLength={22} />
            <td className="px-4 py-3 text-sm text-gray-700">{row.problema_alvo}</td>
            <td className="px-4 py-3 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => updateQuantity(quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs cursor-pointer"
                    >
                        −
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => updateQuantity(e.target.value)}
                        className="bg-gray-200 text-gray-800 font-medium px-2 py-1 rounded-md text-sm w-15 text-center focus:outline-none focus:ring-2 focus:ring-primary-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                        onClick={() => updateQuantity(quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs cursor-pointer"
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="px-4 py-3 w-50">
                <StatusDropdown value={status} onChange={updateStatus} />
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">{row.motivo_exclusao}</td>
        </tr>
    )
}

export default TableRow