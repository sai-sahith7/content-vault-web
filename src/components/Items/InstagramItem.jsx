import "./Item.css";
import ItemMenu from "../Item Menu/ItemMenu";
import useMenu from "../../utils/useMenu";
const keyboard = require("../../utils/keyboard");

export default function InstagramItem(props) {
  const { showMenu, toggleMenu, menuButton } = useMenu();

  function deleteItem(event) {
    props.deleteItem(props.item._id);
  }

  function getReelId(url) {
    if (url.match(/instagram\.com\/reels?\/([^/?#]+)/))
      return url.match(/instagram\.com\/reels?\/([^/?#]+)/)[1];
    else return null;
  }

  return (
    <div className="item-container flex-container-column flex-item">
      {showMenu ? <ItemMenu deleteItem={deleteItem} /> : null}
      <div className="item-header flex-container-row flex-item">
        <img
          className="item-logo-icon flex-item"
          src="/images/instagram.png"
          alt="Instagram"
        />
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
      <iframe
        src={`https://www.instagram.com/reel/${getReelId(
          props.item.url
        )}/embed/`}
        scrolling="no"
        className="instagram-item-video flex-item"
        title="Instagram Reel"
        style={{
          background: "black",
          maxWidth: "540px",
          width: "calc(100% - 2px)",
          display: "block",
          margin: "0px 0px 12px",
          padding: "0px",
        }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
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
