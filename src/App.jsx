import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Landing Page/Landing Page";
import Dashboard from "./pages/Dashboard/Dashboard";
import CollectionPage from "./pages/Collection Page/Collection Page";
import Token from "./pages/Token/Token";
import NotFound from "./components/Not Found/Not Found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/googleToken" element={<Token />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collection/:collectionId" element={<CollectionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
