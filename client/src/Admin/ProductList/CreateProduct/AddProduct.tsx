import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import validationSchema from "../../../validate/ValidationSchema";
import { axiosConfig } from "../../../axios/config";

type Props = {};
interface Product {
  name: string;
  number: string;
  price: string;
  sale: string;
  category_id: string;
  wattage: any;
  frequency: any;
  size: any;
  weight: any;
}

interface Category {
  category_id: number;
  name: string;
  description: string;
  banner: string;
}

const AddProduct = (props: Props) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>();
  const [productData, setProductData] = useState<Product>({
    name: "",
    number: "",
    price: "",
    sale: "",
    category_id: "",
    wattage: "",
    frequency: "",
    size: "",
    weight: "",
  });

  const [formErrors, setFormErrors] = useState<any>({
    name: "",
    number: "",
    price: "",
    sale: "",
    category_id: "",
    wattage: "",
    frequency: "",
    size: "",
    weight: "",
  });

  const onImagesUploaded = (imageList: string[]) => {
    setUploadedImages(imageList);
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosConfig.get("/categories");
      setCategories(response.data.rows2);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = (e: any) => {
    const { name, value } = e.target;
    setProductData((input) => ({
      ...input,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    const newProduct = {
      ...productData,
      source: uploadedImages,
    };
    try {
      await axiosConfig.post("/products", newProduct);
      toast.success("Sản phẩm đã được thêm mới");
      navigate("/admin/products");
      await validationSchema.validate(productData, { abortEarly: false });
    } catch (validationErrors: any) {
      const errors = {};
      validationErrors.inner.forEach((error: any) => {
        (errors as { [key: string]: string })[error.path] = error.message;
      });
      setFormErrors(errors);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [isUploading, setIsUploading] = useState(false);
  const onchangeImage = async (e: any) => {
    setIsUploading(true);
    const cac = e.target.files;
    const newData = new FormData();
    for (const key of Object.keys(cac)) {
      newData.append("image", cac[key]);
    }

    try {
      const response = await axiosConfig.post("/media", newData);
      setUploadedImages(response.data.imageList);
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className=" flex justify-center">
      <div className="bg-white w-full p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Thêm sản phẩm</h3>{" "}
        <div className="flex">
          <form className="flex flex-wrap items-center gap-3 w-[35%] ">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Tên:
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded-md"
                onChange={handleCreate}
              />
              <div className="text-red-500 text-sm">{formErrors.name}</div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Số lượng:
              </label>
              <input
                type="text"
                name="number"
                className="w-full p-2 border rounded-md"
                onChange={handleCreate}
              />
              <div className="text-red-500 text-sm">{formErrors.number}</div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Giá:
              </label>
              <input
                type="text"
                name="price"
                className="w-full p-2 border rounded-md"
                onChange={handleCreate}
              />
              <div className="text-red-500 text-sm">{formErrors.price}</div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Sale:
              </label>
              <input
                type="text"
                name="sale"
                className="w-full p-2 border rounded-md"
                onChange={handleCreate}
              />
              <div className="text-red-500 text-sm">{formErrors.sale}</div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Công suất:
              </label>
              <input
                type="text"
                name="wattage"
                className="w-full p-2 border rounded-md"
                onChange={handleCreate}
              />
              <div className="text-red-500 text-sm">{formErrors.wattage}</div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Tần số:
              </label>
              <input
                type="text"
                name="frequency"
                className="w-full p-2 border rounded-md"
                onChange={handleCreate}
              />
              <div className="text-red-500 text-sm">{formErrors.frequency}</div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Size:
              </label>
              <input
                type="text"
                name="size"
                className="w-full p-2 border rounded-md"
                onChange={handleCreate}
              />
              <div className="text-red-500 text-sm">{formErrors.size}</div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Weight:
              </label>
              <input
                type="text"
                name="weight"
                className="w-full p-2 border rounded-md"
                onChange={handleCreate}
              />
              <div className="text-red-500 text-sm">{formErrors.weight}</div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Category:
              </label>
              <select
                name="category_id"
                onChange={handleCreate}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Thể loại loa</option>
                {categories &&
                  categories.length > 0 &&
                  categories.map((e, i) => (
                    <option key={i} value={e.category_id}>
                      {e.description}
                    </option>
                  ))}
              </select>
              <div className="text-red-500 text-sm">
                {formErrors.category_id}
              </div>
            </div>
          </form>
          <div className="w-[65%]">
            <div>
              <h1>Tải ảnh</h1>
              <label htmlFor="file" className="cursor-pointer mr-3">
                <UploadOutlined />
              </label>
              <input
                type="file"
                name="file"
                id="file"
                multiple
                hidden
                onChange={onchangeImage}
              />
              {isUploading && (
                <p>
                  <LoadingOutlined
                    style={{
                      fontSize: "50px",
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  />
                </p>
              )}
            </div>

            <div>
              {/* <h2>Uploaded Images:</h2> */}
              <div className="flex flex-wrap  items-center justify-around">
                {uploadedImages.map((image, index) => (
                  <div className="w-[25%]" key={index}>
                    <img
                      className="w-[100%] mb-5 mt-5t"
                      src={image}
                      alt={`Uploaded Image ${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleAddProduct}
          >
            Thêm
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            <Link
              to="/admin/products"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Hủy
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
