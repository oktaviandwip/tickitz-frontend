import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Login/Icon.jsx";
import Background from "../components/Login/Background.jsx";
import numberOne from "../assets/number-1.svg";
import numberTwo from "../assets/number-2.svg";
import numberThree from "../assets/number-3.svg";
import stripe from "../assets/stripe.svg";
import EmailPassword from "../components/Login/EmailPassword.jsx";
import Button from "../components/Movies/Button.jsx";
import GoogleFb from "../components/Login/GoogleFb.jsx";
import useApi from "../../utils/useApi.js";

const SignUp = () => {
  const navigate = useNavigate();
  const api = useApi();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      api({
        method: "POST",
        url: "/users/sign-up",
        data: formData,
      })
        .then((_) => {
          alert("Registration succesful!");
          navigate("/sign-in");
        })
        .catch((err) => {
          alert("ERROR: Email has been used!");
          console.log(err);
        });
    }
  };

  return (
    <div className="mt-[-104px]">
      <Background>
        <Icon />
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md w-[327px] h-[591px] md:w-[546px] md:h-[756px] mt-12 md:mt-5">
          <section className="w-[284px] h-[506px] md:w-[400px] md:h-[667px] flex flex-col justify-between">
            <div className="hidden md:flex justify-between w-[397px] text-sm mb-[46px]">
              <div className="flex flex-col justify-between items-center h-[75px]">
                <img src={numberOne} alt="number 1" />
                <p>Fill Form</p>
              </div>
              <img src={stripe} alt="Stripe" />
              <div className="flex flex-col justify-between items-center h-[75px]">
                <img src={numberTwo} alt="number 2" />
                <p className="text-dark-grey">Activate</p>
              </div>
              <img src={stripe} alt="stripe" />
              <div className="flex flex-col justify-between items-center h-[75px]">
                <img src={numberThree} alt="number 1" />
                <p className="text-dark-grey">Done</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-[100%] h-[330px] md:h-[360px] flex flex-col justify-between"
            >
              <EmailPassword
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
              />
              <EmailPassword
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
              />

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms-conditions"
                  className="w-5 h-5 mr-3 md:mr-6"
                  required
                />
                <label
                  htmlFor="terms-conditions"
                  className="text-sm md:text-lg text-darkest-grey font-mulish tracking-[0.75px]"
                >
                  I agree to terms & conditions
                </label>
              </div>

              <Button
                text={"Join For Free Now"}
                width={"full"}
                height={"[112px]"}
              />
            </form>

            <p className="text-darkest-grey text-center tracking-[0.5px] font-inter md:font-semibold mt-6">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-blue underline">
                Log in
              </Link>
            </p>

            <GoogleFb />
          </section>
        </div>
      </Background>
    </div>
  );
};

export default SignUp;
