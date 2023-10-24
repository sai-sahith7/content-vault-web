const collectionAPI = require("../../api/Collection");

export default function AddCollectionInput(props) {
  function addCollection(event) {
    const collectionName = document.getElementById("add-collection-name").value;
    collectionAPI.addCollection(collectionName).then((collection) => {
      props.setCollections((prev) => [...prev, collection]);
      props.toggleFunction();
    });
  }

  return (
    <div className="add-collection-input-container flex-container-column">
      <input
        id="add-collection-name"
        type="text"
        className="add-collection-input flex-item"
        placeholder="Collection Name"
      />
      <div className="add-collection-button-container flex-container-row flex-item">
        <button
          onClick={props.toggleFunction}
          className="add-collection-cancel-button flex-item"
        >
          Cancel
        </button>
        <button
          onClick={addCollection}
          className="add-collection-confirm-button flex-item"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
