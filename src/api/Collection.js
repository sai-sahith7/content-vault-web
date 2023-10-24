import instance from "./init";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getCollections = async () => {
  return await instance
    .get("/collections", {
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

export const getCollectionById = async (collectionId) => {
  return await instance
    .get(`/collections/${collectionId}`, {
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

export const addCollection = async (collectionName) => {
  return await instance
    .post(
      "/collections",
      { name: collectionName },
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

export const editCollection = async (collectionId, collectionName) => {
  return await instance
    .put(
      `/collections/${collectionId}`,
      { name: collectionName },
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

export const changeVisibility = async (collectionId) => {
  return await instance
    .post(
      `/collections/changeVisibility`,
      { id: collectionId },
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

export const deleteCollection = async (collectionId) => {
  return await instance
    .delete(`/collections/${collectionId}`, {
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
