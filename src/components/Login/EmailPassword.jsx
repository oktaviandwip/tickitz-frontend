import hidePassword from "../../assets/hide-password.svg";

const EmailPassword = ({ type, id, name, value, onChange, label }) => {
  return (
    <div className="h-[178px] md:h-[219px] mb-5">
      <div className="relative">
        <div>
          <label
            htmlFor={id}
            className="leading-5 font-semibold text-semi-black"
          >
            {label}:
          </label>
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full h-[50px] md:h-16 mt-3 px-4 border border-grey outline-none rounded bg-lighter-grey tracking-[0.75px] placeholder:text-dark-grey"
            placeholder={`Enter your ${name}`}
          />
        </div>
        <img
          src={hidePassword}
          className={`${
            type === "password" ? "flex" : "hidden"
          } absolute top-[52px] md:top-[60px] right-[22px]`}
        />
      </div>
    </div>
  );
};

export default EmailPassword;
