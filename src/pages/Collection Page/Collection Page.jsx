import "./Collection Page.css";
import Navbar from "../../components/Navbar/Navbar";
import CollectionNav from "../../components/Collection Page Nav/Collection Nav";
import CollectionBody from "../../components/Collection Page Body/Collection Body";
import PrivateCollection from "../../components/Private Collection/Private Collection";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import LoadingScreen from "../../components/Loading-Screen/Loading-Screen";
const collectionAPI = require("../../api/Collection");
const clearCookies = require("../../utils/clearCookies");

export default function CollectionPage() {
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState({});
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const { collectionId } = useParams();
  const navigate = useNavigate();

  function closeError() {
    setShowError(false);
  }

  useEffect(() => {
    const cookies = new Cookies();
    const user = cookies.get("user");
    collectionAPI.getCollections().then((collections) => {
      if (collections.unauthorized || !user) {
        clearCookies.clearData().then(() => {
          window.open("/", "_self");
          return;
        });
      } else if (collections.error) {
        setShowError(true);
        return;
      } else {
        setCollections(collections);
      }
    });
    collectionAPI.getCollectionById(collectionId).then((collection) => {
      if (collection.unauthorized) {
        clearCookies.clearData().then(() => {
          window.open("/", "_self");
          return;
        });
      } else if (collection.error) {
        setShowError(true);
        return;
      } else {
        setCollection(collection);
        setShowLoading(false);
        document.title = `${collection.name} | Content Vault`;
      }
    });
    setUser(user);
  }, [collectionId, navigate]);

  return showLoading ? (
    <LoadingScreen />
  ) : (
    <div className="collection-page-container flex-container-column">
      {showError ? <Error closeError={closeError} /> : null}
      <Navbar user={user} />
      <div className="collection-page-content-container flex-container-row">
        <CollectionNav collections={collections} />
        {collection._id ? (
          <CollectionBody collection={collection} />
        ) : (
          <PrivateCollection />
        )}
      </div>
    </div>
  );
}
