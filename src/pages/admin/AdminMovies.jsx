import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/elements/Header";
import ListMovie from "../../components/admin/ListMovie";
import Pagination from "../../components/elements/Pagination";

import calendarIcon from "../../assets/calendar-icon.svg";
import dropdown from "../../assets/dropdown.svg";
import addMovies from "../../assets/add-movies.svg";
import useApi from "../../../utils/useApi";

const AdminMovies = () => {
  const api = useApi();

  const [data, setData] = useState(null);
  const [date, setDate] = useState("");
  const [pageLength, setPageLength] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isSorting, setIsSorting] = useState(false);
  const [displayDate, setDisplayDate] = useState("dd/mm/yyyy");

  // Handle Format Date
  const formatDateToDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Handle Date Change
  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    setDate(inputDate);
    setDisplayDate(formatDateToDisplay(inputDate));
  };

  // Get Movie List
  useEffect(() => {
    api({
      method: "GET",
      url: "/admin/movies?page=1",
    })
      .then(({ data }) => {
        setData(data.rows);
        setPageLength(Math.ceil(data.meta.total / 5));
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }, []);

  // Sort by Date
  const handleDateSorting = (page) => {
    api({
      method: "GET",
      url: `/admin/movies?date=${date}&page=${page}`,
    })
      .then((res) => {
        setData(res.data.rows);
        setPageLength(Math.ceil(res.data.meta.total / 5));
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  };

  useEffect(() => {
    if (date !== "") {
      setIsSorting(true);
      handleDateSorting(1);
    }
  }, [date]);

  // Handle Pagination
  const handlePagination = (page) => {
    api({
      method: "GET",
      url: `/admin/movies?page=${page}`,
    })
      .then((res) => {
        setData(res.data.rows);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  };

  // Columns header for movie list
  const headerItems = [
    { label: "No", width: "w-[17px]" },
    { label: "Thumbnail", width: "w-[61px]" },
    { label: "Movie Name", width: "w-[140px]" },
    { label: "Category", width: "w-[220px]" },
    { label: "Released Date", width: "w-[117px]" },
    { label: "Duration", width: "w-[150px]" },
    { label: "Action", width: "w-[119px]" },
  ];

  return (
    <div>
      <div className="w-full min-h-screen bg-dark-grey bg-opacity-[0.2] pt-11">
        <Header />
        <main className="relative w-[327px] md:w-[768px] lg:w-[1000px] xl:w-[1106px] mx-auto">
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

                  <div className="relative w-full md:w-[200px] lg:w-[284px] h-14 bg-[#EFF0F6] rounded-md mr-[14px]">
                    <input
                      type="text"
                      value={displayDate}
                      readOnly
                      className="absolute top-[2px] left-0 w-full bg-transparent outline-none pl-[60px] xl:pl-[66px] tracking-wide pr-6 pt-[14px] z-20"
                    />
                    <input
                      type="date"
                      value={date}
                      className="relative w-full opacity-0 outline-none pl-[60px] xl:pl-[66px] pr-6 pt-[14px] z-20"
                      onChange={handleDateChange}
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
                <Link
                  to={"/admin/movies/add"}
                  className={`btn w-[91px] md:w-[140px] h-[40px] md:h-[56px] bg-blue rounded-md flex justify-center items-center text-sm text-white leading-6 tracking-[0.75px] transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300`}
                >
                  <div className="hidden md:flex">Add Movie</div>
                  <div className="flex md:hidden">
                    <img
                      src={addMovies}
                      alt="add movies icon"
                      className="mr-1 "
                    />
                    <div>Add</div>
                  </div>
                </Link>
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
                  type="text"
                  value={displayDate}
                  readOnly
                  className="absolute top-[2px] left-0 w-full bg-transparent outline-none pl-[60px] xl:pl-[66px] pr-6 pt-[14px] z-20"
                />
                <input
                  type="date"
                  value={date}
                  className="relative w-full opacity-0 outline-none pl-[60px] xl:pl-[66px] pr-6 pt-[14px] z-20"
                  onChange={handleDateChange}
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
                        key={e.id}
                        id={e.id}
                        no={(pageNumber - 1) * 5 + index + 1}
                        image={e.image}
                        name={e.movie_name}
                        category={e.category}
                        hours={e.hours}
                        minutes={e.minutes}
                        release_date={e.release_date}
                        detail={e.detail}
                      />
                    );
                  })}
              </div>
            </div>
            {/* Pagination */}
          </div>
          <div className="absolute bottom-10 inset-x-0 flex flex-col items-center">
            <Pagination
              radius={"[8px]"}
              pageLength={pageLength}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              handleClick={isSorting ? handleDateSorting : handlePagination}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminMovies;
