import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductDetails from "./components/product/ProductDetails";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdatePassword from "./components/route/UpdatePassword";
import ForgotPassword from "./components/route/ForgotPassword";
import NewPassword from "./components/route/NewPassword";

import { loadUser } from "./actions/userActions";
import store from "./store";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Shipping from "./components/cart/Shipping";
import Cart from "./components/cart/Cart";

function App() {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />

          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} exact/>
          <Route path="/password/reset/:token" component={NewPassword} exact/>
          <ProtectedRoute path="/me" component={Profile} exact/>
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
