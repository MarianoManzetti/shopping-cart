export async function fetchCart() {
  const res = await fetch('/api/cart');

  if (!res.ok) {
    throw new Error('Error getting cart');
  }

  return res.json();
}

export async function addToCart(id) {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    throw new Error('Error adding to cart');
  }

  return res.json();
}