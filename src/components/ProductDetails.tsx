import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEndpoint } from '../services/api';
import { Product } from '../types/product';
import { LoadingSpinner } from './LoadingSpinner';
import { useCartStore } from '../stores/cartStore';
import { motion } from 'framer-motion';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addItem);

  const { data: product, isLoading, error } = useEndpoint<Product>(
    `products/${id}`,
    ['product', id],
    { staleTime: 5000 }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 p-4 text-center">{error.message}</div>;
  if (!product) return null;

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        ← Back to Products
      </button>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-green-600">${product.price}</span>
              <span className="text-xl text-yellow-500">{product.rating}⭐</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-gray-600">Stock: {product.stock}</span>
              <span className="text-red-500">-{product.discountPercentage}%</span>
            </div>
            <div className="flex gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mt-4"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
