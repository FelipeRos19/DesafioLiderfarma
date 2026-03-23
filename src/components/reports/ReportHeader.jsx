const ReportHeader = ({execID, execDate}) => {
    return (
        <header className="w-full bg-gray-100 flex justify-between items-start px-10">
            
            <div>
                <h1 className="text-2xl font-bold text-gray-800 py-7">
                    📦 Transferência do Dia
                </h1>
            </div>

            <div className="text-right text-sm text-gray-700 py-7">
                {execDate && (
                    <p>Horário de Emissão: {execDate}</p>
                )}
                {execID && (
                    <p>ID de Execução: {execID}</p>
                )}
            </div>
        </header>
    )
}

export default ReportHeader;