import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Login/Icon.jsx";
import Background from "../components/Login/Background.jsx";
import EmailPassword from "../components/Login/EmailPassword.jsx";
import Button from "../components/Movies/Button.jsx";
import GoogleFb from "../components/Login/GoogleFb.jsx";
import useApi from "../../utils/useApi.js";
import { login } from "../store/reducer/user";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useApi();

  const [formData, setFormData] = useState({});
  const { isAuth } = useSelector((s) => s.users);
  const { role } = useSelector((s) => s.users);

  useEffect(() => {
    if (isAuth && role === "admin") {
      navigate("/admin/dashboard");
    } else if (isAuth && role === "user") {
      navigate("/");
    }
    console.log();
  }, [isAuth, role]);

  const handleChange = (e) => {
    const data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api({
      method: "POST",
      url: "/auth",
      data: formData,
    })
      .then(({ data }) => {
        const decodedToken = jwtDecode(data.token);
        dispatch(
          login({
            token: data.token,
            role: decodedToken.role,
            user_id: decodedToken.user_id,
          })
        );
      })
      .catch((err) => {
        alert(`ERROR: ${err.response.data.message}`);
        console.log(err);
      });
  };

  return (
    <div className="mt-[-104px]">
      <Background>
        <Icon />
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md w-[327px] h-[650px] md:w-[546px] md:h-[756px] mt-12 md:mt-5">
          <section className="w-[284px] h-[559px] md:w-[400px] md:h-[609px] flex flex-col justify-between">
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

              <p className="text-sm md:text-base text-blue text-right font-inter mb-[25px] tracking-[0.5px]">
                Forgot your password?
              </p>

              <Button text={"Login"} width={"full"} height={"[112px]"} />
            </form>

            <GoogleFb />
          </section>
        </div>
      </Background>
    </div>
  );
};

export default SignIn;
