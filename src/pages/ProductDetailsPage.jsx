import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ProductDetailsPage() {

  const [product, setProduct] = useState({})

  const { category } = useParams()
  const { id } = useParams()

  let mainImg = document.getElementById('MainImg')
  let smallImg = document.getElementsByClassName('small-img')

  

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories?_embed=Products`)
      .then((response) => {
        console.log(response.data)
        const foundCategory = response.data.find((oneCategory) => {
          return oneCategory.name == category
        })
        console.log(foundCategory.Products)
        const foundProduct = foundCategory.Products.find((oneProduct) => {
          return oneProduct.id == id
        })
        console.log(foundProduct.title[0])
        setProduct(foundProduct)
      })
      .catch((err) => { console.log(err) })
  }, [])
  console.log(product?.title?.[0])

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
                <img className='small-img' src={onePicture}></img>
              )
            })}
          </div>
        </div>

        <div id='buyDiv'>
          <div id='priceDiv'>
            {product.originalPrice && <h5 style={{textDecoration: 'line-through',margin:'40px 0 0 0'}}>{product?.originalPrice}.-€ </h5>}
            <h2 id="price" >{product?.price}.-€ </h2>

            <span>Cantidad</span>
            <select name="Cantidad" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <button style={{ display: 'block' }}>Buy</button>
        </div>
        
      </div>

      <h4 className='subtitle-detailspg'>Description</h4>

      {product.description && <img id='descriptionPicture' src={product?.description} alt=""/>}
      {product?.descriptionText?.map((oneText, index)=>{
        return(
          <h6 className='description-text'>{oneText}</h6>
        )
      })}
    </div>
  )
}

export default ProductDetailsPage