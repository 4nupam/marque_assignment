import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Bookshelf from "./component/BookShelf";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </Router>
  );
}

export default App;
