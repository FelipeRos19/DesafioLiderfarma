import ReportHeader from "../components/reports/ReportHeader"
import ReportTable from "../components/reports/table/ReportTable"
import ReportFilter from "../components/reports/ReportFilter"
import ReportTablePagination from "../components/reports/table/ReportTablePagination"
import useTransferDayList from "../hooks/useTransferDayList"

const TransferDayPage = () => {
    const {
        currentPage,
        setCurrentPage,
        response,
        handleSearch,
        ITEMS_PER_PAGE,
    } = useTransferDayList()

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