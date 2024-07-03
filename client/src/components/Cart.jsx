import React, { useContext } from 'react'
import Appcontext from '../context/Appcontext'

const Cart = () => {
    const { cart } = useContext(Appcontext);
  return (
    <>
    {cart?.items?.map((product)=>
    <div key={product._id} style={{display:"flex"}}>
        <div className="cart_img">
            <img src={product.imageSRC} style={{height: 'auto', width: '20rem', objectFit: 'cover',}}/>
        </div>
        <div className="info" style={{padding:"30px"}}>
        <div className="cart_des">
            <h5>{product.title}</h5>
            <p>₹ {product.price}</p>
        </div>
        <div className="cart_actions">
            <div className="btn btn-primary" style={{margin: "1rem"}}>-</div>
            {product.quantity}
            <div className="btn btn-primary" style={{margin: "1rem"}}>+</div>
            <div className="btn btn-danger" style={{margin: "1rem"}}>Delete</div>
        </div>
        </div>
        
    </div>)}
    </>
  )
}

export default Cart