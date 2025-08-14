'use client';

import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductView({ products, onAddToCart, addToCartLoading }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Available Products</h2>
      <Grid container spacing={5}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6}>
            <Card className="shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300">
              <CardContent className="flex flex-col items-center p-6 text-center bg-white">
                <Typography variant="h5" component="div" className="font-semibold text-gray-900 mb-2">
                  {product.name}
                </Typography>
                <Typography color="text.secondary" className="mb-4 text-xl font-mono text-gray-600">
                  ${product.price.toFixed(2)}
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => onAddToCart(product.id)}
                  sx={{ textTransform: 'none' }}
                  className="mt-auto self-center bg-indigo-600 hover:bg-indigo-700"
                  disabled={addToCartLoading}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}