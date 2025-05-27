import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import SignIn from "./components/signIn/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
   {
    path: "/home",
    element: <SignIn/>,
  },
]);

const App = () =>{

  return(
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App