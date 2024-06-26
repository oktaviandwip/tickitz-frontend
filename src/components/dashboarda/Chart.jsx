import { useState } from "react";
import dropdown from "../../assets/dropdown.svg";
import Button from "../elements/Button";
import graph from "../../assets/graph.png";

const Chart = ({ title, data1, data2 }) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const handleSelectChange1 = (event) => {
    setValue1(event.target.value + ",");
  };

  const handleSelectChange2 = (event) => {
    setValue2(event.target.value);
  };

  const sales = [data1, data2];

  return (
    <div className="w-full h-[750px] md:h-[650px] lg:h-[690px] xl:h-[709px] flex justify-center rounded-2xl bg-white mb-[49px]">
      <div className="w-[267px] md:w-[700px] lg:w-[850px] xl:w-[990px] md:h-[500px] lg:h-[600px] xl:h-[631px] mt-[39px] ">
        <div className="font-bold text-2xl leading-[30px]">{title}</div>
        <div className="flex flex-col md:flex-row md:items-start md:space-x-[15px] xl:space-x-[10px] my-5">
          {sales.map((d, index) => (
            <div key={index} className="relative flex flex-col">
              <div className="absolute top-6 md:top-[22px] left-[220px] md:left-[190px]">
                <img src={dropdown} alt="dropdown icon" className="z-10" />
              </div>
              <div className="w-full h-[50px] bg-[#EFF0F6] rounded-md flex items-center mb-5">
                <select
                  className="relative w-full md:w-[234px] bg-transparent outline-none pl-5 appearance-none capitalize"
                  onChange={
                    index === 0 ? handleSelectChange1 : handleSelectChange2
                  }
                >
                  <option disabled selected>
                    {d[0]}
                  </option>
                  {d[1].map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <Button text={"Filter"} width={"[120px]"} height={"[50px]"} />
        </div>
        <div className="text-[15px] font-bold leading-5 my-6 md:my-0 md:mb-12">
          {value1} {value2}
        </div>
        <div className="w-full overflow-auto">
          <div className="w-[952px] h-[364px]">
            <img src={graph} alt="graph" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
