import { Link } from "react-router-dom";
import badgeRecommended from "../../assets/badge-recommended.png";

const Movie = ({
  image,
  name,
  genres,
  recommended,
  upcoming,
  date,
  detail,
  ticket,
}) => {
  return (
    <div className="relative md:w-full font-mulish mb-[38px]">
      <div className="group">
        <div
          className="w-[240px] md:w-[264px] h-[405px] bg-[image:var(--image-movie)] bg-cover bg-center bg-no-repeat hover:shadow-inset rounded-md"
          style={{ "--image-movie": `url(${image})` }}
        >
          <div className="hidden group-hover:flex flex-col absolute top-[30%] left-[15%]">
            <Link
              to={detail}
              className="flex justify-center items-center text-white leading-6 tracking-[0.75px] rounded-[5px] w-[188px] h-[48px] border-1 border-white mb-3 transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300"
            >
              Details
            </Link>
            <Link
              to={ticket}
              className="flex justify-center items-center text-white leading-6 tracking-[0.75px] rounded-[5px] w-[188px] h-[48px] bg-blue transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300"
            >
              Buy Ticket
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[90%] text-lg md:text-2xl font-bold leading-[34px] tracking-[1px] my-[11px] md:my-[19px] truncate">
        {name}
      </div>
      <div
        className={`${
          upcoming ? "block" : "hidden"
        } text-blue font-bold leading-8 tracking-[0.75px] -mt-3 mb-3`}
      >
        {date}
      </div>
      <div className="flex flex-wrap">
        {genres.map((genre, index) => (
          <span
            key={index}
            className="px-[18px] py-1 mr-2 mb-2 rounded-full text-dark-grey bg-light-grey tracking-[0.75px]"
          >
            {genre}
          </span>
        ))}
      </div>
      <div
        className={`${
          recommended ? "absolute" : "hidden"
        } top-[9px] -left-[10px] w-[135px] h-[36px] bg-[image:var(--badge)] text-white  bg-cover bg-center bg-no-repeat`}
        style={{ "--badge": `url(${badgeRecommended})` }}
      >
        <span className="ml-4 text-sm leading-6 tracking-[0.75px]">
          Recommended
        </span>
      </div>
    </div>
  );
};

export default Movie;
