import Header from "../components/Header";
import Footer from "../components/Footer";
import Advantage from "../components/Home/Advantage";
import Movie from "../components/Home/Movie";
import Title from "../components/Home/Title";
import Newsletter from "../components/Home/Newsletter";

import jhonWick3 from "../assets/jhon-wick-3.png";
import spiderman from "../assets/spiderman-homecoming.png";
import lionKing from "../assets/lion-king.png";
import roblox from "../assets/roblox.jpg";
import blackWidow from "../assets/black-widow.svg";
import theWitches from "../assets/the-witches.svg";
import tenet from "../assets/tenet.svg";

import guranteed from "../assets/guaranteed.svg";
import affordable from "../assets/affordable.svg";
import customerSupport from "../assets/customer-support.svg";
import rightArrow from "../assets/blue-arrow-right.svg";
import nextArrow from "../assets/next-arrow.png";
import nextArrowClicked from "../assets/next-arrow-clicked.png";
import backArrow from "../assets/back-arrow.png";
import backArrowClicked from "../assets/back-arrow-clicked.png";
import Arrow from "../components/Home/Arrow";

const home = () => {
  const recommended = [
    {
      image: blackWidow,
      name: "Black Widow",
      genres: ["Action", "Adventure"],
      recommended: false,
      date: "December 2024",
      detail: "#",
      ticket: "#",
    },

    {
      image: theWitches,
      name: "The Witches",
      genres: ["Comedy", "Adventure"],
      recommended: true,
      date: "January 2024",
      detail: "#",
      ticket: "#",
    },

    {
      image: tenet,
      name: "Tenet",
      genres: ["Action", "Sci-Fi"],
      recommended: true,
      date: "June 2024",
      detail: "#",
      ticket: "#",
    },

    {
      image: spiderman,
      name: "Spiderman",
      genres: ["Action", "Adventure"],
      recommended: false,
      date: "March 2024",
      detail: "/spiderman-homecoming",
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

        <div className="whitespace-nowrap overflow-x-auto">
          <div className="grid grid-cols-4 grid-flow-col w-[1000px] md:w-[1106px]">
            {recommended &&
              recommended.slice(0, 4).map((e, index) => {
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
              })}
          </div>
        </div>

        <div className="w-full flex justify-center items-center text-lg text-blue font-bold leading-[34px] mt-6">
          View All
          <div
            className="w-5 h-5 bg-[image:var(--right-arrow)] bg-cover bg-center bg-no-repeat ml-2"
            style={{ "--right-arrow": `url(${rightArrow})` }}
          ></div>
        </div>

        {/* Upcoming Movies */}
        <div className="flex items-center">
          <Title
            title={"UPCOMING MOVIES"}
            subTitle={"Exciting Movie Coming Soon"}
            position={null}
          />

          <div className="hidden md:flex justify-between w-[170px] mt-[50px] ">
            <Arrow arrow={backArrow} activeArrow={backArrowClicked} />
            <Arrow arrow={nextArrow} activeArrow={nextArrowClicked} />
          </div>
        </div>

        <div className="whitespace-nowrap overflow-x-auto">
          <div className="grid grid-cols-4 grid-rows-1 w-[1000px] md:w-[1106px]">
            {recommended &&
              recommended.slice(0, 4).map((e, index) => {
                return (
                  <Movie
                    key={index}
                    image={e.image}
                    name={e.name}
                    genres={e.genres}
                    recommended={false}
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

export default home;
