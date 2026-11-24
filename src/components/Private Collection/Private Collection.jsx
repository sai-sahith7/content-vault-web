import "./Private Collection.css";
const signIn = require("../../utils/signIn");
const keyboard = require("../../utils/keyboard");

export default function PrivateCollection(props) {
  function signInWithGoogle() {
    signIn.signInWithGoogle(window.location.pathname);
  }

  return (
    <div className="private-collection-container flex-container-column">
      <img
        className="private-collection-image"
        src="/images/private-collection.png"
        alt="private collection"
      />
      <h1 className="private-collection-title">
        This is a private collection.
      </h1>
      <p className="private-collection-description">
        {props.user
          ? "You do not have access to view this collection"
          : "If this is your collection, sign in to view it"}
      </p>
      {props.user ? null : (
        <img
          onClick={signInWithGoogle}
          onKeyDown={keyboard.click(signInWithGoogle)}
          role="button"
          tabIndex={0}
          className="private-collection-signin"
          src="/images/Sign-in-with-Google.png"
          alt="Sign in with Google"
        />
      )}
    </div>
  );
}
