import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/header/Header";
import Footer from "../../components/layouts/footer/Footer";
import { Link, useParams } from "react-router-dom";
import { Rate } from "antd";
import { Card } from "antd";
import axios from "axios";
import { formatCurrency } from "../../helpers";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { axiosConfig } from "../../axios/config";
interface Product {
  name: string;
  price: number;
  sale: number;
  image: string;
  description: any;
  banner: any;
  wattage: any;
  frequency: any;
  size: any;
  weight: any;
  sources: any;
}
interface Image {
  url: string;
}
const Detail: React.FC = () => {
  let [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    sale: 0,
    image: "",
    description: "",
    banner: "",
    wattage: "",
    frequency: "",
    size: "",
    weight: "",
    sources: [],
  });

  const [images, setImages] = useState<Image[]>([]);

  const [selectedImage, setSelectedImage] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage + 1 < Math.ceil(images.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleImages = images.slice(startIndex, endIndex);

  const [quantity, setQuantity] = useState(1);
  const [largeImage, setLargeImage] = useState("");

  let { id } = useParams();

  const fetchProduct = async () => {
    try {
      let response = await axiosConfig.get(`/products/${id}`);
      let data = response.data;
      console.log(data);

      const smallImages = data.sources;
      console.log(smallImages);

      setProduct({ ...data, image: smallImages[0] });
      setLargeImage(smallImages[0].url);
      setImages(smallImages);
      setSelectedImage(smallImages);
    } catch (error) {
      console.log(error);
    }
  };

  // const selectImage = (image: any) => {
  //     setSelectedImage(image);
  // };

  useEffect(() => {
    fetchProduct();
  }, []);

  let dispatch = useDispatch();
  const handleAddToCart = () => {
    let buyProduct = {
      ...product,
      clickNumber: quantity,
    };

    dispatch({ type: "ADD_TO_CART", payload: buyProduct });
    setQuantity(() => 1);
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const handleMouseEnter = (image: any) => {
    setLargeImage(image.url);
  };

  return (
    <div>
      <Header />
      <div className="mt-9" style={{ padding: "20px 80px" }}>
        <div>
          <nav className="text-sm font-semibold" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/" className="text-gray-500 text-base">
                  Trang chủ
                </Link>
                <span className="mx-2">/</span>
              </li>

              <li className="flex items-center">
                <Link to="/loa-marshall" className="text-gray-500 text-base">
                  {product.description}
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <span className="text-black-500 text-base">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex">
          <div className="flex items-center w-full">
            <div style={{ width: "28%" }} className="">
              {visibleImages.map((image, index) => (
                <div
                  key={index}
                  className="mb-4"
                  onMouseEnter={() => handleMouseEnter(image)}
                >
                  <img
                    src={image.url}
                    alt={`Image ${startIndex + index + 1}`}
                    className="w-full cursor-pointer"
                  />
                </div>
              ))}
              {Math.ceil(images.length / itemsPerPage) > 1 && (
                <div className="mt-4 flex justify-center gap-3  ">
                  <button
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "30px",
                      color: "#333",
                      borderRadius: "10px",
                      fontSize: "12px",
                    }}
                    onClick={handlePrev}
                    className={`w-1/2 py-2  ${
                      currentPage === 0
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={currentPage === 0}
                  >
                    <i className="fa-solid fa-chevron-up"></i>
                  </button>
                  <button
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "30px",
                      color: "#333",
                      borderRadius: "10px",
                      fontSize: "12px",
                    }}
                    onClick={handleNext}
                    className={`w-1/2 py-2   ${
                      currentPage + 1 ===
                      Math.ceil(images.length / itemsPerPage)
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={
                      currentPage + 1 ===
                      Math.ceil(images.length / itemsPerPage)
                    }
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                </div>
              )}
            </div>
            <div style={{ width: "100%", position: "relative" }} className="">
              <img
                src={largeImage}
                alt="Selected Image"
                className="max-w-full"
              />
              <p
                style={{
                  position: "absolute",
                  top: "0%",
                  right: "9%",
                  backgroundColor: "rgb(15,0,0)",
                  color: "#fff",
                  width: "50px",
                  borderRadius: "12px",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                -{product.sale}%
              </p>
            </div>
          </div>

          <div className="w-full">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-5">
              <Rate disabled defaultValue={5} />
              <p style={{ color: "#777" }}>( 141 đánh giá của khách hàng )</p>
            </div>

            <div
              className="flex p-5 items-center mt-6"
              style={{
                backgroundColor: "#1c61e71a",
                borderRadius: "10px",
              }}
            >
              <div>
                <img
                  src="	https://marshallstorevietnam.vn/wp-content/uploads/2022/12/promotions.svg"
                  alt=""
                />
                <h4 className="text-lg font-semibold">
                  Sự kiện mua sắm tại Marshall Store VN
                </h4>
                <p>
                  Hàng chính hãng Marshall <br />
                  Trải nghiệm so sánh, phân biệt cùng hàng giá rẻ kém chất lượng
                  tại Store HN & HCM
                  <br />
                  HN: 0928 759 555 / HCM: 0394 678 121
                </p>
              </div>
              <div
                style={{
                  width: "250px",
                  height: "40px",
                  borderColor: "#205ACF",
                  borderWidth: "1px 1px 1px 1px",
                  borderStyle: "dotted",
                  borderRadius: "5px 5px 5px 5px",
                  textAlign: "center",
                  padding: "6px",
                }}
              >
                <p>Giảm giá lên tới 37%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-4xl mt-5">
              <p
                style={{
                  color: "#bbb",
                  fontWeight: "400",
                  textDecoration: "line-through",
                }}
              >
                {product?.price && formatCurrency(product?.price)}
              </p>
              <p style={{ fontWeight: "600" }}>
                {product.sale &&
                  formatCurrency(
                    product.price - (product.price * product.sale) / 100
                  )}
              </p>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div
                style={{
                  border: "1px solid rgb(0 0 0 / 10%)",
                  borderRadius: "6px",
                  width: "12%",
                }}
                className="flex text-center"
              >
                <button
                  style={{
                    width: "20px",
                    height: "33px",
                    borderRight: "1px solid rgb(0 0 0 / 10%)",
                  }}
                  className="hover:bg-black hover:text-white hover:rounded-s-md"
                  value="-"
                  onClick={() => {
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                >
                  -
                </button>
                <p
                  style={{
                    width: "40px",
                    height: "33px",
                    padding: "4px",
                  }}
                >
                  {quantity}
                </p>
                <button
                  style={{
                    width: "20px",
                    height: "33px",
                    borderLeft: "1px solid rgb(0 0 0 / 10%)",
                  }}
                  className="hover:bg-black hover:text-white hover:rounded-e-md"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <div>
                <button
                  style={{
                    width: "300px",
                    height: "40px",
                    backgroundColor: "rgb(15,0,0)",
                    color: "#fff",
                    borderRadius: "7px",
                  }}
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
              <div>
                <button
                  style={{
                    width: "270px",
                    height: "40px",
                    backgroundColor: "rgb(107,163,49)",
                    color: "#fff",
                    borderRadius: "7px",
                  }}
                >
                  Buy now
                </button>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #0000001c",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "25px",
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-2">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/warranty.svg"
                    alt=""
                  />
                  <span className="text-lg font-medium">Bảo hành 1 năm </span>
                </div>
                <p style={{ color: "#1877f2" }}>
                  <i>Chi tiết</i>
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/return.svg"
                    alt=""
                  />
                  <span className="text-lg font-medium">
                    Đổi trả miễn phí trong 30 ngày
                  </span>
                </div>
                <p style={{ color: "#1877f2" }}>
                  <i>Chi tiết</i>
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <p className="font-medium">Payment Methods:</p>
              <img
                src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/payment-methods.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="flex w-full gap-5 mt-10">
          <div className="w-[60%] bg-[#000000] text-white rounded-xl">
            <div className="p-5">
              <h1 className="text-2xl font-bold font-sans">
                Thông tin sản phẩm
              </h1>
              <p className="text-[#777777] mt-5 text-sm">
                Loa Marshall Woburn 3 là loa lớn nhất trong dòng sản phẩm{" "}
                <b className="text-white">âm thanh dành cho gia đình </b> .
                Marshall đã đưa dòng loa gia đình mang đặc trưng của tinh thần
                rock ‘n’ roll với diện mạo hoàn mỹ hơn tạo nên một hiện tượng
                trong giới điệu mộ âm thanh. Thiết kế mang tính biểu tượng đặc
                trưng của nó đánh bật tất cả các loa khác khỏi thị trường.
              </p>
            </div>

            <div className="flex gap-5 mt-5 p-5">
              <div className="w-[50%]">
                <h1 className="text-xl font-bold font-sans mb-3">
                  ÂM THANH MẠNH MẼ
                </h1>
                <div className="text-sm text-[#DDDDDD]">
                  <p className="mb-3">
                    Loa Marshall Woburn 3 có âm trường lớn hơn so với phiên bản
                    tiền nhiệm đời 2. Marshall Woburn 3 đã được tái thiết kế với
                    hệ thống trình điều khiển ba chiều mới, mang lại âm trầm
                    được kiểm soát tốt hơn, tần số thấp hơn và độ rõ ràng hơn ở
                    âm trung.
                  </p>
                  <p>
                    Thế hệ Marshall Woburn 3 mới này được thiết kế với các củ
                    loa tweeter hướng ra ngoài và các ống dẫn sóng được trang bị
                    thêm để mang lại âm thanh chắc chắn, xuyên suốt và có độ phủ
                    rộng lớn cả căn phòng. Loa Marshall Woburn 3 cũng có tính
                    năng Dynamic Loudness, điều chỉnh cân bằng âm sắc của âm
                    thanh để đảm bảo âm nhạc phát ra luôn trọn vẹn ở mọi mức âm
                    lượng. Khi bạn kết nối với chế độ HDMI, Night Mode (chế độ
                    ban đêm) giúp những người hàng xóm vui vẻ hơn nhờ giảm cường
                    độ âm thanh lớn trong khi vẫn đảm bảo âm thanh yên tĩnh vẫn
                    có thể nghe được rõ ràng.
                  </p>
                </div>
              </div>
              <div className="w-[50%]">
                <img
                  className="w-full"
                  src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/02-usp-desktop-2.webp"
                  alt=""
                />
              </div>
            </div>

            <div className="flex gap-5 bg-[#4D4E4C] p-5 h-[335px]">
              <div className="w-[50%]">
                <img
                  className="w-full"
                  src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/01-usp-desktop-2.webp"
                  alt=""
                />
              </div>
              <div className="w-[50%]">
                <h1 className="text-xl font-bold font-sans mb-3">
                  KẾT NỐI VÀ TẬN HƯỞNG
                </h1>
                <div className="text-sm text-[#DDDDDD]">
                  <p className="">
                    Thế hệ Marshall Woburn 3 mới này được thiết kế với các củ
                    loa tweeter hướng ra ngoài và các ống dẫn sóng được trang bị
                    thêm để mang lại âm thanh chắc chắn, xuyên suốt và có độ phủ
                    rộng lớn cả căn phòng. Loa Marshall Woburn 3 cũng có tính
                    năng Dynamic Loudness, điều chỉnh cân bằng âm sắc của âm
                    thanh để đảm bảo âm nhạc phát ra luôn trọn vẹn ở mọi mức âm
                    lượng. Khi bạn kết nối với chế độ HDMI, Night Mode (chế độ
                    ban đêm) giúp những người hàng xóm vui vẻ hơn nhờ giảm cường
                    độ âm thanh lớn trong khi vẫn đảm bảo âm thanh yên tĩnh vẫn
                    có thể nghe được rõ ràng.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 items-center p-5">
              <div className="w-[50%]">
                <h1 className="text-xl font-bold font-sans mb-3">
                  BLUETOOTH THẾ HỆ MỚI NHẤT
                </h1>
                <div className="text-sm text-[#DDDDDD]">
                  <p className="">
                    Loa Marshall Woburn 3 được thiết kế để đáp ứng trọn vẹn công
                    nghệ Bluetooth trong tương lai và đã được xây dựng để cung
                    cấp các tính năng của Bluetooth thế hệ mới nhất ngay khi
                    chúng ra mắt. Cập nhật qua mạng (OTA) trên ứng dụng của
                    Marshall để đảm bảo rằng loa của bạn luôn trong phiên bản
                    phần mềm với các tính năng mới nhất. Công nghệ dẫn đầu trong
                    tương lai này sẽ mang lại chất lượng âm thanh cao nhất có
                    thể, đồng thời tăng phạm vi phát trực tuyến và cải thiện khả
                    năng đồng bộ hóa âm thanh.
                  </p>
                </div>
              </div>
              <div className="w-[50%]">
                <img
                  className="w-full"
                  src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/03-usp-desktop-2.webp"
                  alt=""
                />
              </div>
            </div>

            <div className="bg-[#4D4E4C] h-[550px]">
              <div>
                <img
                  src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/04-usp-desktop-e1654884468849.png"
                  alt=""
                />
              </div>
              <div className="text-center ">
                <h1 className="text-2xl font-bold font-sans mb-3">
                  THIẾT KẾ ĐẶC TRƯNG HUYỀN THOẠI
                </h1>
                <p
                  className="text-sm text-[#DDDDDD]"
                  style={{ padding: "0 100px" }}
                >
                  Marshall đã đem đến dòng loa nghe trong nhà đậm chất rock ‘n’
                  roll và mang đến cho nó một diện mạo hoàn mỹ tạo nên một cơn
                  sốt trên thị trường. Thiết kế mang tính biểu tượng đặc trưng
                  đánh bật tất cả các loa khác khỏi thị trường. Các chi tiết đặc
                  trưng như logo Marshall và các núm vặn điều khiển bằng đồng tô
                  điểm cho loa, lưu giữ di sản của nhạc rock ‘n’ roll. Chọn các
                  màu sắc phù hợp với bạn – Đen nguyên bản, Kem cổ điển hoặc Nâu
                  thư giãn.
                </p>
              </div>
            </div>

            <div>
              <div className="flex gap-5 p-7 justify-center w-full">
                <div className="text-center w-1/2">
                  <img
                    className="rounded-xl"
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/05-usp-both-2.jpeg"
                    alt=""
                  />
                  <h1 className="text-xl font-bold font-sans mb-3 mt-3">
                    CÁCH TIẾP CẬN BỀN VỮNG HƠN
                  </h1>
                  <p className="text-sm">
                    Trong khi vẫn duy trì thiết kế mang tính biểu tượng đặc
                    trưng của thương hiệu, Marshall Woburn 3 không sử dụng nhựa
                    PVC để sản xuất, mà sử dụng 70% nhựa tái chế và các nguyên
                    vật liệu thuần chay.
                  </p>
                </div>
                <div className="text-center w-1/2">
                  <img
                    className=" rounded-xl"
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/06-usp-both-2.jpeg"
                    alt=""
                  />
                  <h1 className="text-xl font-bold font-sans mb-3 mt-3">
                    KẾT NỐI CỔNG HDMI
                  </h1>
                  <p className="text-sm">
                    Với rất nhiều cách để kết nối với Marshall Woburn 3, việc có
                    được âm thanh phù hợp để nghe nhạc hoặc xem TV chưa bao giờ
                    dễ dàng đến thế. Kết nối trực tiếp với loa từ thiết bị của
                    bạn bằng Bluetooth, RCA hoặc 3,5 mm. Marshall Woburn 3 cũng
                    có đầu vào HDMI, cho phép bạn kết nối Marshall Woburn 3 với
                    TV của mình để có trải nghiệm xem Marshall độc đáo.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[40%] bg-[rgb(246,246,246)] rounded-xl p-5 h-[730px] sticky top-5 ">
            <h1 className="text-2xl font-bold font-sans mb-5">
              Thông số kỹ thuật
            </h1>
            <div className="flex gap-2 items-center mb-5">
              <img
                src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/processor.svg"
                alt=""
              />
              <p className="text-lg font-semibold">Thông số âm thanh</p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Âm thanh </p>
              <p className="font-medium">Stereo</p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Thương hiệu </p>
              <p className="font-medium">Marshall (Anh Quốc)</p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Màu </p>
              <p className="font-medium">Black</p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Công suất </p>
              <p className="font-medium">{product.wattage} Watt</p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Tần số </p>
              <p className="font-medium">{product.frequency}</p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Ứng dụng hỗ trợ </p>
              <p className="font-medium">APP MARSHALL BLUETOOTH</p>
            </div>
            <hr />
            <div className="flex gap-2 items-center mb-5 mt-5">
              <img
                src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/display.svg"
                alt=""
              />
              <p className="text-lg font-semibold">Kiểm soát và kết nối </p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Kết nối có dây </p>
              <p className="font-medium">AUX, HDMI, RCA</p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Kết nối không dây </p>
              <p className="font-medium">Bluetooth 5.2</p>
            </div>
            <hr />
            <div className="flex gap-2 items-center mb-5 mt-5">
              <img
                src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/ram.svg"
                alt=""
              />
              <p className="text-lg font-semibold">Kích thước</p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Kích thước </p>
              <p className="font-medium">{product.size} mm</p>
            </div>
            <div className="flex justify-between mb-5">
              <p>Trọng lượng </p>
              <p className="font-medium">{product.weight} kg</p>
            </div>
            <hr />
          </div>
        </div>

        <div className="mt-10 mb-12 ">
          <h4
            style={{
              color: "#242424",
              fontSize: "30px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Related Products
          </h4>
          <div className="flex justify-between">
            <div className="">
              <Card
                hoverable
                style={{ width: 255, position: "relative" }}
                cover={
                  <img
                    alt="example"
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-willen-black-brass-01.webp"
                  />
                }
              >
                {" "}
                <p
                  style={{
                    position: "absolute",
                    top: "4%",
                    backgroundColor: "#438E44",
                    color: "#fff",
                    width: "50px",
                    borderRadius: "12px",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  NEW
                </p>
                <div>
                  <h3 className="font-bold mb-3">MARSHALL WILLEN</h3>
                  <p
                    style={{
                      color: "#a5a5a5",
                      marginBottom: "8px",
                    }}
                  >
                    LOA MARSHALL, LOA DI ĐỘNG
                  </p>
                  <Rate className="mb-3" disabled defaultValue={5} />
                  <div className="flex gap-2 mb-5">
                    <span
                      style={{
                        color: "#bbb",
                        textDecoration: "line-through",
                      }}
                    >
                      14.890.000₫
                    </span>
                    <span
                      style={{
                        color: "rgb(15,0,0)",
                        fontWeight: "600",
                      }}
                    >
                      2.690.000 ₫
                    </span>
                  </div>
                  <button className="w-full h-10 bg-zinc-900 text-white rounded-md">
                    Lựa chọn các tùy chọn
                  </button>
                </div>
              </Card>
            </div>

            <div className="">
              <Card
                hoverable
                style={{ width: 255, position: "relative" }}
                cover={
                  <img
                    alt="example"
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-emberton-ii-black-brass-01.webp"
                  />
                }
              >
                {" "}
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
                  -16%
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "10%",
                    backgroundColor: "#438E44",
                    color: "#fff",
                    width: "50px",
                    borderRadius: "12px",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  NEW
                </p>
                <div>
                  <h3 className="font-bold mb-3">MARSHALL EMBERTON 2</h3>
                  <p
                    style={{
                      color: "#a5a5a5",
                      marginBottom: "8px",
                    }}
                  >
                    LOA MARSHALL, LOA DI ĐỘNG
                  </p>
                  <Rate className="mb-3" disabled defaultValue={5} />
                  <div className="flex gap-2 mb-5">
                    <span
                      style={{
                        color: "#bbb",
                        textDecoration: "line-through",
                      }}
                    >
                      4.290.000₫
                    </span>
                    <span
                      style={{
                        color: "rgb(15,0,0)",
                        fontWeight: "600",
                      }}
                    >
                      3.590.000₫
                    </span>
                  </div>
                  <button className="w-full h-10 bg-zinc-900 text-white rounded-md">
                    Lựa chọn các tùy chọn
                  </button>
                </div>
              </Card>
            </div>

            <div className="">
              <Card
                hoverable
                style={{ width: 255, position: "relative" }}
                cover={
                  <img
                    alt="example"
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/mh-monitor-II-ANC-large-1-2.png"
                  />
                }
              >
                {" "}
                {/* <p
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
                                    -23%
                                </p> */}
                <div>
                  <h3 className="font-bold mb-3">MARSHALL MONITOR 2 A.N.C</h3>
                  <p
                    style={{
                      color: "#a5a5a5",
                      marginBottom: "8px",
                    }}
                  >
                    TAI NGHE MARSHALL, OVER-EAR
                  </p>
                  <Rate className="mb-3" disabled defaultValue={5} />
                  <div className="flex gap-2 mb-5">
                    {/* <span
                                            style={{
                                                color: "#bbb",
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            14.890.000₫
                                        </span> */}
                    <span
                      style={{
                        color: "rgb(15,0,0)",
                        fontWeight: "600",
                      }}
                    >
                      7.190.000₫
                    </span>
                  </div>
                  <button className="w-full h-10 bg-zinc-900 text-white rounded-md">
                    Lựa chọn các tùy chọn
                  </button>
                </div>
              </Card>
            </div>

            <div className="">
              <Card
                hoverable
                style={{ width: 255, position: "relative" }}
                cover={
                  <img
                    alt="example"
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/middleton-black-brass-01.webp"
                  />
                }
              >
                {" "}
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
                  -20%
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "10%",
                    backgroundColor: "#438E44",
                    color: "#fff",
                    width: "50px",
                    borderRadius: "12px",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  NEW
                </p>
                <div>
                  <h3 className="font-bold mb-3">MARSHALL MIDDLETON</h3>
                  <p
                    style={{
                      color: "#a5a5a5",
                      marginBottom: "8px",
                    }}
                  >
                    LOA MARSHALL, LOA DI ĐỘNG
                  </p>
                  <Rate className="mb-3" disabled defaultValue={5} />
                  <div className="flex gap-2 mb-5">
                    <span
                      style={{
                        color: "#bbb",
                        textDecoration: "line-through",
                      }}
                    >
                      14.890.000₫
                    </span>
                    <span
                      style={{
                        color: "rgb(15,0,0)",
                        fontWeight: "600",
                      }}
                    >
                      7.190.000₫
                    </span>
                  </div>
                  <button className="w-full h-10 bg-zinc-900 text-white rounded-md">
                    Lựa chọn các tùy chọn
                  </button>
                </div>
              </Card>
            </div>

            <div className="">
              <Card
                hoverable
                style={{ width: 255, position: "relative" }}
                cover={
                  <img
                    style={{ height: "260px" }}
                    alt="example"
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-acton-ii-bt-black-01.png"
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
                  -19%
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "10%",
                    backgroundColor: "#E22D2D",
                    color: "#fff",
                    width: "50px",
                    borderRadius: "12px",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  HOT
                </p>
                <div>
                  <h3 className="font-bold mb-3">MARSHALL ACTON 2</h3>
                  <p
                    style={{
                      color: "#a5a5a5",
                      marginBottom: "8px",
                    }}
                  >
                    LOA MARSHALL, LOA DI ĐỘNG
                  </p>
                  <Rate className="mb-3" disabled defaultValue={5} />
                  <div className="flex gap-2 mb-5">
                    <span
                      style={{
                        color: "#bbb",
                        textDecoration: "line-through",
                      }}
                    >
                      5.290.000₫
                    </span>
                    <span
                      style={{
                        color: "rgb(15,0,0)",
                        fontWeight: "600",
                      }}
                    >
                      4.290.000₫
                    </span>
                  </div>
                  <button className="w-full h-10 bg-zinc-900 text-white rounded-md">
                    Lựa chọn các tùy chọn
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
