import Cookies from "universal-cookie";

export const clearData = async () => {
  const cookies = new Cookies();
  const removeCookie = async () => {
    cookies.remove("user", { path: "/" });
    cookies.remove("token", { path: "/" });
  };
  await removeCookie().then(() => {
    return true;
  });
};
