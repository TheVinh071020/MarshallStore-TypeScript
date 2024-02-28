import { useEffect, useState } from "react";
import { formatCurrency } from "../../../helpers";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosConfig } from "../../../axios/config";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PaginationUser from "../../users/PaginationUser";

interface Order {
  order_id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface HistoryOrder {
  order_id: number;
  name: string;
  category_id: number;
  number: number;
  order_detail_id: number;
  price: number;
  product_id: string;
  quantity: number;
  status: string;
  sale: number;
  source: string;
}

const HistoryOrder = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [order, setOrder] = useState<Order[]>([]);
  const [historyOrder, setHistoryOrder] = useState([]) as any;

  const [total, setTotal] = useState<number>(0);

  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(5);

  // Lấy order
  const renderOrders = async (pageIndex: number, pageNumber: number) => {
    await axiosConfig
      .get(`/orders?page_index=${pageIndex}&page_number=${pageNumber}`)
      .then((res) => {
        setOrder(res.data.data);
        setTotal(res.data.length - 1);
      })
      .catch((err) => console.log(err));
  };

  // Xem chi tiết order
  const handleView = async (id: any): Promise<void> => {
    handleShow();
    try {
      const res = await axiosConfig.get(`/order-details/${id}`);
      const historyOrder: HistoryOrder[] = res.data.rows;
      const uniqueHistory = filterHistory(historyOrder);
      setHistoryOrder(uniqueHistory);
    } catch (err) {
      console.error(err);
    }
  };

  const filterHistory = (historyOrder: HistoryOrder[]): HistoryOrder[] => {
    const uniqueHistory: HistoryOrder[] = [];
    const findByProductId: number[] = [];
    historyOrder.forEach((item: any) => {
      if (!findByProductId.includes(item.product_id)) {
        uniqueHistory.push(item);
        findByProductId.push(item.product_id);
      }
    });
    return uniqueHistory;
  };

  // Hủy order
  const handleDelete = async (id: number): Promise<void> => {
    try {
      await axiosConfig.delete(`/orders/${id}`);
      await renderOrders(1, 5);
      toast.success("Đã hủy đơn hàng");
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn hủy?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const changeStatus = async (order_id: number, newStatus: string) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/orders/${order_id}`, {
        status: newStatus,
      });

      const updatedListOrder = order.map((order: any) =>
        order.order_id === order_id ? { ...order, status: newStatus } : order
      );
      setOrder(updatedListOrder);
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error);
    }
  };

  useEffect(() => {
    renderOrders(pageIndex, pageNumber);
  }, [pageIndex, pageNumber]);

  return (
    <div className="p-4 w-full">
      <h3 className="text-3xl font-bold mb-5">Quản lý đơn hàng</h3>
      <div className="overflow-x-auto mb-3">
        {!order || order.length === 0 ? (
          <div className="text-center text-2xl">Chưa có lịch sử mua hàng</div>
        ) : (
          <table className="w-full table-auto text-center">
            <thead>
              <tr>
                <th className="border px-4 py-2 w-0">STT</th>
                <th className="border px-4 py-2 w-0">ID</th>
                <th className="border px-4 py-2">Khách hàng</th>
                <th className="border px-4 py-2">Địa chỉ</th>
                <th className="border px-4 py-2">Ngày đặt</th>
                <th className="border px-4 py-2">Trạng thái</th>
                <th className="border px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item: any, index: number) => (
                <tr>
                  <td className="border px-4 py-2">
                    {(pageIndex - 1) * pageNumber + index + 1}
                  </td>
                  <td className="border px-4 py-2">{item.order_id}</td>
                  <td className="border px-4 py-2">{item.order_name}</td>
                  <td className="border px-4 py-2">{item.address}</td>
                  <td className="border px-4 py-2">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(newstatus: any) =>
                        changeStatus(item.order_id, newstatus.target.value)
                      }
                    >
                      {item.status === "Chờ xác nhận" ? (
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                      ) : (
                        <option disabled value="Chờ xác nhận">
                          Chờ xác nhận
                        </option>
                      )}

                      {item.status === "Xác nhận" ? (
                        <option value="Xác nhận">Xác nhận</option>
                      ) : (
                        <option
                          disabled={item.status !== "Chờ xác nhận"}
                          value="Xác nhận"
                        >
                          Xác nhận
                        </option>
                      )}

                      {item.status === "Đang giao hàng" ||
                      item.status === "Xác nhận" ? (
                        <option value="Đang giao hàng">Đang giao hàng</option>
                      ) : (
                        <option
                          disabled={item.status !== "Xác nhận"}
                          value="Đang giao hàng"
                        >
                          Đang giao hàng
                        </option>
                      )}
                      {item.status === "Đã giao hàng" ||
                      item.status === "Đang giao hàng" ? (
                        <option value="Đã giao hàng">Đã giao hàng</option>
                      ) : (
                        <option disabled={item} value="Đã giao hàng">
                          Đã giao hàng
                        </option>
                      )}
                    </select>
                  </td>
                  <td className="border px-4 py-2 w-32">
                    <i
                      onClick={() => handleView(item.order_id)}
                      className="fa-solid fa-eye mr-9"
                    ></i>
                    <i
                      onClick={() => confirmDelete(item.order_id)}
                      className="fa-solid fa-trash"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <PaginationUser
        total={total}
        pageNumber={pageNumber}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        setPageNumber={setPageNumber}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết mua hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart1">
            <div className="cart-combo1">
              <table className="table">
                <thead>
                  <tr className="table-light">
                    <th scope="col">Name</th>
                    <th scope="col" rowSpan={3}>
                      Price
                    </th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {historyOrder.map((product: HistoryOrder, i: number) => (
                    <tr key={i}>
                      <td>{product.name}</td>
                      <td>
                        {formatCurrency(product.price * (1 - product.sale))}
                      </td>
                      <td>{product.number}</td>
                      <td>
                        <img
                          style={{ width: "70px", height: "70px" }}
                          src={product.source}
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total</td>

                    <td rowSpan={2}>
                      {formatCurrency(
                        historyOrder.reduce(
                          (total: number, product: HistoryOrder) =>
                            total +
                            product.price * (1 - product.sale) * product.number,
                          0
                        )
                      )}
                    </td>

                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HistoryOrder;
