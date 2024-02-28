import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import { useSelector } from "react-redux";
import { axiosConfig } from "../../axios/config";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

type decodedToken = {
  data: {
    email: string;
  };
  iat: number;
};

interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  status: number;
}

const PayCheckOut = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const cart = useSelector((state: any) => state.cart);

  const [provinces, setProvinces] = useState<any[]>([]); // Tỉnh/Thành Phố
  const [activeProvince, setActiveProvince] = useState<string>("");

  const [districts, setDistricts] = useState<any[]>([]); // Quận/Huyện
  const [activeDistrict, setActiveDistrict] = useState<string>("");

  const [wards, setWards] = useState<any[]>([]); // Phường/Xã
  const [activeWard, setActiveWard] = useState<string>("");

  const fetchProvinces = async () => {
    try {
      let res = await axios.get(
        `https://vapi.vnappmob.com/api/province?province_name=${activeProvince}`
      );
      const data = res.data.results;
      setProvinces(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let clickProvince = provinces.find(
          (e) => e.province_name === activeProvince
        );
        if (clickProvince) {
          const provinceId = clickProvince.province_id;
          let res = await axios.get(
            `https://vapi.vnappmob.com/api/province/district/${provinceId}`
          );
          setDistricts(res.data.results);
          setActiveWard("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [activeProvince]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let clickDistrict = districts.find(
          (e) => e.district_name === activeDistrict
        );
        if (clickDistrict) {
          const wardId = clickDistrict.district_id;
          let res = await axios.get(
            `https://vapi.vnappmob.com/api/province/ward/${wardId}`
          );
          setWards(res.data.results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [activeDistrict]);

  const handleActiveProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveProvince(e.target.value);
    }
  };

  const handleActiveDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveDistrict(e.target.value);
    }
  };

  const handleActiveWard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveWard(e.target.value);
    }
  };

  function resetAllProvinces() {
    setActiveProvince("");
    setActiveDistrict("");
    setDistricts([]);
    setActiveWard("");
    setWards([]);
  }

  // Tìm user
  const [user, setUser] = useState<User>();
  const findUser = async () => {
    const userToken = JSON.parse(localStorage.getItem("token") || "{}");
    const decodedToken: decodedToken = jwtDecode(userToken.access_token);
    const userEmail = decodedToken.data.email;
    const result = await axiosConfig.get(`/users/email/${userEmail}`);
    setUser(result.data);
  };

  useEffect(() => {
    fetchProvinces();
    findUser();
  }, []);

  const handleCheckout = async (e: any) => {
    e.preventDefault();
    const isValidPhone = validator.isMobilePhone(phone, "vi-VN");
    const isAddress = validator.isLength(address, { min: 5, max: 100 });
    if (!isValidPhone || !isAddress) {
      Swal.fire("Lỗi", "Hãy nhập đủ thông tin", "error");
      return;
    }
    try {
      let order = {
        user_id: user?.user_id,
        name,
        email: user?.email,
        phone,
        address,
        province: activeProvince,
        district: activeDistrict,
        ward: activeWard,
        cart,
      };
      console.log(order);

      let res = await axiosConfig.post("/orders", order);
      const data = res.data;
      toast.success(data.message);
      navigate(`/bill?id=${data.orderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div
          className="p-8 rounded-lg"
          style={{
            backgroundColor: "#FFFFFF",
            width: "100%",
          }}
        >
          <h4 className="font-semibold text-2xl">Billing Details</h4>
          <div className="mt-3">
            <p>Họ và tên:</p>
            <Input
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <p>Email:</p>
            <Input
              placeholder="Email"
              value={user?.email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          <div className="mt-3">
            <p>Số điện thoại:</p>
            <Input
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <p>Địa chỉ</p>
            <Input
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="">
            <div className="mt-4">
              <select
                style={{
                  borderRadius: "6px",
                  border: "1px solid #d9d9d9",
                  width: "100%",
                  height: "32px",
                  color: "rgb(0 0 0 / 88%)",
                }}
                aria-label="Default select example"
                onChange={handleActiveProvince}
                value={activeProvince}
              >
                <option value="">Tỉnh/Thành</option>
                {provinces.length > 0 &&
                  provinces.map((e: any, i) => (
                    <option key={i} value={e.province_name}>
                      {e.province_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mt-4">
              <select
                style={{
                  borderRadius: "6px",
                  border: "1px solid #d9d9d9",
                  width: "100%",
                  height: "32px",
                }}
                className=""
                aria-label="Default select example"
                onChange={handleActiveDistrict}
                value={activeDistrict}
              >
                <option value="">Quận/Huyện</option>
                {districts.length > 0 &&
                  districts.map((e: any, i) => (
                    <option key={i} value={e.district_name}>
                      {e.district_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mt-4">
              <select
                style={{
                  borderRadius: "6px",
                  border: "1px solid #d9d9d9",
                  width: "100%",
                  height: "32px",
                }}
                aria-label="Default select example"
                onChange={handleActiveWard}
                value={activeWard}
              >
                <option value="">Phường/Xã</option>
                {wards.length > 0 &&
                  wards.map((e: any, i) => (
                    <option key={i} value={e.ward_name}>
                      {e.ward_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {/* <div className="mt-3">
            <p>Ghi chú đơn hàng (tuỳ chọn)</p>
            <textarea
              style={{
                borderRadius: "5px",
                border: "1px solid #d9d9d9",
                width: "100%",
                height: "100px",
                padding: "10px",
              }}
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
              name=""
              id=""
            ></textarea>
          </div> */}
        </div>
        <div
          className="p-8 rounded-lg mt-5"
          style={{
            backgroundColor: "#FFFFFF",
            width: "100%",
          }}
        >
          <div className="flex items-center gap-2">
            <input type="radio" name="aaa" value="" checked />
            <label>Trả tiền mặt khi giao hàng </label>
          </div>
          <p
            style={{
              backgroundColor: "#F8F8F8",
              boxShadow: "1px 1px 2px rgba(0,0,0,0.05)",
              padding: "15px",
              borderRadius: "10px",
              color: "#abb8c3",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            Trả tiền mặt khi giao hàng
          </p>
          <hr />
          <p className="mt-5">
            Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng
            trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được
            mô tả trong <b>chính sách riêng tư </b> của chúng tôi.
          </p>

          <button
            onClick={handleCheckout}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "7px",
              marginTop: "20px",
            }}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayCheckOut;
