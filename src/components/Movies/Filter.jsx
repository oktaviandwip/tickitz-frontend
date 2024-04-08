import { useState } from "react";
import search from "../../assets/search.svg";

const GenresFilter = () => {
  const genres = ["Thriller", "Horror", "Romantic", "Adventure", "Sci-Fi"];
  const [activeGenre, setActiveGenre] = useState(null);

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
  };

  return (
    <div className="w-[327px] md:w-full flex flex-col md:flex-row mx-auto mt-[71px]">
      <div className="relative flex flex-col justify-between h-[97px]">
        <label
          htmlFor="search"
          className="text-semi-black font-semibold leading-5"
        >
          Cari Event
        </label>
        <input
          type="search"
          id="search"
          className="w-[340px] h-[64px] bg-lighter-grey border-1 border-grey rounded leading-5 tracking-[0.75px] outline-none px-14"
          placeholder="New Born Expert"
        />
        <img
          src={search}
          alt="search icon"
          className="absolute top-14 left-5"
        />
      </div>
      <div className="relative flex flex-col w-[340px] md:w-[400px] lg:w-[552px] mt-6 md:mt-0 md:ml-5">
        <div className="text-semi-black font-semibold leading-5 mb-4 md:mb-6">
          Filter
        </div>
        <div className="flex justify-evenly md:justify-between items-center flex-wrap">
          {genres.map((genre, index) => (
            <div
              key={index}
              className={`ml-5 md:ml-0 px-4 py-[10px] md:px-2 sm:py-[10px] lg:px-6 lg:py-[10px] rounded-[10px] ${
                activeGenre === genre ? "bg-blue text-white" : ""
              }`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
      ;
    </div>
  );
};

export default GenresFilter;
