import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Netflix from "./Pages/Netflix";
import Player from "./Pages/Player";
import Movies from "./Pages/Movies";
import TvShows from "./Pages/TvShows";
import UserLiked from "./Pages/UserLiked";
import Video from "./Components/Video";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/player" element={<Player />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/tv" element={<TvShows/>}></Route>
        <Route path="/mylist" element={<UserLiked/>}></Route>
        <Route path="/" element={<Netflix />}></Route>
        <Route path="/video" element={<Video />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
