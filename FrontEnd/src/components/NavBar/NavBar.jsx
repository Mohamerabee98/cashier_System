import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  let username = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="bg-blue-500 text-white">
      <div className="flex items-center justify-around py-2 text-xl">
        <h1 className="font-semibold">Mohamed Rabee</h1>
        <h2>
          Cashier Name: <span className="underline font-bold">{username}</span>
        </h2>
        <button
          onClick={logOut}
          className="bg-red-400 hover:bg-red-500 text-white cursor-pointer px-2 py-1 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
