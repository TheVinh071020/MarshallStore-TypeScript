import Header from "../../components/layouts/header/Header";
import Footer from "../../components/layouts/footer/Footer";
import { Card } from "antd";
import { Rate } from "antd";
import "./homepage.css";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../helpers";
import HomeNewProductSpeaker from "../../components/layouts/HomePage/HomeNewProductSpeaker";
import HomeNewProductEarphone from "../../components/layouts/HomePage/HomeNewProductEarphone";
import HomeTintuc from "../../components/layouts/HomePage/HomeTintuc";
import { Link } from "react-router-dom";
import { axiosConfig } from "../../axios/config";

const Homepage = () => {
  const [productsLoudspeaker, setProductsLoudspeaker] = useState<any[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    await axiosConfig
      .get(`/products?category=loatrongnha`)
      .then((res) => {
        setProductsLoudspeaker(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axiosConfig
      .get(`/products?category=tainghe`)
      .then((res) => {
        setDisplayedProducts(res.data.data.slice(0, 1));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(246,246,246)" }}>
      <Header />
      <div style={{ padding: "50px 80px" }} className="">
        <div style={{ position: "relative" }}>
          <div>
            <img
              className="rounded-xl"
              src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/hero-all-speakers-desktop.jpeg"
              alt=""
            />
            <div
              style={{
                position: "absolute",
                top: "8%",
                right: "68%",
              }}
            >
              <h1
                style={{ color: "rgb(255,255,255)" }}
                className="text-4xl font-semibold"
              >
                ALL SPEAKERS
              </h1>
              <p className="mt-5" style={{ color: "rgb(255,255,255)" }}>
                THƯỞNG THỨC ÂM THANH MARSHALL TẠI NHÀ
              </p>
              <p style={{ color: "rgb(255,255,255)" }} className="mt-5">
                VÀ TRÊN ĐƯỜNG PHỐ
              </p>
              <button
                style={{
                  width: "120px",
                  height: "40px",
                  backgroundColor: "rgb(15,0,0)",
                  color: "#FFFFFF",
                  borderRadius: "35px",
                  marginTop: "20px",
                }}
              >
                Xem tất cả
              </button>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <h4 className="text-3xl font-bold mt-8">SẢN PHẨM HOT</h4>
            <button
              style={{
                width: "120px",
                height: "40px",
                backgroundColor: "#00000096",
                color: "#FFFFFF",
                borderRadius: "35px",
              }}
            >
              Xem tất cả
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {displayedProducts &&
            displayedProducts.map((e, i) => (
              <div key={i} className="mt-8 mb-8">
                <Card
                  hoverable
                  style={{ width: 320, position: "relative" }}
                  cover={
                    <img
                      alt="example"
                      src={e.media_source && e.media_source.split(",")[0]}
                    />
                  }
                >
                  <p
                    style={{
                      position: "absolute",
                      top: "4%",
                      backgroundColor: "rgb(15,0,0)",
                      color: "#fff",
                      width: "50px",
                      borderRadius: "12px",
                      textAlign: "center",
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                  >
                    -{e.sale}%
                  </p>
                  <div>
                    <h3 className="font-bold mb-3">{e.name}</h3>
                    <p
                      style={{
                        color: "#a5a5a5",
                        marginBottom: "8px",
                      }}
                    >
                      LOA MARSHALL, LOA NGHE TRONG NHÀ
                    </p>
                    <Rate className="mb-3" disabled defaultValue={5} />
                    <div className="flex gap-2 mb-5">
                      <span
                        style={{
                          color: "#bbb",
                          textDecoration: "line-through",
                        }}
                      >
                        {formatCurrency(e.price)}
                      </span>
                      <span
                        style={{
                          color: "rgb(15,0,0)",
                          fontWeight: "600",
                        }}
                      >
                        {formatCurrency(
                          e.sale ? e.price - e.price * (e.sale / 100) : e.price
                        )}
                      </span>
                    </div>
                    <Link to={`/detail/${e.product_id}`}>
                      <button className="w-full h-10 bg-zinc-900 text-white rounded-md">
                        Lựa chọn các tùy chọn
                      </button>
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          {productsLoudspeaker.slice(0, 3).map((e, i) => (
            <div key={i} className="mt-8 mb-8">
              <Card
                hoverable
                style={{ width: 320, position: "relative" }}
                cover={
                  <img
                    alt="example"
                    src={e.media_source && e.media_source.split(",")[0]}
                  />
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "4%",
                    backgroundColor: "rgb(15,0,0)",
                    color: "#fff",
                    width: "50px",
                    borderRadius: "12px",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  -{e.sale}%
                </p>
                <div>
                  <h3 className="font-bold mb-3">{e.name}</h3>
                  <p
                    style={{
                      color: "#a5a5a5",
                      marginBottom: "8px",
                    }}
                  >
                    LOA MARSHALL, LOA NGHE TRONG NHÀ
                  </p>
                  <Rate className="mb-3" disabled defaultValue={5} />
                  <div className="flex gap-2 mb-5">
                    <span
                      style={{
                        color: "#bbb",
                        textDecoration: "line-through",
                      }}
                    >
                      {formatCurrency(e.price)}
                    </span>
                    <span
                      style={{
                        color: "rgb(15,0,0)",
                        fontWeight: "600",
                      }}
                    >
                      {formatCurrency(
                        e.sale ? e.price - e.price * (e.sale / 100) : e.price
                      )}
                    </span>
                  </div>
                  <Link to={`/detail/${e.product_id}`}>
                    <button className="w-full h-10 bg-zinc-900 text-white rounded-md">
                      Lựa chọn các tùy chọn
                    </button>
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ width: "52%" }}>
            <img
              className="mb-14"
              src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Middleton_Category-page_2-column-banner_desktop.png"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold ">LOA DI ĐỘNG</h1>
            <p className="text-base mt-5 mb-5">
              Mang âm thanh đặc trưng của Marshall đi khắp mọi nơi bằng <br />{" "}
              loa di động và giữ cho âm nhạc của bạn tiếp tục hàng giờ liền.
            </p>
            <button
              style={{
                width: "120px",
                height: "40px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Xem thêm
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>

        <HomeNewProductSpeaker />
      </div>

      <div className="loa ">
        <div className="flex items-center justify-center w-full">
          <div className="w-3/6">
            <img
              src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/2-col-home-family-both.png"
              alt=""
            />
          </div>
          <div className="text-white">
            <h4 style={{ fontSize: "42px", fontWeight: "bold" }}>
              LOA NGHE TRONG NHÀ
            </h4>
            <p
              style={{ fontFamily: "monospace" }}
              className="text-xl mt-5 mb-5"
            >
              Đắm chìm trong âm nhạc của bạn và trải nghiệm âm
              <br />
              thanh sân khấu lớn trong sự thoải mái tại nhà của bạn.
            </p>
            <button
              style={{
                width: "120px",
                height: "40px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Xem thêm <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
        <div style={{ padding: "50px 80px" }} className="flex justify-between">
          {productsLoudspeaker.slice(0, 4).map((e, i) => (
            <div key={i} className="">
              <Card
                hoverable
                style={{ width: 320, position: "relative" }}
                cover={
                  <img
                    style={{ height: "327px" }}
                    alt="example"
                    src={e.media_source && e.media_source.split(",")[0]}
                  />
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "4%",
                    backgroundColor: "rgb(15,0,0)",
                    color: "#fff",
                    width: "50px",
                    borderRadius: "12px",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  -{e.sale}%
                </p>
                <div>
                  <h3 className="font-bold mb-3">{e.name}</h3>
                  <p
                    style={{
                      color: "#a5a5a5",
                      marginBottom: "8px",
                    }}
                  >
                    LOA MARSHALL, LOA NGHE TRONG NHÀ
                  </p>
                  <Rate className="mb-3" disabled defaultValue={5} />
                  <div className="flex gap-2 mb-5">
                    <span
                      style={{
                        color: "#bbb",
                        textDecoration: "line-through",
                      }}
                    >
                      {formatCurrency(e.price)}
                    </span>
                    <span
                      style={{
                        color: "rgb(15,0,0)",
                        fontWeight: "600",
                      }}
                    >
                      {formatCurrency(
                        e.sale ? e.price - e.price * (e.sale / 100) : e.price
                      )}
                    </span>
                  </div>
                  <Link to={`/detail/${e.product_id}`}>
                    <button className="w-full h-10 bg-zinc-900 text-white rounded-md">
                      Lựa chọn các tùy chọn
                    </button>
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <HomeNewProductEarphone />
      <HomeTintuc />
      <Footer />
    </div>
  );
};

export default Homepage;
