import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tickitzIcon from "/tickitz-icon.svg";
import hamburgerMenu from "../assets/hamburger-menu.svg";
import closeMenu from "../assets/close-menu.svg";
import dropdownProfile from "../assets/dropdown-profile.svg";
import searchIconProfile from "../assets/search-icon-profile.svg";
import photoProfile from "../assets/photo-profile.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducer/user";

const Header = ({ userRole }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((s) => s.users);
  const { role } = useSelector((s) => s.users);
  const { user_id } = useSelector((s) => s.users);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseClick = () => {
    setSidebarOpen(false);
  };

  const user = [
    {
      nav: "Home",
      link: "/",
    },

    {
      nav: "Movie",
      link: "/movies",
    },

    {
      nav: "Buy Ticket",
      link: "#",
    },
  ];

  const admin = [
    {
      nav: "Dashboard",
      link: "/admin/dashboard",
    },

    {
      nav: "Movie",
      link: "/admin/movies",
    },
  ];

  const guestSidebar = [
    {
      nav: "Home",
      link: "/",
    },

    {
      nav: "Movie",
      link: "/movies",
    },

    {
      nav: "Buy Ticket",
      link: "#",
    },

    {
      nav: "Sign In",
      link: "/sign-in",
    },

    {
      nav: "Sign Up",
      link: "/sign-up",
    },
  ];

  const userSidebar = [
    {
      nav: <img src={photoProfile} alt="photo profile"></img>,
      link: "#",
    },

    {
      nav: "Home",
      link: "/",
    },

    {
      nav: "Movie",
      link: "/movies",
    },

    {
      nav: "Buy Ticket",
      link: "#",
    },

    {
      nav: "Profile",
      link: `/profile/${user_id}`,
    },

    {
      nav: "Sign Out",
      link: "#",
    },
  ];

  const adminSidebar = [
    {
      nav: <img src={photoProfile} alt="photo profile"></img>,
      link: "#",
    },
    {
      nav: "Home",
      link: "/",
    },

    {
      nav: "Movie",
      link: "/movies",
    },

    {
      nav: "Buy Ticket",
      link: "#",
    },

    {
      nav: "Dashboard",
      link: "/admin/dashboard",
    },

    {
      nav: "Add Movie",
      link: "/admin/movies",
    },

    {
      nav: "Sign Out",
      link: "#",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white h-[104px] border-b-1 border-grey flex z-[60]">
      <div className="flex w-[1106px] justify-between items-center mx-6 xl:mx-auto">
        <Link to="/">
          <img src={tickitzIcon} alt="tickitz icon" />
        </Link>
        <nav
          className={`${
            userRole === "admin" ? "w-[172px]" : "w-[265px]"
          } hidden md:flex justify-between text-sm`}
        >
          {(userRole == "admin" ? admin : user).map((e, index) => (
            <Link key={index} to={e.link} className="relative group">
              <div
                className={`${
                  window.location.href === "http://localhost:5173" + e.link ||
                  window.location.href ===
                    "http://localhost:5173" + e.link + "/add"
                    ? "text-blue"
                    : ""
                }`}
              >
                {e.nav}
              </div>
              <div className="absolute top-[110%] w-full h-[3px] bg-blue rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          ))}
        </nav>
        {isAuth ? (
          <nav className="w-[200px] hidden md:flex justify-between items-center">
            <div>Location</div>
            <img src={dropdownProfile} alt="dropdown profile" />
            <img src={searchIconProfile} alt="search profile" />

            {/* Photo Profile */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center">
                <div className="relative">
                  <div>
                    <button
                      type="button"
                      className={`relative flex max-w-xs items-center rounded-full ${
                        profileClicked ? "ring-2 ring-black" : ""
                      }`}
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => {
                        setProfileClicked(!profileClicked);
                      }}
                    >
                      <img
                        className="size-[56px] rounded-full"
                        src={photoProfile}
                        alt=""
                      />
                    </button>
                  </div>
                  <div
                    className={`${
                      profileClicked ? "absolute" : "hidden"
                    } text-center left-[-30px] z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <Link
                      to={`/profile/${user_id}`}
                      className={`${
                        role === "admin" ? "hidden" : "block"
                      } px-4 py-2 text-sm text-gray-700`}
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/admin/dashboard"
                      className={`${
                        role === "admin" ? "block" : "hidden"
                      } px-4 py-2 text-sm text-gray-700`}
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Admin
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(logout());
                        navigate("/sign-in");
                      }}
                    >
                      Sign Out
                    </Link>{" "}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="w-[197px] hidden md:flex justify-between text-sm">
            <Link
              className="border-1 border-blue rounded-[5px] text-blue px-[23px] py-[14px]"
              to="/sign-in"
            >
              Sign In
            </Link>
            <Link
              className="bg-blue rounded-[5px] text-white px-[23px] py-[14px]"
              to="/sign-up"
            >
              Sign Up
            </Link>
          </nav>
        )}

        <img
          className="hamburger-menu flex md:hidden"
          src={hamburgerMenu}
          alt="hamburger menu"
          onClick={handleMenuClick}
        />
        <aside
          className={`sidebar fixed top-0 bottom-0 right-0 w-[200px] ${
            isSidebarOpen ? "translate-x-0" : "translate-x-64"
          } flex-col bg-white shadow-md transition-transform duration-300`}
        >
          <img
            className="close-menu absolute top-10 right-6"
            src={closeMenu}
            alt="close menu"
            onClick={handleCloseClick}
          />
          <ul
            className={`${
              role === "admin" ? "h-[280px]" : "h-60"
            } flex flex-col justify-between items-center mt-32`}
          >
            {(!isAuth
              ? guestSidebar
              : role === "admin"
              ? adminSidebar
              : userSidebar
            ).map((e, index) => (
              <li key={index}>
                <Link
                  to={e.link}
                  onClick={(event) => {
                    if (e.nav === "Sign Out") {
                      event.preventDefault();
                      dispatch(logout());
                      navigate("/sign-in");
                    }
                  }}
                >
                  {e.nav}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </header>
  );
};

export default Header;
