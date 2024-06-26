const Advantage = ({ img, title, desc }) => {
  return (
    <>
      <div className="w-[327px] md:w-[230px] lg:w-[340px] flex flex-col items-center md:items-start text-center md:text-start mb-[33px] md:mb-0">
        <img src={img} alt="Advantage" />
        <div className="text-lg font-semibold leading-6 my-[19px]">{title}</div>
        <div className="text-dark-grey leading-8 tracking-[0.75px]">{desc}</div>
      </div>
    </>
  );
};

export default Advantage;
