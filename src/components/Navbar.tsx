import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b px-4 py-2 flex justify-between">
      <div className="flex items-center gap-4">
        <button
          className="text-lg font-bold text-blue-500 hover:text-blue-700"
          onClick={() => navigate("/")}
        >
          Home      
        </button>
      
        <button
          className="text-lg font-bold text-blue-500 hover:text-blue-700"
          onClick={() => navigate("/products")}
        >
          Products
        </button>
        <button
          className="text-lg font-bold text-blue-500 hover:text-blue-700"
          onClick={() => navigate("/cart")}
        >
          Cart
        </button>

        <button
          className="text-lg font-bold text-blue-500 hover:text-blue-700"
          onClick={() => navigate("/Dashboard")}
        >
          project managinig       
        </button>
        <button
          className="text-lg font-bold text-blue-500 hover:text-blue-700"
          onClick={() => navigate("/create-product")}
        >
         create-product      
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </nav>
  );
};
