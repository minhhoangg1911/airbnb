import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import RoomDetail from "./components/RoomDetail/RoomDetail";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Admin from "./pages/Admin/Admin";
import UserInfo from "./pages/Admin/UserInfo/UserInfo";
import Detail from "./pages/Detail/Detail";
//set up redux toolkit
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import LocationInfo from "./pages/Admin/LocationInfo/LocationInfo";
import LocationDetail from "./pages/Admin/LocationDetail/LocationDetail";
import SearchListRoom from "./pages/SearchListRoom/SearchListRoom";
import { Router, Routes, Route } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
  console.log("User", user);
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "detail/:id",
    element: <Detail />,
  },
  {
    path: "searchlistroom",
    element: <SearchListRoom />,
  },
  {
    path: "signUp",
    element: <SignUp />,
  },
  {
    path: "signIn",
    element: <SignIn />,
  },
  
  {
    path: "admin",
    element: user ? <Admin /> : <Navigate to='/signIn' />,
  },
  {
    path: "user-info",
    element: <UserInfo />,
  },
]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
