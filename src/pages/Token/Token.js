import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/Loading-Screen/Loading-Screen";
const userAPI = require("../../api/User");
const clearCookies = require("../../utils/clearCookies");
const signIn = require("../../utils/signIn");

const getExpiry = (token) => {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return payload.exp ? new Date(payload.exp * 1000) : null;
  } catch (error) {
    return null;
  }
};

const Token = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Loading.. | Content Vault";
    const cookies = new Cookies();
    const { hash, search, pathname } = window.location;
    const params = new URLSearchParams(hash ? hash.slice(1) : search);
    const googleAuth = params.get("token");
    window.history.replaceState(window.history.state, "", pathname);
    const expires = getExpiry(googleAuth);
    if (!googleAuth || !expires) {
      navigate("/?auth=failed", { replace: true });
      return;
    }
    const options = {
      path: "/",
      expires: expires,
      sameSite: "lax",
      secure: window.location.protocol === "https:",
    };
    cookies.set("token", googleAuth, options);
    userAPI.getMe().then((user) => {
      if (user.unauthorized || user.notFound || user.error) {
        clearCookies.clearData().then(() => {
          navigate("/?auth=failed", { replace: true });
        });
        return;
      }
      cookies.set("user", user, options);
      navigate(signIn.getReturnTo(), { replace: true });
    });
  }, [navigate]);

  return <LoadingScreen />;
};

export default Token;
