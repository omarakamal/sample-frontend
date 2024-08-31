import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ProductDetailsPage() {

  const [product, setProduct] = useState({})
  const [cart, setCart] = useState([])
  
  

  const { category } = useParams()
  const { id } = useParams()


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/shoppingcart`)
      .then((response) => {
        console.log(response.data)
        setCart(response.data)
      })
      .catch((err) => { console.log(err) })

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories?_embed=Products`)
      .then((response) => {
        const foundCategory = response.data.find((oneCategory) => {
          return oneCategory.name == category
        })
        const foundProduct = foundCategory.Products.find((oneProduct) => {
          return oneProduct.id == id
        })
        
        setProduct(foundProduct)
      })
      .catch((err) => { console.log(err) })
  }, [])


  function addToCart() {
    // firstly, check if the item is in the cart
    const existingProduct = cart.find(cartItem => cartItem.id === product.id);
  
    // if the item exists returns the item +1 and all the other items as is in the new updatedCart
    if (existingProduct) {
      const updatedCart = cart.map(cartItem => {
        if (cartItem.id === product.id) {
                // If the product is already in the cart then  .quantity+1
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          // else it will just return the item to the new array
          return cartItem;
        }
      }

      );
  
      // updated in the DB
      // Update the cart in the database and the return will update the state
      axios.put(`${import.meta.env.VITE_BACKEND_URL}/shoppingcart/${existingProduct.id}`, {
        ...existingProduct, 
        quantity: existingProduct.quantity + 1
      })
      .then((response) => {
        setCart(updatedCart);
      })
      .catch((err) => { console.log(err) });
  
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const newProduct = { ...product, quantity: 1 };
  
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/shoppingcart`, newProduct)
      .then((response) => {
        setCart([...cart, newProduct]);
      })
      .catch((err) => { console.log(err) });
    }
  }
  
  

  // function addToCart() {
    
  //   let newCart = [...cart]

  //   /*for (let i = 0; i < quantity; i++) {
  //     newCart.push(product)
  //   }
  //   console.log(newCart, "new cart")*/


  //   if (newCart.length == 0) {
  //     console.log("ïn first if:^Array length is 0")
  //     axios.post(`${import.meta.env.VITE_BACKEND_URL}/shoppingcart`,  product )
  //       .then((response) => {
  //         return axios.get(`${import.meta.env.VITE_BACKEND_URL}/shoppingcart`)
  //       }
  //       )
  //       .then((response) => {
  //         setCart(response.data)
  //       })
  //       .catch((err) => { console.log(err) })
  //   }
  //   else{
  //     console.log("first else: Array List is populated")
  //     let update = newCart.find((oneProduct)=>{
  //       if(oneProduct.id === product.id) {return true}
  //     })
      
  //     if(update){
  //       console.log("Ïtem already in my cart: item+1")
        
  //       let copiedProduct = {...product}
  //       copiedProduct.quantity +=1
  //        axios.post(`${import.meta.env.VITE_BACKEND_URL}/shoppingcart`,  copiedProduct )
  //       .then((response) => {
  //         return axios.get(`${import.meta.env.VITE_BACKEND_URL}/shoppingcart`)
  //       }
  //       )
  //       .then((response) => {
  //         setCart(response.data)
  //       })
  //       .catch((err) => { console.log(err) })

  //     }
  //     else{
  //       console.log("¨Shopping cart populated BUT item not in cart: posting shopoing cart")
  //       setCart([...newCart, product])
  //     }
  //   }
  // }


  /*axios.put(`${import.meta.env.VITE_BACKEND_URL}/shoppingcarts/1`, { products: newCart })
    .then((response) => {
      console.log(response)
      return axios.get(`${import.meta.env.VITE_BACKEND_URL}/shoppingcarts/1`)
    }
    )
    .then((response) => {
      setCart(response.data.products)
    })
    .catch((err) => { console.log(err) })*/



return (

  <div id='productDetPageDiv'>

    <p>{category} {'>'} {product?.title?.[0]}</p>
    <h3>{product?.title?.join('')}</h3>

    <div id='productMainDiv'>

      <div id='allPicturesDiv'>
        <img src={product?.pictures?.[0]} alt="" id='mainImg' />
        <div id='productPictures'>
          {product?.pictures?.map((onePicture) => {
            return (
              <img key={onePicture} className='small-img' src={onePicture}></img>
            )
          })}
        </div>
      </div>

      <div id='buyDiv'>
        <div id='priceDiv'>
          {product.originalPrice && <h5 style={{ textDecoration: 'line-through', margin: '40px 0 0 0' }}>{product?.originalPrice}.-€ </h5>}
          {product.discPrice && <h5 className='discPrice'>{product.discPrice}.-€ </h5>}
          {product.price && <h5 className='price'>{product.price}.-€ </h5>}

          <span>Cantidad</span>
          <select onChange={(e) => { setQuantity(e.target.value) }} name="Cantidad" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button onClick={addToCart} style={{ display: 'block' }}>Buy</button>
      </div>

    </div>
    <hr style={{ margin: '150px 0' }} />
    <h4 className='subtitle-detailspg' >Description</h4>

    {product.description && <img id='descriptionPicture' src={product?.description} alt="" />}
    {product?.descriptionText?.map((oneText, index) => {
      return (
        index % 2 == 0 ?
          (<p style={{ fontSize: '18px' }}>
            {oneText}
          </p>) :
          (<h3>
            {oneText}
          </h3>)
      )

    })}
  </div>
)
}

export default ProductDetailsPage