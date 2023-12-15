import { useEffect, useState, useDebugValue } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch("http://localhost:3000/dashboard", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.valid) {
          setUsername(data.username);
          setAdmin(data.isAdmin);
        } else {
          setAuthenticated(false);
          if (
            !window.location.pathname.includes("/signin") &&
            !window.location.pathname.includes("/signup")
          ) {
            navigate("/signin");
          }
        }
      })
      .catch((err) => {
        console.error(err.message);
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the data is retrieved
      });
  }, [navigate]); // Include navigate in the dependencies array

  // Use useDebugValue to provide additional information for React DevTools
  useDebugValue({
    authenticated,
    username,
    isAdmin,
    loading,
  });

  return { authenticated, username, isAdmin, loading };
};

export default useAuth;
