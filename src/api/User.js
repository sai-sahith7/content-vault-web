import instance from "./init";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getMe = async () => {
  await instance
    .get("/user/me", {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
    .then((response) => {
      cookies.set("user", response.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        cookies.remove("token");
        cookies.remove("user");
        return { unauthorized: true };
      }
    });
};
