const TextInput = ({ label, placeholder, value, onChange, icon }) => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      {label && (
        <label className="text-sm text-gray-700">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <img
            src={icon}
            alt="ícone"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          />
        )}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-lg ${icon ? "pl-9" : "pl-3"} pr-3 py-2 text-sm text-gray-800 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500`}
        />
      </div>
    </div>
  )
}

export default TextInput