import { useState, useEffect } from "react";
import Header from "../components/Header";
import calendarIcon from "../assets/calendar-icon.svg";
import dropdown from "../assets/dropdown.svg";
import nextPage from "../assets/next-page.svg";
import ListMovie from "../components/Admin/ListMovie";
import useApi from "../../utils/useApi";
import { useNavigate } from "react-router-dom";
import addMovies from "../assets/add-movies.svg";

const AdminMovies = () => {
  const navigate = useNavigate();
  const api = useApi();
  const [data, setData] = useState(null);
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const pagesArr = [...Array(pageNumber)].map((_, i) => i + 1);
  const pages =
    pageNumber <= 4 ? pagesArr : page > 4 ? pageArrMaker(page) : [1, 2, 3, 4];
  const [isSorting, setIsSorting] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    api({
      method: "GET",
      url: "/admin/movies?page=1",
    })
      .then((res) => {
        setData(res.data.rows);
        setPageNumber(Math.ceil(res.data.meta.total / 5));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Sorting
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDateSorting = (date, page) => {
    api({
      method: "GET",
      url: `/admin/movies?date=${date}&page=${page}`,
    })
      .then((res) => {
        setData(res.data.rows);
        setPageNumber(Math.ceil(res.data.meta.total / 5));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Pagination
  function pageArrMaker(n) {
    const result = [];
    for (let i = n - 3; i <= n; i++) {
      if (i > 0) {
        result.push(i);
      }
    }
    return result;
  }

  const handlePagination = (page) => {
    api({
      method: "GET",
      url: `/admin/movies?page=${page}`,
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

  const headerItems = [
    { label: "No", width: "w-[17px]" },
    { label: "Thumbnail", width: "w-[61px]" },
    { label: "Movie Name", width: "w-[140px]" },
    { label: "Category", width: "w-[220px]" },
    { label: "Released Date", width: "w-[117px]" },
    { label: "Duration", width: "w-[150px]" },
    { label: "Action", width: "w-[119px]" },
  ];

  const handleClick = (link) => {
    link ? navigate(link) : navigate("#");
  };

  return (
    <>
      <div className="w-full min-h-screen bg-dark-grey bg-opacity-[0.2] py-11">
        <Header userRole={"admin"} />
        <main className="w-[327px] md:w-[768px] lg:w-[1000px] xl:w-[1106px] mx-auto">
          <div className="w-full h-[635px] md:h-[567px] flex flex-col justify-start items-center rounded-2xl bg-white mb-[49px]">
            {/* Title */}
            <div className="w-full h-[57px] flex justify-between items-center mt-[39px] px-[21px] md:px-[47px]">
              <div className="font-bold text-lg md:text-2xl leading-[30px] tracking-[0.75px]">
                List Movie
              </div>

              <div className="flex">
                {/* Sort by Date */}
                <div className="relative hidden md:flex">
                  <div className="absolute top-[18px] md:top-[18px] left-6 w-[250px] md:w-[160px] lg:w-[234px] flex justify-between">
                    <img
                      src={calendarIcon}
                      alt="calendar icon"
                      className="z-30"
                    />
                    <img src={dropdown} alt="dropdown icon" className="z-10" />
                  </div>

                  <div className="w-full md:w-[200px] lg:w-[284px] h-14 bg-[#EFF0F6] rounded-md mr-[14px]">
                    <input
                      type="date"
                      id="date"
                      value={date}
                      className="relative w-[300px] md:w-[210px] lg:w-full bg-transparent outline-none pl-[60px] xl:pl-[66px] pr-6 pt-[14px] z-20"
                      onChange={(e) => {
                        handleDateChange(e.target.value);
                        handleDateSorting(e.target.value, 1);
                        setIsSorting(true);
                        setPage(1);
                        setActivePage(1);
                      }}
                    />
                    <style>
                      {`
                        input[type="date"]::-webkit-calendar-picker-indicator {
                          opacity: 0;
                        }
                      `}
                    </style>
                  </div>
                </div>

                {/* Add Movies Button*/}
                <button
                  type="submit"
                  value="Submit"
                  className={`btn w-[91px] md:w-[140px] h-[40px] md:h-[56px] bg-blue rounded-md flex justify-center items-center text-sm text-white leading-6 tracking-[0.75px] transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300`}
                  onClick={() => handleClick("/admin/movies/add")}
                >
                  <div className="hidden md:flex">Add Movies</div>
                  <div className="flex md:hidden">
                    <img
                      src={addMovies}
                      alt="add movies icon"
                      className="mr-1 "
                    />
                    <div>Add</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Sort by Date */}
            <div className="relative flex md:hidden mt-3">
              <div className="absolute top-[18px] md:top-[18px] left-6 w-[250px] md:w-[160px] lg:w-[234px] flex justify-between">
                <img src={calendarIcon} alt="calendar icon" className="z-30" />
                <img src={dropdown} alt="dropdown icon" className="z-10" />
              </div>

              <div className="w-[285px] h-14 bg-[#EFF0F6] rounded-md">
                <input
                  type="date"
                  id="date"
                  value={date}
                  className="relative w-[300px] md:w-[210px] lg:w-full bg-transparent outline-none pl-[60px] xl:pl-[66px] pr-6 pt-[14px] z-20"
                  onChange={(e) => {
                    handleDateChange(e.target.value);
                    handleDateSorting(e.target.value, 1);
                    setIsSorting(true);
                    setPage(1);
                    setActivePage(1);
                  }}
                />
                <style>
                  {`
                        input[type="date"]::-webkit-calendar-picker-indicator {
                          opacity: 0;
                        }
                      `}
                </style>
              </div>
            </div>
            <div className="w-full whitespace-nowrap overflow-x-auto px-[21px] md:px-[47px]">
              {/* Header */}
              <div className="w-[1012px] h-[57px] mt-[15px]">
                <div className="w-full text-xs font-bold leading-[15px] text-[#1F4173] flex justify-between items-center">
                  {headerItems.map(({ label, width }, index) => (
                    <div
                      key={index}
                      className={`${width} h-[57px] flex justify-center items-center`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full border-t-1 border-[#E6EAF0]"></div>

              {/* List Movie */}
              <div className="w-[1012px]">
                {data &&
                  data.map((e, index) => {
                    return (
                      <ListMovie
                        key={e.movie_id}
                        id={e.movie_id}
                        no={(page - 1) * 5 + index + 1}
                        image={e.image}
                        name={e.movie_name}
                        category={e.category}
                        hours={e.hours}
                        minutes={e.minutes}
                        release_date={e.release_date}
                      />
                    );
                  })}
              </div>
            </div>

            {/* Pagination */}
            <div className="my-3">
              <nav className="w-[327px] md:w-full mt-6">
                <ul className=" flex justify-center">
                  <img
                    src={nextPage}
                    alt="previous page"
                    className={`${
                      page <= 4 ? "hidden" : "flex"
                    } mr-3 md:mr-5 transform rotate-180`}
                    onClick={() => {
                      const prevPage = page > 1 ? page - 1 : page;
                      handleActivePage(prevPage);
                      if (isSorting) {
                        handleDateSorting(date, prevPage);
                      } else {
                        handlePagination(prevPage);
                      }
                      setPage(prevPage);
                    }}
                  />

                  {pages.map((page) => (
                    <div
                      key={page}
                      type="button"
                      className={`rounded-[8px] px-[15px] py-[8px] mr-3 md:mr-5 ${
                        page === activePage
                          ? "bg-blue text-white shadow-xl"
                          : "bg-light-grey text-dark-grey"
                      }`}
                      onClick={() => {
                        setPage(page);
                        handleActivePage(page);
                        if (isSorting) {
                          console.log(page);
                          handleDateSorting(date, page);
                        } else {
                          handlePagination(page);
                        }
                      }}
                    >
                      {page}
                    </div>
                  ))}
                  <img
                    src={nextPage}
                    alt="next page"
                    className={`${pageNumber < 4 ? "hidden" : "flex"}`}
                    onClick={() => {
                      const nextPage = page < pageNumber ? page + 1 : page;
                      handleActivePage(nextPage);
                      if (isSorting) {
                        handleDateSorting(date, nextPage);
                      } else {
                        handlePagination(nextPage);
                      }
                      setPage(nextPage);
                    }}
                  />
                </ul>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminMovies;
