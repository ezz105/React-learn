import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { motion } from 'framer-motion';

const CartButton = () => {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const navigate = useNavigate();
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  if (itemCount === 0) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg cursor-pointer"
      onClick={() => navigate('/cart')}
    >
      <div className="flex items-center gap-2">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-blue-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          {itemCount}
        </span>
        <span className="font-bold">${total.toFixed(2)}</span>
      </div>
    </motion.div>
  );
};

export const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700"
        >
          Clear Cart
        </button>
        <div className="text-xl font-bold">
          Total: ${getTotal().toFixed(2)}
        </div>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-4 w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Continue Shopping
      </button>
    </div>
  );
};
