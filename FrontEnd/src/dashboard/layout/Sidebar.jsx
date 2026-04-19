import { NavLink, useNavigate } from "react-router-dom";

const baseClass =
  "block py-2 px-3 rounded  text-right";

export default function Sidebar() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getLinkClass = ({ isActive }) =>
    `${baseClass} ${isActive ? "bg-blue-500 text-white" : ""}`;

  return (
    <div className="w-64 bg-slate-800 text-white p-4 text-right">
      <h1 className="text-2xl font-bold mb-8 text-center">
        لوحة التحكم
      </h1>

      <nav className="space-y-2">

        <NavLink to="/dashboard" end className={getLinkClass}>
          الصفحه الرئيسيه
        </NavLink>

        <NavLink to="/dashboard/categories" className={getLinkClass}>
          المنتجات الرئيسيه 
        </NavLink>

        <NavLink to="/dashboard/products" className={getLinkClass}>
          المنتجات الفرعيه
        </NavLink>

        <NavLink to="/dashboard/invoices" className={getLinkClass}>
          الفواتير
        </NavLink>

        <button
          onClick={logOut}
          className="bg-red-500 cursor-pointer hover:bg-red-600 transition w-full mt-10 py-2 rounded-md"
        >
         LogOut
        </button>
      </nav>
    </div>
  );
}