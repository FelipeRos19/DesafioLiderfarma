import { useState } from "react"

const usePagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
    const [inputValue, setInputValue] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const firstItem = (currentPage - 1) * itemsPerPage + 1
    const lastItem = Math.min(currentPage * itemsPerPage, totalItems)

    const handleInputSubmit = () => {
        const page = parseInt(inputValue, 10)
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
        setIsEditing(false)
        setInputValue("")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleInputSubmit()
        } else if (e.key === "Escape") {
            setIsEditing(false)
            setInputValue("")
        }
    }

    const startEditing = () => {
        setIsEditing(true)
        setInputValue(String(currentPage))
    }

    const goToFirst = () => onPageChange(1)
    const goToLast = () => onPageChange(totalPages)
    const goToPrevious = () => onPageChange(currentPage - 1)
    const goToNext = () => onPageChange(currentPage + 1)

    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === totalPages

    return {
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
    }
}

export default usePagination