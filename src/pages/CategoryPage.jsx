import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"


function CategoryPage() {

  const [products, setProducts] = useState([])

  let { category } = useParams()

  console.log(category)
  useEffect(() => {
    axios.get(`http://localhost:8000/Products`)
      .then((response) => {
        setProducts(response.data[0].AppleZone)
        
      })
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <div>
      <h3>{category}</h3>
      {products.map((oneProduct)=>{
        return(
          <div className="product-div">
            <img src={oneProduct.pictures[0]} alt="" />
            <p>{oneProduct.title}</p>
            <h4>{oneProduct.price}.-</h4>
          </div>
        )
      })}
      

    </div>
  )
}

export default CategoryPage