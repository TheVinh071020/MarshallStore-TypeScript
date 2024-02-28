import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/header/Header";
import Footer from "../../components/layouts/footer/Footer";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { Card } from "antd";
import { Rate } from "antd";
import { formatCurrency } from "../../helpers";
import { axiosConfig } from "../../axios/config";
import BreadcrumbItems from "../../components/Commons/Page/BreadcrumbItems";
type Props = {};

const Shop = (props: Props) => {
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

  const [selectedLabel, setSelectedLabel] = useState("Mới nhất");
  const [sortOrder, setSortOrder] = useState("");

  const [productsLoudspeaker, setProductsLoudspeaker] = useState<any[]>([]);
  const [category, setCategory] = useState([]) as any;

  // Lấy toàn bộ category
  const fetchCategory = async () => {
    const result = await axiosConfig.get("/categories");

    const uniqueCategories = filterUniqueCategories(result.data.rows1);
    setCategory(uniqueCategories);
  };

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
    try {
      const result = await axiosConfig.get(`/products`);
      setProductsLoudspeaker(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, []);

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
        <BreadcrumbItems category={category} />

        <div className="flex justify-between items-center mt-7 mb-7">
          <h4 className="text-3xl font-bold">LOA MARSHALL </h4>
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
                        setSortOrder("asc"); // Sắp xếp từ thấp đến cao
                      } else if (item.key === "3") {
                        setSortOrder("desc"); // Sắp xếp từ cao đến thấp
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
        <div className="flex flex-wrap gap-[26px] mt-2">
          {productsLoudspeaker &&
            productsLoudspeaker.map((e, i) => {
              return (
                <div key={i} className=" mb-8">
                  <Card
                    hoverable
                    style={{
                      width: 320,
                      position: "relative",
                    }}
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
                        LOA MARSHALL, {e.description}
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
                              ? e.price - e.price * e.sale
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
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
