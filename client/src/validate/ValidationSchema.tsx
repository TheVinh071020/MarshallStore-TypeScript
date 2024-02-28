import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Tên không được để trống"),
  number: Yup.string().required("Số lượng không được để trống"),
  price: Yup.string().required("Giá tiền không được để trống"),
  sale: Yup.string().required("Giảm giá không được để trống"),
  wattage: Yup.string().required("Công suất không được để trống"),
  frequency: Yup.string().required("Tần số không được để trống"),
  size: Yup.string().required("Kích cỡ không được để trống"),
  weight: Yup.string().required("Khối lượng không được để trống"),
  category_id: Yup.string().required("Loại không được để trống"),
  description: Yup.string().required("Mô tả không được để trống"),
  banner: Yup.string().required("Banner không được để trọng"),
});

export default validationSchema;
