import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

interface CategoryItem {
  category_id: number;
  name: string;
  source: string;
  description: string;
}

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

interface BreadcrumbItemsProps {
  category: CategoryItem[];
  productsLoudspeaker?: ProductItem[];
}

const BreadcrumbItems: React.FC<BreadcrumbItemsProps> = ({
  category,
  productsLoudspeaker,
}) => {
  
  return (
    <div>
      <Breadcrumb
        className="text-lg font-semibold "
        items={[
          {
            title: <Link to="/">Trang chủ </Link>,
          },
          {
            title: (
              <Link
                to={`/loa-marshall/${
                  productsLoudspeaker &&
                  productsLoudspeaker[0]?.description_name
                }`}
              >
                {productsLoudspeaker && productsLoudspeaker[0]?.description}
              </Link>
            ),
          },
        ]}
      />

      <div
        className="flex gap-8 p-3 mt-5 "
        style={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
        }}
      >
        {category?.length > 0 &&
          category.map((item) => (
            <div
              key={item.category_id}
              style={{ width: "10%" }}
              className="text-center"
            >
              <Link to={`/loa-marshall/${item.name}`}>
                <img style={{ width: "100%" }} src={item.source} alt="" />
                <h3 className="mt-4 font-semibold">{item.description}</h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BreadcrumbItems;
