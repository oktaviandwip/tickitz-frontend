import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Icon from "../../components/auth/TickitzIcon.jsx";
import Background from "../../components/auth/Background.jsx";
import EmailPassword from "../../components/auth/EmailPassword.jsx";
import InputPin from "../../components/auth/InputPin.jsx";
import Button from "../../components/elements/Button.jsx";
import useApi from "../../../utils/useApi.js";

const ResetPassword = () => {
  const api = useApi();
  const navigate = useNavigate();

  let [formData, setFormData] = useState({});
  const [inputPin, setInputPin] = useState(new Array(6).fill(""));
  const [pinSent, setPinSent] = useState(false);
  const [resendPin, setResendPin] = useState(false);
  const [timerCount, setTimerCount] = useState(null);
  const [successPin, setSuccessPin] = useState(false);

  // Handle Change
  const handleChange = (e) => {
    const data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  // Send PIN to Email
  const sendPinToEmail = (e) => {
    e.preventDefault();
    {
      api({
        method: "POST",
        url: "/auth/reset-password",
        data: formData,
      })
        .then(({ data }) => {
          setPinSent(true);
          setFormData({ ...formData, tokenPin: data.data });
          setTimerCount(59);
          setResendPin(false);
          setInputPin(new Array(6).fill(""));
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.error}`);
        });
    }
  };

  // Verify PIN
  const verifyPin = (e) => {
    e.preventDefault();
    formData = { ...formData, pin: inputPin.join("") };
    {
      api({
        method: "POST",
        url: "/auth/reset-password",
        data: formData,
      })
        .then(({ data }) => {
          setFormData({ ...formData, id: data.id });
          setSuccessPin(true);
          alert("Input PIN successful!");
        })
        .catch(({ response }) => {
          console.log(response.data);
          setInputPin(new Array(6).fill(""));
          alert(`ERROR: ${response.data.error}`);
        });
    }
  };

  // Set Timer to Resend PIN
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerCount((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setResendPin(true);
          return;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pinSent, resendPin]);

  // Handle Update Password
  const updatePassword = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      alert("Passwords are not the same!");
      return;
    }

    // Send API request
    {
      api({
        method: "PUT",
        url: "/auth/reset-password",
        data: formData,
      })
        .then((_) => {
          navigate("/login");
          alert("Update password successful!");
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.error}`);
        });
    }
  };

  // Input Fields for Password
  const passwords = [
    {
      icon: "codicon:lock",
      type: "password",
      title: "new password",
      name: "password",
      placeholder: "Enter your password",
    },
    {
      icon: "codicon:lock",
      type: "password",
      title: "confirm password",
      name: "confirm_password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <div className="mt-[-104px]">
      <Background>
        <Icon />
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md w-[327px] md:w-[546px] my-12 md:my-5">
          <section className="w-[284px] md:w-[400px] flex flex-col justify-between mt-12 mb-20">
            <div>
              <p className="text-[20px] md:text-[32px] md:font-bold tracking-[0.3%] md:tracking-[1px]">
                Reset Password 🔒
              </p>
              <p className="text-[13px] md:text-lg text-dark-grey font-inter my-4 md:my-5 tracking-wide">
                {!pinSent
                  ? "Enter your registered email and we will send you PIN to reset your password."
                  : !successPin
                  ? `We've sent PIN to ${formData.email}`
                  : "Please set your new password."}
              </p>
            </div>

            <form
              onSubmit={
                !pinSent
                  ? sendPinToEmail
                  : !successPin
                  ? verifyPin
                  : updatePassword
              }
              className="w-full flex flex-col"
            >
              <div className="flex flex-col gap-y-4">
                {!pinSent ? (
                  <>
                    <EmailPassword
                      title="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                    />
                    <Button
                      text={"Send PIN"}
                      width={"full"}
                      height={"[56px]"}
                    />

                    <p className="text-darkest-grey text-center tracking-wider font-inter md:font-semibold">
                      <span>Don&#39;t have an account yet? </span>

                      <Link
                        to="/signup"
                        className="block md:inline text-blue underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </>
                ) : !successPin ? (
                  <>
                    <InputPin pin={inputPin} setPin={setInputPin} />

                    <button
                      className={`w-full bg-blue text-white disabled:text-[#88888F] disabled:bg-[#88888f3f] rounded-[8px] tracking-wider p-4`}
                      disabled={inputPin.includes("")}
                    >
                      Confirm
                    </button>

                    <p className="text-darkest-grey text-center tracking-wider font-inter md:font-semibold">
                      <span>Didn&#39;t receive PIN code? </span>

                      <div
                        className="block md:inline text-blue underline"
                        onClick={resendPin ? sendPinToEmail : null}
                      >
                        {resendPin
                          ? "Resend PIN"
                          : `Resend PIN in ${timerCount}s`}
                      </div>
                    </p>
                  </>
                ) : (
                  <>
                    {passwords.map((field, index) => (
                      <EmailPassword
                        key={index}
                        title={field.title}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        icon1={"mage:eye"}
                        icon2={"mage:eye-off"}
                        onChange={handleChange}
                      />
                    ))}
                    <div className="my-5">
                      <Button
                        text={"Update Password"}
                        width={"full"}
                        height={"[56px]"}
                      />
                    </div>
                  </>
                )}
              </div>
            </form>
          </section>
        </div>
      </Background>
    </div>
  );
};

export default ResetPassword;
