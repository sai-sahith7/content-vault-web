import { useState } from "react";
const collectionAPI = require("../../api/Collection");

export default function AddCollectionInput(props) {
  const [collectionName, setCollectionName] = useState("");
  const [addingCollection, setAddingCollection] = useState(false);

  function handleNameOnChange(event) {
    setCollectionName(event.target.value);
  }

  function handleNameKeyDown(event) {
    if (event.key === "Enter") {
      addCollection();
    } else if (event.key === "Escape") {
      props.toggleFunction();
    }
  }

  function addCollection(event) {
    if (!collectionName.trim() || addingCollection) {
      return;
    }
    setAddingCollection(true);
    collectionAPI.addCollection(collectionName.trim()).then((collection) => {
      setAddingCollection(false);
      if (props.handleError(collection)) {
        return;
      }
      props.setCollections((prev) => [...prev, collection]);
      props.toggleFunction();
    });
  }

  return (
    <div className="add-collection-input-container flex-container-column">
      <input
        type="text"
        className="add-collection-input flex-item"
        placeholder="Collection Name"
        aria-label="Collection Name"
        value={collectionName}
        onChange={handleNameOnChange}
        onKeyDown={handleNameKeyDown}
        autoFocus
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
          disabled={addingCollection}
          className="add-collection-confirm-button flex-item"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
