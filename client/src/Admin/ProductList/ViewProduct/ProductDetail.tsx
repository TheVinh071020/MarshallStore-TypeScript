import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  productId: number; // Định nghĩa prop
};

interface Product {
  name: string;
  price: number;
  sale: number;
  number: any;
  description: any;
  banner: any;
  wattage: any;
  frequency: any;
  size: any;
  weight: any;
  sources: Array<{ url: string; media_id: number }>;
}

const ProductDetail = ({ productId }: Props) => {
  // Sử dụng prop `productId` thay vì `id` từ `useParams()`
  let [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    sale: 0,
    number: "",
    description: "",
    banner: "",
    wattage: "",
    frequency: "",
    size: "",
    weight: "",
    sources: [],
  });

  const fetchProduct = async () => {
    try {
      let response = await axios.get(
        `http://localhost:3000/api/v1/products/${productId}`
      );
      let data = response.data;
      console.log(data);

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);
  return (
    <div>
      <h1 className="text-3xl font-semibold">Chi tiết sản phẩm</h1>

      <div className="text-base">
        <div className="mb-3 mt-5">
          <span>Sản phẩm: </span>
          <span>
            <b>{product.name}</b>
          </span>
        </div>

        <div className="mb-3">
          <span>Giá: </span>
          <span>
            <b>{product.price}</b>
          </span>
        </div>

        <div className="mb-3">
          <span>Tồn kho: </span>
          <span>
            <b>{product.number}</b>
          </span>
        </div>

        <div className="mb-3">
          <span>Sale: </span>
          <span>
            <b>{product.sale}%</b>
          </span>
        </div>

        <div className="mb-3">
          <span>Thể loại: </span>
          <span>
            <b>{product.description}</b>
          </span>
        </div>

        <div className="mb-3">
          <span>Công suất: </span>
          <span>
            <b>{product.wattage} Watt</b>
          </span>
        </div>

        <div className="mb-3">
          <span>Tần số: </span>
          <span>
            <b>{product.frequency}</b>
          </span>
        </div>

        <div className="mb-3">
          <span>Kích thước: </span>
          <span>
            <b>{product.size} mm</b>
          </span>
        </div>

        <div className="mb-3">
          <span>Trọng lượng: </span>
          <span>
            <b>{product.weight}kg</b>
          </span>
        </div>
        <div className="mb-3">
          <span>Ảnh sản phẩm: </span>
          <div className="flex flex-wrap justify-between">
            {product.sources.map((source, index) => (
              <img
                className="w-[33%]"
                key={source.media_id}
                src={source.url}
                alt={`Ảnh ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
