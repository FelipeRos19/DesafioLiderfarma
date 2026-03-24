import { useState } from "react"
import { transferDayService } from "../services/TransferDayService"

const ITEMS_PER_PAGE = 10

const initialFilters = {
    descricao: "",
    loja_origem: "",
    loja_destino: "",
    problema_alvo: "",
}

const useTransferDayList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState(initialFilters)

    const response = transferDayService.getList({
        page: currentPage,
        items_per_page: ITEMS_PER_PAGE,
        filters,
    })

    const handleSearch = (newFilters) => {
        setFilters(newFilters)
        setCurrentPage(1)
    }

    return {
        currentPage,
        setCurrentPage,
        filters,
        response,
        handleSearch,
        ITEMS_PER_PAGE,
    }
}

export default useTransferDayList