const Title = ({ title, subTitle, position }) => {
  const possible = ["md:items-center", "md:text-center"];

  return (
    <div
      className={`w-[327px] md:w-full text-center md:text-left flex flex-col mt-[50px] md:mt-[70px] mx-auto md:items-${position}
      }`}
    >
      <p className="text-blue text-lg font-semibold leading-[34px] tracking-[0.75px]">
        {title}
      </p>
      <p
        className={`w-[327px] md:w-[600px] mt-[14px] mb-6 text-[32px] leading-[45px] tracking-[1px] mx-auto md:mx-0 md:text-${position}
        }`}
      >
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
