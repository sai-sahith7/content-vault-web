import "./Item.css";
import ItemMenu from "../Item Menu/ItemMenu";
import { useState } from "react";

export default function WebItem(props) {
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
        <img
          className="item-logo-icon flex-item"
          src="/images/web-item.png"
          alt="Web"
        />
        {props.hasAccess ? (
          <img
            className="item-delete-icon pointer flex-item"
            src="/images/delete.png"
            alt="Delete"
            onClick={toggleMenu}
          />
        ) : null}
      </div>
      <a
        href={props.item.url}
        target="_blank"
        rel="noreferrer"
        className="web-item-container flex-container-row flex-item"
      >
        <img
          className="web-item-image flex-item"
          src={props.item.image ? props.item.image : "/images/web-logo.png"}
          alt="Web"
        />
        <div className="web-item-info flex-container-column flex-item">
          <section className="web-item-title item-title flex-item">
            {props.item.title ? props.item.title : props.item.url}
          </section>
          <section className="item-description flex-item">
            {props.item.description}
          </section>
        </div>
      </a>
    </div>
  );
}
