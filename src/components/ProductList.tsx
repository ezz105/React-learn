import { useEffect, useState } from "react";
import { getProduct } from '../services/api';

interface Product {
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

export const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProduct();
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.log('خطأ في جلب المنتجات', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <>..........تحميل</>;
    }

    return (
        <section>
            <h1>Product List</h1>
            <ul className='bg-gray-400 '>
                {products.map((product) => (
                    <li key={product.id} className='container p-2 m-2 bg-blue-500'>
                        <h1>المنتج :{product.title}</h1>
                        <p>السعر :{product.price}</p>
                        <p className='bg-red-600'>التقييم :{product.rating}</p>
                        <p>الخصم :{product.discountPercentage}</p>
                        <p>عن المنتج : {product.description}</p>
                        <p>الكمية : {product.stock}</p>
                        <p>النوع :{product.tags.join(', ')}</p>
                        <p>sku :{product.sku}</p>
                        <p>warr :{product.warrantyInformation}</p>
                        <p>الوزن :{product.weight}</p>
                        <p>بيانات الشحن :{product.shippingInformation}</p>
                        <p>حالة الطلب :{product.availabilityStatus}</p>
                        <img src={product.thumbnail} alt={product.title} />
                    </li>
                ))}
            </ul>
        </section>
    );
};
