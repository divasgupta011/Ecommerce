import React, { useContext } from 'react'
import Appcontext from '../../context/Appcontext'
import { Link } from 'react-router-dom'

const Showproduct = () => {

    const { products, filteredData, addToCart } = useContext(Appcontext)

  return (
    <div className='row row-cols-2 row-cols-md-4 g-4'>
        {filteredData?.map((product)=>
        <div key={product._id} className='row row-cols-1 row-cols-md-2 g-4'>
          <div className="card" style={{width:'18rem'}}>
          <Link to={`/product/${product._id}`}>  
          <img src={product.imageSRC} className="card-img-top" alt="..."/>
          </Link>
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">₹ {product.price}</p>
            <div className='d-flex'>
            <button href="#" className="btn btn-primary mx-3">Buy Now</button>
            <button onClick={()=>addToCart(product._id, product.title, product.description, product.price, 1, product.imageSRC)} className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
          </div>
            
        </div>
      )}
    </div>
  )
}

export default Showproduct