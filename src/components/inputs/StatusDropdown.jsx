import StatusBadge, { variants } from "../badges/StatusBadge"
import arrowIcon from "../../assets/expand_circle_down.png"
import useDropdown from "../../hooks/useDropdown"

const StatusDropdown = ({ value, onChange }) => {
    const { open, setOpen, ref, handleSelect } = useDropdown(onChange)

    return (
        <div className="relative flex items-center gap-2" ref={ref}>

            <StatusBadge value={value} />

            <img
                src={arrowIcon}
                alt="opções"
                onClick={() => setOpen(!open)}
                className={`w-5 h-5 cursor-pointer transition-transform ${open ? "rotate-180" : ""}`}
            />

            {open && (
                <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-sm z-50 overflow-hidden w-max">
                    {Object.entries(variants).map(([key]) => (
                        <div
                            key={key}
                            onClick={() => handleSelect(key)}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors ${value === key ? "opacity-50 pointer-events-none" : ""}`}
                        >
                            <StatusBadge value={key} />
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default StatusDropdown