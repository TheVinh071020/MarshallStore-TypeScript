import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Dropdown, Space, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { axiosConfig } from "../../../axios/config";
import { toast } from "react-toastify";

type Props = {};
type decodedToken = {
  data: {
    email: string;
  };
  iat: number;
};

const Header = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const token = JSON.parse(localStorage.getItem("token") || "{}");

  const currentUser = async () => {
    if (token) {
      const decodedToken: decodedToken = jwtDecode(token.access_token);
      const userEmail = decodedToken.data.email;
      const result = await axiosConfig.get(`/users/email/${userEmail}`);
      if (result.data.status === 1) {
        toast.error("Tài khoản của bạn đã bị khóa");
        handleLogout();
        navigate("/login");
        return;
      }
      setUserName(result.data.name);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  const handleLogout = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  const items = loggedIn
    ? [
        {
          key: "1",
          label: <span>{userName}</span>,
        },
        {
          key: "2",
          label: (
            <a onClick={handleLogout} style={{ cursor: "pointer" }}>
              Đăng xuất
            </a>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: <Link to="/login">Đăng nhập</Link>,
        },
        {
          key: "2",
          label: <Link to="/register">Đăng ký</Link>,
        },
      ];

  return (
    <div className={`sticky top-0 bg-[white] z-10`}>
      <div className="flex justify-center">
        <Link to="/">
          <img
            className="w-48 h-20"
            src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Marshall-Logo-1-2048x768.png"
            alt=""
          />
        </Link>
      </div>
      <div className="bg-black h-14 text-white flex items-center justify-between px-[80px] cursor-pointer">
        <div className="flex space-x-6 items-center font-semibold text-sm">
          <Link to="/">
            <img
              src="https://marshallstorevietnam.vn/wp-content/uploads/2023/01/shop.svg"
              title="shop"
            />
          </Link>
          <Link to="/loa-marshall">
            <span>SẢN PHẨM</span>
          </Link>
          <Link to="/history">
            <span>LỊCH SỬ MUA HÀNG</span>
          </Link>
        </div>
        <div className="flex space-x-5">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined className="w-10 h-10 bg-white text-black rounded-full flex justify-center items-center" />
              </Space>
            </a>
          </Dropdown>
          <Link style={{ position: "relative" }} to="/cart">
            <i className="fa-solid fa-cart-shopping w-10 h-10 bg-white text-black rounded-full flex justify-center items-center"></i>
            <p className="absolute w-[18px] h-[18px] bg-white text-black rounded-[50px] top-[-7px] left-[25px] text-center text-xs">
              {cart.reduce(
                (pre: number, cur: any) => (pre += cur.clickNumber),
                0
              )}
            </p>
          </Link>
          <div className="flex items-center gap-2">
            <img
              src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/vn.svg"
              alt=""
            />
            <span>VIETNAM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
