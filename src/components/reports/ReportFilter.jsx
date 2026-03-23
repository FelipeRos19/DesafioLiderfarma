import TextInput from "../inputs/TextInput"
import SelectInput from "../inputs/DropDownSelector"
import searchIcon from "../../assets/search.png"
import useReportFilters from "../../hooks/useReportFilter"

const ReportFilter = ({ onSearch }) => {
    const {
        descricao, setDescricao,
        lojaOrigem, setLojaOrigem,
        lojaDestino, setLojaDestino,
        problemaAlvo, setProblemaAlvo,
        handleSearch,
        handleClear,
    } = useReportFilters(onSearch)

    const problemOptions = [
        { value: "RUPTURA", label: "Ruptura" },
        { value: "SEM_GIRO", label: "Sem Giro" },
        { value: "EXCESSO", label: "Excesso" },
        { value: "DESBALANCEADO", label: "Desbalanceado" },
    ]

    return (
        <div className="bg-gray-100 rounded-2xl w-[90%] mx-auto p-4">
            <div className="flex gap-3 items-end">

                <TextInput
                    label="Descrição"
                    placeholder="Ex: ACET%INA%20%FRAM%120"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    icon={searchIcon}
                />

                <TextInput
                    label="Loja de Origem"
                    value={lojaOrigem}
                    onChange={(e) => setLojaOrigem(e.target.value)}
                />

                <TextInput
                    label="Loja de Destino"
                    value={lojaDestino}
                    onChange={(e) => setLojaDestino(e.target.value)}
                />

                <SelectInput
                    label="Problema Alvo"
                    value={problemaAlvo}
                    onChange={(e) => setProblemaAlvo(e.target.value)}
                    options={problemOptions}
                />

                <div className="flex flex-col justify-end gap-1 pb-px">
                    <button
                        onClick={handleSearch}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-5 py-2 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                    >
                        Pesquisar
                    </button>
                    <button
                        onClick={handleClear}
                        className="text-gray-400 hover:text-gray-600 text-xs text-center cursor-pointer transition-colors"
                    >
                        Limpar filtros
                    </button>
                </div>

            </div>
            <p className="text-xs text-gray-400 mt-1">Use % como curinga</p>
        </div>
    )
}

export default ReportFilter