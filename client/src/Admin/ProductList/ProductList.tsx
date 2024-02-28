import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../helpers";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import ProductDetail from "./ViewProduct/ProductDetail";
import { axiosConfig } from "../../axios/config";
import PaginationUser from "../users/PaginationUser";

interface Product {
  product_id: number;
  name: string;
  price: number;
  number: number;
  sale: number;
  description: string;
}

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(5);

  const BASE_API = "http://localhost:3000/api/v1";

  const fetchProducts = async (pageIndex: number, pageNumber: number) => {
    try {
      const res = await axiosConfig.get(
        `/products?page_index=${pageIndex}&page_number=${pageNumber}`
      );
      setProducts(res.data.data);
      setTotal(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosConfig.get(`/categories`);
      setCategories(res.data.rows2);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(pageIndex, pageNumber);
    fetchCategories();
  }, [pageIndex, pageNumber]);

  const handleChangePage = async (pageIndex: any) => {
    try {
      const res = await fetch(
        `${BASE_API}/products?${
          categoryFilter ? `category=${categoryFilter}&` : ""
        }page_index=${pageIndex}&page_number=5`
      );
      const data = await res.json();
      setProducts([...data.data]);
      setPageIndex(pageIndex);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterByCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const fetchProductByCategory = async (filter: string) => {
    try {
      if (filter) {
        const res = await fetch(
          `${BASE_API}/products?category=${filter}&page_index=1&page_number=5`
        );
        const data = await res.json();
        setProducts([...data.data]);
        setTotal(data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    if (categoryFilter) {
      fetchProductByCategory(categoryFilter);
    } else {
      fetchProducts(pageIndex, pageNumber);
    }
  }, [categoryFilter]);

  const handleDelete = (id: number) => {
    axiosConfig
      .delete(`/products/${id}`)
      .then((res) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.product_id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id: number) => {
    navigate("/admin/products/edit/" + id);
  };

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-4 w-full">
      <h3 className="text-3xl font-bold mb-4">Product List</h3>
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <button className="bg-green-600 text-white rounded px-4 py-2">
            <Link to="/admin/products/addproduct">Thêm sản phẩm</Link>
          </button>
          <button className="bg-green-600 text-white rounded px-4 py-2">
            <Link to="/admin/products/addcategory">Thêm thể loại</Link>
          </button>
          <select
            style={{ height: "45px", width: "20%", marginLeft: "auto" }}
            onChange={handleFilterByCategory}
            className="border rounded px-2 py-1   "
            aria-label="Filter By Category"
          >
            <option value="">Chọn loại sản phẩm</option>
            {categories.length > 0 &&
              categories.map((e, i) => (
                <option key={i} value={e.name}>
                  {e.description}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-center">
          <thead>
            <tr>
              <th className="border px-4 py-2">STT</th>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Sản phẩm</th>
              <th className="border px-4 py-2">Giá</th>
              <th className="border px-4 py-2">Tồn kho</th>
              <th className="border px-4 py-2">Sale</th>
              <th className="border px-4 py-2">Thể loại</th>
              <th className="border px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((e, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">
                    {(pageIndex - 1) * pageNumber + i + 1}
                  </td>{" "}
                  <td className="border px-4 py-2">{e.product_id}</td>
                  <td className="border px-4 py-2">{e.name}</td>
                  <td className="border px-4 py-2">
                    {formatCurrency(e.price)}
                  </td>
                  <td className="border px-4 py-2">{e.number}</td>
                  <td className="border px-4 py-2">{e.sale * 100}%</td>
                  <td className="border px-4 py-2">{e.description}</td>
                  <td className="border px-4 py-2">
                    <Button
                      type="primary"
                      onClick={() => showModal(e.product_id)}
                      className="bg-blue-500 rounded px-2 py-1"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Button>

                    <button
                      onClick={() => handleEdit(e.product_id)}
                      className="bg-green-500 text-white rounded px-2 py-1 ml-2"
                    >
                      <i className="fa-solid fa-wrench"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(e.product_id)}
                      className="bg-red-500 text-white rounded px-2 py-1 ml-2"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <PaginationUser
        total={total}
        pageNumber={pageNumber}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        setPageNumber={setPageNumber}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        {selectedProductId !== null && (
          <ProductDetail productId={selectedProductId} />
        )}
      </Modal>
    </div>
  );
};

export default ProductList;
