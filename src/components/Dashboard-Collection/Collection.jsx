import "./Collection.css";
import CollectionMenu from "../Dashboard-Collection-Menu/Collection-menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useMenu from "../../utils/useMenu";
const collectionAPI = require("../../api/Collection");
const keyboard = require("../../utils/keyboard");

export default function Collection(props) {
  const { showMenu, toggleMenu, menuButton } = useMenu();
  const [editName, setEditName] = useState(false);
  const [collectionName, setCollectionName] = useState(props.collection.name);

  function toggleEditName(event) {
    setEditName(!editName);
    setCollectionName(props.collection.name);
  }

  function handleEditNameOnChange(event) {
    setCollectionName(event.target.value);
  }

  function handleEditNameKeyDown(event) {
    if (event.key === "Enter") {
      renameCollection();
    } else if (event.key === "Escape") {
      toggleEditName();
    }
  }

  function renameCollection(event) {
    if (!collectionName.trim()) {
      return;
    }
    collectionAPI
      .editCollection(props.collection._id, collectionName.trim())
      .then((collection) => {
        if (props.handleError(collection)) {
          return;
        }
        props.setCollections(function (prev) {
          const newCollections = prev.map((prevCollection) => {
            if (prevCollection._id === props.collection._id)
              return { ...prevCollection, name: collection.name };
            return prevCollection;
          });
          return newCollections;
        });
        setEditName(false);
      });
  }

  return editName ? (
    <div className="dashboard-collection flex-container-column flex-item">
      <div className="edit-collection-name-container flex-container-column">
        <input
          type="text"
          className="edit-collection-input flex-item"
          placeholder="Collection Name"
          aria-label="Collection Name"
          onChange={handleEditNameOnChange}
          onKeyDown={handleEditNameKeyDown}
          value={collectionName}
          autoFocus
        />
        <div className="edit-collection-button-container flex-container-row flex-item">
          <button
            onClick={toggleEditName}
            className="edit-collection-cancel-button flex-item"
          >
            Cancel
          </button>
          <button
            onClick={renameCollection}
            className="edit-collection-confirm-button flex-item"
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="dashboard-collection flex-container-column flex-item">
      {showMenu && (
        <CollectionMenu
          setCollections={props.setCollections}
          handleError={props.handleError}
          toggleEditName={toggleEditName}
          collection={props.collection}
        />
      )}
      <img
        ref={menuButton}
        src="/images/menu-button.png"
        onClick={toggleMenu}
        onKeyDown={keyboard.click(toggleMenu)}
        role="button"
        tabIndex={0}
        alt="Menu"
        className="dashboard-collection-menu flex-item"
      />
      <NavLink
        className="dashboard-collection-title flex-item"
        to={`/collection/${props.collection._id}`}
      >
        <h2 className="dashboard-collection-title flex-item">
          {props.collection.name}
        </h2>
      </NavLink>
      <div className="dashboard-collection-footer flex-container-row flex-item">
        {props.collection.isPublic ? (
          <img
            src="/images/globe.png"
            alt="Public"
            className="dashboard-collection-visibility flex-item"
          />
        ) : (
          <img
            src="/images/private.png"
            alt="Private"
            className="dashboard-collection-visibility flex-item"
          />
        )}
        <section className="dashboard-collection-count flex-item">
          {props.collection.count}
        </section>
      </div>
    </div>
  );
}
