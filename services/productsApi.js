export async function fetchProducts() {
  const res = await fetch('/api/products');

  if (!res.ok) {
    throw new Error('Error getting products.');
  }

  return res.json();
}