import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/header/Header";
import Footer from "../../components/layouts/footer/Footer";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CartItem from "./CartItem";
import { formatCurrency } from "../../helpers";
import { jwtDecode } from "jwt-decode";
import { axiosConfig } from "../../axios/config";
import { toast } from "react-toastify";

interface CartItem {
  product_id: number;
  clickNumber: number;
  price: number;
  sale: number;
}

interface RootState {
  cart: CartItem[];
}

type decodedToken = {
  data: {
    email: string;
  };
  iat: number;
};

type User = {
  user_id: number;
  name: string;
  email: string;
};

const Cart = () => {
  const [findUser, setFindUser] = useState(null) as any;
  const [findEmail, setFindEmail] = useState("");
  const cart = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token") || "{}");

  const currentUser = async () => {
    if (token && token.access_token) {
      const decodedToken: decodedToken = jwtDecode(token.access_token);
      setFindEmail(decodedToken.data.email);
    }
  };

  useEffect(() => {
    currentUser();
  }, [findEmail]);

  const isUser = async () => {
    const result = await axiosConfig.get(`/users/email/${findEmail}`);
    setFindUser(result.data);
  };

  useEffect(() => {
    if (findEmail) {
      isUser();
    }
  }, [findEmail]);

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (findUser?.email === findEmail) {
      if (cart.length > 0) {
        navigate("/pay");
      } else {
        Swal.fire(
          "Không Thành Công",
          "Chưa có sản phẩm nào trong giỏ hàng",
          "warning"
        );
      }
    } else {
      toast.info("Vui lòng đăng nhập để thanh toán");
    }
  };
  return (
    <div style={{ backgroundColor: "rgb(246,246,246)" }}>
      <Header />
      <div style={{ padding: "30px 80px" }}>
        <div className="flex items-center space-x-2  bg-black h-40 p-8 gap-3 rounded-xl uppercase">
          <a
            href="/cart"
            className=""
            style={{
              color: "#fff",
              fontSize: "25px",
              fontWeight: "600",
            }}
          >
            Shopping cart
          </a>
          <i
            style={{
              color: "rgb(255 255 255 / 50%)",
            }}
            className="fa-solid fa-arrow-right"
          ></i>
          <a
            href=""
            className=""
            style={{
              color: "rgb(255 255 255 / 50%)",
              fontSize: "25px",
              fontWeight: "600",
            }}
          >
            Checkout
          </a>
          <i
            style={{
              color: "rgb(255 255 255 / 50%)",
            }}
            className="fa-solid fa-arrow-right"
          ></i>
          <a
            style={{
              color: "rgb(255 255 255 / 50%)",
              fontSize: "25px",
              fontWeight: "600",
            }}
            href="#"
            className=""
          >
            Order complete
          </a>
        </div>

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
              <p>
                Miễn phí vận chuyển khi mua 2 sản phẩm! (không áp dụng cho phụ
                kiện)
              </p>
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
              {cart.length > 0 ? (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="px-4 py-6"></th>
                      <th className="px-4 py-6"></th>
                      <th className="px-4 py-6 text-left">Sản phẩm</th>
                      <th className="px-4 py-6">Giá</th>
                      <th className="px-4 py-6">Số lượng</th>
                      <th className="px-4 py-6">Tạm tính</th>
                    </tr>
                  </thead>

                  <tbody className="text-center border-b border-gray-300">
                    {cart.map((e, i) => (
                      <CartItem key={i} detail={e} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "600",
                    padding: "30px",
                  }}
                >
                  Chưa có sản phẩm nào trong giỏ hàng
                </p>
              )}
              <div
                style={{ padding: "30px 17px" }}
                className="flex justify-between"
              >
                <div className="flex items-center gap-3">
                  <Input style={{ height: "40px" }} placeholder="Mã ưu đãi" />
                  <button
                    style={{
                      width: "140px",
                      height: "40px",
                      backgroundColor: "rgb(15,0,0)",
                      color: "#fff",
                      borderRadius: "5px",
                      fontWeight: "500",
                    }}
                  >
                    Áp Dụng
                  </button>
                </div>
                <div>
                  <button
                    style={{
                      width: "200px",
                      height: "40px",
                      backgroundColor: "rgb(15,0,0)",
                      color: "#fff",
                      borderRadius: "5px",
                      fontWeight: "500",
                    }}
                  >
                    Cập Nhật Giỏ Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              height: "500px",
              position: "sticky",
              top: "50px",
            }}
            className="w-1/3 p-5"
          >
            <h4 className="text-2xl font-semibold">Cart Totals</h4>
            <div className="flex justify-between mt-5 font-semibold">
              <p>Tạm tính</p>
              <p style={{ color: "#777" }}>
                {formatCurrency(
                  cart.reduce((pre, cur) => {
                    return (pre +=
                      cur.price * (1 - cur.sale / 100) * cur.clickNumber);
                  }, 0)
                )}
              </p>
            </div>

            <div
              style={{
                borderTop: "1px solid rgb(0 0 0 / 11%)",
                borderBottom: "1px solid rgb(0 0 0 / 11%)",
              }}
              className="flex justify-between items-center mt-5 h-20 font-semibold"
            >
              <p>Giao hàng</p>
              <p>Miễn phí vận chuyển</p>
            </div>

            <div className="flex justify-between items-center mt-5">
              <p className="text-xl font-semibold">Tổng</p>
              <p className="text-2xl font-semibold">
                {formatCurrency(
                  cart.reduce((pre, cur) => {
                    return (pre +=
                      cur.price * (1 - cur.sale / 100) * cur.clickNumber);
                  }, 0)
                )}
              </p>
            </div>

            <Link to="" onClick={handleCheckout}>
              <button
                className="w-full h-10 mt-5"
                style={{
                  backgroundColor: "rgb(15,0,0)",
                  color: "#fff",
                  borderRadius: "5px",
                }}
              >
                Tiến hành thanh toán
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
