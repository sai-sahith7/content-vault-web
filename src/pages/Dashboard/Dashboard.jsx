import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Dashboard-Searchbar/Searchbar";
import Collection from "../../components/Dashboard-Collection/Collection";
import AddCollection from "../../components/Dashboard-Add-Collection/Add-Collection";
import LoadingScreen from "../../components/Loading-Screen/Loading-Screen";
import Error from "../../components/Error/Error";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const collectionAPI = require("../../api/Collection");
const clearCookies = require("../../utils/clearCookies");

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState(Array);
  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  function closeError() {
    setShowError(false);
  }

  useEffect(() => {
    document.title = "Dashboard | Content Vault";
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
        setShowLoading(false);
      }
    });
    setUser(user);
  }, [navigate]);

  return showLoading ? (
    <LoadingScreen />
  ) : (
    <div className="dashboard-container flex-container-column">
      {showError ? <Error closeError={closeError} /> : null}
      <Navbar user={user} />
      <Searchbar />
      <div className="dashboard-collection-container flex-container-row">
        {collections.length > 0
          ? collections.map((collection) => (
              <Collection
                setCollections={setCollections}
                collectionAPI={collectionAPI}
                key={collection._id}
                collection={collection}
              />
            ))
          : null}
        <AddCollection
          setCollections={setCollections}
          collectionAPI={collectionAPI}
        />
      </div>
    </div>
  );
}
