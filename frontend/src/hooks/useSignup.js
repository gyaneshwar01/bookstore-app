import { useState } from "react";
import { ACTIONS } from "../context/AuthContext";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      // Save the user to localStorage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: ACTIONS.LOGIN, payload: json });

      // update the loading state
      setIsLoading(false);
    }
  };

  return { isLoading, error, signup };
};
