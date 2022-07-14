import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Error from "./components/Error/Error";
import Modify from "./Pages/Modify/Modify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modify" element={<Modify />} />
      <Route path="/modify/:id" element={<Modify />} />
      <Route path="*" element={<Error />} />
    </Routes>
    {/*<Footer />*/}
  </BrowserRouter>
);
