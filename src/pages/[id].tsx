
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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Product {id}</h1>
      {/* Render the product details here */}
    </div>
  );
};

export default ProductDetail;
