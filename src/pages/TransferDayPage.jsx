import { useState } from "react"
import { transferDayService } from "../services/TransferDayService"
import ReportHeader from "../components/reports/ReportHeader"
import ReportTable from "../components/reports/table/ReportTable"
import ReportFilter from "../components/reports/ReportFilter"
import ReportTablePagination from "../components/reports/table/ReportTablePagination"

const ITEMS_PER_PAGE = 10

const TransferDayPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState({
        descricao: "",
        loja_origem: "",
        loja_destino: "",
        problema_alvo: ""
    })

    const response = transferDayService.getList({
        page: currentPage,
        items_per_page: ITEMS_PER_PAGE,
        filters,
    })

    const handleSearch = (newFilters) => {
        setFilters(newFilters)
        setCurrentPage(1)
    }

    return (
        <div className="bg-background flex flex-col gap-6">
            <ReportHeader
                execID={response.snapshotId}
                execDate={response.snapshotCreatedAt}
            />
            <ReportFilter onSearch={handleSearch} />
            <ReportTable data={response.pagedData} />
            <ReportTablePagination
                currentPage={currentPage}
                totalPages={response.totalPages}
                totalItems={response.totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}

export default TransferDayPage