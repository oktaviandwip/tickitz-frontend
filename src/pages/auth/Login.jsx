import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/reducer/auth.js";
import { getProfile } from "../../store/reducer/user.js";

import Icon from "../../components/auth/TickitzIcon.jsx";
import Background from "../../components/auth/Background.jsx";
import EmailPassword from "../../components/auth/EmailPassword.jsx";
import Button from "../../components/elements/Button.jsx";
import GoogleFb from "../../components/auth/GoogleFb.jsx";
import useApi from "../../../utils/useApi.js";

const Login = () => {
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((s) => s.auth);
  const { profile } = useSelector((s) => s.user);

  const [formData, setFormData] = useState({});

  // User or Admin
  useEffect(() => {
    if (isAuth && profile.role === "admin") {
      navigate("/admin/dashboard");
    } else if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

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
        url: "/auth",
        data: formData,
      })
        .then(({ data }) => {
          dispatch(getProfile(data.profile));
          dispatch(login(data.token));
          alert("Login succesful!");
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.error}`);
        });
    }
  };

  // Inputs Fields
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
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md w-[327px] h-[700px] md:w-[546px] md:h-[756px] mt-12 md:mt-5">
          <section className="w-[284px] h-[650px] md:w-[400px] md:h-[675px] flex flex-col justify-between">
            <div>
              <p className="text-[20px] md:text-[32px] md:font-bold tracking-[0.3%] md:tracking-[1px]">
                Welcome Back 👋
              </p>
              <p className="text-[13px] md:text-lg text-dark-grey font-inter my-4 md:my-5 tracking-[0.2px]">
                Sign in with your data that you entered during your registration
              </p>
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
              <Link
                to="/reset-password"
                className="text-sm md:text-base text-blue text-right font-inter tracking-wide"
              >
                Forgot your password?
              </Link>

              <Button text={"Login"} width={"full"} height={"[112px]"} />
            </form>

            <p className="text-darkest-grey text-center tracking-wider font-inter md:font-semibold mt-6">
              <span>Don&#39;t have an account yet? </span>
              <Link
                to="/signup"
                className="block md:inline text-blue underline"
              >
                Sign up
              </Link>
            </p>

            <GoogleFb />
          </section>
        </div>
      </Background>
    </div>
  );
};

export default Login;
