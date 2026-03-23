import { useState } from "react"

const useReportFilters = (onSearch) => {
    const [descricao, setDescricao] = useState("")
    const [lojaOrigem, setLojaOrigem] = useState("")
    const [lojaDestino, setLojaDestino] = useState("")
    const [problemaAlvo, setProblemaAlvo] = useState("")

    const handleSearch = () => {
        onSearch({
            descricao,
            loja_origem: lojaOrigem,
            loja_destino: lojaDestino,
            problema_alvo: problemaAlvo
        })
    }

    const handleClear = () => {
        setDescricao("")
        setLojaOrigem("")
        setLojaDestino("")
        setProblemaAlvo("")
        onSearch({ 
            descricao: "", 
            loja_origem: "", 
            loja_destino: "",
            problema_alvo: ""
        })
    }

    return {
        descricao, setDescricao,
        lojaOrigem, setLojaOrigem,
        lojaDestino, setLojaDestino,
        problemaAlvo, setProblemaAlvo,
        handleSearch,
        handleClear,
    }
}

export default useReportFilters