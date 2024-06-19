import { Link } from "react-router-dom";
import tickitzIcon from "/tickitz-icon-white.svg";

const Icon = () => {
  return (
    <>
      <Link to="/">
        <img src={`${tickitzIcon}`} className="w-[85px] md:w-full" />
      </Link>
    </>
  );
};

export default Icon;
