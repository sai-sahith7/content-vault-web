import instance, { handleError } from "./init";

export const getMe = async () => {
  return await instance
    .get("/user/me")
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};
