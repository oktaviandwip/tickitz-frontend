import { useState, useEffect } from "react";
import Header from "../components/Header";
import calendar from "../assets/calendar-icon.svg";
import dropdown from "../assets/dropdown.svg";
import addTime from "../assets/add-time-icon.svg";
import useApi from "../../utils/useApi";
import { useNavigate, useParams } from "react-router-dom";

const EditMovies = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    image: "https://www.svgrepo.com/show/522152/image-picture.svg",
    movie_name: "",
    category: "",
    release_date: "",
    hours: 0,
    minutes: 0,
    director: "",
    casts: "",
    synopsis: "",
    location: "",
    date: "",
    time: [],
    recommended: false,
  });

  useEffect(() => {
    api({
      method: "GET",
      url: `/admin/movies/${id}`,
    })
      .then((res) => {
        const data = res.data.rows[0];
        console.log(data);
        data.release_date = data.release_date.substring(0, 10);
        data.date = data.date.substring(0, 10);
        data.time = data.time.map((t) => t.substring(0, 5));
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  const handleChange = (e) => {
    let newData = { ...data };

    if (e.target.name === "time") {
      if (screen.width <= 768 && newData.time.length < 8) {
        newData.time.push(e.target.value);
      } else if (screen.width > 768 && newData.time.length < 11) {
        newData.time.push(e.target.value);
      } else {
        newData = { ...newData };
      }
    } else {
      newData[e.target.name] = e.target.value;
    }
    setData(newData);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      formData.append(`${key}`, data[key]);
    }
    api({
      method: "PUT",
      url: `/admin/movies/${id}`,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then((res) => {
        alert("Movie updated successfully!");
        navigate(`/admin/movies`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-w-screen min-h-screen bg-dark-grey bg-opacity-[0.2] py-11">
      <Header userRole={"admin"} />
      <div className="w-[327px] md:w-[732px] h-[2030px] md:h-[1713px] flex flex-col justify-start items-center rounded-2xl bg-white mb-[49px] px-[21px] md:px-[58px] mx-auto">
        <form className="w-full">
          <div className="w-full font-bold text-xl text-left leading-[30px] tracking-[0.25px] mt-[52px]">
            Update Movie
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <img
              className="h-60 w-40 text-gray-300 my-6"
              src={data.image}
              alt="image"
            />
            <div className="relative w-36 h-8 bg-blue rounded-md flex justify-center items-center text-white">
              Upload Image
              <input
                type="file"
                id="upload-image"
                className="absolute top-0 w-full bg-transparent outline-none z-20 opacity-0"
                onChange={fileHandler}
              />
            </div>
          </div>

          {/* Movie Name */}
          <div className={`w-full h-[97px] flex flex-col justify-between mt-6`}>
            <div className="leading-[20px] text-semiblack">Movie Name</div>
            <div
              className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-9`}
            >
              <input
                name="movie_name"
                type="text"
                value={data.movie_name}
                className={`relative bg-transparent w-full h-[64px] outline-none`}
                placeholder="Enter movie name"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className={`w-full h-[97px] flex flex-col justify-between mt-6`}>
            <div className="leading-[20px] text-semiblack">Category</div>
            <div
              className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-9`}
            >
              <input
                name="category"
                type="text"
                value={data.category}
                className={`relative bg-transparent w-full h-[64px] outline-none`}
                placeholder="Enter category"
                onChange={handleChange}
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
                className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-9`}
              >
                <input
                  name="release_date"
                  type="date"
                  className={`relative bg-transparent w-full h-[64px] outline-none`}
                  onChange={handleChange}
                  value={
                    data.release_date || new Date().toISOString().slice(0, 10)
                  }
                  required
                />
              </div>
            </div>

            {/* Hour / Minutes */}
            <div className="h-[97px]">
              <div className="mt-6 md:mt-[10px]">
                Duration (hours / minutes)
              </div>

              <div className="flex flex-col md:flex-row md:space-x-6 mt-[-13px]">
                {/* Hours */}
                <div
                  className={`w-[285px] md:w-[135px] h-[97px] flex flex-col justify-between mt-6`}
                >
                  <div
                    className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-7`}
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
                    className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-7`}
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
              className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-9`}
            >
              <input
                name="director"
                type="text"
                value={data.director}
                className={`relative bg-transparent w-full h-[64px] outline-none`}
                placeholder="Enter director name"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Casts */}
          <div className={`w-full h-[97px] flex flex-col justify-between mt-6`}>
            <div className="leading-[20px] text-semiblack">Casts</div>
            <div
              className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-9`}
            >
              <input
                name="casts"
                type="text"
                value={data.casts}
                className={`relative bg-transparent w-full h-[64px] outline-none`}
                placeholder="Enter casts"
                onChange={handleChange}
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
            className="w-full h-[207px] leading-[20px] bg-lighter-grey border-1 border-grey outline-none rounded px-9 py-5"
            placeholder="Enter synopsis"
            onChange={handleChange}
            required
          />
          {/* Location */}
          <div className={`w-full h-[97px] flex flex-col justify-between mt-6`}>
            <div className="leading-[20px] text-semiblack">Location</div>
            <div
              className={`w-full h-[64px] leading-[20px] bg-lighter-grey border-1 border-grey rounded px-9`}
            >
              <input
                name="location"
                type="text"
                value={data.location}
                className={`relative bg-transparent w-full h-[64px] outline-none`}
                placeholder="Enter location"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Date & Time */}
          <div className="relative w-full flex flex-col md:flex-row mt-6">
            {/* Date */}
            <div>
              <div className="absolute top-[50px] left-6 w-[220px] md:w-[160px] lg:w-[234px] flex justify-between">
                <img src={calendar} alt="calendar icon" className="z-30" />
                <img src={dropdown} alt="dropdown icon" className="z-10" />
              </div>
              <label htmlFor="date" className="flex leading-5 mb-3">
                Set Date & Time
              </label>
              <div className="w-full md:w-[200px] lg:w-[284px] h-14 bg-[#EFF0F6] rounded-md">
                <input
                  name="date"
                  type="date"
                  id="date"
                  value={data.date || new Date().toISOString().slice(0, 10)}
                  className="relative w-[270px] md:w-[210px] lg:w-full bg-transparent outline-none pl-[60px] xl:pl-[66px] pr-6 pt-[14px] z-20"
                  onChange={handleChange}
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
              <img src={addTime} alt="add time icon" />
              <input
                name="time"
                type="time"
                value={data.newTime}
                className="absolute size-10 opacity-0"
                onChange={handleChange}
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
            onClick={handleUpdate}
          >
            Update Movie
          </button>
          <style>
            {`
                input[type="date"]::-webkit-calendar-picker-indicator {
                  opacity: 0;
                }`}
          </style>
        </form>
      </div>
    </div>
  );
};

export default EditMovies;
