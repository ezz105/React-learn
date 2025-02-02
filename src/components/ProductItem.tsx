import React from "react";

// Define the Product interface. If you plan to reuse this type elsewhere,
// consider moving it to a separate types file.
export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  discountPercentage: number;
  description: string;
  stock: number;
  tags: string[];
  sku: string;
  warrantyInformation: string;
  weight: string;
  shippingInformation: string;
  availabilityStatus: string;
  thumbnail: string;
}

// Memoized component for rendering a single product item.
const ProductItem = React.memo(({ product }: { product: Product }) => {
  return (
    <li key={product.id} className="container p-2 m-2 bg-blue-500">
      <h1>المنتج: {product.title}</h1>
      <p>السعر: {product.price}</p>
      <p className="bg-red-600">التقييم: {product.rating}</p>
      <p>الخصم: {product.discountPercentage}</p>
      <p>عن المنتج: {product.description}</p>
      <p>الكمية: {product.stock}</p>
      <p>النوع: {product.tags.join(', ')}</p>
      <p>sku: {product.sku}</p>
      <p>warr: {product.warrantyInformation}</p>
      <p>الوزن: {product.weight}</p>
      <p>بيانات الشحن: {product.shippingInformation}</p>
      <p>حالة الطلب: {product.availabilityStatus}</p>
      <img src={product.thumbnail} alt={product.title} />
    </li>
  );
});

export default ProductItem;
