import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/header/Header";
import Footer from "../../components/layouts/footer/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { axiosConfig } from "../../axios/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Order, decodedToken } from "./History";

export const History = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  const [order, setOrder] = useState<Order[]>([]);
  const [historyOrder, setHistoryOrder] = useState([]) as any;

  const token = JSON.parse(localStorage.getItem("token") || "{}");

  const currentUser = async () => {
    if (token) {
      const decodedToken: decodedToken = jwtDecode(token.access_token);
      const userEmail = decodedToken.data.email;
      try {
        const result = await axiosConfig.get(`/users/email/${userEmail}`);
        if (result.data.status === 1) {
          toast.error("Tài khoản của bạn đã bị khóa");
          handleLogout();
          navigate("/login");
          return;
        }
        setUserName(result.data.name);
        setUserId(result.data.user_id);
        setLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
  const renderOrders = async () => {
    await axiosConfig
      .get(`/categories/${userId}`)
      .then((res) => {
        setOrder(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleView = async (id: any) => {
    await axiosConfig
      .get(`/order-details/${id}`)
      .then((res) => {
        setHistoryOrder(res.data.rows);
      })
      .catch((err) => console.log(err));
  };
  console.log(historyOrder);

  useEffect(() => {
    currentUser();
    renderOrders();
  }, [userId]);

  const handleLogout = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setLoggedIn(false);
    // setUserCur("");
    navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "rgb(246,246,246)" }}>
      <Header />
      <div style={{ padding: "30px 80px" }}>
        <div className="flex w-full gap-7 mt-10">
          <div className="w-2/3">
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <h1 className="text-3xl font-bold d-flex justify-center">
                Lịch sử mua hàng
              </h1>
              <div className="progress-area">
                <div
                  className="progress-bar"
                  style={{
                    width: "100%",
                    height: "7px",
                    backgroundColor: "rgb(15,0,0)",
                    backgroundImage:
                      "linear-gradient(135deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)",
                    borderRadius: "10px ",
                    backgroundSize: "15px 15px",
                    marginTop: "10px",
                  }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-2">Tên </th>
                    <th className="px-4 py-6 text-left">Địa chỉ</th>
                    <th className="px-4 py-6">Trạng thái</th>
                    <th className="px-4 py-6"></th>
                  </tr>
                </thead>

                <tbody className="text-center border-b border-gray-300">
                  {order &&
                    order.length > 0 &&
                    order.map((order: any) => (
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-left font-semibold">
                          {order.order_name}
                        </td>

                        <td className="px-4 py-2 text-left font-semibold">
                          {order.address}
                        </td>
                        <td className="px-4 py-2 text-left font-semibold">
                          <button className="btn btn-info">
                            {order.status}
                          </button>
                        </td>
                        <td
                          onClick={() => handleView(order.order_id)}
                          className="px-4 py-2 text-left font-semibold"
                        >
                          <button
                            onClick={handleShow}
                            className="bg-teal-200 rounded w-24 h-10"
                          >
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div
                style={{ padding: "30px 17px" }}
                className="flex justify-between"
              >
                <div className="flex items-center gap-3"></div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgb(86 86 86)",
              borderRadius: "10px",
              height: "500px",
              position: "sticky",
              top: "50px",
              color: "white",
            }}
            className="w-1/3 p-5"
          >
            <h4 className="text-2xl font-semibold mb-4">Tài khoản</h4>
            <button
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
              className="text-lg font-semibold"
            >
              <u>Đăng xuất</u>
            </button>
            <div className="flex justify-between items-center mt-5 h-20 font-semibold">
              <ul>
                <li>Đơn hàng đã đặt</li>
                <li>Đơn hàng yêu thích</li>
                <li>Địa chỉ của bạn</li>
                <li>Chi tiết tài khoản</li>
                <li>Đặt lại mật khẩu</li>
                <li>Xóa tài khoản</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết mua hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart1">
            <div className="cart-combo1">
              <table className="table">
                <thead>
                  <tr className="table-light">
                    <th scope="col">Name</th>
                    <th scope="col" rowSpan={3}>
                      Price
                    </th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {aggregatedOrder.map((product, i) => (
              <tr key={i}>
                <td>{product.name}</td>
                <td>
                  {formatCurrency(product.price * (1 - product.sale))}
                </td>
                <td>{product.quantity}</td>
                <td>
                  <img
                    style={{ width: "70px", height: "70px" }}
                    src={product.img}
                    alt=""
                  />
                </td>
              </tr>
            ))} */}
                  <tr>
                    <td>Total</td>

                    <td rowSpan={2}>
                      {/* {formatCurrency(
              aggregatedOrder.reduce(
                (total, product) =>
                  total +
                  product.price *
                    (1 - product.sale) *
                    product.quantity,
                0
              )
            )} */}
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  );
};
