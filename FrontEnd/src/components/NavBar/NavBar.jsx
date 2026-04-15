import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  let username = JSON.parse(localStorage.getItem("user"));
 return (
   <nav className="bg-slate-800 text-white shadow">
  <div className="flex items-center justify-around py-3 text-lg">
    <h1 className="font-semibold">Mohamed Rabee</h1>

    <h2 className="text-slate-300">
      Cashier Name:{" "}
      <span className="text-blue-400 font-bold">
        {username}
      </span>
    </h2>

    <button
      onClick={logOut}
      className="bg-red-500 hover:bg-red-600 transition px-4 py-1 rounded-md cursor-pointer"
    >
      Logout
    </button>
  </div>
</nav>
  );

}

export default NavBar;
