import React from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useEffect } from "react";

export default function Input({
  type,
  name,
  placeholder,
  icon1,
  icon2,
  onChange,
  isError,
}) {
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(isError);
  const [showPw, setShowPw] = useState(false);

  const showPwHandler = (e) => {
    setShowPw(!showPw);
  };

  useEffect(() => {
    setError(isError);
  }, [isError]);

  return (
    <div className="h-[97px]">
      <div className="capitalize font-semibold text-semi-black mb-3">
        {name}
      </div>
      <div
        className={`relative border-1 h-16 rounded-md ${
          focus ? "border-blue" : "border-grey"
        } ${error ? "border-error" : ""}`}
      >
        <Icon
          icon={showPw ? icon1 : icon2}
          onClick={showPwHandler}
          className={`absolute text-2xl right-6 top-[18px] ${
            focus ? "text-blue" : "text-[#A9A9A999]"
          } ${error ? "text-error" : ""}`}
        />
        <input
          type={showPw ? "text" : type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => {
            setFocus(true);
            setError(false);
          }}
          onBlur={() => setFocus(false)}
          required
          className="px-6 py-[18px] w-full text-dark font-medium placeholder:text-dark-grey placeholder:font-normal focus:outline-none bg-transparent tracking-wider"
        />
      </div>
    </div>
  );
}
