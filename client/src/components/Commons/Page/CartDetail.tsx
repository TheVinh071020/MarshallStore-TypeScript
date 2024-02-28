import React from "react";
import { Card, Rate } from "antd";
import { formatCurrency } from "../../../helpers";
import { Link } from "react-router-dom";

interface ProductItem {
  banner: string;
  category_id: number;
  description: string;
  description_name: string;
  media_source: string;
  name: string;
  number: number;
  price: number;
  product_id: number;
  sale: number;
}
const CartDetail: React.FC<{ productsLoudspeaker?: ProductItem[] }> = ({
  productsLoudspeaker,
}) => {
  return (
    <div className="flex flex-wrap gap-[26px] mt-2">
      {productsLoudspeaker &&
        productsLoudspeaker.length > 0 &&
        productsLoudspeaker.map((e, i) => (
          <div key={i} className=" mb-8">
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
                  {e.description}
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
                    Chi tiết sản phẩm
                  </button>
                </Link>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default CartDetail;
