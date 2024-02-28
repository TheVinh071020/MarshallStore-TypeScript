import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import validationSchema from "../../../validate/ValidationSchema";
import { axiosConfig } from "../../../axios/config";

type Props = {};
interface Category {
  name: string;
  description: string;
  banner: string;
}

const CreateCategory = (props: Props) => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<Category>({
    name: "",
    description: "",
    banner: "LOA MARSHALL",
  });

  const [formErrors, setFormErrors] = useState<any>({
    name: "",
    description: "",
  });

  const handleCreate = (e: any) => {
    const { name, value } = e.target;
    setInputData((input) => ({
      ...input,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    const newInputData = { ...inputData };
    try {
      await axiosConfig.post("/categories", newInputData);
      toast.success("Thể loại loa đã được thêm mới");
      navigate("/admin/products");
      await validationSchema.validate(inputData, { abortEarly: false });
    } catch (validationErrors: any) {
      const errors = {};
      validationErrors.inner.forEach((error: any) => {
        (errors as { [key: string]: string })[error.path] = error.message;
      });
      setFormErrors(errors);
    }
  };

  return (
    <div className=" flex justify-center w-[100%]">
      <div className="bg-white w-full p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Thêm thể loại</h3>
        <div className="flex">
          <form className="flex flex-wrap items-center gap-3 w-[100%] ">
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
                Mô tả:
              </label>
              <input
                type="text"
                name="description"
                className="w-full p-2 border rounded-md"
                onChange={handleCreate}
              />
              <div className="text-red-500 text-sm">
                {formErrors.description}
              </div>
            </div>
          </form>
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

export default CreateCategory;
