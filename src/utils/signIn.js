export const safePath = (path) => {
  if (
    path &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.startsWith("/\\")
  ) {
    return path;
  }
  return null;
};

export const signInWithGoogle = (returnTo) => {
  sessionStorage.setItem("returnTo", safePath(returnTo) || "");
  window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_self");
};

export const getReturnTo = () => {
  const returnTo = safePath(sessionStorage.getItem("returnTo"));
  sessionStorage.removeItem("returnTo");
  return returnTo || "/dashboard";
};
