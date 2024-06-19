import dropdown from "../../assets/dropdown.svg";
import qrCode from "../../assets/qr-code.svg";
import cineone21 from "../../assets/CineOne21.svg";
import ebvId from "../../assets/ebv-id.svg";

const OrderHistoryMobile = ({
  activePage,
  isShowingDetail1,
  isShowingDetail2,
  isShowingDetail3,
  setIsShowingDetail1,
  setIsShowingDetail2,
  setIsShowingDetail3,
}) => {
  return (
    <>
      <div
        className={`${
          activePage === "order history" ? "flex flex-col" : "hidden"
        } md:hidden w-[375px]`}
      >
        {/* First */}
        <div
          className={`flex flex-col justify-center items-center w-full h-[357px] rounded-[16px] bg-white ${
            isShowingDetail1 ? "mb-[500px]" : "mb-6"
          } `}
        >
          <div className="w-[300px] h-[116px] flex flex-col justify-between mx-auto">
            <div
              className="w-[160px] h-[64px] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${cineone21})` }}
            />
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
            <div className="relative flex items-center justify-between w-[144px] h-14 text-lg text-darker-grey text-wide">
              Show details
              <img
                className={`transform ${isShowingDetail1 ? "rotate-180" : ""}`}
                src={dropdown}
                alt="dropdown grey"
                onClick={() => setIsShowingDetail1(!isShowingDetail1)}
              />
              {/* Ticket Information Mobile */}
              <div
                className={`${
                  isShowingDetail1 ? "flex" : "hidden"
                } absolute top-[70px] -left-[115px] w-[375px] h-[500px] -mt-[21px] rounded-b-3xl bg-white tracking-wide`}
              >
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
                    <span className="text-red">June 23, 2023</span>. If the bill
                    has not been paid by the specified time, it will be
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
        <div
          className={`flex flex-col justify-center items-center w-[100%] h-[357px] rounded-[16px] bg-white ${
            isShowingDetail2 ? "mb-[500px]" : "mb-6"
          }`}
        >
          <div className="w-[300px] h-[116px] flex flex-col justify-between mx-auto">
            <div
              className="w-[130px] h-[52px] bg-[url('../assets/ebv-id.svg')] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${ebvId})` }}
            />
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
            <div className="relative flex items-center justify-between w-[144px] h-14 text-lg text-darker-grey text-wide">
              Show details
              <img
                className={`transform ${isShowingDetail2 ? "rotate-180" : ""}`}
                src={dropdown}
                alt="dropdown grey"
                onClick={() => setIsShowingDetail2(!isShowingDetail2)}
              />
              {/* Ticket Information */}
              <div
                className={`${
                  isShowingDetail2 ? "flex" : "hidden"
                } absolute top-[70px] -left-[115px] w-[375px] h-[500px] -mt-[21px] rounded-b-3xl bg-white tracking-wide text-black`}
              >
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
        <div
          className={`flex flex-col justify-center items-center w-[100%] h-[357px] rounded-[16px] bg-white ${
            isShowingDetail3 ? "mb-[500px]" : "mb-6"
          }`}
        >
          <div className="w-[300px] h-[116px] flex flex-col justify-between mx-auto">
            <div
              className="w-[130px] h-[52px] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${ebvId})` }}
            />
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
            <div className="relative flex items-center justify-between w-[144px] h-14 text-lg text-darker-grey text-wide">
              Show details{" "}
              <img
                className={`transform ${isShowingDetail3 ? "rotate-180" : ""}`}
                src={dropdown}
                alt="dropdown grey"
                onClick={() => setIsShowingDetail3(!isShowingDetail3)}
              />
              {/* Ticket Information */}
              <div
                className={`${
                  isShowingDetail3 ? "flex" : "hidden"
                } absolute top-[70px] -left-[115px] w-[375px] h-[500px] -mt-[21px] rounded-b-3xl bg-white tracking-wide text-black`}
              >
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
      ;
    </>
  );
};

export default OrderHistoryMobile;
