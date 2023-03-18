import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import StartPage from "../layouts/homePage";
import ResultsPage from "../layouts/resultsPage";


const routes = [
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  }
];

const Navigation = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />
};

export default Navigation;