import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "../header/Header";

const Layout = () => {
  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-center" />
      <Outlet />
    </div>
  );
};

export default Layout;
