import "./Item.css";
import ItemMenu from "../Item Menu/ItemMenu";
import { useEffect } from "react";
import render from "../Collection Page Body/X-render";
import useMenu from "../../utils/useMenu";
const keyboard = require("../../utils/keyboard");

export default function XItem(props) {
  const { showMenu, toggleMenu, menuButton } = useMenu();

  useEffect(() => {
    render();
  }, []);

  function deleteItem(event) {
    props.deleteItem(props.item._id);
  }

  return (
    <div className="item-container flex-container-column flex-item">
      {showMenu ? <ItemMenu deleteItem={deleteItem} /> : null}
      <div className="item-header flex-container-row flex-item">
        <img className="item-logo-icon flex-item" src="/images/X.png" alt="X" />
        {props.hasAccess ? (
          <img
            ref={menuButton}
            className="item-delete-icon pointer flex-item"
            src="/images/delete.png"
            alt="Delete"
            role="button"
            tabIndex={0}
            onClick={toggleMenu}
            onKeyDown={keyboard.click(toggleMenu)}
          />
        ) : null}
      </div>
      <blockquote className="twitter-tweet">
        <a
          href={props.item.url.replace(
            /\/\/(www\.)?x\.com\//,
            "//twitter.com/"
          )}
        >
          Fetching the tweet...
        </a>
      </blockquote>
      <a
        href={props.item.url}
        target="_blank"
        rel="noreferrer"
        className="item-title flex-item"
      >
        {props.item.title ? props.item.title : props.item.url}
      </a>
    </div>
  );
}
