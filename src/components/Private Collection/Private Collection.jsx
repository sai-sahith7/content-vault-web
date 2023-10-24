import "./Private Collection.css";

export default function PrivateCollection() {
  return (
    <div className="private-collection-container flex-container-column">
      <img
        className="private-collection-image"
        src="/images/private-collection.png"
        alt="private collection"
      />
      <h1 className="private-collection-title">
        This is a private collection.
      </h1>
      <p className="private-collection-description">
        You do not have access to view this collection
      </p>
    </div>
  );
}
