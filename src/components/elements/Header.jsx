import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducer/auth";

import tickitzIcon from "../../assets/tickitz-icon-1.svg";
import hamburgerMenu from "../../assets/hamburger-menu.svg";
import closeMenu from "../../assets/close-menu.svg";
import dropdownProfile from "../../assets/dropdown-profile.svg";
import searchIconProfile from "../../assets/search-icon-profile.svg";
import photoProfile from "https://www.svgrepo.com/svg/507445/user-square";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuth } = useSelector((s) => s.auth);
  const { profile } = useSelector((s) => s.user);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);

  // Header Menu
  const user = [
    { nav: "Home", link: "/" },
    { nav: "Movie", link: "/movies" },
    { nav: "Buy Ticket", link: "#" },
  ];

  const admin = [
    { nav: "Dashboard", link: "/admin/dashboard" },
    { nav: "Movie", link: "/admin/movies" },
  ];

  // Sidebar Menu
  const guestSidebar = [
    { nav: "Home", link: "/" },
    { nav: "Movie", link: "/movies" },
    { nav: "Buy Ticket", link: "#" },
    { nav: "Sign In", link: "/login" },
    { nav: "Sign Up", link: "/signup" },
  ];

  const userSidebar = [
    {
      nav: (
        <div
          className="size-16 rounded-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${profile.photo_profile || photoProfile})`,
          }}
        />
      ),
      link: "#",
    },
    { nav: "Home", link: "/" },
    { nav: "Movie", link: "/movies" },
    { nav: "Buy Ticket", link: "#" },
    { nav: "Profile", link: `/profile` },
    { nav: "Sign Out", link: "#" },
  ];

  const adminSidebar = [
    {
      nav: (
        <div
          className="size-16 rounded-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${photoProfile})`,
          }}
        />
      ),
      link: "#",
    },
    { nav: "Home", link: "/" },
    { nav: "Movie", link: "/movies" },
    { nav: "Buy Ticket", link: "#" },
    { nav: "Dashboard", link: "/admin/dashboard" },
    { nav: "Add Movie", link: "/admin/movies" },
    { nav: "Sign Out", link: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[104px] flex bg-white border-b-1 border-grey z-[60]">
      <div className="flex justify-between items-center w-[325px] md:w-[875px] lg:w-[1106px] mx-auto">
        <Link to="/">
          <img src={tickitzIcon} alt="Tickitz icon" />
        </Link>

        {/* Header Menu */}
        <nav
          className={`${
            location.pathname.startsWith("/admin") ? "w-[172px]" : "w-[265px]"
          } hidden md:flex justify-between text-sm`}
        >
          {(location.pathname.startsWith("/admin") ? admin : user).map(
            (e, index) => (
              <Link
                key={index}
                to={e.link}
                onClick={() => setSidebarOpen(false)}
              >
                <div
                  className={`${
                    e.link === "/" && location.pathname === "/"
                      ? "text-white font-semibold bg-blue rounded-md p-2"
                      : e.link !== "/" && location.pathname.startsWith(e.link)
                      ? "text-white font-semibold bg-blue rounded-md p-2"
                      : "p-2"
                  }`}
                >
                  {e.nav}
                </div>
              </Link>
            )
          )}
        </nav>

        {/* Profile */}
        {isAuth ? (
          <nav className="w-[200px] hidden md:flex justify-between items-center">
            <div>Location</div>
            <img src={dropdownProfile} alt="Dropdown profile" />
            <img src={searchIconProfile} alt="Search profile" />

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
                      onClick={() => {
                        setProfileClicked(!profileClicked);
                      }}
                    >
                      <div
                        className="size-[56px] rounded-full bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${
                            profile.photo_profile || photoProfile
                          })`,
                        }}
                      />
                    </button>
                  </div>

                  {/* Profile Clicked */}
                  <div
                    className={`${
                      profileClicked ? "absolute" : "hidden"
                    } text-center left-[-30px] z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1`}
                  >
                    <Link
                      to="/profile"
                      className={`${
                        profile.role === "admin" ? "hidden" : "block"
                      } px-4 py-2 text-sm text-gray-700`}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/admin/dashboard"
                      className={`${
                        profile.role === "admin" ? "block" : "hidden"
                      } px-4 py-2 text-sm text-gray-700`}
                    >
                      Admin
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(logout());
                        navigate("/login");
                      }}
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        ) : (
          // Not Login
          <nav className="w-[197px] hidden md:flex justify-between text-sm">
            <Link
              className="border-1 border-blue rounded-[5px] text-blue px-[23px] py-[14px]"
              to="/login"
            >
              Sign In
            </Link>
            <Link
              className="bg-blue rounded-[5px] text-white px-[23px] py-[14px]"
              to="/signup"
            >
              Sign Up
            </Link>
          </nav>
        )}

        {/* Hamburger Menu */}
        <img
          className="flex md:hidden"
          src={hamburgerMenu}
          alt="Hamburger menu"
          onClick={() => setSidebarOpen(true)}
        />
        {/* Sidebar */}
        <aside
          className={`md:hidden fixed top-0 bottom-0 right-0 w-[225px] ${
            isSidebarOpen ? "translate-x-0" : "translate-x-64"
          } flex-col bg-white shadow-md transition-transform duration-300`}
        >
          <img
            className="absolute top-10 right-6"
            src={closeMenu}
            alt="Close menu"
            onClick={() => setSidebarOpen(false)}
          />
          <ul
            className={`${
              profile.role === "admin" ? "h-[280px]" : "h-60"
            } flex flex-col justify-between items-center mt-32`}
          >
            {/* Sidebar Menu */}
            {(!isAuth
              ? guestSidebar
              : profile.role === "admin"
              ? adminSidebar
              : userSidebar
            ).map((d, index) => (
              <li key={index}>
                <Link
                  to={d.link}
                  onClick={(e) => {
                    setSidebarOpen(false);
                    if (d.nav === "Sign Out") {
                      e.preventDefault();
                      dispatch(logout());
                      navigate("/login");
                    }
                  }}
                >
                  <span
                    className={`${
                      d.link === "/" && location.pathname === "/"
                        ? "text-white font-semibold bg-blue rounded-md p-2"
                        : d.link !== "/" && location.pathname.startsWith(d.link)
                        ? "text-white font-semibold bg-blue rounded-md p-2"
                        : ""
                    }`}
                  >
                    {d.nav}
                  </span>
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
