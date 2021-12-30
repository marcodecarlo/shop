import "./App.css";
import { useEffect, useState } from "react";
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
import axios from 'axios';
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import Shipping from "./components/cart/Shipping";
import Cart from "./components/cart/Cart";
import OrderSuccess from "./components/cart/OrderSuccess";

//Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/react-stripe-js';
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');
  
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApikey(){
      const {data} =await axios.get('/api/vi/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }

    getStripApikey();
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
          <ProtectedRoute path="/success" component={OrderSuccess} exact />
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }
          

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} exact/>
          <Route path="/password/reset/:token" component={NewPassword} exact/>
          <ProtectedRoute path="/me" component={Profile} exact/>
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
          <ProtectedRoute path="/orders/me" component={ListOrders} exact/>
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact/>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
