import { NavLink, useNavigate } from "react-router-dom";

const linkClass =
  "block py-2 px-3 rounded hover:bg-gray-800 transition text-right";

const activeClass = "bg-gray-800";
export default function Sidebar() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-black text-white p-4 text-right">
      <h1 className="text-2xl font-bold mb-8 text-center">
        لوحة التحكم
      </h1>

      <nav className="space-y-2">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          الصفحه الرئيسيه
        </NavLink>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          المنتجات
        </NavLink>

        <NavLink
          to="/dashboard/categories"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          التصنيفات
        </NavLink>

        <NavLink
          to="/dashboard/invoices"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          الفواتير
        </NavLink>

        <button
          onClick={logOut}
          className="bg-red-500 cursor-pointer hover:bg-red-600 transition w-full mt-10 py-2 rounded-md"
        >
          تسجيل الخروج
        </button>
      </nav>
    </div>
  );
}