'use client';

import { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, List, ListItem, Divider, InputAdornment } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

export default function BestCombination({ products }) {
  const [budget, setBudget] = useState('');
  const [bestCombination, setBestCombination] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const findBestCombination = () => {
    if (!budget) {
      return;
    }

    const numericBudget = parseFloat(budget);
    const n = products.length;
    const dp = Array.from({ length: n + 1 }, () => Array(numericBudget + 1).fill(0));
  
    // Fill table
    for (let i = 1; i <= n; i++) {
      const price = products[i - 1].price;
      for (let b = 0; b <= numericBudget; b++) {
        if (price <= b) {
          dp[i][b] = Math.max(
            dp[i - 1][b],
            dp[i - 1][b - price] + price
          );
        } else {
          dp[i][b] = dp[i - 1][b];
        }
      }
    }
  
    // Rebuild the list of chosen products
    let res = [];
    let b = numericBudget;
    for (let i = n; i > 0; i--) {
      if (dp[i][b] !== dp[i - 1][b]) {
        res.push(products[i - 1]);
        b -= products[i - 1].price;
      }
    }
  
    setTotalPrice(dp[n][numericBudget]);
    setBestCombination(res);
  };

  return (
    <Card className="shadow-2xl rounded-lg bg-indigo-50 border border-indigo-200 mt-12">
      <CardContent>
        <Typography variant="h5" component="h2" className="text-3xl font-bold text-gray-700">
          Find the best combination
        </Typography>

        <div className="flex flex-col lg:flex-row items-center gap-4 mb-6 mt-4">
          <TextField
            label="Your Budget"
            variant="outlined"
            type="number"
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value)
              if (e.target.value === '') {
                setBestCombination(null);
                setTotalPrice(0);
              }
            }}
            fullWidth
            className="bg-white rounded-md"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{
              '& .MuiInputBase-input': {
                py: '12px',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<CalculateIcon />}
            onClick={findBestCombination}
            className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
            sx={{ flexShrink: 0, textTransform: 'none' }}
          >
            Calculate
          </Button>
        </div>

        {bestCombination && (
          <div className="mt-6 pt-6 border-t border-indigo-300">
            <Typography variant="h6" className="font-bold text-gray-800 mb-2">
              Result:
            </Typography>
            {bestCombination.length === 0 ? (
              <Typography color="text.secondary">No combinations were found for the budget.</Typography>
            ) : (
              <>
                <List className="divide-y divide-indigo-200">
                  {bestCombination.map(product => (
                    <ListItem key={product.id} className="py-2 px-0">
                      <div className="flex justify-between w-full">
                        <Typography variant="body1" className="text-gray-800">
                          {product.name}
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                          ${product.price.toFixed(2)}
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>
                <Divider className="my-4" />
                <div className="flex justify-between items-center">
                  <Typography variant="h6" className="font-bold text-gray-800">
                    Total:
                  </Typography>
                  <Typography variant="h6" className="font-bold text-indigo-600">
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}