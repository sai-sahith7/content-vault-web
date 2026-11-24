import "./Collection-menu.css";
import { useState } from "react";
const collectionAPI = require("../../api/Collection");
const keyboard = require("../../utils/keyboard");

export default function CollectionMenu(props) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [copied, setCopied] = useState(false);

  function changeVisibility(event) {
    collectionAPI.changeVisibility(props.collection._id).then((collection) => {
      if (props.handleError(collection)) {
        return;
      }
      props.setCollections(function (prev) {
        const newCollections = prev.map((prevCollection) => {
          if (prevCollection._id === props.collection._id)
            return { ...prevCollection, isPublic: collection.isPublic };
          return prevCollection;
        });
        return newCollections;
      });
    });
  }

  function copyLink(event) {
    event.stopPropagation();
    navigator.clipboard
      .writeText(`${window.location.origin}/collection/${props.collection._id}`)
      .then(() => {
        setCopied(true);
      })
      .catch(() => {
        props.handleError({ error: true });
      });
  }

  function deleteCollection(event) {
    if (!confirmDelete) {
      event.stopPropagation();
      setConfirmDelete(true);
      return;
    }
    collectionAPI.deleteCollection(props.collection._id).then((collection) => {
      if (props.handleError(collection)) {
        return;
      }
      props.setCollections(function (prev) {
        const newCollections = prev.filter((collection) => {
          return collection._id !== props.collection._id;
        });
        return newCollections;
      });
    });
  }

  return (
    <div className="dashboard-collection-menu-container flex-container-column">
      <div
        onClick={props.toggleEditName}
        onKeyDown={keyboard.click(props.toggleEditName)}
        role="button"
        tabIndex={0}
        className="dashboard-collection-menu-item flex-container-row flex-item"
      >
        <img
          src="/images/Edit.png"
          alt="Edit Name"
          className="dashboard-collection-menu-image flex-item"
        />
        <section className="dashboard-collection-menu-text flex-item">
          Edit Name
        </section>
      </div>
      {props.collection.isPublic ? (
        <div
          onClick={changeVisibility}
          onKeyDown={keyboard.click(changeVisibility)}
          role="button"
          tabIndex={0}
          className="dashboard-collection-menu-item flex-container-row flex-item"
        >
          <img
            src="/images/private-dark.png"
            alt="Make Private"
            className="dashboard-collection-menu-image flex-item"
          />
          <section className="dashboard-collection-menu-text flex-item">
            Make Private
          </section>
        </div>
      ) : (
        <div
          onClick={changeVisibility}
          onKeyDown={keyboard.click(changeVisibility)}
          role="button"
          tabIndex={0}
          className="dashboard-collection-menu-item flex-container-row flex-item"
        >
          <img
            src="/images/globe-dark.png"
            alt="Make Public"
            className="dashboard-collection-menu-image flex-item"
          />
          <section className="dashboard-collection-menu-text flex-item">
            Make Public
          </section>
        </div>
      )}
      {props.collection.isPublic ? (
        <div
          onClick={copyLink}
          onKeyDown={keyboard.click(copyLink)}
          role="button"
          tabIndex={0}
          className="dashboard-collection-menu-item flex-container-row flex-item"
        >
          <img
            src="/images/copy-link.png"
            alt="Copy Link"
            className="dashboard-collection-menu-image dashboard-collection-menu-image-dark flex-item"
          />
          <section className="dashboard-collection-menu-text flex-item">
            {copied ? "Link Copied" : "Copy Link"}
          </section>
        </div>
      ) : null}
      <div
        onClick={deleteCollection}
        onKeyDown={keyboard.click(deleteCollection)}
        role="button"
        tabIndex={0}
        className="dashboard-collection-menu-item delete-menu-item flex-container-row flex-item"
      >
        <img
          src="/images/delete.png"
          alt="Delete"
          className="dashboard-collection-menu-image flex-item"
        />
        <section className="dashboard-collection-menu-text flex-item">
          {confirmDelete ? "Confirm Deletion" : "Delete"}
        </section>
      </div>
    </div>
  );
}
