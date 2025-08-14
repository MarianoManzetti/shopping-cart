'use client';

import useProducts from '@/features/hooks/useProducts';
import useCart from '@/features/hooks/useCart';

import ProductView from '@/features/components/products/ProductView';
import CartView from '@/features/components/cart/CartView';
import BestCombination from '@/features/components/products/BestCombination';

import { CircularProgress, Alert, AlertTitle } from '@mui/material';

export default function HomePage() {
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { cart, handleAddToCart, loading: cartLoading, error: cartError, addToCartLoading } = useCart();

  if (productsLoading || cartLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <CircularProgress color="primary" />
        <p className="text-xl text-gray-600">Loading data...</p>
      </div>
    );
  }

  if (productsError || cartError) {
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <Alert severity="error" className="w-full max-w-md">
          <AlertTitle>Error!</AlertTitle>
          A problem occurred while loading the data.
          <br />
          {productsError || cartError}
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-10">
        Product Store
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <ProductView products={products} onAddToCart={handleAddToCart} addToCartLoading={addToCartLoading} />
        </div>

        <div className="md:col-span-1 sticky top-8 self-start flex flex-col">
          <CartView cart={cart} />

          <BestCombination products={products} />
        </div>
      </div>
    </div>
  );
}
