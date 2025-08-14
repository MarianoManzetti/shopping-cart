import { useEffect, useState } from "react";
import { fetchCart, addToCart } from "@/services/cartApi";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      try {
        const data = await fetchCart();
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, []);

  const handleAddToCart = async (id) => {
    try {
      setAddToCartLoading(true);
      const data = await addToCart(id);
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setAddToCartLoading(false);
    }
  };

  return { cart, loading, addToCartLoading, error, handleAddToCart };
}

export default useCart;
