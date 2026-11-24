import "./Collection Page.css";
import Navbar from "../../components/Navbar/Navbar";
import CollectionNav from "../../components/Collection Page Nav/Collection Nav";
import CollectionBody from "../../components/Collection Page Body/Collection Body";
import PrivateCollection from "../../components/Private Collection/Private Collection";
import NotFound from "../../components/Not Found/Not Found";
import Error from "../../components/Error/Error";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import LoadingScreen from "../../components/Loading-Screen/Loading-Screen";
const collectionAPI = require("../../api/Collection");

export default function CollectionPage() {
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState({});
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const { collectionId } = useParams();
  const navigate = useNavigate();

  function closeError() {
    setShowError(false);
  }

  const handleError = useCallback(
    (response) => {
      if (response.unauthorized) {
        navigate(
          `/?reason=expired&returnTo=${encodeURIComponent(
            `/collection/${collectionId}`
          )}`,
          { replace: true }
        );
        return true;
      } else if (response.error || response.notFound) {
        setShowError(true);
        return true;
      }
      return false;
    },
    [collectionId, navigate]
  );

  useEffect(() => {
    let ignore = false;
    const cookies = new Cookies();
    const user = cookies.get("user");
    const signedIn = Boolean(user && cookies.get("token"));
    if (signedIn) {
      collectionAPI.getCollections().then((collections) => {
        if (ignore) {
          return;
        } else if (collections.unauthorized) {
          setUser(null);
          setCollections([]);
        } else if (collections.error) {
          setShowError(true);
        } else {
          setCollections(collections);
        }
      });
    }
    collectionAPI.getCollectionById(collectionId).then((collection) => {
      if (ignore) {
        return;
      } else if (collection.error) {
        setShowError(true);
        document.title = "Error | Content Vault";
      } else {
        setCollection(collection);
        if (collection.private) {
          document.title = "Private Collection | Content Vault";
        } else if (collection._id) {
          document.title = `${collection.name} | Content Vault`;
        }
      }
      setShowLoading(false);
    });
    setUser(signedIn ? user : null);
    return () => {
      ignore = true;
    };
  }, [collectionId]);

  if (collection.notFound) {
    return <NotFound />;
  }

  return showLoading ? (
    <LoadingScreen />
  ) : (
    <div className="collection-page-container flex-container-column">
      {showError ? <Error closeError={closeError} /> : null}
      <Navbar user={user} />
      <div className="collection-page-content-container flex-container-row">
        {user ? <CollectionNav collections={collections} /> : null}
        {collection._id ? (
          <CollectionBody collection={collection} handleError={handleError} />
        ) : collection.private ? (
          <PrivateCollection user={user} />
        ) : null}
      </div>
    </div>
  );
}
