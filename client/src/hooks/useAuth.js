import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

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
          // Only navigate to the dashboard if not on the login or signup page
          if (
            window.location.pathname.includes("/signin") &&
            window.location.pathname.includes("/signup")
          ) {
            navigate("/dashboard");
          }
          setUsername(data.username);
        } else {
          setAuthenticated(false);
          // Only navigate to the signin page if not on the login or signup page
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
      });
  }, [navigate]);

  return { authenticated, username };
};

export default useAuth;
