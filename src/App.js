import React, { createContext, useState } from 'react';
import Admin from './Components/Admin/Admin';
import ManageProduct from './Components/ManageProduct/ManageProduct';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LogIn from './Components/LogIn/LogIn';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Orders from './Components/Oders/Orders';
import Deals from './Components/Deals/Deals';
import './App.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import CheckOut from './Components/CheckOut/CheckOut';
import RouteNotMatch from './Components/RouteNotMatch/RouteNotMatch';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    date: '',
  })
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className ='mainBody'>
        <Router>
          <Header></Header>
          <Switch>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <Route path='/login'>
              <LogIn></LogIn>
            </Route>
            <PrivateRoute path="/admin">
              <Admin></Admin>
            </PrivateRoute>
            <PrivateRoute path="/manageProduct">
              <ManageProduct></ManageProduct>
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>
            <PrivateRoute path="/deals">
              <Deals></Deals>
            </PrivateRoute>
            <PrivateRoute path="/checkOut/:id">
              <CheckOut></CheckOut>
            </PrivateRoute>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="*">
              <RouteNotMatch>
              </RouteNotMatch>
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
