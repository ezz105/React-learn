import React, { useEffect, useState, useMemo } from "react";
import { getProduct } from '../services/api';
import ProductItem, { Product } from "./ProductItem"; // Adjust the path as needed

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct();
        setProducts(data.products);
      } catch (error) {
        console.error('خطأ في جلب المنتجات', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Memoize the product items to avoid re-computation on every render
  const productItems = useMemo(
    () =>
      products.map((product) => (
        <ProductItem key={product.id} product={product} />
      )),
    [products]
  );

  if (loading) {
    return <>..........تحميل</>;
  }

  return (
    <section>
      <h1>Product List</h1>
      <ul className="bg-gray-400">
        {productItems}
      </ul>
    </section>
  );
};
