import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Outlet />
    </div>
  );
};

export default Layout;
