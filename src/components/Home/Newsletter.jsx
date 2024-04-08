import curvedLine from "../../assets/curved-line.svg";

const Newsletter = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="relative bg-light-blue rounded-[20px] w-[327px] md:w-full h-[538px] md:h-[318px] flex flex-col justify-start pt-16 md:pt-0 md:justify-center items-center mt-10 mx-auto">
      <form className="flex flex-col items-center">
        <div className="w-[327px] md:w-full text-[32px] md:text-[48px] leading-[50px] tracking-[1px] text-white text-center">
          Subscribe to our newsletter
        </div>
        <div className="flex flex-col md:flex-row justify-between md:justify-evenly items-center mt-12 md:w-[732px] h-[212px] md:h-[60px]">
          <input
            type="text"
            placeholder="First name"
            className="w-[264px] md:w-[230px] p-5 bg-transparent border-1 border-white rounded-[9px] placeholder:text-white placeholder:opacity-75 text-white outline-none"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-[264px] md:w-[230px] p-5 bg-transparent border-1 border-white rounded-[9px] placeholder:text-white placeholder:opacity-75 text-white outline-none"
          />
          <button
            type="submit"
            className="w-[264px] md:w-[219px] h-[60px] text-lg font-bold bg-white text-blue rounded-[9px] tracking-[-0.2px] transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300"
            onClick={handleSubmit}
          >
            Subscribe Now
          </button>
        </div>
      </form>
      <img
        src={curvedLine}
        alt="curved line"
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default Newsletter;
