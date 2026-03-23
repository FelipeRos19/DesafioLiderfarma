const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
    const firstItem = (currentPage - 1) * itemsPerPage + 1
    const lastItem = Math.min(currentPage * itemsPerPage, totalItems)

    return (
        <div className="bg-gray-100 rounded-2xl w-[90%] mx-auto mt-2 px-6 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">
                {firstItem}-{lastItem} de {totalItems} itens
            </span>

            <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600 mr-2">
                    Página {currentPage} de {String(totalPages).padStart(2, "0")}
                </span>

                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    «
                </button>

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    ‹
                </button>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    ›
                </button>

                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    »
                </button>
            </div>
        </div>
    )
}

export default Pagination