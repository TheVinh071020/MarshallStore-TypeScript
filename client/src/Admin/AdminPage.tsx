import React from "react";
import Sidebar from "./shared/Sidebar";
import { Outlet } from "react-router-dom";

type Props = {};

const AdminPage = (props: Props) => {
  return (
    <div>
      {" "}
      <div className="AdminPage">
        <div className="">
          <div className="flex">
            <div className="sticky top-0">
              <Sidebar />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
