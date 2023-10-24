import "./Collection-menu.css";

const collectionAPI = require("../../api/Collection");

export default function CollectionMenu(props) {
  function changeVisibility(event) {
    collectionAPI.changeVisibility(props.collection._id).then((collection) => {
      props.setCollections(function (prev) {
        const newCollections = prev.map((collection) => {
          if (collection._id === props.collection._id)
            collection.isPublic = !collection.isPublic;
          return collection;
        });
        return newCollections;
      });
    });
  }

  function deleteCollection(event) {
    collectionAPI.deleteCollection(props.collection._id).then((collection) => {
      props.setCollections(function (prev) {
        const newCollections = prev.filter((collection) => {
          return collection._id !== props.collection._id;
        });
        return newCollections;
      });
    });
  }

  return (
    <div className="dashboard-collection-menu-container flex-container-column">
      <div
        onClick={props.toggleEditName}
        className="dashboard-collection-menu-item flex-container-row flex-item"
      >
        <img
          src="/images/Edit.png"
          alt="Edit Name"
          className="dashboard-collection-menu-image flex-item"
        />
        <section className="dashboard-collection-menu-text flex-item">
          Edit Name
        </section>
      </div>
      {props.collection.isPublic ? (
        <div
          onClick={changeVisibility}
          className="dashboard-collection-menu-item flex-container-row flex-item"
        >
          <img
            src="/images/private-dark.png"
            alt="Make Private"
            className="dashboard-collection-menu-image flex-item"
          />
          <section className="dashboard-collection-menu-text flex-item">
            Make Private
          </section>
        </div>
      ) : (
        <div
          onClick={changeVisibility}
          className="dashboard-collection-menu-item flex-container-row flex-item"
        >
          <img
            src="/images/globe-dark.png"
            alt="Make Public"
            className="dashboard-collection-menu-image flex-item"
          />
          <section className="dashboard-collection-menu-text flex-item">
            Make Public
          </section>
        </div>
      )}
      <div
        onClick={deleteCollection}
        className="dashboard-collection-menu-item delete-menu-item flex-container-row flex-item"
      >
        <img
          src="/images/delete.png"
          alt="Delete"
          className="dashboard-collection-menu-image flex-item"
        />
        <section className="dashboard-collection-menu-text flex-item">
          Delete
        </section>
      </div>
    </div>
  );
}
