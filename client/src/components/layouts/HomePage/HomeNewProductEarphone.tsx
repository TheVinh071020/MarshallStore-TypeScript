import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Rate } from "antd";
import { formatCurrency } from "../../../helpers";
import { Link } from "react-router-dom";
type Props = {};

const HomeNewProductEarphone = React.memo((props: Props) => {
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    await fetch(
      `http://localhost:3000/api/v1/products?category=marshall-tainghe`
    )
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setDisplayedProducts(res.data.slice(0, 1));
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div
        style={{ padding: "50px 80px" }}
        className="tainghe flex justify-between gap-6 "
      >
        <div>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "57px 0px 57px 0px",
              height: 370,
            }}
            className="flex rounded-xl items-center"
          >
            <div className="w-3/5">
              <img
                src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/TAINGHE-1.png"
                alt=""
              />
            </div>
            <div>
              <h4 className="text-5xl font-bold">Tai nghe Marshall</h4>
              <p style={{ padding: "30px 0", color: "#7A7A7A" }}>
                CHO CHÚNG TÔI ĐÔI TAI CỦA BẠN VÀ CHÚNG TÔI SẼ GIÚP BẠN NGHE MỘT
                BÀI NHẠC
              </p>
              <button
                style={{
                  width: "130px",
                  height: "40px",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Xem tất cả
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>

          <div
            // style={{ position: "relative" }}
            className="flex gap-4 mt-4 w-full"
          >
            <div style={{ width: "103%", position: "relative" }}>
              <img
                style={{
                  width: "100%",
                  height: "170px",
                  borderRadius: "10px",
                }}
                src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/in-ear-01-hero.jpeg"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "9%",
                  left: "9%",
                }}
              >
                <h4 className="text-white text-lg font-bold">
                  IN-EAR HEADPHONES
                </h4>
                <button
                  style={{
                    width: "100px",
                    height: "40px",
                    border: "2px solid white",
                    color: "white",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                >
                  Xem Thêm
                </button>
              </div>
            </div>
            <div style={{ width: "100%", position: "relative" }}>
              <img
                style={{
                  width: "100%",
                  height: "170px",
                  borderRadius: "10px",
                }}
                src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/slideshow-major-iv-05.jpeg"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "9%",
                  left: "9%",
                }}
              >
                <h4 className="text-white text-lg font-bold">
                  OVER-EAR HEADPHONES
                </h4>
                <button
                  style={{
                    width: "100px",
                    height: "40px",
                    border: "2px solid white",
                    color: "white",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                >
                  Xem Thêm
                </button>
              </div>
            </div>
            <div style={{ width: "100%", position: "relative" }}>
              <img
                style={{
                  width: "100%",
                  height: "170px",
                  borderRadius: "10px",
                }}
                src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall_campaign_monitorII-ANC_1.jpeg"
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "9%",
                  left: "9%",
                }}
              >
                <h4 className="text-white text-lg font-bold">
                  OVER-EAR HEADPHONES
                </h4>
                <button
                  style={{
                    width: "100px",
                    height: "40px",
                    border: "2px solid white",
                    color: "white",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                >
                  Xem Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {displayedProducts &&
            displayedProducts.map((e, i) => (
              <div key={i} className="">
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
      </div>
    </div>
  );
});

export default HomeNewProductEarphone;
