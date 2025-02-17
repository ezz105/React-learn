import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import { CartButton } from './components/CartButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Cart } from './pages/Cart';
import { Navbar } from './components/Navbar';
import Dashboard from './pages/Dashboard';
import { Home } from './components/Home';
import { CRUDProduct } from './components/CRUDPoduct';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});



const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="container mx-auto p-2 m-4">
        <Navbar />
          <CartButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/create-product" element={<CRUDProduct />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;


