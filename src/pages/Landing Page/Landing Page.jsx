import Cookies from "universal-cookie";
import "./Landing Page.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    window.open(url, "_self");
  };

  useEffect(() => {
    document.title = "Content Vault";
    const cookies = new Cookies();
    if (cookies.get("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="landingPage flex-container-column">
      <h1 className="landingPage-header flex-item">Content Vault</h1>
      <p className="landingPage-tagLine flex-item">
        Your Treasure Trove of Online Awesomeness
      </p>
      <img
        className="signInButton flex-item"
        src="/images/Sign-in-with-Google.png"
        alt="Sign in with Google"
        onClick={signInWithGoogle}
      />
    </div>
  );
}
