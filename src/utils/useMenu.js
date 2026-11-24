import { useEffect, useRef, useState } from "react";

export default function useMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    function closeOnClick(event) {
      if (!menuButton.current || !menuButton.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    }

    document.addEventListener("click", closeOnClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return { showMenu, toggleMenu, menuButton };
}
