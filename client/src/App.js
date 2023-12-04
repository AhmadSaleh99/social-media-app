import React from "react";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route exact path="/posts" element={<Home />} />
        <Route exact path="/auth" element={!user ? <Auth /> : <Home />} />

        <Route path="/" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="/posts/:id" exact element={<PostDetails />} />
        <Route exact path="/creators/:name" element={<CreatorOrTag />} />
        <Route exact path="/tags/:name" element={<CreatorOrTag />} />
      </Routes>
    </Container>
  );
};

export default App;
