import "./Collection Nav.css";
import CollectionItem from "./Collection Item";

export default function CollectionNav(props) {
  return (
    <div className="collection-nav-container flex-container-column flex-item">
      {props.collections.length === 0 ? (
        <div className="collection-nav-empty flex-container-row flex-item">
          <section>No Collections</section>
        </div>
      ) : (
        <div className="collection-nav-list flex-container-column flex-item">
          {props.collections.map((collection) => (
            <CollectionItem key={collection._id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
