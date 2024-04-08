const Input = ({ name, type, value, width, height, placeholder, onChange }) => {
  const possible = ["w-[275px]"];

  return (
    <>
      <div className={`w-${width} h-[97px] flex flex-col justify-between mt-6`}>
        <div className="leading-[20px] text-semiblack">{name}</div>
        <div
          className={`w-full h-${height} leading-[20px] bg-lighter-grey border-1 border-grey rounded px-9`}
        >
          <input
            type={type}
            value={
              type === "date" ? new Date().toISOString().slice(0, 10) : value
            }
            className={`relative bg-transparent w-full h-${height} outline-none z-20`}
            placeholder={placeholder}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <style>
        {`
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
        }`}
      </style>
    </>
  );
};

export default Input;
