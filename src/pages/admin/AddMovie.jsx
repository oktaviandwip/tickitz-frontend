import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/elements/Header";
import calendar from "../../assets/calendar-icon.svg";
import dropdown from "../../assets/dropdown.svg";
import addTime from "../../assets/add-time-icon.svg";
import useApi from "../../../utils/useApi";

const AddMovies = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [data, setData] = useState({
    time: [],
    recommended: false,
  });

  // File Handler
  const fileHandler = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 1 * 1024 * 1024;

    if (file) {
      if (file.size > maxFileSize) {
        alert("File size must be under 1 MB!");
        return;
      }

      const tmpdata = { ...data };
      tmpdata["image"] = file;

      let reader = new FileReader();
      reader.onload = () => {
        tmpdata["image"] = reader.result;
        setData(tmpdata);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newData = { ...data };

    if (name === "minutes" && (value < 0 || value > 59)) {
      return;
    }

    if (name === "time") {
      if (screen.width <= 768 && newData.time.length < 8) {
        newData.time.push(value);
      } else if (screen.width > 768 && newData.time.length < 11) {
        newData.time.push(value);
      } else {
        newData = { ...newData };
      }
    } else {
      newData[name] = value;
    }
    setData(newData);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the fields
    const requiredFields = [
      "image",
      "movie_name",
      "category",
      "release_date",
      "hours",
      "minutes",
      "director",
      "casts",
      "synopsis",
      "location",
      "date",
      "time",
    ];

    for (let field of requiredFields) {
      if (
        !data[field] ||
        (Array.isArray(data[field]) && data[field].length === 0)
      ) {
        alert(`Please fill out the ${field.replace("_", " ")} field.`);
        return;
      }
    }

    // Make the form data
    const formData = new FormData();
    for (const key in data) {
      formData.append(`${key}`, data[key]);
    }

    // Send API request
    api({
      method: "POST",
      url: "/admin/movies",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then((_) => {
        alert("Movie added successfully!");
        navigate(`/admin/movies`);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  };

  return (
    <div className="min-w-screen min-h-screen bg-dark-grey bg-opacity-[0.2] py-11">
      <Header userRole={"admin"} />
      <form className="w-[327px] md:w-[732px] h-[2030px] md:h-[1713px] flex flex-col justify-start items-center rounded-2xl bg-white mb-[49px] px-[21px] md:px-[58px] mx-auto">
        <div className="w-full font-bold text-xl text-left leading-[30px] tracking-[0.25px] mt-[52px]">
          Add New Movie
        </div>
        <label className="flex flex-col justify-center items-center w-full cursor-pointer">
          <div
            className="w-40 h-60 my-6 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${
                data.image ||
                "https://www.svgrepo.com/show/522152/image-picture.svg"
              })`,
            }}
          />
          <div className="relative w-36 h-10 bg-blue rounded-md flex justify-center items-center text-white">
            Upload Image
            <input
              type="file"
              id="upload-image"
              className="absolute top-0 w-full bg-transparent outline-none z-20 opacity-0"
              onChange={fileHandler}
            />
          </div>
        </label>

        {/* Movie Name */}
        <div className={`w-full h-[97px] flex flex-col justify-between mt-6`}>
          <div className="leading-[20px] text-semiblack">Movie Name</div>
          <div
            className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-5 md:px-9`}
          >
            <input
              name="movie_name"
              type="text"
              value={data.movie}
              className={`relative bg-transparent w-full h-[64px] outline-none`}
              placeholder="Enter movie name"
              onChange={handleChange}
              maxLength={255}
              required
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
              onChange={handleChange}
              maxLength={255}
              required
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="relative flex flex-col md:flex-row justify-between items-center w-full">
          {/* Release Date */}
          <div className="absolute top-[87px] left-[220px] flex justify-between">
            <img src={dropdown} alt="dropdown icon" />
          </div>
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
                onChange={handleChange}
                value={data.release_date || "mm/dd/yyyy"}
                required
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
                    onChange={handleChange}
                    required
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
                    onChange={handleChange}
                    required
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
              onChange={handleChange}
              maxLength={255}
              required
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
              onChange={handleChange}
              maxLength={255}
              required
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
          onChange={handleChange}
          required
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
              onChange={handleChange}
              maxLength={255}
              required
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="relative w-full flex flex-col md:flex-row mt-6">
          {/* Date */}
          <div>
            <div className="absolute top-[50px] left-6 w-[220px] flex justify-between">
              <img src={calendar} alt="calendar icon" className="z-30" />
              <img src={dropdown} alt="dropdown icon" className="z-10" />
            </div>
            <label htmlFor="date" className="flex leading-5 mb-3">
              Set Date & Time
            </label>
            <div className="w-full h-14 bg-[#EFF0F6] rounded-md">
              <input
                name="date"
                type="date"
                id="date"
                value={data.date || "mm/dd/yyyy"}
                className="relative w-[270px] bg-transparent outline-none pl-[66px] pr-6 pt-[14px] z-20"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Recommended */}
          <div className="relative md:ml-6 mt-6 md:mt-0">
            <div className="absolute top-[57px] left-[227px] md:left-[80px]">
              <img src={dropdown} alt="dropdown icon" className="z-10" />
            </div>
            <label htmlFor="recommended" className="flex leading-5 mb-3">
              Recommended
            </label>
            <div className="w-full md:w-[120px] h-14 bg-[#EFF0F6] rounded-md">
              <select
                name="recommended"
                id="recommended"
                className="relative w-[245px] md:w-[100px] h-14 bg-transparent outline-none pl-8 z-20 appearance-none"
                onChange={handleChange}
                value={data.recommended}
                required
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
            <img src={addTime} alt="Add time icon" />
            <input
              name="time"
              type="time"
              value={data.newTime}
              className="absolute size-10 opacity-0"
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 md:grid-cols-11 gap-3">
            {data.time.map((t, index) => (
              <div key={index}>{t}</div>
            ))}
          </div>
        </div>
        <div className="w-full border-t-1 border-[#E6EAF0] my-6"></div>

        {/* Submit Button */}
        <button
          type="submit"
          value="submit"
          className={`w-full h-[56px] bg-blue rounded-md flex justify-center items-center text-sm text-white leading-6 tracking-[0.75px] transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300`}
          onClick={handleSubmit}
        >
          Save Movie
        </button>
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

export default AddMovies;
