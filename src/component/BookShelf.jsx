import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookshelf.css";

function Bookshelf() {
  const [bookshelf, setBookshelf] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const removeFromBookshelf = (book) => {
    const updatedBookshelf = bookshelf.filter(
      (b) => b.edition_key !== book.edition_key
    );
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="container">
      <h2>My Bookshelf</h2>
      <button onClick={() => navigate("/")}>Back to Search</button>
      <div className="bookshelf">
        {bookshelf.length > 0 ? (
          <ul>
            {bookshelf.map((book, index) => (
              <li key={index}>
                {book.author_name} - {book.title}
                <button onClick={() => removeFromBookshelf(book)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your bookshelf is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Bookshelf;
