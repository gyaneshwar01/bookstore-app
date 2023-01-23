import { ACTIONS } from "../context/AuthContext";
import { useAuthContext } from "./useAuthContext";
import { useBooksContext } from "./useBooksContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchBooks } = useBooksContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: ACTIONS.LOGOUT });

    // Remove the books from the booksContext
    dispatchBooks({ type: "SET_BOOKS", payload: null });
  };

  return { logout };
};
