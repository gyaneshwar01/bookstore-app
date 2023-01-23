import React, { useEffect } from "react";
import { ACTIONS } from "../context/BookContext";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

import BookDetails from "../components/BookDetails";
import BookForm from "../components/BookForm";

const Home = () => {
  const { books, dispatch } = useBooksContext();

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        console.log("Error occurred");
      }
      if (response.ok) {
        dispatch({ type: ACTIONS.SET_BOOKS, payload: data });
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="books">
        {books &&
          books.map((book) => <BookDetails key={book._id} book={book} />)}
      </div>
      <BookForm />
    </div>
  );
};

export default Home;
