 
import React from "react";
import BookCard from "./BookCard";

function BookResults({ selectedBook }) {
  if (!selectedBook) {
    return (
      <p className="results-empty">
        Search above and select a book to see details and order.
      </p>
    );
  }

  return (
    <section className="results-section">
      <h2 className="results-title">Selected Book</h2>
      <BookCard book={selectedBook} />
    </section>
  );
}

export default BookResults;
