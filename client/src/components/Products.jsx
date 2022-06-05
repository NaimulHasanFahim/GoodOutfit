import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
    // console.log(popularProducts);
    // console.log(cat, filters, sort);
  // console.log(products);
  useEffect(()=>{
    const getProducts = async () =>{
      try {
        const res = await axios.get(cat? `http://localhost:5000/products?category=${cat}`:"http://localhost:5000/products" );
        // console.log(res);
        setProducts(res.data);
      } catch (error) {
        
      }
    };
    getProducts();
  }, [cat]);

  useEffect(()=>{
    if(cat){
      setFilteredProducts(products.filter(item=> Object.entries(filters).every(([key, value])=> item[key].includes(value))));
      
    }
  },[cat, filters, products])
  
  useEffect(()=>{
    if(sort === "newest"){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>a.createdAt - b.createdAt));
    }
    else if(sort ==="asc"){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>a.price - b.price));
    }
    else{
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>b.createdAt - a.createdAt));
    }
  },[sort]);
  // console.log(filteredProducts);
  
  return (
    <Container>
      {cat ? filteredProducts.map((item) => (<Product item={item} key={item.id}/>)) : products.slice(0,9).map((item) => (<Product item={item} key={item.id} />))
      }
    </Container>
  );
};

export default Products;
