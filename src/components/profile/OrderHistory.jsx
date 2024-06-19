import dropdown from "../../assets/dropdown.svg";
import qrCode from "../../assets/qr-code.svg";
import cineone21 from "../../assets/CineOne21.svg";
import ebvId from "../../assets/ebv-id.svg";

const OrderHistory = ({
  activePage,
  screenWidth,
  isShowingDetail1,
  isShowingDetail2,
  isShowingDetail3,
  setIsShowingDetail1,
  setIsShowingDetail2,
  setIsShowingDetail3,
}) => {
  return (
    <div
      className={`${
        activePage === "order history" && screenWidth > 771
          ? "flex flex-col"
          : "hidden"
      } w-[375px] md:w-[425px] lg:w-[675px] xl:w-[850px]`}
    >
      {/* First */}
      <div
        className={`ticket flex flex-col justify-center items-center w-full h-[250px] rounded-2xl bg-white mb-6 ${
          isShowingDetail1 ? "mb-[380px]" : ""
        }`}
      >
        <div className="w-[390px] lg:w-[630px] xl:w-[775px]">
          <div className="w-full h-16 flex justify-between mx-auto">
            <div className="flex flex-col justify-between">
              <div className="text-darker-grey text-sm text-wide">
                Tuesday, 07 July 2020 - 04:30pm
              </div>
              <div className="text-2xl font-semibold text-wide truncate">
                Spider-Man: Homecoming
              </div>
            </div>
            <div
              className="size-20 lg:w-[164px] lg:h-[64px] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${cineone21})` }}
            />
          </div>
          <div className="flex w-[100%] border-b mt-10 mb-8" />
          <div className="w-full h-10 flex justify-between items-center mx-auto">
            <div className="flex flex-col lg:flex-row gap-y-2">
              <button className="w-[200px] lg:w-[196px] h-10 bg-green bg-opacity-20 rounded-md text-green font-bold mr-4 text-wide">
                Ticket in active
              </button>
              <button className="w-[200px] lg:w-[171px] h-10 bg-red bg-opacity-20 rounded-md text-red font-bold text-wide">
                Not Paid
              </button>
            </div>
            <div
              className="relative flex items-center justify-between w-[128px] h-[64px] text-darker-grey text-wide"
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
                } absolute top-[100px] right-[-18px] lg:right-[-23px] xl:right-[-37.5px] w-[375px] md:w-[425px] lg:w-[675px] xl:w-[850px] h-[361px] -mt-[21px] bg-white rounded-b-2xl tracking-wide`}
              >
                <div className="flex flex-col justify-between w-full h-[324px] mx-auto px-12 py-5">
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
                    <span className="text-red">June 23, 2023</span>. If the bill
                    has not been paid by the specified time, it will be
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
      </div>
      {/* Second */}
      <div
        className={`flex flex-col justify-center items-center w-[100%] h-[250px] rounded-2xl bg-white mb-6 ${
          isShowingDetail2 ? "mb-[420px] lg:mb-[270px]" : ""
        }`}
      >
        <div className="w-[390px] lg:w-[630px] xl:w-[775px]">
          <div className="w-full h-16 flex justify-between mx-auto">
            <div className="flex flex-col justify-between">
              <div className="text-darker-grey text-sm text-wide">
                Monday, 14 June 2020 - 02:00pm
              </div>
              <div className="text-2xl font-semibold text-wide truncate">
                Avengers: End Game
              </div>
            </div>
            <div
              className="size-20 lg:w-[164px] lg:h-[64px] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${ebvId})` }}
            />
          </div>
          <div className="flex w-full border-b mt-10 mb-8" />
          <div className="w-full h-10 flex justify-between items-center mx-auto">
            <div className="flex flex-col lg:flex-row gap-y-2">
              <button className="w-[200px] lg:w-[196px] h-10 bg-darkest-grey bg-opacity-20 rounded-md text-darkest-grey font-bold mr-4 text-wide">
                Ticket used
              </button>
              <button className="w-[200px] lg:w-[171px] h-10 bg-blue bg-opacity-20 rounded-md text-blue font-bold text-wide">
                Paid
              </button>
            </div>
            <div
              className="relative flex items-center justify-between w-[128px] h-[64px] text-darker-grey text-wide"
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
                } absolute top-[78px] right-[-18px] lg:right-[-23px] xl:right-[-37.5px] w-[375px] md:w-[425px] lg:w-[675px] xl:w-[850px] h-[400px] lg:h-[250px] bg-white rounded-b-2xl tracking-wide text-black`}
              >
                <div className="flex flex-col justify-between w-full h-[205px] mx-auto px-[20px] lg:px-[25px] py-5">
                  <div className="text-lg tracking-wide">
                    Ticket Information
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-center w-[400px] lg:w-[584px]">
                    {/* QR Code */}
                    <div className="flex justify-between items-center ">
                      <img src={qrCode} alt="QR code" />
                    </div>
                    {/* Detail Ticket */}
                    <div className="flex flex-col justify-between w-[235px] h-[90px] lg:h-[116px]">
                      {/* Row 1 */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-darker-grey font-semibold">
                            Category
                          </div>
                          <div className="text-black font-semibold">PG-13</div>
                        </div>
                        <div>
                          <div className="text-xs text-darker-grey font-semibold">
                            Time
                          </div>
                          <div className="text-black font-semibold">2:00pm</div>
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
                          <div className="text-black font-semibold">07 Jul</div>
                        </div>
                        <div>
                          <div className="text-xs text-darker-grey font-semibold">
                            Count
                          </div>
                          <div className="text-black font-semibold">3 pcs</div>
                        </div>
                      </div>
                    </div>
                    {/* Total Harga */}
                    <div className="flex flex-row lg:flex-col justify-center items-center gap-x-5 mt-4">
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
      {/* Third */}
      <div
        className={`ticket flex flex-col justify-center items-center w-[100%] h-[250px] rounded-2xl bg-white mb-6 ${
          isShowingDetail3 ? "mb-[420px] lg:mb-[270px]" : ""
        }`}
      >
        <div className="w-[390px] lg:w-[630px] xl:w-[775px]">
          <div className="w-full h-16 flex justify-between mx-auto">
            <div className="flex flex-col justify-between">
              <div className="text-darker-grey text-sm text-wide">
                Monday, 14 June 2020 - 02:00pm
              </div>
              <div className="text-2xl font-semibold text-wide truncate">
                Avengers: End Game
              </div>
            </div>
            <div
              className="size-20 lg:w-[164px] lg:h-[64px] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${ebvId})` }}
            />
          </div>
          <div className="flex w-full border-b mt-10 mb-8" />
          <div className="w-full h-10 flex justify-between items-center mx-auto">
            <div className="flex flex-col lg:flex-row gap-y-2">
              <button className="w-[200px] lg:w-[196px] h-10 bg-darkest-grey bg-opacity-20 rounded-md text-darkest-grey font-bold mr-4 text-wide">
                Ticket used
              </button>
              <button className="w-[200px] lg:w-[171px] h-10 bg-blue bg-opacity-20 rounded-md text-blue font-bold text-wide">
                Paid
              </button>
            </div>
            <div
              className="relative flex items-center justify-between w-[128px] h-[64px] text-darker-grey  text-wide"
              onClick={() => setIsShowingDetail3(!isShowingDetail3)}
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
                  isShowingDetail3 ? "flex" : "hidden"
                } absolute top-[78px] right-[-18px] lg:right-[-23px] xl:right-[-37.5px] w-[375px] md:w-[425px] lg:w-[675px] xl:w-[850px] h-[400px] lg:h-[250px] bg-white rounded-b-2xl tracking-wide text-black`}
              >
                <div className="flex flex-col justify-between w-full h-[205px] mx-auto px-[20px] lg:px-[25px] py-5">
                  <div className="text-lg tracking-wide">
                    Ticket Information
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-center w-[400px] lg:w-[584px]">
                    {/* QR Code */}
                    <div className="flex justify-between items-center ">
                      <img src={qrCode} alt="QR code" />
                    </div>
                    {/* Detail Ticket */}
                    <div className="flex flex-col justify-between w-[235px] h-[90px] lg:h-[116px]">
                      {/* Row 1 */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-darker-grey font-semibold">
                            Category
                          </div>
                          <div className="text-black font-semibold">PG-13</div>
                        </div>
                        <div>
                          <div className="text-xs text-darker-grey font-semibold">
                            Time
                          </div>
                          <div className="text-black font-semibold">2:00pm</div>
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
                          <div className="text-black font-semibold">07 Jul</div>
                        </div>
                        <div>
                          <div className="text-xs text-darker-grey font-semibold">
                            Count
                          </div>
                          <div className="text-black font-semibold">3 pcs</div>
                        </div>
                      </div>
                    </div>
                    {/* Total Harga */}
                    <div className="flex flex-row lg:flex-col justify-center items-center gap-x-5 mt-4">
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
    </div>
  );
};

export default OrderHistory;
