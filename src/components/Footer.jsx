import { Link } from "react-router-dom";
import tickitzIcon2 from "/tickitz-icon-2.svg";
import ebvId from "../assets/ebv-id.svg";
import cineOne21 from "../assets/CineOne21.svg";
import hiflix from "../assets/hiflix.svg";
import facebookIcon from "../assets/facebook-icon.svg";
import instagramIcon from "../assets/instagram-icon.svg";
import twitterIcon from "../assets/twitter-icon.svg";
import youtubeIcon from "../assets/youtube-icon.svg";

const Footer = () => {
  return (
    <footer className="flex w-[100%] h-[800px] md:h-[700px] lg:h-[439px] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-8 w-[327px] sm:w-[640px] md:w-[768px] lg:w-[1106px] lg:h-[250px] mx-auto mt-24">
        <div className="md:ml-8">
          <img className="-mt-3" src={tickitzIcon2} alt="tickitz icon" />
          <div className="w-[284px] text-darkest-grey tracking-wide leading-8 mt-4">
            Stop waiting in line. Buy tickets conveniently, watch movies
            quietly.
          </div>
        </div>
        <div className="lg:ml-32">
          <div className="font-bold tracking-wide">Explore</div>
          <nav className="grid grid-cols-3 md:flex md:flex-col justify-between h-[114px] text-darkest-grey text-sm tracking-wide mt-7">
            <Link to="#">Cinemas</Link>
            <Link to="#">Movies List</Link>
            <Link to="#">My Ticket</Link>
            <Link to="#">Notification</Link>
          </nav>
        </div>
        <div className="md:ml-8">
          <div className="font-bold tracking-wide mb-6">Our Sponsor</div>
          <nav className="flex flex-row md:flex-col w-[327px] md:w-[100%] justify-between h-[30px] md:h-[114px] text-darkest-grey tracking-wide md:mt-7">
            <img
              className="w-[81px] md:w-[122px] md:mb-6"
              src={ebvId}
              alt="ebv.d"
            />
            <img
              className="w-[106px] md:w-[174px] md:mb-6"
              src={cineOne21}
              alt="cineone21"
            />
            <img className="w-[77px] md:w-[80px]" src={hiflix} alt="hiflix" />
          </nav>
        </div>
        <div>
          <div className="font-bold tracking-wide mt-8 md:mt-0">Follow Us</div>
          <nav className="flex flex-row md:flex-col md:justify-between w-[100%] h-[30px] md:h-[114px] text-darkest-grey tracking-wide mt-7">
            <Link className="flex items-center mb-6" to="#">
              <img
                className="mr-9 md:mr-0"
                src={facebookIcon}
                alt="facebook icon"
              />
              <div className="hidden md:block text-sm ml-4">
                Tickitz Cinema id
              </div>
            </Link>
            <Link className="flex items-center mb-6" to="#">
              <img
                className="mr-9 md:mr-0"
                src={instagramIcon}
                alt="instagram icon"
              />
              <div className="hidden md:block text-sm ml-4">tickitz.id</div>
            </Link>
            <Link className="flex items-center mb-6" to="#">
              <img
                className="mr-9 md:mr-0"
                src={twitterIcon}
                alt="twitter icon"
              />
              <div className="hidden md:block text-sm ml-4">tickitz.id</div>
            </Link>
            <Link className="flex items-center mb-6" to="#">
              <img
                className="mr-9 md:mr-0"
                src={youtubeIcon}
                alt="youtube icon"
              />
              <div className="hidden md:block text-sm ml-4">
                Tickitz Cinema id
              </div>
            </Link>
          </nav>
        </div>
        <div className="text-sm md:text-left lg:text-center text-darkest-grey md:col-span-1 lg:col-span-4 md:mt-4 lg:mt-12 md:ml-8">
          © 2020 Tickitz. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
