import { createContext, useReducer } from "react";

export const BookContext = createContext();

export const ACTIONS = {
  SET_BOOKS: "SET_BOOKS",
  CREATE_BOOK: "CREATE_BOOK",
  DELETE_BOOK: "DELETE_BOOK",
};

export const booksReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_BOOKS:
      return {
        books: action.payload,
      };

    case ACTIONS.CREATE_BOOK:
      return {
        books: [action.payload, ...state.books],
      };

    case ACTIONS.DELETE_BOOK:
      return {
        books: state.books.filter((book) => book._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const BookContextProvider = (props) => {
  const [state, dispatch] = useReducer(booksReducer, {
    books: null,
  });
  return (
    <BookContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
};
