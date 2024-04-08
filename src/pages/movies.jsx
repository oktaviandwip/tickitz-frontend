import { useState, useEffect } from "react";
import Header from "../components/Header";
import search from "../assets/search.svg";
import avenger from "../assets/background-login.svg";
import jhonWick3 from "../assets/jhon-wick-3.png";
import spiderman from "../assets/spiderman-homecoming.png";
import Carousel from "../components/Movies/Carousel";
import Movie from "../components/Home/Movie";
import Pagination from "../components/Movies/Pagination";
import nextPage from "../assets/next-page.svg";
import Newsletter from "../components/Home/Newsletter";
import Footer from "../components/Footer";
import useApi from "../../utils/useApi";

const MovieList = () => {
  const api = useApi();
  const bgImages = [avenger, jhonWick3, spiderman];
  const title = "LIST MOVIE OF THE WEEK";
  const subtitle = "Experience the Magic of Cinema: Book Your Tickets Today";
  const genres = ["Drama", "Action", "Comedy", "Adventure", "Sci-Fi"];

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const pagesArr = [...Array(pageNumber)].map((_, i) => i + 1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [activeGenre, setActiveGenre] = useState(null);

  useEffect(() => {
    api({
      method: "GET",
      url: `/movies?page=1`,
    })
      .then((res) => {
        setData(res.data.rows);
        setPageNumber(Math.ceil(res.data.meta.total / 12));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Search
  const handleSearch = (page) => {
    api({
      method: "GET",
      url: `/movies/${searchQuery}?page=${page}`,
    })
      .then((res) => {
        setPageNumber(Math.ceil(res.data.meta.total / 12));
        setData(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Pagination
  const handlePagination = (page) => {
    api({
      method: "GET",
      url: `/movies?page=${page}`,
    })
      .then((res) => {
        setData(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setActivePage(1);
  }, [pageNumber]);

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  // Genre
  const handleFilter = (genre, page) => {
    api({
      method: "GET",
      url: `/movies/?genre=${genre}&page=${page}`,
    })
      .then((res) => {
        setPageNumber(Math.ceil(res.data.meta.total / 12));
        setData(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleActiveGenre = (genre) => {
    setActiveGenre(genre);
  };

  return (
    <>
      <Header />
      <Carousel bgImages={bgImages} title={title} subtitle={subtitle} />
      <main className="w-[327px] md:w-[768px] lg:w-[1000px] xl:w-[1106px] mx-auto">
        {/* Filter */}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="absolute top-14 left-5"
              onClick={(e) => {
                e.preventDefault();
                setPage(1);
                handleSearch(1);
                setIsSearching(true);
                setIsFilter(false);
                setActivePage(1);
                setActiveGenre("");
              }}
            >
              <img src={search} alt="search icon" />
            </button>
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
                  onClick={() => {
                    setPage(1);
                    handleActiveGenre(genre);
                    handleFilter(genre, 1);
                    setActiveGenre(genre);
                    setIsFilter(true);
                    setIsSearching(false);
                    setSearchQuery("");
                  }}
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Movie List */}
        <div className="whitespace-nowrap overflow-x-auto mt-8 md:mt-14">
          <div className="grid grid-cols-4 grid-rows-3 w-[1000px] md:w-[1106px]">
            {data &&
              data.map((e) => {
                return (
                  <Movie
                    key={e.movie_id}
                    image={e.image}
                    name={e.movie_name}
                    genres={e.category}
                    recommended={e.recommended}
                    detail={e.detail}
                  />
                );
              })}
          </div>
        </div>

        {/* Pagination */}
        <nav className="w-[327px] md:w-full md:mt-6">
          <ul className=" flex justify-center">
            {pagesArr.map((page) => (
              <div
                key={page}
                type="button"
                className={`rounded-full px-[15px] py-[8px] me-5 ${
                  page === activePage
                    ? "bg-blue text-white shadow-xl"
                    : "bg-light-grey text-dark-grey"
                }`}
                onClick={() => {
                  handleActivePage(page);
                  if (isSearching) {
                    handleSearch(page);
                  } else if (isFilter) {
                    handleFilter(activeGenre, page);
                  } else {
                    handlePagination(page);
                  }
                  setPage(page);
                }}
              >
                {page}
              </div>
            ))}
            <img
              src={nextPage}
              alt="next page"
              className={`${pageNumber < 2 ? "hidden" : "flex"}`}
              onClick={() => {
                const nextPage = page < pageNumber ? page + 1 : page;
                handleActivePage(nextPage);
                if (isSearching) {
                  handleSearch(nextPage);
                } else if (isFilter) {
                  handleFilter(activeGenre, nextPage);
                } else {
                  handlePagination(nextPage);
                }
                setPage(nextPage);
              }}
            />
          </ul>
        </nav>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default MovieList;
