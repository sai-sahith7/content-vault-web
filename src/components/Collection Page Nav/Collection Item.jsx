import { NavLink } from "react-router-dom";

export default function CollectionItem(props) {
  return (
    <NavLink
      to={`/collection/${props.collection._id}`}
      className="collection-item-container flex-container-row flex-item"
    >
      {props.collection.isPublic ? (
        <img
          className="flex-item collection-item-icon"
          src="/images/globe.png"
          alt="Public"
        />
      ) : (
        <img
          className="flex-item collection-item-icon"
          src="/images/private.png"
          alt="Private"
        />
      )}
      <section className="collection-item-name flex-item">
        {props.collection.name}
      </section>
    </NavLink>
  );
}
