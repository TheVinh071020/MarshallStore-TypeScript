import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import Homepage from "./Pages/homepage/Homepage";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Detail from "./Pages/detail/Detail";
import Cart from "./Pages/cart/Cart";
import Pay from "./Pages/pay/Pay";
import Bill from "./Pages/bill/Bill";
import Shop from "./Pages/shop/Shop";
import ShopByCatagory from "./components/layouts/Shop/ShopByCatagory";
import AdminPage from "./Admin/AdminPage";
import Users from "./Admin/users/Users";
import ProductList from "./Admin/ProductList/ProductList";
import ProductDetail from "./Admin/ProductList/EditProduct/ProductEdit";
import AddProduct from "./Admin/ProductList/CreateProduct/AddProduct";
import History from "./Pages/history/History";
import HistoryOrder from "./Admin/ProductList/HistoryOrder/HistoryOrder";
import CreateCategory from "./Admin/ProductList/CreateCategory/CreateCategory";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/loa-marshall" element={<Shop />} />
        <Route path="/loa-marshall/:category" element={<ShopByCatagory />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="user" element={<Users />} />
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="edit/:id" element={<ProductDetail />} />
            <Route path="addcategory" element={<CreateCategory />} />
          </Route>
          <Route path="history-order" element={<HistoryOrder />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
