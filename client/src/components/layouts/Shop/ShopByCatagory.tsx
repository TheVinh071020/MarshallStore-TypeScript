import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link, useParams } from "react-router-dom";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import BreadcrumbItems from "../../Commons/Page/BreadcrumbItems";
import { axiosConfig } from "../../../axios/config";
import CartDetail from "../../Commons/Page/CartDetail";

const ShopByCatagory = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Mới nhất",
    },
    {
      key: "2",
      label: "Thứ tự theo giá: thấp đến cao",
    },
    {
      key: "3",
      label: "Thứ tự theo giá: cao xuống thấp",
    },
  ];

  let { category } = useParams();

  const [selectedLabel, setSelectedLabel] = useState("Mới nhất");

  const [productsLoudspeaker, setProductsLoudspeaker] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Lấy toàn bộ category
  const fetchCategory = async () => {
    const result = await axiosConfig.get("/categories");
    const uniqueCategories = filterUniqueCategories(result.data.rows1);
    setCategories(uniqueCategories);
  };
  console.log(categories);

  // Lấy toàn bộ category có img
  const filterUniqueCategories: any = (categories: any) => {
    const uniqueCategories: any[] = [];
    const addedCategoryIds: any[] = [];

    categories.forEach((item: any) => {
      if (!addedCategoryIds.includes(item.category_id)) {
        uniqueCategories.push(item);
        addedCategoryIds.push(item.category_id);
      }
    });

    return uniqueCategories;
  };

  // Lấy product
  const fetchProducts = async () => {
    let responseLoudspeaker = await fetch(
      `http://localhost:3000/api/v1/products?category=${category}`
    );
    let dataLoudspeaker = await responseLoudspeaker.json();
    setProductsLoudspeaker(dataLoudspeaker.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, [category]);

  // Sắp xếp
  const [sortOrder, setSortOrder] = useState("");
  const sortProducts = (products: any, sortOrder: string) => {
    const sortedProducts = [...products];

    sortedProducts.sort((a, b) => {
      const priceA = a.sale ? a.price - a.price * (a.sale / 100) : a.price;
      const priceB = b.sale ? b.price - b.price * (b.sale / 100) : b.price;

      if (sortOrder === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    return sortedProducts;
  };

  useEffect(() => {
    const sortedLoudspeakerProducts = sortProducts(
      productsLoudspeaker,
      sortOrder
    );
    setProductsLoudspeaker(sortedLoudspeakerProducts);
  }, [sortOrder]);

  return (
    <div>
      <Header />
      <div
        style={{
          padding: "20px 80px",
          backgroundColor: "rgb(246,246,246)",
        }}
      >
        <BreadcrumbItems
          category={categories}
          productsLoudspeaker={productsLoudspeaker}
        />
        <div className="flex justify-between items-center mt-7 mb-7">
          <h4 className="text-3xl font-bold">
            {productsLoudspeaker.length > 0 &&
              productsLoudspeaker[0].description}
          </h4>
          <Dropdown
            className="h-10 "
            menu={{
              items: items.map((item: any) => ({
                key: item.key,
                label: (
                  <a
                    onClick={() => {
                      setSelectedLabel(item.label);
                      if (item.key === "2") {
                        setSortOrder("asc");
                      } else if (item.key === "3") {
                        setSortOrder("desc");
                      }
                    }}
                  >
                    {item.label}
                  </a>
                ),
              })),
            }}
            placement="bottomLeft"
          >
            <Button>
              {selectedLabel}
              <i className="fa-solid fa-chevron-down text-sm ml-3"></i>
            </Button>
          </Dropdown>
        </div>
        <CartDetail productsLoudspeaker={productsLoudspeaker} />
      </div>
      <Footer />
    </div>
  );
};

export default ShopByCatagory;
