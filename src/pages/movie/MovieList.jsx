import { useState, useEffect } from "react";

import Header from "../../components/elements/Header";
import Footer from "../../components/elements/Footer";
import Carousel from "../../components/movie/Carousel";
import Movie from "../../components/movie/Movie";
import Newsletter from "../../components/Home/Newsletter";
import Pagination from "../../components/elements/Pagination";

import search from "../../assets/search.svg";
import avenger from "../../assets/background-login.svg";
import blackWidow from "../../assets/black-widow.svg";
import spiderman from "../../assets/spiderman-homecoming.png";
import useApi from "../../../utils/useApi";

const MovieList = () => {
  const api = useApi();
  const bgImages = [avenger, blackWidow, spiderman];
  const title = [
    "LIST MOVIE OF THE WEEK",
    "THIS WEEK'S TOP FILMS",
    "MUST-WATCH MOVIES OF THE WEEK",
  ];
  const subtitle = [
    "Experience the Magic of Cinema: Book Your Tickets Today",
    "Dive into Adventure: Secure Your Seats Now",
    "Catch the Latest Blockbusters: Reserve Your Tickets Today",
  ];
  const genres = ["Drama", "Action", "Comedy", "Adventure", "Sci-Fi"];

  const [data, setData] = useState(null);
  const [pageLength, setPageLength] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeGenre, setActiveGenre] = useState(null);
  const [isFilter, setIsFilter] = useState(false);

  // Get All Movies
  useEffect(() => {
    handlePagination(1);
  }, []);

  // Pagination
  function handlePagination(page) {
    api({
      method: "GET",
      url: `/movies?page=${page}`,
    })
      .then(({ data }) => {
        setData(data.rows);
        setPageLength(Math.ceil(data.meta.total / 12));
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }

  // Filter by Genre
  useEffect(() => {
    if (activeGenre !== null) {
      setIsSearching(false);
      setSearchQuery("");
      setIsFilter(true);
      setPageNumber(1);
      handleFilter(1);
    } else {
      setIsSearching(true);
      setIsFilter(false);
      setPageNumber(1);
    }
  }, [activeGenre]);

  function handleFilter(page) {
    api({
      method: "GET",
      url: `/movies/?genre=${activeGenre}&page=${page}`,
    })
      .then(({ data }) => {
        setData(data.rows);
        setPageLength(Math.ceil(data.meta.total / 12));
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }

  // Search Movies
  function handleSearch(page) {
    api({
      method: "GET",
      url: `/movies/?search=${searchQuery}&page=${page}`,
    })
      .then(({ data }) => {
        setData(data.rows);
        setPageLength(Math.ceil(data.meta.total / 12));
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }

  return (
    <div>
      <Header />
      <Carousel bgImages={bgImages} title={title} subtitle={subtitle} />
      <main className="w-[327px] md:w-[768px] lg:w-[1000px] xl:w-[1106px] mx-auto">
        <div className="w-[327px] md:w-full flex flex-col md:flex-row mx-auto mt-[71px]">
          <div className="relative flex flex-col justify-between h-[97px]">
            {/* Search */}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setActiveGenre(null);
                  handleSearch(1);
                }
              }}
            />
            <button
              className="absolute top-14 left-5"
              onClick={(e) => {
                setActiveGenre(null);
                handleSearch(1);
              }}
            >
              <img src={search} alt="Search icon" />
            </button>
          </div>

          {/* Genres */}
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
                  onClick={() => {
                    setActiveGenre(genre);
                  }}
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Movie List */}
        <div className="whitespace-nowrap overflow-x-auto mt-8 md:mt-14 pl-1">
          <div className="grid grid-cols-4 grid-rows-3 w-[1000px] md:w-[1106px]">
            {data &&
              data.map((e) => {
                return (
                  <Movie
                    key={e.id}
                    image={e.image}
                    name={e.movie_name}
                    genres={e.category}
                    recommended={e.recommended}
                    detail={`/movies/${e.detail}`}
                  />
                );
              })}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center mt-10">
          <Pagination
            radius={"[8px]"}
            pageLength={pageLength}
            pageNumber={pageNumber}
            activeGenre={activeGenre}
            setPageNumber={setPageNumber}
            handleClick={
              isSearching
                ? handleSearch
                : isFilter
                ? handleFilter
                : handlePagination
            }
          />
        </div>
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default MovieList;
