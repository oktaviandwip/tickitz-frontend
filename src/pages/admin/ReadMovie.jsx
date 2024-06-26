import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/elements/Header";
import calendar from "../../assets/calendar-icon.svg";
import useApi from "../../../utils/useApi";

const EditMovies = () => {
  const api = useApi();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  // Get the Movie Data
  useEffect(() => {
    api({
      method: "GET",
      url: `/admin/movies/${id}`,
    })
      .then((res) => {
        const data = res.data.rows[0];
        data.release_date = data.release_date.substring(0, 10);
        data.date = data.date.substring(0, 10);
        data.time = data.time.map((t) => t.substring(0, 5));
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle Button Click
  const handleClick = (action) => {
    if (action === "edit") {
      navigate(`/admin/movies/edit/${id}`);
    } else if (action === "back") {
      navigate(`/admin/movies`);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-dark-grey bg-opacity-[0.2] py-11">
      <Header userRole={"admin"} />
      <form className="w-[327px] md:w-[732px] h-[2030px] md:h-[1713px] flex flex-col justify-start items-center rounded-2xl bg-white mb-[49px] px-[21px] md:px-[58px] mx-auto">
        <div className="w-full font-bold text-xl text-left leading-[30px] tracking-[0.25px] mt-[52px]">
          View Movie
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div
            className="w-40 h-60 my-6 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${
                data.image ||
                "https://www.svgrepo.com/show/522152/image-picture.svg"
              })`,
            }}
          />
        </div>

        {/* Movie Name */}
        <div className={`w-full h-[97px] flex flex-col justify-between mt-6`}>
          <div className="leading-[20px] text-semiblack">Movie Name</div>
          <div
            className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-5 md:px-9`}
          >
            <input
              name="movie_name"
              type="text"
              value={data.movie_name}
              className={`relative bg-transparent w-full h-[64px] outline-none`}
              placeholder="Enter movie name"
              readOnly
            />
          </div>
        </div>

        {/* Category */}
        <div className={`w-full h-[97px] flex flex-col justify-between mt-6`}>
          <div className="leading-[20px] text-semiblack">Category</div>
          <div
            className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-5 md:px-9`}
          >
            <input
              name="category"
              type="text"
              value={data.category}
              className={`relative bg-transparent w-full h-[64px] outline-none`}
              placeholder="Enter category"
              readOnly
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="relative flex flex-col md:flex-row justify-between items-center w-full">
          {/* Release Date */}
          <div
            className={`w-[285px] md:w-[275px] h-[97px] flex flex-col justify-between mt-6`}
          >
            <div className="leading-[20px] text-semiblack">Release Date</div>
            <div
              className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-5 md:px-9`}
            >
              <input
                name="release_date"
                type="date"
                className={`relative bg-transparent w-full h-[64px] outline-none`}
                value={
                  data.release_date || new Date().toISOString().slice(0, 10)
                }
                readOnly
              />
            </div>
          </div>

          {/* Hour / Minutes */}
          <div className="h-[97px]">
            <div className="mt-6 md:mt-[10px]">Duration (hours / minutes)</div>

            <div className="flex flex-col md:flex-row md:space-x-6 mt-[-13px]">
              {/* Hours */}
              <div
                className={`w-[285px] md:w-[135px] h-[97px] flex flex-col justify-between mt-6`}
              >
                <div
                  className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-5 md:px-7`}
                >
                  <input
                    name="hours"
                    type="number"
                    value={data.hours}
                    min="0"
                    className={`relative bg-transparent w-full h-[64px] outline-none`}
                    placeholder={"hours"}
                    readOnly
                  />
                </div>
              </div>

              {/* Minutes */}
              <div
                className={`w-[285px] md:w-[135px] h-[97px] flex flex-col justify-between mt-[-24px] md:mt-6`}
              >
                <div
                  className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-5 md:px-7`}
                >
                  <input
                    name="minutes"
                    type="number"
                    value={data.minutes}
                    min="0"
                    max="59"
                    className={`relative bg-transparent w-full h-[64px] outline-none`}
                    placeholder={"minutes"}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Director Name */}
        <div
          className={`w-full h-[97px] flex flex-col justify-between mt-32 md:mt-6`}
        >
          <div className="leading-[20px] text-semiblack">Director Name</div>
          <div
            className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-5 md:px-9`}
          >
            <input
              name="director"
              type="text"
              value={data.director}
              className={`relative bg-transparent w-full h-[64px] outline-none`}
              placeholder="Enter director name"
              readOnly
            />
          </div>
        </div>
        {/* Casts */}
        <div className={`w-full h-[97px] flex flex-col justify-between mt-6`}>
          <div className="leading-[20px] text-semiblack">Casts</div>
          <div
            className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-5 md:px-9`}
          >
            <input
              name="casts"
              type="text"
              value={data.casts}
              className={`relative bg-transparent w-full h-[64px] outline-none`}
              placeholder="Enter casts"
              readOnly
            />
          </div>
        </div>
        {/* Synopsis */}
        <div className="w-full leading-[20px] text-semiblack text-left mt-6 mb-3">
          Synopsis
        </div>
        <textarea
          name="synopsis"
          value={data.synopsis}
          className="w-full h-[207px] leading-[20px] bg-lighter-grey border-1 border-grey outline-none rounded px-5 md:px-9 py-5"
          placeholder="Enter synopsis"
          readOnly
        />
        {/* Location */}
        <div className={`w-full h-[97px] flex flex-col justify-between mt-6`}>
          <div className="leading-[20px] text-semiblack">Location</div>
          <div
            className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-5 md:px-9`}
          >
            <input
              name="location"
              type="text"
              value={data.location}
              className={`relative bg-transparent w-full h-[64px] outline-none`}
              placeholder="Enter location"
              readOnly
            />
          </div>
        </div>
        {/* Date & Time */}
        <div className="relative w-full flex flex-col md:flex-row mt-6">
          {/* Date */}
          <div>
            <div className="absolute top-[50px] left-6 w-[220px] flex justify-between">
              <img src={calendar} alt="calendar icon" className="z-30" />
            </div>
            <label htmlFor="date" className="flex leading-5 mb-3">
              Set Date & Time
            </label>
            <div className="w-full h-14 bg-[#EFF0F6] rounded-md">
              <input
                name="date"
                type="date"
                id="date"
                value={data.date || new Date().toISOString().slice(0, 10)}
                className="relative w-[270px] bg-transparent outline-none pl-[66px] pr-6 pt-[14px] z-20"
                readOnly
              />
            </div>
          </div>

          {/* Recommended */}
          <div className="relative md:ml-6 mt-6 md:mt-0">
            <label htmlFor="recommended" className="flex leading-5 mb-3">
              Recommended
            </label>
            <div className="w-full md:w-[120px] h-14 bg-[#EFF0F6] rounded-md">
              <select
                name="recommended"
                id="recommended"
                className="relative w-[245px] md:w-[100px] h-14 bg-transparent outline-none pl-8 z-20 appearance-none"
                value={data.recommended}
                readOnly
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="w-full h-[30px] flex items-center space-x-[30px] text-sm mt-6">
          <div className="relative flex items-center">
            <div className="font-bold">Time:</div>

            <input
              name="time"
              type="time"
              value={data.newTime}
              className="absolute size-10 opacity-0"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 md:grid-cols-11 gap-3">
            {data.time &&
              data.time.map((t, index) => <div key={index}>{t}</div>)}
          </div>
        </div>
        <div className="w-full border-t-1 border-[#E6EAF0] my-6"></div>

        {/* Edit Button */}
        <div className="flex justify-between w-full">
          <div
            className={`w-[130px] md:w-[300px] h-[56px] bg-blue rounded-md flex justify-center items-center text-sm text-white font-semibold transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300`}
            onClick={() => handleClick("edit")}
          >
            Update Movie
          </div>
          <div
            className={`w-[130px] md:w-[300px] h-[56px] bg-dark-grey rounded-md flex justify-center items-center text-sm text-white font-semibold transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300`}
            onClick={() => handleClick("back")}
          >
            Back
          </div>
        </div>

        <style>
          {`
          input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: 0;
          }`}
        </style>
      </form>
    </div>
  );
};

export default EditMovies;
