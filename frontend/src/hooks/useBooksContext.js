import { useContext } from "react";
import { BookContext } from "../context/BookContext";

export const useBooksContext = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw Error("useBooksContext must be used inside the BooksContextProvider");
  }

  return context;
};
