import { useState, useEffect } from "react"
import { transferDayService } from "../services/TransferDayService"

const useRowStatus = (initialStatus, rowId) => {
    const [status, setStatus] = useState(
        initialStatus === "PERMITIDO" ? "allowed" : "notAllowed"
    )

    useEffect(() => {
        setStatus(initialStatus === "PERMITIDO" ? "allowed" : "notAllowed")
    }, [initialStatus])

    const updateStatus = (newStatus) => {
        setStatus(newStatus)
        transferDayService.saveStatus(rowId, newStatus === "allowed" ? "PERMITIDO" : "NAO_PERMITIDO")
    }

    return { status, updateStatus }
}

export default useRowStatus