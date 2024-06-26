import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/elements/Header";
import Footer from "../../components/elements/Footer";
import Button from "../../components/elements/Button";
import Pagination from "../../components/elements/Pagination";

import calendar from "../../assets/calendar-icon.svg";
import time from "../../assets/time-icon.svg";
import location from "../../assets/location.svg";
import dropdown from "../../assets/dropdown.svg";
import ebvid from "../../assets/ebv-id.svg";
import hiflix from "../../assets/hiflix.svg";
import cineone21 from "../../assets/CineOne21.svg";
import useApi from "../../../utils/useApi";

const MovieDetails = () => {
  const api = useApi();
  const { name } = useParams();

  const [data, setData] = useState({});
  const [details, setDetails] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  // Get Movie Data
  useEffect(() => {
    api({
      method: "GET",
      url: `/movies?name=${name}`,
    })
      .then(({ data }) => {
        setDetails(data.rows[0]);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }, []);

  // Handle Change
  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
  };

  // Bookings Field
  const bookings = [
    ["Date", "date", calendar, "2024-02-28"],
    ["Time", "time", time, "08:30"],
    ["Location", "select", location, details.location],
  ];

  // Cinemas Field
  const cinemas = [ebvid, hiflix, cineone21, ebvid, hiflix, cineone21];

  // Pagination
  const handlePageClick = (page) => {
    setStartIndex(page * 4 - 4);
  };

  return (
    <div>
      <Header />
      {/* Carousel */}
      <div
        className="w-full h-[475px] md:h-[415px] shadow-inset bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${details.image})`,
          backgroundPosition: "0 10%",
        }}
      />

      <main className="w-[327px] md:w-[768px] lg:w-[1000px] xl:w-[1106px] mx-auto">
        <div className="relative flex flex-col md:flex-row justify-start items-center">
          {/* Movie Image */}
          <div
            className="mt-[-334px] md:mt-[-163px] w-[327px] h-[502px] md:h-[405px] md:mr-5 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${details.image})`,
            }}
          />

          {/* Movie Details */}
          <div className="w-full flex flex-col items-center md:items-start">
            {/* Name & Genres */}
            <div className=" text-center md:text-left text-xl md:text-[32px] leading-[34px] font-bold tracking-[1px] my-6 capitalize">
              {details.movie_name}
            </div>
            <div className="flex space-x-2">
              {details.category &&
                details.category.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 mb-2 rounded-full text-dark-grey bg-light-grey tracking-wider capitalize"
                  >
                    {genre}
                  </span>
                ))}
            </div>

            {/* Details */}
            <div className="w-full flex mt-3">
              <div className="w-[160px] mr-6 md:mr-8 lg:mr-14 mb-3">
                <div className="text-sm text-dark-grey leading-6 tracking-[0.75px]">
                  Release Date
                </div>
                <div className="leading-8 tracking-[0.75px]">
                  {new Date(details.release_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="w-[153px] md:w-full">
                <div className="text-sm text-dark-grey leading-6 tracking-[0.75px]">
                  Directed by
                </div>
                <div className="leading-8 tracking-[0.75px] capitalize">
                  {details.director}
                </div>
              </div>
            </div>
            <div className="w-full flex mt-3">
              <div className="w-[160px] mr-6 md:mr-8 lg:mr-14 mb-3">
                <div className="text-sm text-dark-grey leading-6 tracking-[0.75px]">
                  Duration
                </div>
                <div className="leading-8 tracking-[0.75px]">
                  {details.hours} hrs {details.minutes} min
                </div>
              </div>
              <div className="w-[153px] md:w-full">
                <div className="text-sm text-dark-grey leading-6 tracking-[0.75px]">
                  Casts
                </div>
                <div className="flex leading-8 tracking-[0.75px] capitalize">
                  {details.casts && details.casts.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Synopsis */}
        <div>
          <div className="text-xl font-semibold mt-8 mb-1">Synopsis</div>
          <div className="md:w-[700px] lg:w-[821px] text-dark-grey leading-8 tracking-[0.75px]">
            {details.synopsis}
          </div>
        </div>
        {/* Booking Tickets */}
        <form>
          <div className="text-[32px] leading-[45px] tracking-[1px] mt-[55px] mb-[22px] md:mb-[38px]">
            Book Tickets
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:space-x-[15px] xl:space-x-[30px] space-y-3 md:space-y-0">
            {bookings.map((d, index) => (
              <div key={index} className="relative flex flex-col">
                <div className="absolute top-[18px] md:top-[65px] left-6 w-[250px] md:w-[160px] lg:w-[234px] flex justify-between">
                  <img src={d[2]} alt={`${d[1]} icon`} className="z-30" />
                  <img src={dropdown} alt="Dropdown icon" className="z-10" />
                </div>
                <label
                  htmlFor={d[1]}
                  className="hidden md:block text-xl font-semibold leading-[34px] tracking-[0.5px] mb-3"
                >
                  Choose {d[0]}
                </label>
                <div className="w-full md:w-[200px] lg:w-[284px] h-14 bg-[#EFF0F6] rounded-md">
                  {index < 2 ? (
                    <input
                      id={d[1]}
                      name={d[1]}
                      type={d[1]}
                      value={d[3]}
                      className="relative w-[300px] md:w-[210px] lg:w-full bg-transparent outline-none pl-[60px] xl:pl-[66px] pr-6 pt-[14px] z-20"
                      onChange={handleChange}
                    />
                  ) : (
                    <select
                      id={d[0]}
                      name={d[0]}
                      className="relative w-full bg-transparent outline-none pl-[60px] xl:pl-[66px] pr-6 pt-[16px] z-20 tracking-wide appearance-none capitalize"
                      onChange={handleChange}
                    >
                      {d[3] &&
                        d[3].map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  )}
                  <style>
                    {`
                      input[type="date"]::-webkit-calendar-picker-indicator,
                      input[type="time"]::-webkit-calendar-picker-indicator {
                        opacity: 0;
                      }
                    `}
                  </style>
                </div>
              </div>
            ))}
            <Button text={"Filter"} width={"[188px]"} height={"[56px]"} />
          </div>

          {/* Choose Cinemas */}
          <div className="flex flex-col items-center">
            <div className="w-full flex space-x-[34px] justify-center md:justify-start items-center my-10">
              <div className="text-xl font-semibold leading-[34px] tracking-[0.5px]">
                Choose Cinema
              </div>
              <div className="text-lg text-dark-grey font-bold leading-6 tracking-[0.75px]">
                {cinemas.length} Result
              </div>
            </div>

            {/* Cinema List */}
            <div className="w-full flex flex-col md:flex-row justify-start gap-5">
              {cinemas
                .slice(startIndex, startIndex + 4)
                .map((cinema, index) => (
                  <div
                    key={index}
                    className="w-[327px] md:w-[180px] lg:w-[240px] xl:w-[264px] h-[157px] md:h-[120px] lg:h-[157px] border-2 flex justify-center items-center border-grey rounded-[8px]"
                  >
                    <div
                      className="w-[150px] h-[83px] bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${cinema})` }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </form>

        {/* Pagination */}
        <div className="flex flex-col items-center gap-y-10 mt-10">
          <Pagination
            radius={"[8px]"}
            pageLength={Math.ceil(cinemas.length / 4)}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleClick={handlePageClick}
          />
          <Button text={"Book Now"} width={"[188px]"} height={"[56px]"} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MovieDetails;
