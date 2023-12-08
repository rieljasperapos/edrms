import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

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
          navigate("/dashboard");
        } else {
          setAuthenticated(false);
        }
      })
      .catch((err) => {
        console.error(err.message);
        setAuthenticated(false);
      });
  }, [navigate]);

  return { authenticated };
};

export default useAuth;
