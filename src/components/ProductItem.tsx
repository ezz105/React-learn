import React from "react";
import { motion } from "framer-motion";
import { Product } from "../types/product";
import { useCartStore } from "../stores/cartStore";
import { useNavigate } from "react-router-dom";

const ProductItem = React.memo(({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  return (
    <motion.li 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card flex flex-col justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">{product.title}</h2>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-48 object-cover rounded-md"
        />
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-lg text-yellow-500">{product.rating}⭐</span>
          <span className="text-lg text-green-600">${product.price}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.li>
  );
});

ProductItem.displayName = 'ProductItem';

export default ProductItem;