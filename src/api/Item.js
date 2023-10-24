import instance from "./init";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getItems = async (collectionId) => {
  return await instance
    .get(`/items/${collectionId}`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        cookies.remove("token");
        cookies.remove("items");
        return { unauthorized: true };
      }
    });
};

export const addItem = async (url, collectionId) => {
  return await instance
    .post(
      "/items",
      {
        collectionId: collectionId,
        url: url,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        cookies.remove("token");
        cookies.remove("user");
        return { unauthorized: true };
      }
    });
};

export const deleteItem = async (itemId) => {
  return await instance
    .delete(`/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        cookies.remove("token");
        cookies.remove("user");
        return { unauthorized: true };
      }
    });
};
