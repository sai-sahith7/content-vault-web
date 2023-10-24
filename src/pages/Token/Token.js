import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/Loading-Screen/Loading-Screen";
const userAPI = require("../../api/User");

const Token = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Loading.. | Content Vault";
    const cookies = new Cookies();
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const googleAuth = params.get("token");
    cookies.set("token", googleAuth);
    userAPI.getMe().then((response) => {
      navigate("/dashboard");
    });
  }, [navigate]);

  return <LoadingScreen />;
};

export default Token;
