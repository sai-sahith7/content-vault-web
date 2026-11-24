export const click = (callback) => {
  return (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback(event);
    }
  };
};
