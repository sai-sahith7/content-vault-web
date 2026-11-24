import "./Collection Body.css";
import LoadingScreen from "../Loading-Screen/Loading-Screen";
import InstagramItem from "../Items/InstagramItem";
import YoutubeItem from "../Items/YoutubeItem";
import XItem from "../Items/XItem";
import WebItem from "../Items/WebItem";
import { useEffect, useState } from "react";
const itemsAPI = require("../../api/Item");
const keyboard = require("../../utils/keyboard");

export default function CollectionBody(props) {
  const [addItem, setAddItem] = useState(false);
  const [items, setItems] = useState([]);
  const [url, setURL] = useState("");
  const [validURL, setValidURL] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const hasAccess = Boolean(props.collection.isOwner);
  const handleError = props.handleError;

  useEffect(() => {
    let ignore = false;
    setShowLoading(true);
    itemsAPI.getItems(props.collection._id).then((items_data) => {
      if (ignore) {
        return;
      }
      if (!handleError(items_data)) {
        setItems(Array.isArray(items_data) ? items_data : []);
      }
      setShowLoading(false);
    });
    return () => {
      ignore = true;
    };
  }, [props.collection, handleError]);

  function toggleAddItem() {
    setAddItem(!addItem);
    setURL("");
    setValidURL(false);
  }

  function validateURL(event) {
    const url = event.target.value;
    setURL(url);
    try {
      if (!["http:", "https:"].includes(new URL(url.trim()).protocol)) {
        throw new TypeError("Invalid URL");
      }
      event.target.style.border = "1px solid green";
      setValidURL(true);
    } catch (err) {
      event.target.style.border = "1px solid red";
      setValidURL(false);
    }
  }

  function handleAddItemKeyDown(event) {
    if (event.key === "Enter") {
      addItemToCollection();
    } else if (event.key === "Escape") {
      toggleAddItem();
    }
  }

  function addItemToCollection() {
    const collectionId = props.collection._id;
    if (!validURL || addingItem) {
      return;
    }
    setAddingItem(true);
    itemsAPI.addItem(url.trim(), collectionId).then((item) => {
      setAddingItem(false);
      if (handleError(item)) {
        return;
      }
      setItems((prevItems) => {
        return [...prevItems, item];
      });
      toggleAddItem();
    });
  }

  function deleteItem(itemId) {
    itemsAPI.deleteItem(itemId).then((response) => {
      if (handleError(response)) {
        return;
      }
      setItems((prevItems) => {
        return prevItems.filter((item) => {
          return item._id !== itemId;
        });
      });
    });
  }

  function copyLink() {
    navigator.clipboard
      .writeText(`${window.location.origin}/collection/${props.collection._id}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        handleError({ error: true });
      });
  }

  return showLoading ? (
    <LoadingScreen />
  ) : (
    <div className="collection-body-container flex-container-column flex-item">
      <div className="collection-body-header flex-container-row flex-item">
        <h2 className="collection-body-title flex-item">
          {props.collection.name}
        </h2>
        {hasAccess && props.collection.isPublic ? (
          <img
            className="collection-body-copy-link pointer flex-item"
            src={copied ? "/images/tick.png" : "/images/copy-link.png"}
            alt={copied ? "Link Copied" : "Copy Link"}
            title={copied ? "Link Copied" : "Copy Link"}
            role="button"
            tabIndex={0}
            onClick={copyLink}
            onKeyDown={keyboard.click(copyLink)}
          />
        ) : null}
      </div>
      {!hasAccess && props.collection.owner && props.collection.owner.name ? (
        <div className="collection-body-owner flex-container-row flex-item">
          {props.collection.owner.avatar ? (
            <img
              className="collection-body-owner-image flex-item"
              src={props.collection.owner.avatar}
              alt={props.collection.owner.name}
              referrerPolicy="no-referrer"
            />
          ) : null}
          <section className="collection-body-owner-name flex-item">
            {props.collection.owner.name}
          </section>
        </div>
      ) : null}
      <div className="items-container flex-container-column flex-item">
        {items.length !== 0 ? (
          items.map((item) => {
            if (item.type === "Instagram") {
              return (
                <InstagramItem
                  key={item._id}
                  item={item}
                  collectionId={props.collection._id}
                  deleteItem={deleteItem}
                  hasAccess={hasAccess}
                />
              );
            } else if (item.type === "YouTube") {
              return (
                <YoutubeItem
                  key={item._id}
                  item={item}
                  collectionId={props.collection._id}
                  deleteItem={deleteItem}
                  hasAccess={hasAccess}
                />
              );
            } else if (item.type === "X") {
              return (
                <XItem
                  key={item._id}
                  item={item}
                  collectionId={props.collection._id}
                  deleteItem={deleteItem}
                  hasAccess={hasAccess}
                />
              );
            } else {
              return (
                <WebItem
                  key={item._id}
                  item={item}
                  collectionId={props.collection._id}
                  deleteItem={deleteItem}
                  hasAccess={hasAccess}
                />
              );
            }
          })
        ) : (
          <div className="items-empty flex-container-row flex-item">
            <section className="items-empty-text">
              Collection is Empty 👻
            </section>
          </div>
        )}
      </div>
      {addItem ? (
        <div className="add-item-container flex-container-row">
          <img
            className="add-item-container-image flex-item"
            src="/images/web-logo.png"
            alt="Web"
          />
          <input
            type="text"
            placeholder="Paste your URL here..."
            className="add-item-container-input flex-item"
            aria-label="URL"
            value={url}
            onChange={validateURL}
            onKeyDown={handleAddItemKeyDown}
            disabled={addingItem}
            autoFocus
          />
          <img
            className={`add-item-container-image pointer flex-item${
              !validURL || addingItem
                ? " add-item-container-image-disabled"
                : ""
            }`}
            src="/images/tick.png"
            alt="Add"
            role="button"
            tabIndex={0}
            aria-disabled={!validURL || addingItem}
            onClick={addItemToCollection}
            onKeyDown={keyboard.click(addItemToCollection)}
          />
          <img
            className="add-item-container-image pointer flex-item"
            src="/images/cross.png"
            alt="Cancel"
            role="button"
            tabIndex={0}
            onClick={toggleAddItem}
            onKeyDown={keyboard.click(toggleAddItem)}
          />
        </div>
      ) : hasAccess ? (
        <img
          className="add-item-image flex-item"
          src="/images/add-item.png"
          alt="Add"
          role="button"
          tabIndex={0}
          onClick={toggleAddItem}
          onKeyDown={keyboard.click(toggleAddItem)}
        />
      ) : null}
    </div>
  );
}
