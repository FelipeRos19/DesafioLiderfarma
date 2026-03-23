import { useState, useRef, useEffect } from "react";

const useDropdown = (onChange) => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setOpen(false)
        }

        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const handleSelect = (key) => {
        onChange(key)
        setOpen(false)
    }

    return { open, setOpen, ref, handleSelect }
}

export default useDropdown