import React from "react";
import Header from "../../components/layouts/header/Header";
import Footer from "../../components/layouts/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../helpers";
import { useNavigate } from "react-router-dom";

type Props = {};

const Bill = (props: Props) => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleContinue = (e: React.MouseEvent) => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cart");
    navigate("/");
  };
  return (
    <div>
      <Header />
      <div style={{ padding: "40px  333px" }}>
        <div
          style={{
            border: "2px dashed #7A9C59",
            borderRadius: "10px",
            color: "#7A9C59",
            padding: "25px",
          }}
          className="flex justify-center"
        >
          <h1 className="font-semibold text-2xl">
            Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
          </h1>
        </div>
        <div>
          <h1 className="text-2xl font-semibold uppercase mt-8">
            Chi tiết đơn hàng
          </h1>
          <div className="uppercase flex justify-between items-center font-semibold text-lg mt-5 mb-5">
            <p>Sản phẩm</p>
            <p>Tổng</p>
          </div>
          <hr />
          {cart.length > 0 &&
            cart.map((e: any, i: any) => (
              <div
                style={{ borderBottom: "1px solid #d9d9d9" }}
                className="flex justify-between  items-center h-16"
              >
                <span className="font-semibold text-sm">
                  {e.name}
                  <i className="fa-solid fa-xmark text-xs ml-2">
                    {e.clickNumber}
                  </i>
                </span>
                <p className="font-semibold text-sm">
                  {formatCurrency(e.price - (e.price * e.sale) / 100)}
                </p>
              </div>
            ))}
          <div className="flex justify-between items-center font-semibold text-sm mt-5 mb-5">
            <p>Tổng số phụ:</p>
            <p>
              {cart.length > 0 &&
                formatCurrency(
                  cart.reduce((pre: any, cur: any) => {
                    return (pre +=
                      cur.price * (1 - cur.sale / 100) * cur.clickNumber);
                  }, 0)
                )}
            </p>
          </div>
          <hr />
          <div className="flex justify-between items-center font-semibold text-sm mt-5 mb-5">
            <p>Giao nhận hàng:</p>
            <p style={{ color: "gray" }}>Tính phí theo đơn vị vận chuyển</p>
          </div>
          <hr />
          <div className="flex justify-between items-center font-semibold text-sm mt-5 mb-5">
            <p>Phương thức thanh toán:</p>
            <p style={{ color: "gray" }}>Trả tiền mặt khi nhận hàng</p>
          </div>
          <hr />
          <div className="flex justify-between items-center font-semibold text-2xl mt-5 mb-5">
            <p>Tổng cộng:</p>
            <p>
              {cart &&
                formatCurrency(
                  cart.reduce((pre: any, cur: any) => {
                    return (pre +=
                      cur.price * (1 - cur.sale / 100) * cur.clickNumber);
                  }, 0)
                )}
            </p>
          </div>
          <hr />
          <div className="mt-5">
            <button
              onClick={handleContinue}
              style={{
                width: "200px",
                height: "45px",
                backgroundColor: "black",
                color: "white",
                fontSize: "17px",
                fontWeight: "500",
              }}
            >
              <i className="fa-solid fa-chevron-left mr-2"></i>
              Tiếp tục mua hàng
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bill;
