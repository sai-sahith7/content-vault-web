import "./Collection.css";
import CollectionMenu from "../Dashboard-Collection-Menu/Collection-menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const collectionAPI = require("../../api/Collection");

export default function Collection(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [editName, setEditName] = useState(false);
  const [collectionName, setCollectionName] = useState(props.collection.name);

  function toggleMenu(event) {
    setShowMenu(!showMenu);
    document.addEventListener("click", (e) => {
      if (e.target !== event.target) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    });
  }

  function toggleEditName(event) {
    setEditName(!editName);
  }

  function handleEditNameOnChange(event) {
    setCollectionName(event.target.value);
  }

  function renameCollection(event) {
    const collectionName = document.getElementById(
      "edit-collection-name"
    ).value;
    collectionAPI
      .editCollection(props.collection._id, collectionName)
      .then((collection) => {
        props.setCollections(function (prev) {
          const newCollections = prev.map((collection) => {
            if (collection._id === props.collection._id)
              collection.name = collectionName;
            return collection;
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
          id="edit-collection-name"
          type="text"
          className="edit-collection-input flex-item"
          placeholder="Collection Name"
          onChange={handleEditNameOnChange}
          value={collectionName}
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
          toggleEditName={toggleEditName}
          collection={props.collection}
        />
      )}
      <img
        src="/images/menu-button.png"
        onClick={toggleMenu}
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
            alt="Visibility"
            className="dashboard-collection-visibility flex-item"
          />
        ) : (
          <img
            src="/images/private.png"
            alt="Visibility"
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
