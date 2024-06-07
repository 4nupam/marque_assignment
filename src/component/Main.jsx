import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";

function Main() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchApi = async () => {
    if (!input) return;
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${input}&limit=10&page=1`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const ans = await res.json();
      setData(ans);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [input]);

  const addToBookshelf = (book) => {
    const currentBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const updatedBookshelf = [...currentBookshelf, book];
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="container">
      <h2>
        Search Books by Name <button onClick={() => navigate("/bookshelf")}>My Bookshelf</button>
      </h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search here"
      />

      {error && <p className="error">{error}</p>}
      {data && (
        <div className="results">
          {data.docs.slice(0, 10).map((e, index) => (
            <div className="result-item" key={index}>
              <ul>
                <li>
                  {e.author_name} - {e.title}
                  <button onClick={() => addToBookshelf(e)}>Add to Bookshelf</button>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
