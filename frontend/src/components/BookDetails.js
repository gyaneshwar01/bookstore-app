import React from "react";
import { ACTIONS } from "../context/BookContext";
import { useBooksContext } from "../hooks/useBooksContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const BookDetails = ({ book }) => {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    console.log(user.token);

    const response = await fetch(`/api/books/${book._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: ACTIONS.DELETE_BOOK, payload: json });
    }
  };

  return (
    <div className="book-details">
      <h4>{book.title}</h4>
      <p>
        <strong>Author: </strong>
        {book.author}
      </p>
      <p>
        {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick} className="material-symbols-outlined">
        Delete
      </span>
    </div>
  );
};

export default BookDetails;
