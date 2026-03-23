import arrowIcon from "../../assets/expand_circle_down.png"

const SelectInput = ({ label, value, onChange, options = [] }) => {
  return (
   <div className="relative flex-1 flex flex-col gap-1">
    {label && (
        <label className="text-sm text-gray-700">{label}</label>
    )}
    <div className="relative">
        <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none pr-8"
        >
        <option value="">Selecione...</option>
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
            {opt.label}
            </option>
        ))}
        </select>
        <img
            src={arrowIcon}
            alt="seta"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
        />
    </div>
</div>
  )
}

export default SelectInput