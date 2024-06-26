import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../store/reducer/user";

import Header from "../../components/elements/Header";
import Footer from "../../components/elements/Footer";
import OrderHistory from "../../components/profile/OrderHistory";
import OrderHistoryMobile from "../../components/profile/OrderHistoryMobile";
import AccountSettings from "../../components/profile/AccountSettings";
import AccountSettingsMobile from "../../components/profile/AccountSettingsMobile";

import threeDots from "../../assets/three-dots.svg";
import loyaltyPoints from "../../assets/loyalty-points.svg";
import loyaltyProgress from "../../assets/loyalty-progress.svg";
import photoProfile from "../../assets/photo-profile.svg";
import useApi from "../../../utils/useApi";

const Profile = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((s) => s.user);

  const [data, setData] = useState({});
  const [activePage, setActivePage] = useState("account settings");
  const [isShowingDetail1, setIsShowingDetail1] = useState(false);
  const [isShowingDetail2, setIsShowingDetail2] = useState(false);
  const [isShowingDetail3, setIsShowingDetail3] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [showPw, setShowPw] = useState({
    password: false,
    passwordMobile: false,
    confirmPassword: false,
    confirmPasswordMobile: false,
  });

  // Close the form mobile if the screen wider
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 771) {
        setEditProfile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Get Profile Data
  useEffect(() => {
    api({
      method: "GET",
      url: `/users`,
    })
      .then(({ data }) => {
        const newData = data.rows[0];
        newData.password = "";
        setData(newData);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }, []);

  // Show Password
  const showPassword = (field) => {
    setShowPw(() => ({
      ...showPw,
      [field]: !showPw[field],
    }));
  };

  // File Handler
  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const tmpdata = { ...data };
      tmpdata["photo_profile"] = file;

      let reader = new FileReader();
      reader.onload = () => {
        tmpdata["photo_profile"] = reader.result;
        setData(tmpdata);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Change
  const handleChange = (e) => {
    // Assure the input are numbers
    if (e.target.name === "phone_number" && isNaN(e.target.value)) return;

    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
  };

  // Handle Update
  const handleUpdate = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (data.password !== data.confirm_password) {
      alert("Passwords are not the same!");
      return;
    }

    // Create FormData
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    // Send API request
    api({
      method: "PUT",
      url: `/users`,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then(({ data }) => {
        alert("Profile updated successfully!");
        dispatch(getProfile(data.rows[0]));
        navigate("/");
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  };

  // Header Mobile
  const mobileTabs = [
    { name: "Details Account", page: "account settings" },
    { name: "Order History", page: "order history" },
  ];

  const getMobileTabClass = (page) =>
    `border-b-2 py-[17px] ${
      activePage === page ? "border-blue" : "border-white text-darkest-grey"
    }`;

  return (
    <div>
      <div className="w-full min-h-screen bg-dark-grey bg-opacity-[0.2] py-11">
        <Header />
        <main className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-stretch w-[375px] md:w-[771px] lg:w-[1021px] xl:w-[1226px] mx-auto mt-14">
          {/* Header Mobile */}
          <div className="flex fixed top-[104px] md:hidden items-center w-full h-16 text-base bg-white mb-14 md:mb-0 z-40">
            <div className="flex w-[300px] md:w-[50%] lg:w-[40%] justify-between mx-auto">
              {mobileTabs.map((tab) => (
                <div
                  key={tab.page}
                  className={getMobileTabClass(tab.page)}
                  onClick={() => {
                    setActivePage(tab.page);
                    setIsShowingDetail1(false);
                    setIsShowingDetail2(false);
                    setIsShowingDetail3(false);
                  }}
                >
                  {tab.name}
                </div>
              ))}
            </div>
          </div>
          {/* Form Mobile */}
          <AccountSettingsMobile
            data={data}
            showPw={showPw}
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            showPassword={showPassword}
          />

          {/* Order History Mobile */}
          <OrderHistoryMobile
            activePage={activePage}
            isShowingDetail1={isShowingDetail1}
            isShowingDetail2={isShowingDetail2}
            isShowingDetail3={isShowingDetail3}
            setIsShowingDetail1={setIsShowingDetail1}
            setIsShowingDetail2={setIsShowingDetail2}
            setIsShowingDetail3={setIsShowingDetail3}
          />

          {/* User */}
          <div
            className={`${
              activePage === "account settings" && screenWidth < 768
                ? "flex"
                : "hidden"
            } w-[328px] h-[831px] md:h-[783px] flex md:flex flex-col justify-center items-center bg-white rounded-[24px]`}
          >
            <div className="w-[248px] h-[320px]">
              {/* Info Title */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-darkest-grey">INFO</div>
                <img src={threeDots} alt="three dots" />
              </div>
              {/* Profile */}
              <div className="flex flex-col justify-between items-center">
                <label className="flex flex-col justify-center items-center w-full">
                  <div
                    className="size-[136px] rounded-full shadow-lg bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${
                        data.photo_profile || photoProfile
                      })`,
                    }}
                  />
                  <input
                    type="file"
                    className="absolute top-0 w-full bg-transparent outline-none z-20 opacity-0"
                    onChange={fileHandler}
                  />
                </label>
                <div className="font-semibold text-xl mt-8">
                  {profile.first_name} {profile.last_name}
                </div>
                <div className="text-sm text-darkest-grey">Moviegoers</div>
              </div>
            </div>
            {/* Horizontal Line */}
            <div className="flex w-full mb-10 border-b" />
            <div className="w-[248px] h-[320px]">
              {/* Loyalty Points */}
              <div className="flex flex-col justify-between items-center mb-8">
                <div className="w-[95%] text-darkest-grey text-left text-wide font-semibold">
                  Loyalty Points
                </div>
                <img
                  src={loyaltyPoints}
                  alt="loyalty points"
                  className="w-[248px] h-[150px] mt-6"
                />
                <div className="text-darkest-grey mb-2">
                  180 points become a master
                </div>
                <img
                  src={loyaltyProgress}
                  alt="loyalty progress"
                  className="w-[248px] h-[14px]"
                />
              </div>
              <button
                onClick={() => setEditProfile(!editProfile)}
                className="edit-profile block md:hidden w-[100%] h-[56px] border-1 border-blue text-blue font-bold rounded-xl transform active:scale-90 active:opacity-75 transition-transform"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div>
            {/* Header */}
            <div className="hidden md:flex justify-center-center w-full h-16 text-lg rounded-[16px] bg-white mb-12">
              <div className="flex w-[350px] justify-between ml-10">
                <div
                  className={`border-b-2 ${
                    activePage === "account settings"
                      ? "border-blue"
                      : "border-white text-darkest-grey"
                  } py-[18px]`}
                  onClick={() => {
                    setActivePage("account settings");
                    setIsShowingDetail1(false);
                    setIsShowingDetail2(false);
                    setIsShowingDetail3(false);
                  }}
                >
                  Account Settings
                </div>
                <div
                  className={`border-b-2 ${
                    activePage === "order history"
                      ? "border-blue"
                      : "border-white text-darkest-grey"
                  } py-[17px]`}
                  onClick={() => setActivePage("order history")}
                >
                  Order History
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <AccountSettings
              data={data}
              showPw={showPw}
              activePage={activePage}
              setActivePage={setActivePage}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
              showPassword={showPassword}
            />

            {/* Order History */}
            <OrderHistory
              activePage={activePage}
              screenWidth={screenWidth}
              isShowingDetail1={isShowingDetail1}
              isShowingDetail2={isShowingDetail2}
              isShowingDetail3={isShowingDetail3}
              setIsShowingDetail1={setIsShowingDetail1}
              setIsShowingDetail2={setIsShowingDetail2}
              setIsShowingDetail3={setIsShowingDetail3}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
