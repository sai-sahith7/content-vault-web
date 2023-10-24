import { useState } from "react";
import "./Add-Collection.css";
import AddCollectionInput from "./Input-Container";

export default function AddCollection(props) {
  const [showAddCollectionInput, setShowAddCollectionInput] = useState(false);

  function toggleAddCollectionInput() {
    setShowAddCollectionInput(!showAddCollectionInput);
  }

  return (
    <div className="dashboard-add-collection flex-container-column flex-item">
      {showAddCollectionInput ? null : (
        <img
          src="/images/add-collection.png"
          onClick={toggleAddCollectionInput}
          alt="Add Collection"
          className="dashboard-add-collection-image flex-item"
        />
      )}
      {showAddCollectionInput ? (
        <AddCollectionInput
          setCollections={props.setCollections}
          toggleFunction={toggleAddCollectionInput}
        />
      ) : null}
    </div>
  );
}
