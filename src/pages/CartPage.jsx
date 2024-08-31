import React, { useEffect, useState } from 'react'
import axios from 'axios'
function CartPage() {

  const [list, setList] = useState([])
  
useEffect(()=>{
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/shoppingcart/1`)
  .then((response)=>{
    console.log(response.data.products)
    setList(response.data.products)})
    .catch(err=>console.log(err))
},[])

  const cart = []
  
  


  return (
    <div>CartPage</div>

  )
}

export default CartPage