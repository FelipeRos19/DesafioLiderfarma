import usePagination from "../../../hooks/usePagination"

const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
    const {
        firstItem,
        lastItem,
        inputValue,
        isEditing,
        isFirstPage,
        isLastPage,
        setInputValue,
        handleInputSubmit,
        handleKeyDown,
        startEditing,
        goToFirst,
        goToLast,
        goToPrevious,
        goToNext,
    } = usePagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange })

    return (
        <div className="bg-gray-100 rounded-2xl w-[90%] mx-auto mt-2 px-6 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">
                {firstItem}-{lastItem} de {totalItems} itens
            </span>

            <div className="flex items-center gap-1">
                {isEditing ? (
                    <div className="flex items-center mr-2">
                        <span className="text-sm text-gray-600 mr-1">Página</span>
                        <input
                            type="number"
                            min={1}
                            max={totalPages}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleInputSubmit}
                            autoFocus
                            className="w-12 h-7 text-sm text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder={String(currentPage)}
                        />
                        <span className="text-sm text-gray-600 ml-1">de {String(totalPages).padStart(2, "0")}</span>
                    </div>
                ) : (
                    <button
                        onClick={startEditing}
                        className="text-sm text-gray-600 mr-2 hover:text-gray-900 hover:underline cursor-pointer transition-colors"
                        title="Clique para ir a uma página específica"
                    >
                        Página {currentPage} de {String(totalPages).padStart(2, "0")}
                    </button>
                )}

                <button
                    onClick={goToFirst}
                    disabled={isFirstPage}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    «
                </button>

                <button
                    onClick={goToPrevious}
                    disabled={isFirstPage}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    ‹
                </button>

                <button
                    onClick={goToNext}
                    disabled={isLastPage}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    ›
                </button>

                <button
                    onClick={goToLast}
                    disabled={isLastPage}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    »
                </button>
            </div>
        </div>
    )
}

export default Pagination