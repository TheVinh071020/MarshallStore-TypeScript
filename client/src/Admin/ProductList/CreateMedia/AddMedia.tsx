import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { axiosConfig } from "../../../axios/config";

const AddMedia = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const onchangeImage = async (e: any) => {
    const cac = e.target.files;
    const newData = new FormData();
    for (const key of Object.keys(cac)) {
      newData.append("image", cac[key]);
    }

    try {
      const response = await axiosConfig.post("/media", newData);
      console.log("Response", response.data);

      // Cập nhật danh sách ảnh đã tải lên
      setUploadedImages(response.data.imageList);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div>
      <div>
        <h1>Upload file</h1>
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
        <Button> Upload </Button>
      </div>

      <div>
        <h2>Uploaded Images:</h2>
        <div className="flex flex-wrap  items-center justify-around">
          {uploadedImages.map((image, index) => (
            <div className="w-[30%]" key={index}>
              <img
                className="w-[100%] mb-5 mt-5truất long"
                src={image}
                alt={`Uploaded Image ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMedia;
