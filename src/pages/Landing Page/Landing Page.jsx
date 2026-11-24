import Cookies from "universal-cookie";
import "./Landing Page.css";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
const signIn = require("../../utils/signIn");
const keyboard = require("../../utils/keyboard");

export default function LandingPage() {
  const [searchParams] = useSearchParams();
  const [redirecting, setRedirecting] = useState(false);
  const cookies = new Cookies();
  const returnTo = signIn.safePath(searchParams.get("returnTo"));

  const signInWithGoogle = async () => {
    if (redirecting) {
      return;
    }
    setRedirecting(true);
    signIn.signInWithGoogle(returnTo);
  };

  function getMessage() {
    if (redirecting) {
      return "Redirecting to Google...";
    } else if (searchParams.get("auth") === "failed") {
      return "Sign in failed. Please try again.";
    } else if (searchParams.get("reason") === "expired") {
      return "Your session expired. Please sign in again.";
    } else if (returnTo) {
      return "Sign in to continue.";
    }
    return null;
  }

  useEffect(() => {
    document.title = "Content Vault";
  }, []);

  if (cookies.get("token")) {
    return <Navigate to={returnTo || "/dashboard"} replace />;
  }

  const message = getMessage();

  return (
    <div className="landingPage flex-container-column">
      <h1 className="landingPage-header flex-item">Content Vault</h1>
      <p className="landingPage-tagLine flex-item">
        Your Treasure Trove of Online Awesomeness
      </p>
      <img
        className={`signInButton flex-item${
          redirecting ? " signInButton-redirecting" : ""
        }`}
        src="/images/Sign-in-with-Google.png"
        alt="Sign in with Google"
        role="button"
        tabIndex={0}
        aria-disabled={redirecting}
        onClick={signInWithGoogle}
        onKeyDown={keyboard.click(signInWithGoogle)}
      />
      {message ? (
        <p className="landingPage-message flex-item">{message}</p>
      ) : null}
    </div>
  );
}
