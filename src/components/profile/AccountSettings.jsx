import React from "react";
import hidePassword from "../../assets/hide-password.svg";

const AccountSettings = ({
  activePage,
  data,
  handleChange,
  handleUpdate,
  showPw,
  showPassword,
}) => {
  return (
    <>
      <form
        className={`flex justify-between ${
          activePage === "account settings" ? "md:flex" : "md:hidden"
        } overflow-y-scroll`}
      >
        <div className="w-[375px] md:w-[425px] lg:w-[675px] xl:w-[850px]">
          {/* Details Information */}
          <div
            className={`hidden md:flex flex-col justify-center items-center w-full h-[418px] rounded-[16px] bg-white p-6 mb-6`}
          >
            <div className="h-[315px] mx-auto">
              <div className="flex text-base tracking-wide border-b pb-4">
                Details Information
              </div>
              <div className="grid grid-cols-2 gap-5 w-[385px] lg:w-[630px] xl:w-[775px] mt-12">
                <div className="h-[98px] flex flex-col justify-between mb-3">
                  <div className="text-base text-darkest-grey tracking-wide">
                    First Name
                  </div>
                  <input
                    name="first_name"
                    type="text"
                    value={data.first_name}
                    className=" outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 lg:px-11 py-4 bg-lighter-grey"
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
                    className=" outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 lg:px-11 py-4 bg-lighter-grey"
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
                    className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 lg:px-11 py-4 bg-lighter-grey"
                    placeholder="Enter your email"
                    onChange={handleChange}
                  />
                </div>
                <div className="h-[98px] flex flex-col justify-between mb-12 ">
                  <div className="text-base text-darkest-grey tracking-wide">
                    Phone Number
                  </div>
                  <div className="flex md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-5 lg:px-11 py-4 bg-lighter-grey truncate">
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
            className={`account-privacy hidden md:flex items-center w-full h-[297px] rounded-[16px] bg-white mb-6 ${
              activePage === "account settings" ? "md:flex" : "md:hidden"
            }`}
          >
            <div className="w-[390px] lg:w-[630px] xl:w-[775px] h-[193px] mx-auto">
              <div className="flex w-full text-base tracking-wide border-b pb-4">
                Account and Privacy
              </div>
              <div className="grid grid-cols-2 gap-5 mt-12">
                <div className="relative h-[98px] flex flex-col justify-between mb-3">
                  <div className="text-base text-darkest-grey tracking-wide">
                    New Password
                  </div>
                  <input
                    name="password"
                    type={showPw.password ? "text" : "password"}
                    value={data.password}
                    className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-4 lg:px-11 py-4 bg-lighter-grey"
                    placeholder="Write your password"
                    onChange={handleChange}
                  />
                  <img
                    className="absolute top-[62px] right-1 lg:right-5"
                    src={hidePassword}
                    alt="hide password"
                    onClick={() => showPassword("password")}
                  />
                </div>
                <div className="relative h-[98px] flex flex-col justify-between mb-3">
                  <div className="text-base text-darkest-grey tracking-wide">
                    Confirm Password
                  </div>
                  <input
                    name="confirm_password"
                    type={showPw.confirmPassword ? "text" : "password"}
                    value={data.confirm_password}
                    className="outline-none md:text-sm lg:text-base tracking-wide rounded-md border-1 border-grey px-4 lg:px-11 py-4 bg-lighter-grey"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                  />
                  <img
                    className="absolute top-[62px] right-1 lg:right-5"
                    src={hidePassword}
                    alt="hide password"
                    onClick={() => showPassword("confirmPassword")}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            value="submit"
            className={`hidden md:flex justify-center items-center w-full lg:w-[360px] h-[56px] text-white font-bold rounded-[16px] bg-blue shadow-md mb-14 md:mb-0 transform active:scale-90 active:opacity-75 transition-transform ${
              activePage === "account settings" ? "md:flex" : "md:hidden"
            }`}
            onClick={handleUpdate}
          >
            Update changes
          </button>
        </div>
      </form>
    </>
  );
};

export default AccountSettings;
