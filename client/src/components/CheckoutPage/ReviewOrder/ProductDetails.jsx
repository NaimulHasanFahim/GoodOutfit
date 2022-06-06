import { List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' }
];

// import { useState } from 'react';

const ProductDetails = ({cart})=>{
  // const classes = useStyles();
  // const cart = useSelector(state=>state.user.currentUser);
  const products=cart.products;
  console.log(products);
  return (
    <List disablePadding>
      {products.map(product => (
        <ListItem style={{padding: "1 0"}} key={product._id}>
          <ListItemText primary={product.title} secondary={product.desc} />
          <Typography variant="body2">$ {product.price}</Typography>
        </ListItem>
      ))}
      <ListItem style={{padding: "1 0"}}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{fontWeight: '700'}}>
          $ {cart.total}
        </Typography>
      </ListItem>
    </List>
  );
}

export default ProductDetails;
