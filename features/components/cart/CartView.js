'use client';

import { Card, CardContent, Typography, List, ListItem, Divider } from '@mui/material';

export default function CartView({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);

  return (
    <Card className="shadow-2xl rounded-lg bg-white border border-gray-200">
      <CardContent>
        <h2 className="text-3xl font-bold mb-6 text-gray-700">Shopping Cart</h2>
        {cart.length === 0 ? (
          <Typography color="text.secondary" className="text-center italic">
            The cart is empty.
          </Typography>
        ) : (
          <>
            <List className="divide-y divide-gray-200">
              {cart.map(item => (
                <ListItem key={item.id} className="py-3 px-0 flex flex-col items-start">
                  <div className="w-full">
                    <Typography variant="body1" className="font-semibold text-gray-800">
                      {item.name}
                    </Typography>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <Typography variant="body2" className="text-gray-500">
                      Amount: {item.amount}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      Total: ${(item.price * item.amount).toFixed(2)}
                    </Typography>
                  </div>
                </ListItem>
              ))}
            </List>
            <Divider className="my-4" />
            <div className="mt-4 flex justify-between items-center">
              <Typography variant="h5" className="font-bold text-gray-800">
                Cart Total:
              </Typography>
              <Typography variant="h5" className="font-bold text-green-600">
                ${total.toFixed(2)}
              </Typography>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}