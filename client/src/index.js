import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./Home";
import Account from "./Account";
import Library from "./Library";
import Explore from "./Explore";
import ViewPlaylist, { playlistLoader } from "./ViewPlaylist";
import ContextProvider from "./Context";
import { playlistsLoader } from "./Home";
import { playlistL } from "./ViewPlaylist";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: "/",
        loader: playlistsLoader,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/library",
        element: <Library />,
        loader: playlistsLoader,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        element: <ViewPlaylist />,
        path: ":playlistId",
        loader: playlistL,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ContextProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
