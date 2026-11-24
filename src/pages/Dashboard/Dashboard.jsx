import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Dashboard-Searchbar/Searchbar";
import Collection from "../../components/Dashboard-Collection/Collection";
import AddCollection from "../../components/Dashboard-Add-Collection/Add-Collection";
import LoadingScreen from "../../components/Loading-Screen/Loading-Screen";
import Error from "../../components/Error/Error";
import Cookies from "universal-cookie";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const collectionAPI = require("../../api/Collection");
const clearCookies = require("../../utils/clearCookies");

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState(Array);
  const [search, setSearch] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  function closeError() {
    setShowError(false);
  }

  const handleError = useCallback(
    (response) => {
      if (response.unauthorized) {
        navigate("/?reason=expired", { replace: true });
        return true;
      } else if (response.error || response.notFound) {
        setShowError(true);
        return true;
      }
      return false;
    },
    [navigate]
  );

  useEffect(() => {
    document.title = "Dashboard | Content Vault";
    const cookies = new Cookies();
    const user = cookies.get("user");
    if (!user || !cookies.get("token")) {
      clearCookies.clearData().then(() => {
        navigate("/", { replace: true });
      });
      return;
    }
    collectionAPI.getCollections().then((collections) => {
      if (handleError(collections)) {
        setShowLoading(false);
        return;
      }
      setCollections(collections);
      setShowLoading(false);
    });
    setUser(user);
  }, [navigate, handleError]);

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return showLoading ? (
    <LoadingScreen />
  ) : (
    <div className="dashboard-container flex-container-column">
      {showError ? <Error closeError={closeError} /> : null}
      <Navbar user={user} />
      <Searchbar search={search} setSearch={setSearch} />
      <div className="dashboard-collection-container flex-container-row">
        {filteredCollections.length > 0
          ? filteredCollections.map((collection) => (
              <Collection
                setCollections={setCollections}
                collectionAPI={collectionAPI}
                handleError={handleError}
                key={collection._id}
                collection={collection}
              />
            ))
          : null}
        <AddCollection
          setCollections={setCollections}
          collectionAPI={collectionAPI}
          handleError={handleError}
        />
      </div>
    </div>
  );
}
