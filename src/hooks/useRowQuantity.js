import { useState, useEffect } from "react"
import { transferDayService } from "../services/TransferDayService"

const useRowQuantity = (initialQuantity, rowId) => {
    const [quantity, setQuantity] = useState(initialQuantity)

    useEffect(() => {
        setQuantity(initialQuantity)
    }, [initialQuantity])

    const updateQuantity = (value) => {
        const safe = Math.max(0, parseInt(value) || 0)
        setQuantity(safe)
        transferDayService.saveQuantity(rowId, safe)
    }

    const increment = () => updateQuantity(quantity + 1)
    const decrement = () => updateQuantity(Math.max(0, quantity - 1))

    return { quantity, updateQuantity, increment, decrement }
}

export default useRowQuantity