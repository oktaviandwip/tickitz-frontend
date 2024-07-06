import googleIcon from "../../assets/google-icon-login.svg";
import facebookIcon from "../../assets/facebook-icon-login.svg";

const GoogleFb = ({ handleGoogle }) => {
  return (
    <>
      <div className="my-5 flex items-center justify-between">
        <hr className="w-[40%] border-grey" />
        <p className="text-xs text-darker-grey tracking-[0.5px] font-inter">
          Or
        </p>
        <hr className="w-[40%] border-grey" />
      </div>

      <div className="google-facebook flex justify-evenly md:justify-between">
        <div
          className="flex justify-center items-center rounded shadow-md w-16 md:w-[45%] h-16 cursor-pointer transform active:scale-90 active:opacity-75 transition duration-300"
          onClick={handleGoogle}
        >
          <img src={`${googleIcon}`} alt="Google icon" />
          <p className="hidden md:block text-lg text-dark-grey ml-6 tracking-[0.5px]">
            Google
          </p>
        </div>
        <div className="flex justify-center items-center rounded shadow-md w-16 md:w-[45%] h-16 transform active:scale-90 active:opacity-75 transition duration-300">
          <img src={`${facebookIcon}`} alt="Facebook icon" />
          <p className="hidden md:block text-lg text-dark-grey ml-6 tracking-[0.5px]">
            Facebook
          </p>
        </div>
      </div>
    </>
  );
};

export default GoogleFb;
