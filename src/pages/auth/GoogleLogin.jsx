import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducer/auth.js";
import { getProfile } from "../../store/reducer/user.js";
import useApi from "../../../utils/useApi.js";

const GoogleLogin = () => {
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  // Get Data from URL Params
  const params = new URLSearchParams(window.location.search);
  const data = {};
  params.forEach((value, key) => {
    data[key] = value;
  });

  useEffect(() => {
    if (hasFetched.current) return; // Prevent the effect from running again
    hasFetched.current = true;

    api({
      method: "POST",
      url: "/auth",
      data,
    })
      .then(({ data }) => {
        dispatch(getProfile(data.profile));
        dispatch(login(data.token));
        navigate("/login");
        alert("Login succesful!");
      })
      .catch(({ response }) => {
        navigate("/login");
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }, []);

  return <div></div>;
};

export default GoogleLogin;
