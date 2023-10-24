import "./Item.css";
import ItemMenu from "../Item Menu/ItemMenu";
import { useState } from "react";
import render from "../Collection Page Body/X-render";

export default function XItem(props) {
  const [showMenu, setShowMenu] = useState(false);

  function deleteItem(event) {
    props.deleteItem(props.item._id);
  }

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

  return (
    <div className="item-container flex-container-column flex-item">
      {showMenu ? <ItemMenu deleteItem={deleteItem} /> : null}
      <div className="item-header flex-container-row flex-item">
        <img className="item-logo-icon flex-item" src="/images/X.png" alt="X" />
        {props.hasAccess ? (
          <img
            className="item-delete-icon pointer flex-item"
            src="/images/delete.png"
            alt="Delete"
            onClick={toggleMenu}
          />
        ) : null}
      </div>
      <blockquote className="twitter-tweet">
        <a href={props.item.url}>Fetching the tweet...</a>
      </blockquote>
      <a
        href={props.item.url}
        target="_blank"
        rel="noreferrer"
        className="item-title flex-item"
      >
        {props.item.title}
      </a>
      {render()}
    </div>
  );
}
