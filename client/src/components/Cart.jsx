import React, { useContext, useEffect, useState } from 'react';
import Appcontext from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const { cart, decreaseQuantity, addToCart, deleteFromCart, clearCart } = useContext(Appcontext);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let items = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        items += cart.items[i].quantity;
        price += cart.items[i].price * cart.items[i].quantity;
      }
    }
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  return (
    <div className="container mt-5">
      {cart?.items?.length === 0 ? (
        <div className="text-center my-5">
          <button
            className="btn btn-primary mx-3"
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            onClick={() => navigate('/')}
          >
            Continue Shopping...
          </button>
        </div>
      ) : (
        <>
          <div className="my-5 text-center">
            <button
              className="btn btn-info mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Total Items: {totalItems}
            </button>
            <button
              className="btn btn-info mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Total Price: ₹ {totalPrice}
            </button>
          </div>
        </>
      )}

      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="card mb-4 shadow-sm"
        >
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={product.imageSRC}
                className="card-img"
                alt={product.title}
                style={{ objectFit: 'cover', borderRadius: '10px' }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">₹ {product.price}</p>
                <p className="card-text">Qty: {product.quantity}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => decreaseQuantity(product.productId, 1)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() =>
                      addToCart(
                        product.productId,
                        product.title,
                        product.description,
                        product.price / product.quantity,
                        1,
                        product.imageSRC
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      if (window.confirm("Are you sure, want remove from cart")) {
                        deleteFromCart(product.productId);
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="text-center my-3">
          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate('/address')}
          >
            Check Out
          </button>
          <button
            className="btn btn-danger mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              if (window.confirm("Are you sure, want clear cart ...?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
