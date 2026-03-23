import TableRow from "./ReportTableRow"

const headers = [
    "ID",
    "ID Produto",
    "Descrição",
    "Loja de Origem",
    "Loja de Destino",
    "Problema Alvo",
    "Quantidade",
    "Status",
    "Motivo de Exclusão",
]

const colWidths = [
    "w-[5%]", 
    "w-[8%]",  
    "w-[18%]", 
    "w-[9%]", 
    "w-[9%]",  
    "w-[10%]",  
    "w-[8%]",   
    "w-[12%]",  
    "w-[21%]",  
]

const ReportTable = ({ data = [] }) => {
    return (
        <div className="bg-gray-100 rounded-2xl w-[90%] mx-auto mt-4 overflow-hidden">
            <table className="w-full table-fixed">
                <colgroup>
                    {colWidths.map((w, i) => (
                        <col key={i} className={w} />
                    ))}
                </colgroup>
                <thead>
                    <tr className="border-b border-gray-300">
                        {headers.map((h) => (
                            <th
                                key={h}
                                className="px-4 py-3 text-left text-sm font-medium text-gray-700 truncate"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <TableRow key={index} row={row} />
                    ))}
                    {Array.from({ length: Math.max(0, 10 - data.length) }).map((_, i) => (
                        <tr key={`empty-${i}`} className="border-b border-gray-200">
                            {headers.map((_, j) => (
                                <td key={j} className="px-4 py-3">&nbsp;</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReportTable