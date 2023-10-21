import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter ,RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Support from "./components/Support";
import RestaurantDetails from "./components/RestaurantDetails";
import Cart from "./components/Cart";

const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <App/>,
      errorElement:<ErrorPage/>,
      children: [
      {
        path:"/",
        element:<Body/>
      },
      {
        path : "about",
        element :<About/>
      },
      {
        path:"/support",
        element:<Support/>
      },
      {
        path:"/restaurant/:resId",
        element:<RestaurantDetails/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
    ] 
    },
    
  ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
