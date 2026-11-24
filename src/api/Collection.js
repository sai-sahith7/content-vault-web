import instance, { handleError } from "./init";

export const getCollections = async () => {
  return await instance
    .get("/collections")
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};

export const getCollectionById = async (collectionId) => {
  return await instance
    .get(`/collections/${collectionId}`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};

export const addCollection = async (collectionName) => {
  return await instance
    .post("/collections", { name: collectionName })
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};

export const editCollection = async (collectionId, collectionName) => {
  return await instance
    .put(`/collections/${collectionId}`, { name: collectionName })
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};

export const changeVisibility = async (collectionId) => {
  return await instance
    .post(`/collections/changeVisibility`, { id: collectionId })
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};

export const deleteCollection = async (collectionId) => {
  return await instance
    .delete(`/collections/${collectionId}`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};
