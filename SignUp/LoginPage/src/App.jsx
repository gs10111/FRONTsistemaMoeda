import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import SignUp from "./components/signUp/SignUp";
import SignIn from "./components/signIn/SignIn";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <div>Hello World</div>,
  },
   {
    path: "/signin",
    element: <SignIn/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
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