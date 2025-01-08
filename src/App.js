import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/add" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostForm />} />{" "}
      </Routes>
    </div>
  );
};

export default App;
