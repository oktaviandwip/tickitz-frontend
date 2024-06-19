import React from "react";
import hidePassword from "../../assets/hide-password.svg";

const AccountSettingsMobile = ({
  editProfile,
  setEditProfile,
  data,
  handleChange,
  showPw,
  showPassword,
  handleUpdate,
}) => {
  return (
    <form
      className={`${
        editProfile ? "flex absolute top-32" : "hidden relative"
      } w-[328px] h-[935px] flex-col justify-center items-center bg-white rounded-[24px] shadow-outset z-50`}
    >
      <div className="relative w-[248px] h-[860px] md:hidden">
        <div
          className="absolute top-[-20px] right-[-10px] text-red text-lg font-bold"
          onClick={() => setEditProfile(false)}
        >
          X
        </div>
        <div className="flex justify-between items-center font-bold text-2xl tracking-wide mb-6">
          Account Settings
        </div>
        <div className="flex text-base tracking-wide border-b pb-4">
          Details Information
        </div>
        {/* Input Mobile */}
        <div className="grid grid-cols-1 w-full mt-6">
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
                onChange={(e) => handleChange(e)}
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
                  name="password"
                  type={showPw.passwordMobile ? "text" : "password"}
                  className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-6 lg:px-11 py-4 bg-lighter-grey"
                  placeholder="Write your password"
                  onChange={handleChange}
                />
                <img
                  className="absolute top-[45px] right-5"
                  src={hidePassword}
                  alt="hide password"
                  onClick={() => showPassword("passwordMobile")}
                />
              </div>
              <div className="relative h-[81px] flex flex-col justify-between">
                <div className="text-base text-darkest-grey tracking-wide">
                  Confirm Password
                </div>
                <input
                  name="confirm_password"
                  type={showPw.confirmPasswordMobile ? "text" : "password"}
                  className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-6 lg:px-11 py-4 bg-lighter-grey"
                  placeholder="Confirm your password"
                  onChange={handleChange}
                />
                <img
                  className="absolute top-[45px] right-5"
                  src={hidePassword}
                  alt="hide password"
                  onClick={() => showPassword("confirmPasswordMobile")}
                />
              </div>
            </div>
          </div>
          <button
            className="w-full h-[56px] text-white font-bold rounded-xl bg-blue shadow-md mt-[75px] transform active:scale-90 active:opacity-75 transition-transform"
            onClick={handleUpdate}
          >
            Update changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountSettingsMobile;
