import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function useApi(urls = "") {
  const { token } = useSelector((s) => s.auth);

  const [requests, setRequests] = useState({
    baseURL: import.meta.env.VITE_APP_BASEURL || urls,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    setRequests({
      ...requests,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return axios.create(requests);
}

export default useApi;
