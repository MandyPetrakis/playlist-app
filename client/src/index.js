import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Homepage from "./Homepage";
import Account from "./Account";
import reportWebVitals from "./reportWebVitals";
import ContextProvider from "./Context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/account",
        element: <Account />,
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
reportWebVitals();
