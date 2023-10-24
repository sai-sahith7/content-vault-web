import "./Collection Body.css";
import LoadingScreen from "../Loading-Screen/Loading-Screen";
import InstagramItem from "../Items/InstagramItem";
import YoutubeItem from "../Items/YoutubeItem";
import XItem from "../Items/XItem";
import WebItem from "../Items/WebItem";
import render from "./X-render";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const itemsAPI = require("../../api/Item");

export default function CollectionBody(props) {
  const [addItem, setAddItem] = useState(false);
  const [items, setItems] = useState([]);
  const [hasAccess, setHasAccess] = useState(true);
  const [validURL, setValidURL] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    itemsAPI.getItems(props.collection._id).then((items_data) => {
      setItems(items_data);
      if (
        props.collection.isPublic &&
        props.collection.ownerEmail !== cookies.get("user").email
      ) {
        setHasAccess(false);
      }
      render();
      setShowLoading(false);
    });
  }, [props.collection]);

  function toggleAddItem() {
    setAddItem(!addItem);
  }

  function validateURL(event) {
    const url = event.target.value;
    try {
      new URL(url);
      event.target.style.border = "1px solid green";
      setValidURL(true);
    } catch (err) {
      event.target.style.border = "1px solid red";
      setValidURL(false);
    }
  }

  function addItemToCollection(event) {
    const url = event.target.previousSibling.value;
    const collectionId = props.collection._id;
    if (!validURL) {
      return;
    }
    itemsAPI.addItem(url, collectionId).then((item) => {
      setItems((prevItems) => {
        return [...prevItems, item];
      });
    });
    toggleAddItem();
  }

  function deleteItem(itemId) {
    itemsAPI.deleteItem(itemId).then((item) => {
      setItems((prevItems) => {
        return prevItems.filter((item) => {
          return item._id !== itemId;
        });
      });
    });
  }

  return showLoading ? (
    <LoadingScreen />
  ) : (
    <div className="collection-body-container flex-container-column flex-item">
      <h2 className="collection-body-title flex-item">
        {props.collection.name}
      </h2>
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
            onChange={validateURL}
          />
          <img
            className="add-item-container-image pointer flex-item"
            src="/images/tick.png"
            alt="Add"
            onClick={addItemToCollection}
          />
          <img
            className="add-item-container-image pointer flex-item"
            src="/images/cross.png"
            alt="Cancel"
            onClick={toggleAddItem}
          />
        </div>
      ) : hasAccess ? (
        <img
          className="add-item-image flex-item"
          src="/images/add-item.png"
          onClick={toggleAddItem}
          alt="Add"
        />
      ) : null}
    </div>
  );
}
