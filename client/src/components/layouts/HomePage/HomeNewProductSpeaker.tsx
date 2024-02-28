import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Rate } from "antd";
import { formatCurrency } from "../../../helpers";
import { Link } from "react-router-dom";
type Props = {};
const HomeNewProductSpeaker = (props: Props) => {
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    await fetch(
      `http://localhost:3000/api/v1/products?category=marshall-loadidong`
    )
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setDisplayedProducts(res.data.slice(0, 4));
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="flex gap-4 mt-10 w-full">
        <div className="w-4/12">
          <img
            className="rounded-xl"
            src="https://marshallstorevietnam.vn/wp-content/uploads/elementor/thumbs/03-usp-desktop-q3mslc00a1z2pbr36uvpke3yj8x3tqqe33v52nhnvk.jpeg"
            alt=""
          />
        </div>
        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-5">
              SẢN PHẨM MỚI DÒNG LOA DI ĐỘNG
            </h1>
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
          <div className="flex gap-4 ">
            {displayedProducts &&
              displayedProducts.map((e, i) => (
                <div key={i} className="mb-8">
                  <Card
                    hoverable
                    style={{
                      width: 215,
                      position: "relative",
                    }}
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
                        LOA MARSHALL, LOA DI ĐỘNG
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
                            e.sale
                              ? e.price - e.price * (e.sale / 100)
                              : e.price
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
    </div>
  );
};

export default HomeNewProductSpeaker;
