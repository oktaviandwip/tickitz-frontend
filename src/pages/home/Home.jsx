import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/elements/Header";
import Footer from "../../components/elements/Footer";
import Advantage from "../../components/home/Advantage";
import Movie from "../../components/home/Movie";
import Title from "../../components/home/Title";
import Newsletter from "../../components/home/Newsletter";
import Arrow from "../../components/home/Arrow";

import jhonWick3 from "../../assets/jhon-wick-3.png";
import spiderman from "../../assets/spiderman-homecoming.png";
import lionKing from "../../assets/lion-king.png";
import roblox from "../../assets/roblox.jpg";
import blackWidow from "../../assets/black-widow.svg";
import theWitches from "../../assets/the-witches.svg";
import tenet from "../../assets/tenet.svg";

import guranteed from "../../assets/guaranteed.svg";
import affordable from "../../assets/affordable.svg";
import customerSupport from "../../assets/customer-support.svg";
import rightArrow from "../../assets/blue-arrow-right.svg";
import nextArrow from "../../assets/next-arrow.png";
import nextArrowClicked from "../../assets/next-arrow-clicked.png";
import backArrow from "../../assets/back-arrow.png";
import backArrowClicked from "../../assets/back-arrow-clicked.png";

const Home = () => {
  const [startIndex, setStartIndex] = useState(0);

  // Handle Arrow Click
  const handleArrowClick = (e) => {
    const name = e.currentTarget.getAttribute("data-name");
    console.log(name);
    if (name === "next" && startIndex + 4 < recommended.length) {
      setStartIndex(startIndex + 1);
    }

    if (name === "back" && startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const recommended = [
    {
      image: blackWidow,
      name: "Black Widow",
      genres: ["Action", "Adventure"],
      recommended: false,
      date: "December 2024",
      detail: "/movies/black-widow",
      ticket: "#",
    },

    {
      image: theWitches,
      name: "The Witches",
      genres: ["Comedy", "Adventure"],
      recommended: true,
      date: "January 2024",
      detail: "/movies/the-witches",
      ticket: "#",
    },

    {
      image: tenet,
      name: "Tenet",
      genres: ["Action", "Sci-Fi"],
      recommended: true,
      date: "June 2024",
      detail: "/movies/tenet",
      ticket: "#",
    },

    {
      image: spiderman,
      name: "Spiderman",
      genres: ["Action", "Adventure"],
      recommended: false,
      date: "March 2024",
      detail: "/movies/spiderman-homecoming",
      ticket: "#",
    },
    {
      image: lionKing,
      name: "Lion King",
      genres: ["Drama", "Adventure"],
      recommended: true,
      date: "December 2024",
      detail: "/movies/lion-king",
      ticket: "#",
    },
    {
      image: jhonWick3,
      name: "Jhon Wick 3",
      genres: ["Action", "Adventure"],
      recommended: true,
      date: "November 2024",
      detail: "/movies/jhon-wick-3",
      ticket: "#",
    },
    {
      image: roblox,
      name: "Roblox",
      genres: ["Comedy", "Adventure"],
      recommended: false,
      date: "September 2024",
      detail: "/movies/roblox",
      ticket: "#",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-[51px] w-[375px] md:w-[880px] lg:w-[1106px] mx-auto">
        <div className="mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left w-[320px] md:w-[450px] lg:w-[638px] mb-[19px] md:mb-0">
            <div className="text-lg leading-[34px] tracking-[0.75px] uppercase font-semibold text-blue">
              MOVIE TICKET PURCHASES #1 IN INDONESIA
            </div>
            <div className="text-[32px] md:text-5xl leading-[45px] md:leading-[70px] tracking-[1px] my-[10px]">
              Experience the Magic of Cinema: Book Your Tickets Today
            </div>
            <div className="leading-[32px] tracking-[0.75px] text-dark-grey">
              Sign up and get the ticket with a lot of discount
            </div>
          </div>
          <div className="flex">
            <div className="w-[159px] md:w-[218px] flex flex-col">
              <div
                className="h-[125px] md:h-[170px] mb-3 md:mb-4 rounded-t-[20px] bg-[image:var(--jhonwick3)] bg-top bg-no-repeat bg-cover"
                style={{ "--jhonwick3": `url(${jhonWick3})` }}
              ></div>
              <div
                className="h-[183px] md:h-[250px] rounded-b-[20px] bg-[image:var(--spiderman)] bg-top bg-no-repeat bg-cover"
                style={{ "--spiderman": `url(${spiderman})` }}
              ></div>
            </div>
            <div className="w-[159px] md:w-[218px] flex flex-col ml-[10px] md:ml-[13px]">
              <div
                className="h-[183px] md:h-[250px] mb-3 md:mb-4 rounded-t-[20px] bg-[image:var(--lion-king)] bg-top bg-no-repeat bg-cover"
                style={{ "--lion-king": `url(${lionKing})` }}
              ></div>
              <div
                className="h-[125px] md:h-[170px] rounded-b-[20px] bg-[image:var(--roblox)] bg-top bg-no-repeat bg-cover"
                style={{ "--roblox": `url(${roblox})` }}
              ></div>
            </div>
          </div>
        </div>
        {/* Why Choose Us */}
        <div className="w-[327px] md:w-[768px] lg:w-full h-444 mx-auto">
          <Title
            title={"WHY CHOOSE US"}
            subTitle={"Unleashing the Ultimate Movie Experience"}
          />

          <div className="flex flex-col md:flex-row justify-between w-full">
            <Advantage
              img={guranteed}
              title={"Guaranteed"}
              desc={
                "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet."
              }
            />
            <Advantage
              img={affordable}
              title={"Affordable"}
              desc={
                "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet."
              }
            />
            <Advantage
              img={customerSupport}
              title={"24/7 Customer Support"}
              desc={
                "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet."
              }
            />
          </div>
        </div>

        {/* Recommended Movies */}
        <Title
          title={"MOVIES"}
          subTitle={"Exciting Movies That Should Be Watched Today"}
          position={"center"}
        />

        <div className="whitespace-nowrap overflow-x-scroll">
          <div className="grid grid-cols-4 w-[1000px] md:w-[1106px] pl-1">
            {recommended &&
              recommended.map((e, index) => {
                if (e.recommended) {
                  return (
                    <Movie
                      key={index}
                      image={e.image}
                      name={e.name}
                      genres={e.genres}
                      recommended={e.recommended}
                      detail={e.detail}
                    />
                  );
                }
              })}
          </div>
        </div>

        <Link
          to="/movies"
          className="w-full flex justify-center items-center text-lg text-blue font-bold leading-[34px] mt-6"
        >
          View All
          <div
            className="w-5 h-5 bg-cover bg-center bg-no-repeat ml-2"
            style={{ backgroundImage: `url(${rightArrow})` }}
          ></div>
        </Link>

        {/* Upcoming Movies */}
        <div className="relative flex flex-col md:flex-row items-center">
          <Title
            title={"UPCOMING MOVIES"}
            subTitle={"Exciting Movie Coming Soon"}
            position={null}
          />

          <div className="absolute bottom-[-670px] md:top-20 right-50 md:right-0 flex justify-between w-[147px] z-50">
            <Arrow
              data-name="back"
              arrow={backArrow}
              activeArrow={backArrowClicked}
              handleArrowClick={handleArrowClick}
            />
            <Arrow
              data-name="next"
              arrow={nextArrow}
              activeArrow={nextArrowClicked}
              handleArrowClick={handleArrowClick}
            />
          </div>
        </div>

        <div className="whitespace-nowrap overflow-x-scroll mb-[125px] md:mb-0">
          <div className="grid grid-cols-4 w-[1000px] md:w-[1106px] pl-1">
            {recommended &&
              recommended.slice(startIndex, startIndex + 4).map((e, index) => {
                return (
                  <Movie
                    key={index}
                    image={e.image}
                    name={e.name}
                    genres={e.genres}
                    recommended={e.recommended}
                    upcoming={true}
                    date={e.date}
                    detail={e.detail}
                  />
                );
              })}
          </div>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </>
  );
};

export default Home;
