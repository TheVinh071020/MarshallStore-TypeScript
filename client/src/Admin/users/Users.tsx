import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginationUser from "./PaginationUser";
import { axiosConfig } from "../../axios/config";

interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  status: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(5);

  const listUsers = async (pageIndex: number, pageNumber: number) => {
    await axiosConfig
      .get(`/users?page_index=${pageIndex}&page_number=${pageNumber}`)
      .then((res) => {
        setUsers(res.data.data);
        setTotal(res.data.length - 1);
      })
      .catch((err) => console.log(err));
  };

  // Lock user
  const handleLockUser = async (id: number) => {
    try {
      await axiosConfig.patch(`/users/${id}`, {
        status: 1,
      });
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.user_id === id ? { ...u, status: 1 } : u))
      );
    } catch (err) {
      console.error("Failed to lock user:", err);
    }
  };
  const handleUnLockUser = async (id: number) => {
    try {
      await axiosConfig.patch(`/users/${id}`, {
        status: 0,
      });
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.user_id === id ? { ...u, status: 0 } : u))
      );
    } catch (err) {
      console.error("Failed to lock user:", err);
    }
  };

  useEffect(() => {
    listUsers(pageIndex, pageNumber);
  }, [pageIndex, pageNumber]);

  return (
    <div className="w-5/6 mx-auto p-10">
      <h1 className="text-3xl font-semibold mb-5">Người dùng</h1>
      <table className="w-full border-collapse border text-center">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2 w-0">STT</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Email</th>
            <th className="p-2">Vai trò</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="p-2">
                {(pageIndex - 1) * pageNumber + index + 1}
              </td>

              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role === 0 ? "User" : ""}</td>
              <td className="p-2">
                {user.status === 0 ? (
                  <button
                    onClick={() => handleLockUser(user.user_id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 w-28"
                  >
                    Mở khóa
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnLockUser(user.user_id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2 w-28"
                  >
                    Khóa
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationUser
        total={total}
        pageNumber={pageNumber}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default Users;
