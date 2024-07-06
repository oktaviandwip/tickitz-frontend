import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../../utils/useApi.js";

const GoogleSignup = () => {
  const api = useApi();
  const navigate = useNavigate();
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
      url: "/users",
      data: data,
    })
      .then((_) => {
        alert("Registration succesful!");
        navigate("/login");
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }, []);

  return <div></div>;
};

export default GoogleSignup;
