import React from "react";
import ProductItem from "./ProductItem";
import { LoadingSpinner } from "./LoadingSpinner";
import { useEndpoint } from "../services/api";
import { ProductsResponse } from "../types/product";
import { Pagination } from "./Pagination";
import { SearchInput } from "./SearchInput";
import { useSearchStore } from "../stores/searchStore";

export const ProductList = () => {
  const [page, setPage] = React.useState(1);
  const activeSearchQuery = useSearchStore((state) => state.activeSearchQuery);
  const limit = 8;

  const endpoint = activeSearchQuery
    ? `products/search?q=${encodeURIComponent(activeSearchQuery)}&limit=${limit}&skip=${(page - 1) * limit}`
    : `products?limit=${limit}&skip=${(page - 1) * limit}`;

  const { data, isLoading, error } = useEndpoint<ProductsResponse>(
    endpoint,
    ['products', activeSearchQuery || 'all', page.toString()],
    {
      staleTime: 5000,
      keepPreviousData: true
    }
  );

  // Reset page when search query changes
  React.useEffect(() => {
    setPage(1);
  }, [activeSearchQuery]);

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return <div className="text-red-600 p-4 text-center">{error.message}</div>;
  }

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <SearchInput />
      <ul className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
        {data?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
      {data && (
        <Pagination
          currentPage={page}
          totalItems={data.total}
          itemsPerPage={limit}
          onPageChange={setPage}
        />
      )}
    </section>
  );
};
