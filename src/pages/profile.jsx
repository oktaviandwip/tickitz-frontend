import Header from "../components/Header";
import threeDots from "../assets/three-dots.svg";
import photoProfile from "../assets/photo-profile.svg";
import loyaltyPoints from "../assets/loyalty-points.svg";
import loyaltyProgress from "../assets/loyalty-progress.svg";
import hidePassword from "../assets/hide-password.svg";
import dropdown from "../assets/dropdown.svg";
import qrCode from "../assets/qr-code.svg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useApi from "../../utils/useApi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { user_id } = useSelector((s) => s.users);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country_code: 62,
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const [activePage, setActivePage] = useState("account settings");
  const [isShowingDetail1, setIsShowingDetail1] = useState(false);
  const [isShowingDetail2, setIsShowingDetail2] = useState(false);
  const [isShowingDetail3, setIsShowingDetail3] = useState(false);

  useEffect(() => {
    api({
      method: "GET",
      url: `/users/${user_id}`,
    })
      .then((res) => {
        const data = res.data.rows[0];
        data.password = "";
        data.confirm_password = "";
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    let newData = { ...data };

    newData[e.target.name] = e.target.value;
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
      url: `/users/${user_id}`,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then((res) => {
        alert("Profile updated succesfully!");
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full min-h-screen bg-dark-grey bg-opacity-[0.2] py-11">
      <Header />
      <main className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-stretch md:w-[950px] lg:w-[1226px] mx-auto md:mt-14">
        {/* Header Mobile */}
        <div className="flex fixed top-[104px] md:hidden items-center w-[100%] h-16 text-base bg-white mb-14 md:mb-0 z-40">
          <div className="flex w-[80%] md:w-[50%] lg:w-[40%] justify-between ml-10">
            <div className="details-account-header-mobile border-b-2 border-blue py-[18px]">
              Details Account
            </div>
            <div className="order-history-header-mobile text-darkest-grey border-b-2 border-white py-[18px]">
              Order History
            </div>
          </div>
        </div>
        {/* Form Mobile */}
        <form className="relative form-mobile hidden w-[328px] h-[935px] flex-col justify-center items-center bg-white rounded-[24px] shadow-outset z-50">
          <div className="w-[248px] h-[860px] md:hidden">
            <div className="flex font-bold text-2xl tracking-wide mb-6">
              Account Settings
            </div>
            <div className="flex text-base tracking-wide border-b pb-4">
              Details Information
            </div>
            {/* Input Mobile */}
            <div className="grid grid-cols-1 w-[100%] mt-6">
              <div className="h-[81px] flex flex-col justify-between mb-3">
                <div className="text-base text-darkest-grey tracking-wide">
                  First Name
                </div>
                <input
                  name="first_name"
                  type="text"
                  value={data.first_name}
                  className=" outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 md:px-11 py-4 bg-lighter-grey"
                  placeholder="Enter your first name"
                  onChange={handleChange}
                />
              </div>
              <div className="h-[81px] flex flex-col justify-between mb-3">
                <div className="text-base text-darkest-grey tracking-wide">
                  Last Name
                </div>
                <input
                  name="last_name"
                  type="text"
                  value={data.last_name}
                  className=" outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 md:px-11 py-4 bg-lighter-grey"
                  placeholder="Enter your last name"
                  onChange={handleChange}
                />
              </div>
              <div className="h-[81px] flex flex-col justify-between mb-3">
                <div className="text-base text-darkest-grey tracking-wide">
                  Email
                </div>
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 md:px-11 py-4 bg-lighter-grey"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>
              <div className="h-[81px] flex flex-col justify-between mb-10">
                <div className="text-base text-darkest-grey tracking-wide">
                  Phone Number
                </div>
                <div className="flex md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 md:px-11 py-4 bg-lighter-grey">
                  <select
                    className="appearance-none outline-none bg-transparent pr-4 mr-4 border-r-1 border-grey"
                    name="country_code"
                    id="country_code"
                    onChange={handleChange}
                    value={data.country_code}
                  >
                    <option value={62}>+62</option>
                    <option value={49}>+49</option>
                    <option value={33}>+33</option>
                  </select>
                  <input
                    name="phone_number"
                    type="text"
                    value={data.phone_number}
                    className="bg-transparent outline-none md:text-sm lg:text-base tracking-wide"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>
            </div>
            {/* Account & Privacy Mobile */}
            <div className="md:flex items-center w-[100%] h-[297px] rounded-[16px] bg-white">
              <div className="md:w-[550px] lg:w-[802px] h-[193px] mx-auto">
                <div className="flex w-[100%] text-base tracking-wide border-b pb-4">
                  Account and Privacy
                </div>
                <div className="grid grid-cols-1 mt-4">
                  <div className="relative h-[81px] flex flex-col justify-between mb-3">
                    <div className="text-base text-darkest-grey tracking-wide">
                      New Password
                    </div>
                    <input
                      type="password"
                      className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-6 lg:px-11 py-4 bg-lighter-grey"
                      placeholder="Write your password"
                    />
                    <img
                      className="absolute top-[45px] right-5"
                      src={hidePassword}
                      alt="hide password"
                    />
                  </div>
                  <div className="relative h-[81px] flex flex-col justify-between">
                    <div className="text-base text-darkest-grey tracking-wide">
                      Confirm Password
                    </div>
                    <input
                      type="password"
                      className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-6 lg:px-11 py-4 bg-lighter-grey"
                      placeholder="Confirm your password"
                    />
                    <img
                      className="absolute top-[45px] right-5"
                      src={hidePassword}
                      alt="hide password"
                    />
                  </div>
                </div>
              </div>
              <button className="w-[100%] h-[56px] text-white font-bold rounded-xl bg-blue shadow-md mt-[75px] transform active:scale-90 active:opacity-75 transition-transform">
                Update changes
              </button>
            </div>
          </div>
        </form>
        {/* Order History Mobile */}
        <div className="hidden md:hidden order-history-mobile w-[375px]">
          {/* First */}
          <div className="mobile flex flex-col justify-center items-center w-[100%] h-[357px] rounded-[16px] bg-white mb-6">
            <div className="w-[300px] h-[116px] flex flex-col justify-between mx-auto">
              <div className="w-[160px] h-[64px] bg-[url('../assets/CineOne21.svg')] bg-contain bg-no-repeat bg-center" />
              <div className="flex flex-col justify-between">
                <div className="text-darker-grey text-sm text-wide">
                  Tuesday, 07 July 2020 - 04:30pm
                </div>
                <div className="text-2xl font-semibold text-wide">
                  Spider-Man: Homecoming
                </div>
              </div>
            </div>
            <div className="flex w-[100%] border-b my-6" />
            <div className="w-[300px] h-[170px] flex flex-col justify-between items-center mx-auto">
              <button className="w-[100%] h-10 bg-green bg-opacity-20 rounded-md text-green font-bold text-wide">
                Ticket in active
              </button>
              <button className="w-[100%] h-10 bg-red bg-opacity-20 rounded-md text-red font-bold text-wide">
                Not Paid
              </button>
              <div className="show-details relative flex items-center justify-between w-[144px] h-14 text-lg text-darker-grey text-wide">
                Show details
                <img
                  className="dropdown-grey transform"
                  src={dropdown}
                  alt="dropdown grey"
                />
                {/* Ticket Information Mobile */}
                <div className="ticket-information hidden absolute top-[70px] -left-[115px] w-[375px] h-[500px] -mt-[21px] rounded-b-3xl bg-white tracking-wide">
                  <div className="flex flex-col justify-between w-[327px] h-[470px] mx-auto py-5">
                    <div className="text-lg text-black tracking-wide font-semibold">
                      Ticket Information
                    </div>
                    {/* No. Rekening Virtual */}
                    <div className="flex flex-col justify-between my-4">
                      <div className="flex justify-between text-sm text-darkest-grey w-[170px]">
                        <div>No. Rekening Virtual</div>
                        <div>:</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-lg font-bold mr-5 text-black">
                          12321328913829724
                        </div>
                        <button className="border-1 border-blue rounded-md w-[72px] h-[48px] text-blue transform active:scale-90 active:opacity-75 transition-transform">
                          Copy
                        </button>
                      </div>
                    </div>
                    {/* Total Payment */}
                    <div className="flex flex-col justify-between">
                      <div className="flex justify-between text-sm text-darkest-grey w-[170px]">
                        <div>Total Payment</div>
                        <div>:</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-lg font-bold text-blue">$30</div>
                      </div>
                    </div>
                    {/* Due Date */}
                    <div className="text-darkest-grey tracking-widest text-justify text-base">
                      Pay this payment bill before it is due, on{" "}
                      <span className="text-red">June 23, 2023</span>. If the
                      bill has not been paid by the specified time, it will be
                      forfeited
                    </div>
                    {/* Cek Pembayaran */}
                    <button className="w-[100%] h-[48px] text-white rounded-md bg-blue shadow-md transform active:scale-90 active:opacity-75 transition-transform">
                      Cek Pembayaran
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Second */}
          <div className="mobile flex flex-col justify-center items-center w-[100%] h-[357px] rounded-[16px] bg-white mb-6">
            <div className="w-[300px] h-[116px] flex flex-col justify-between mx-auto">
              <div className="w-[130px] h-[52px] bg-[url('../assets/ebv-id.svg')] bg-contain bg-no-repeat bg-center" />
              <div className="flex flex-col justify-between">
                <div className="text-darker-grey text-sm text-wide">
                  Monday, 14 June 2020 - 02:00pm
                </div>
                <div className="text-2xl font-semibold text-wide">
                  Avengers: End Game
                </div>
              </div>
            </div>
            <div className="flex w-[100%] border-b my-6" />
            <div className="w-[300px] h-[170px] flex flex-col justify-between items-center mx-auto">
              <button className="w-[100%] h-10 bg-darkest-grey bg-opacity-20 rounded-md text-darkest-grey font-boldtext-wide">
                Ticket used
              </button>
              <button className="w-[100%] h-10 bg-blue bg-opacity-20 rounded-md text-blue font-bold text-wide">
                Paid
              </button>
              <div className="show-details relative flex items-center justify-between w-[144px] h-14 text-lg text-darker-grey text-wide">
                Show details{" "}
                <img
                  className="dropdown-grey transform"
                  src="../assets/dropdown-grey.svg"
                  alt="dropdown grey"
                />
                {/* Ticket Information */}
                <div className="hidden ticket-information absolute top-[70px] -left-[115px] w-[375px] h-[500px] -mt-[21px] rounded-b-3xl bg-white tracking-wide text-black">
                  <div className="flex flex-col justify-between w-[300px] h-[205px] mx-auto py-5">
                    <div className="text-lg font-semibold tracking-wide">
                      Ticket Information
                    </div>
                    <div className="flex flex-col justify-between w-[100%] h-[367px]">
                      {/* QR Code */}
                      <div className="flex justify-start">
                        <img src={qrCode} alt="QR code" />
                      </div>
                      {/* Detail Ticket */}
                      <div className="flex flex-col justify-between w-[250px] h-[116px] text-sm my-6">
                        {/* Row 1 */}
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Category
                            </div>
                            <div className="text-black font-semibold">
                              PG-13
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Time
                            </div>
                            <div className="text-black font-semibold">
                              2:00pm
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Seats
                            </div>
                            <div className="text-black font-semibold">
                              C4, C5, C6
                            </div>
                          </div>
                        </div>
                        {/* Row 2 */}
                        <div className="flex justify-between items-center mt-6">
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Movie
                            </div>
                            <div className="text-black font-semibold">
                              Spider-Man: ...
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Date
                            </div>
                            <div className="text-black font-semibold">
                              07 Jul
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Count
                            </div>
                            <div className="text-black font-semibold">
                              3 pcs
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Total Harga */}
                      <div className="flex flex-col justify-center font-semibold">
                        <div>Total</div>
                        <div className="text-2xl">$30.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Third */}
          <div className="mobile flex flex-col justify-center items-center w-[100%] h-[357px] rounded-[16px] bg-white mb-6">
            <div className="w-[300px] h-[116px] flex flex-col justify-between mx-auto">
              <div className="w-[130px] h-[52px] bg-[url('../assets/ebv-id.svg')] bg-contain bg-no-repeat bg-center" />
              <div className="flex flex-col justify-between">
                <div className="text-darker-grey text-sm text-wide">
                  Monday, 14 June 2020 - 02:00pm
                </div>
                <div className="text-2xl font-semibold text-wide">
                  Avengers: End Game
                </div>
              </div>
            </div>
            <div className="flex w-[100%] border-b my-6" />
            <div className="w-[300px] h-[170px] flex flex-col justify-between items-center mx-auto">
              <button className="w-[100%] h-10 bg-darkest-grey bg-opacity-20 rounded-md text-darkest-grey font-boldtext-wide">
                Ticket used
              </button>
              <button className="w-[100%] h-10 bg-blue bg-opacity-20 rounded-md text-blue font-bold text-wide">
                Paid
              </button>
              <div className="show-details relative flex items-center justify-between w-[144px] h-14 text-lg text-darker-grey text-wide">
                Show details{" "}
                <img
                  className="dropdown-grey transform"
                  src="../assets/dropdown-grey.svg"
                  alt="dropdown grey"
                />
                {/* Ticket Information */}
                <div className="hidden ticket-information absolute top-[70px] -left-[115px] w-[375px] h-[500px] -mt-[21px] rounded-b-3xl bg-white tracking-wide text-black">
                  <div className="flex flex-col justify-between w-[300px] h-[205px] mx-auto py-5">
                    <div className="text-lg font-semibold tracking-wide">
                      Ticket Information
                    </div>
                    <div className="flex flex-col justify-between w-[100%] h-[367px]">
                      {/* QR Code */}
                      <div className="flex justify-start">
                        <img src={qrCode} alt="QR code" />
                      </div>
                      {/* Detail Ticket */}
                      <div className="flex flex-col justify-between w-[250px] h-[116px] text-sm my-6">
                        {/* Row 1 */}
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Category
                            </div>
                            <div className="text-black font-semibold">
                              PG-13
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Time
                            </div>
                            <div className="text-black font-semibold">
                              2:00pm
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Seats
                            </div>
                            <div className="text-black font-semibold">
                              C4, C5, C6
                            </div>
                          </div>
                        </div>
                        {/* Row 2 */}
                        <div className="flex justify-between items-center mt-6">
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Movie
                            </div>
                            <div className="text-black font-semibold">
                              Spider-Man: ...
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Date
                            </div>
                            <div className="text-black font-semibold">
                              07 Jul
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-darker-grey font-semibold">
                              Count
                            </div>
                            <div className="text-black font-semibold">
                              3 pcs
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Total Harga */}
                      <div className="flex flex-col justify-center font-semibold">
                        <div>Total</div>
                        <div className="text-2xl">$30.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* User */}
        <div className="user w-[328px] h-[831px] md:h-[783px] flex md:flex flex-col justify-center items-center bg-white rounded-[24px]">
          <div className="w-[248px] h-[320px]">
            {/* Info Title */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-darkest-grey">INFO</div>
              <img src={threeDots} alt="three dots" />
            </div>
            {/* Profile */}
            <div className="flex flex-col justify-between items-center">
              <img
                className="w-[136px] rounded-full shadow-lg"
                src={photoProfile}
                alt="photo profile"
              />
              <div className="font-semibold text-xl mt-8">
                {data.first_name} {data.last_name}
              </div>
              <div className="text-sm text-darkest-grey">Moviegoers</div>
            </div>
          </div>
          {/* Horizontal Line */}
          <div className="flex w-[100%] mb-10 border-b" />
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
            <button className="edit-profile block md:hidden w-[100%] h-[56px] border-1 border-blue text-blue font-bold rounded-xl transform active:scale-90 active:opacity-75 transition-transform">
              Edit Profile
            </button>
          </div>
        </div>
        {/* Account Settings */}
        <form className="md:w-[600px] lg:w-[866px] h-[1020px] overflow-y-hidden">
          {/* Header */}
          <div className="hidden md:flex justify-center-center w-[100%] h-16 text-lg rounded-[16px] bg-white mb-12">
            <div className="flex md:w-[50%] lg:w-[40%] justify-between ml-10">
              <div
                className={`border-b-2 ${
                  activePage === "account settings"
                    ? "border-blue"
                    : "border-white text-darkest-grey"
                } py-[18px]`}
                onClick={() => setActivePage("account settings")}
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
          {/* Details Information */}
          <div
            className={`hidden md:flex flex-col justify-center items-center w-[100%] h-[418px] rounded-[16px] bg-white mb-6 ${
              activePage === "account settings" ? "md:flex" : "md:hidden"
            }`}
          >
            <div className="md:w-[550px] lg:w-[802px] h-[315px] mx-auto">
              <div className="flex text-base tracking-wide border-b pb-4">
                Details Information
              </div>
              <div className="grid grid-cols-2 gap-5 w-[100%] mt-12">
                <div className="h-[98px] flex flex-col justify-between mb-3">
                  <div className="text-base text-darkest-grey tracking-wide">
                    First Name
                  </div>
                  <input
                    name="first_name"
                    type="text"
                    value={data.first_name}
                    className=" outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 md:px-11 py-4 bg-lighter-grey"
                    placeholder="Enter your first name"
                    onChange={handleChange}
                  />
                </div>
                <div className="h-[98px] flex flex-col justify-between mb-3">
                  <div className="text-base text-darkest-grey tracking-wide">
                    Last Name
                  </div>
                  <input
                    name="last_name"
                    type="text"
                    value={data.last_name}
                    className=" outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 md:px-11 py-4 bg-lighter-grey"
                    placeholder="Enter your last name"
                    onChange={handleChange}
                  />
                </div>
                <div className="h-[98px] flex flex-col justify-between mb-3">
                  <div className="text-base text-darkest-grey tracking-wide">
                    Email
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={data.email}
                    className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 md:px-11 py-4 bg-lighter-grey"
                    placeholder="Enter your email"
                    onChange={handleChange}
                  />
                </div>
                <div className="h-[98px] flex flex-col justify-between mb-12 ">
                  <div className="text-base text-darkest-grey tracking-wide">
                    Phone Number
                  </div>
                  <div className="flex md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 md:px-11 py-4 bg-lighter-grey">
                    <select
                      className="appearance-none outline-none bg-transparent pr-4 mr-4 border-r-1 border-grey"
                      name="country_code"
                      id="country_code"
                      value={data.country_code}
                      onChange={handleChange}
                    >
                      <option value={+62}>+62</option>
                      <option value={+49}>+49</option>
                      <option value={+33}>+33</option>
                    </select>
                    <input
                      name="phone_number"
                      type="text"
                      value={data.phone_number}
                      className="bg-transparent outline-none md:text-sm lg:text-base tracking-wide"
                      placeholder="Enter your phone"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Account & Privacy */}
          <div
            className={`account-privacy hidden md:flex items-center w-[100%] h-[297px] rounded-[16px] bg-white mb-6 ${
              activePage === "account settings" ? "md:flex" : "md:hidden"
            }`}
          >
            <div className="md:w-[550px] lg:w-[802px] h-[193px] mx-auto">
              <div className="flex w-[100%] text-base tracking-wide border-b pb-4">
                Account and Privacy
              </div>
              <div className="grid grid-cols-2 gap-5 mt-12">
                <div className="relative h-[98px] flex flex-col justify-between mb-3">
                  <div className="text-base text-darkest-grey tracking-wide">
                    New Password
                  </div>
                  <input
                    name="password"
                    type="password"
                    value={data.password}
                    className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-6 lg:px-11 py-4 bg-lighter-grey"
                    placeholder="Write your password"
                    onChange={handleChange}
                  />
                  <img
                    className="absolute top-[60px] right-5"
                    src={hidePassword}
                    alt="hide password"
                  />
                </div>
                <div className="relative h-[98px] flex flex-col justify-between mb-3">
                  <div className="text-base text-darkest-grey tracking-wide">
                    Confirm Password
                  </div>
                  <input
                    name="confirm_password"
                    type="password"
                    value={data.confirm_password}
                    className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-6 lg:px-11 py-4 bg-lighter-grey"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                  />
                  <img
                    className="absolute top-[60px] right-5"
                    src={hidePassword}
                    alt="hide password"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            value="submit"
            className={`hidden md:flex justify-center items-center w-[360px] h-[56px] text-white font-bold rounded-[16px] bg-blue shadow-md mb-14 md:mb-0 transform active:scale-90 active:opacity-75 transition-transform ${
              activePage === "account settings" ? "md:flex" : "md:hidden"
            }`}
            onClick={handleUpdate}
          >
            Update changes
          </button>
          {/* Order History */}
          <div
            className={`${
              activePage === "order history" ? "flex flex-col" : "hidden"
            }`}
          >
            {/* First */}
            <div
              className={`ticket flex flex-col justify-center items-center w-[100%] h-[250px] rounded-[16px] bg-white mb-6 ${
                isShowingDetail1 ? "mb-[367px]" : ""
              }`}
            >
              <div className="w-[730px] h-16 flex justify-between mx-auto">
                <div className="flex flex-col justify-between">
                  <div className="text-darker-grey text-sm text-wide">
                    Tuesday, 07 July 2020 - 04:30pm
                  </div>
                  <div className="text-2xl font-semibold text-wide">
                    Spider-Man: Homecoming
                  </div>
                </div>
                <div className="w-[160px] h-[64px] bg-[url('../assets/CineOne21.svg')] bg-contain bg-no-repeat bg-center" />
              </div>
              <div className="flex w-[100%] border-b mt-10 mb-8" />
              <div className="w-[730px] h-10 flex justify-between items-center mx-auto">
                <div>
                  <button className="w-[196px] h-10 bg-green bg-opacity-20 rounded-md text-green font-bold mr-4 text-wide">
                    Ticket in active
                  </button>
                  <button className="w-[171px] h-10 bg-red bg-opacity-20 rounded-md text-red font-bold text-wide">
                    Not Paid
                  </button>
                </div>
                <div
                  className="show-details relative flex items-center justify-between w-[128px] h-[64px] text-darker-grey text-wide"
                  onClick={() => setIsShowingDetail1(!isShowingDetail1)}
                >
                  Show details
                  <img
                    className="dropdown-grey transform"
                    src={dropdown}
                    alt="dropdown grey"
                  />
                  {/* Ticket Information */}
                  <div
                    className={`${
                      isShowingDetail1 ? "flex" : "hidden"
                    } ticket-information absolute top-[96px] -left-[675px] w-[872px] h-[361px] -mt-[21px] rounded-b-3xl bg-white tracking-wide`}
                  >
                    <div className="flex flex-col justify-between w-[730px] h-[324px] mx-auto py-5">
                      <div className="text-lg text-black tracking-wide">
                        Ticket Information
                      </div>
                      {/* No. Rekening Virtual */}
                      <div className="flex justify-between items-center ">
                        <div className="flex justify-between text-sm text-darkest-grey w-[170px]">
                          <div>No. Rekening Virtual</div>
                          <div>:</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-lg font-bold mr-5 text-black">
                            12321328913829724
                          </div>
                          <button className="border-1 border-blue rounded-md w-[72px] h-[48px] text-blue transform active:scale-90 active:opacity-75 transition-transform">
                            Copy
                          </button>
                        </div>
                      </div>
                      {/* Total Payment */}
                      <div className="flex justify-between items-center">
                        <div className="flex justify-between text-sm text-darkest-grey w-[170px]">
                          <div>Total Payment</div>
                          <div>:</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-lg font-bold text-blue">$30</div>
                        </div>
                      </div>
                      {/* Due Date */}
                      <div className="text-darkest-grey tracking-widest text-justify">
                        Pay this payment bill before it is due, on{" "}
                        <span className="text-red">June 23, 2023</span>. If the
                        bill has not been paid by the specified time, it will be
                        forfeited
                      </div>
                      {/* Cek Pembayaran */}
                      <button className="w-[191px] h-[48px] text-white rounded-md bg-blue shadow-md transform active:scale-90 active:opacity-75 transition-transform">
                        Cek Pembayaran
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Second */}
            <div
              className={`ticket flex flex-col justify-center items-center w-[100%] h-[250px] rounded-[16px] bg-white mb-6 ${
                isShowingDetail2 ? "mb-[367px]" : ""
              }`}
            >
              <div className="w-[730px] h-16 flex justify-between mx-auto">
                <div className="flex flex-col justify-between">
                  <div className="text-darker-grey text-sm text-wide">
                    Monday, 14 June 2020 - 02:00pm
                  </div>
                  <div className="text-2xl font-semibold text-wide">
                    Avengers: End Game
                  </div>
                </div>
                <div className="w-[160px] h-[64px] bg-[url('../assets/ebv-id.svg')] bg-contain bg-no-repeat bg-center" />
              </div>
              <div className="flex w-[100%] border-b mt-10 mb-8" />
              <div className="w-[730px] h-10 flex justify-between items-center mx-auto">
                <div>
                  <button className="w-[196px] h-10 bg-darkest-grey bg-opacity-20 rounded-md text-darkest-grey font-bold mr-4 text-wide">
                    Ticket used
                  </button>
                  <button className="w-[171px] h-10 bg-blue bg-opacity-20 rounded-md text-blue font-bold text-wide">
                    Paid
                  </button>
                </div>
                <div
                  className="show-details relative flex items-center justify-between w-[128px] h-[64px] text-darker-grey  text-wide"
                  onClick={() => setIsShowingDetail2(!isShowingDetail2)}
                >
                  Show details{" "}
                  <img
                    className="dropdown-grey transform"
                    src={dropdown}
                    alt="dropdown grey"
                  />
                  {/* Ticket Information */}
                  <div
                    className={`${
                      isShowingDetail2 ? "flex" : "hidden"
                    } ticket-information absolute top-[96px] -left-[675px] w-[872px] h-[256px] -mt-[21px] rounded-b-3xl bg-white tracking-wide text-black`}
                  >
                    <div className="flex flex-col justify-between w-[730px] h-[205px] mx-auto py-5">
                      <div className="text-lg  tracking-wide">
                        Ticket Information
                      </div>
                      <div className="flex justify-between items-center w-[584px]">
                        {/* QR Code */}
                        <div className="flex justify-between items-center ">
                          <img src={qrCode} alt="QR code" />
                        </div>
                        {/* Detail Ticket */}
                        <div className="flex flex-col justify-between w-[235px] h-[116px]">
                          {/* Row 1 */}
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Category
                              </div>
                              <div className="text-black font-semibold">
                                PG-13
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Time
                              </div>
                              <div className="text-black font-semibold">
                                2:00pm
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Seats
                              </div>
                              <div className="text-black font-semibold">
                                C4, C5, C6
                              </div>
                            </div>
                          </div>
                          {/* Row 2 */}
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Movie
                              </div>
                              <div className="text-black font-semibold">
                                Spider-Man: ...
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Date
                              </div>
                              <div className="text-black font-semibold">
                                07 Jul
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Count
                              </div>
                              <div className="text-black font-semibold">
                                3 pcs
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Total Harga */}
                        <div className="flex flex-col justify-center">
                          <div>Total</div>
                          <div className="text-2xl">$30.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Third */}
            <div
              className={`ticket flex flex-col justify-center items-center w-[100%] h-[250px] rounded-[16px] bg-white mb-6 ${
                isShowingDetail3 ? "mb-[367px]" : ""
              }`}
            >
              <div className="w-[730px] h-16 flex justify-between mx-auto">
                <div className="flex flex-col justify-between">
                  <div className="text-darker-grey text-sm text-wide">
                    Monday, 14 June 2020 - 02:00pm
                  </div>
                  <div className="text-2xl font-semibold text-wide">
                    Avengers: End Game
                  </div>
                </div>
                <div className="w-[160px] h-[64px] bg-[url('../assets/ebv-id.svg')] bg-contain bg-no-repeat bg-center" />
              </div>
              <div className="flex w-[100%] border-b mt-10 mb-8" />
              <div className="w-[730px] h-10 flex justify-between items-center mx-auto">
                <div>
                  <button className="w-[196px] h-10 bg-darkest-grey bg-opacity-20 rounded-md text-darkest-grey font-bold mr-4 text-wide">
                    Ticket used
                  </button>
                  <button className="w-[171px] h-10 bg-blue bg-opacity-20 rounded-md text-blue font-bold text-wide">
                    Paid
                  </button>
                </div>
                <div
                  className="relative show-details flex items-center justify-between w-[128px] h-[64px] text-darker-grey text-wide"
                  onClick={() => setIsShowingDetail3(!isShowingDetail3)}
                >
                  Show details
                  <img
                    className="dropdown-grey transform"
                    src={dropdown}
                    alt="dropdown grey"
                  />
                  {/* Ticket Information */}
                  <div
                    className={`${
                      isShowingDetail3 ? "flex" : "hidden"
                    } ticket-information absolute top-[96px] -left-[675px] w-[872px] h-[256px] -mt-[21px] rounded-b-3xl bg-white tracking-wide text-black`}
                  >
                    <div className="flex flex-col justify-between w-[730px] h-[205px] mx-auto py-5">
                      <div className="text-lg  tracking-wide">
                        Ticket Information
                      </div>
                      <div className="flex justify-between items-center w-[584px]">
                        {/* QR Code */}
                        <div className="flex justify-between items-center ">
                          <img src={qrCode} alt="QR code" />
                        </div>
                        {/* Detail Ticket */}
                        <div className="flex flex-col justify-between w-[235px] h-[116px]">
                          {/* Row 1 */}
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Category
                              </div>
                              <div className="text-black font-semibold">
                                PG-13
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Time
                              </div>
                              <div className="text-black font-semibold">
                                2:00pm
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Seats
                              </div>
                              <div className="text-black font-semibold">
                                C4, C5, C6
                              </div>
                            </div>
                          </div>
                          {/* Row 2 */}
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Movie
                              </div>
                              <div className="text-black font-semibold">
                                Spider-Man: ...
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Date
                              </div>
                              <div className="text-black font-semibold">
                                07 Jul
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-darker-grey font-semibold">
                                Count
                              </div>
                              <div className="text-black font-semibold">
                                3 pcs
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Total Harga */}
                        <div className="flex flex-col justify-center">
                          <div>Total</div>
                          <div className="text-2xl">$30.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
