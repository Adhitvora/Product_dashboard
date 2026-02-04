import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold">Product App</h1>
      <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
