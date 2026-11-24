import instance, { handleError } from "./init";

export const getItems = async (collectionId) => {
  return await instance
    .get(`/items/${collectionId}`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};

export const addItem = async (url, collectionId) => {
  return await instance
    .post("/items", {
      collectionId: collectionId,
      url: url,
    })
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};

export const deleteItem = async (itemId) => {
  return await instance
    .delete(`/items/${itemId}`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
};
