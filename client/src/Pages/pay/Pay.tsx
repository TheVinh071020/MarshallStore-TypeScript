import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/header/Header";
import Footer from "../../components/layouts/footer/Footer";

import PayCheckOut from "./PayCheckOut";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../helpers";
type Props = {};
interface Product {
  productId: string;
  name: string;
  clickNumber: number;
  stock: number;
  price: number;
  sale: number;
}

interface Order {
  orderId: string;
  orderName: string;
  phone: string;
  email: string;
  
  products: Product[];
}
const Pay = () => {
  // const [order, setOrder] = useState<Order>({
  //   orderId: "",
  //   orderName: "",
  //   phone: "",
  //   email: "",
  //   
  //   products: [],
  // });
  const [searchParams] = useSearchParams();

  const cart = useSelector((state: any) => state.cart);
  let queryString = searchParams.get("id");
  let BASE_API = "http://localhost:3000/api/v1";
  const dispatch = useDispatch();

  // const fetchOrder = async () => {
  //   try {
  //     let res = await fetch(BASE_API + `/orders/${queryString}`);
  //     let data = await res.json();
  //     let fetchOrder: Order = {
  //       orderId: data.row[0].order_id,
  //       orderName: data.row[0].order_name,
  //       phone: data.row[0].phone,
  //       email: data.row[0].email,
  //       products: [],
  //     };
  //     data.row.forEach((element: any) => {
  //       fetchOrder.products.push({
  //         productId: element.product_id,
  //         name: element.name,
  //         clickNumber: element.number,
  //         stock: element.stock,
  //         price: element.price,
  //         sale: element.sale,
  //       });
  //       setOrder({ ...fetchOrder });
  //       dispatch({
  //         type: "ORDER_TO_CART",
  //         payload: fetchOrder.products,
  //       });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (queryString) {
  //     fetchOrder();
  //   }
  // }, [queryString]);

  return (
    <div>
      <Header />
      <div
        style={{
          padding: "30px 80px",
          backgroundColor: "rgb(246,246,246)",
        }}
      >
        <div className="flex items-center space-x-2  bg-black h-40 p-8 gap-3 rounded-xl uppercase">
          <a
            href="/cart"
            className=""
            style={{
              color: "rgb(255 255 255 / 50%)",
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
              color: "#fff",
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

        <div className="flex justify-between gap-5 mt-10 ">
          <PayCheckOut />
          <div
            className="p-8"
            style={{
              backgroundColor: "#FFFFFF",
              width: "65%",
              height: "100%",
              borderRadius: "7px",
              position: "sticky",
              top: "50px",
            }}
          >
            <h4 className="text-2xl font-semibold">Your Order </h4>
            <div className="uppercase flex justify-between items-center text-base font-semibold mt-3 mb-3">
              <p>Sản phẩm</p>
              <p>Tạm tính</p>
            </div>
            <hr />
            <div
              style={{ borderBottom: "1px solid #d9d9d9" }}
              className="text-center"
            >
              {cart.length > 0 &&
                cart.map((e: any) => (
                  <div className="flex items-center ">
                    <div className="flex items-center">
                      <div className="w-1/4">
                        <img
                          src={e.sources && e.sources[0].url}
                          alt=""
                          className="max-w-full h-auto"
                        />
                      </div>
                      <div className="text-left font-semibold">
                        {e.name}
                        <i className="fa-solid fa-xmark text-xs ml-2">
                          {e.clickNumber}
                        </i>
                      </div>
                    </div>
                    <div
                      style={{
                        color: "#777",
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(e.price - (e.price * e.sale) / 100)}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-between items-center mb-3 mt-3">
              <p className="font-semibold text-base">Tạm tính</p>
              <p className="font-semibold">
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
            <div className="flex justify-between items-center mb-3 mt-3">
              <p className="font-semibold text-base">Giao hàng</p>
              <p className="font-semibold">Miễn phí vận chuyển</p>
            </div>
            <hr />
            <div className="flex justify-between items-center mb-4 mt-4">
              <p className="font-semibold text-lg">Tổng</p>
              <p className="font-semibold text-xl">
                {cart &&
                  formatCurrency(
                    cart.reduce((pre: any, cur: any) => {
                      return (pre +=
                        cur.price * (1 - cur.sale / 100) * cur.clickNumber);
                    }, 0)
                  )}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                marginBottom: "20px",
                color: "gray",
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pay;
