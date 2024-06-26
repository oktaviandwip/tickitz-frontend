import React from "react";

const Pin = ({ pin, setPin }) => {
  // Handle Input PIN
  const handleInputPin = (element, index) => {
    // Make sure the input is a number
    if (isNaN(element.value)) return;

    setPin([...pin.map((d, i) => (i === index ? element.value : d))]);

    // Focus to the next PIN
    if (element.nextSibling && element.value) {
      element.nextElementSibling.focus();
    }
  };

  // Handle Move Left & Right
  const handleKeyDown = (element, e) => {
    if (e.key === "ArrowLeft" && element.previousElementSibling) {
      element.previousElementSibling.focus();
    } else if (e.key === "ArrowRight" && element.nextElementSibling) {
      element.nextElementSibling.focus();
    }
  };

  return (
    <div className="flex flex-row justify-between gap-x-2">
      {pin.map((data, index) => {
        return (
          <input
            className="md:w-[53px] md:h-[65px] w-[40px] h-[50px] text-center text-[#3A3D42] text-[30px] font-bold p-2 border border-[#A9A9A999] rounded-[10px] outline-none"
            type="text"
            maxLength={1}
            key={index}
            value={data}
            placeholder="_"
            onChange={(e) => handleInputPin(e.target, index)}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => handleKeyDown(e.target, e)}
            required
          />
        );
      })}
    </div>
  );
};

export default Pin;
