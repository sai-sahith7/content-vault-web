import ItemMenu from "../Item Menu/ItemMenu";
import useMenu from "../../utils/useMenu";
import "./Item.css";
const keyboard = require("../../utils/keyboard");

export default function YoutubeItem(props) {
  const { showMenu, toggleMenu, menuButton } = useMenu();

  function deleteItem(event) {
    props.deleteItem(props.item._id);
  }

  function getVideoId(url) {
    if (url.includes("youtube.com/watch?v=")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      const videoId = urlParams.get("v");
      return videoId;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.match(/youtu\.be\/([^?#]+)/)[1];
      return videoId;
    } else if (url.includes("youtube.com/shorts/")) {
      const videoId = url.match(/youtube\.com\/shorts\/([^/?#]+)/)[1];
      return videoId;
    } else {
      return null;
    }
  }

  return (
    <div className="item-container flex-container-column flex-item">
      {showMenu ? <ItemMenu deleteItem={deleteItem} /> : null}
      <div className="item-header flex-container-row flex-item">
        <img
          className="item-logo-icon flex-item"
          src="/images/youtube.png"
          alt="Youtube"
        />
        {props.hasAccess ? (
          <img
            ref={menuButton}
            className="item-delete-icon pointer flex-item"
            role="button"
            tabIndex={0}
            onClick={toggleMenu}
            onKeyDown={keyboard.click(toggleMenu)}
            src="/images/delete.png"
            alt="Delete"
          />
        ) : null}
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${getVideoId(props.item.url)}`}
        className="youtube-item-video flex-item"
        title="Youtube Video"
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
