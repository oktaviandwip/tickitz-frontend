import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Icon from "../../components/auth/TickitzIcon.jsx";
import Background from "../../components/auth/Background.jsx";
import EmailPassword from "../../components/auth/EmailPassword.jsx";
import Button from "../../components/elements/Button.jsx";
import GoogleFb from "../../components/auth/GoogleFb.jsx";

import numberOne from "../../assets/number-1.svg";
import numberTwo from "../../assets/number-2.svg";
import numberThree from "../../assets/number-3.svg";
import stripe from "../../assets/stripe.svg";
import useApi from "../../../utils/useApi.js";

const SignUp = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  // Handle Change
  const handleChange = (e) => {
    const data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      api({
        method: "POST",
        url: "/users",
        data: formData,
      })
        .then((_) => {
          alert("Registration succesful!");
          navigate("/login");
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.error}`);
        });
    }
  };

  // Google Signup
  function handleGoogleSignup() {
    api({
      method: "GET",
      url: "/users/google",
    })
      .then(({ data }) => {
        window.open(data.data, "_self");
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }

  // Input Fields
  const inputs = [
    {
      icon: "mage:email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      autoComplete: "email",
    },
    {
      icon: "codicon:lock",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
    },
  ];

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
              className="w-full h-[345px] md:h-[360px] flex flex-col gap-y-[27px]"
            >
              {inputs.map((field, index) => (
                <EmailPassword
                  key={index}
                  title={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  icon1={field.type === "password" ? "mage:eye" : ""}
                  icon2={field.type === "password" ? "mage:eye-off" : ""}
                  onChange={handleChange}
                />
              ))}

              <label className="flex items-center text-sm md:text-lg text-darkest-grey tracking-wider">
                <input
                  type="checkbox"
                  id="terms-conditions"
                  className="size-5 mr-3 md:mr-6"
                  required
                />
                I agree to terms & conditions
              </label>

              <Button
                text={"Join For Free Now"}
                width={"full"}
                height={"[112px]"}
              />
            </form>

            <p className="text-darkest-grey text-center tracking-wider font-inter md:font-semibold mt-6">
              <span>Already have an account? </span>
              <Link to="/login" className="text-blue underline">
                Log in
              </Link>
            </p>

            <GoogleFb handleGoogle={handleGoogleSignup} />
          </section>
        </div>
      </Background>
    </div>
  );
};

export default SignUp;
