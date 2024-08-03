import React, { useContext } from 'react';
import Appcontext from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, decreaseQuantity, addToCart, deleteFromCart, userAddress } = useContext(Appcontext);
    const navigate = useNavigate();

    // Calculate total items and total price
    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="container text-center my-5">
            <h1>Order Summary</h1>
            <div className="my-4">
                <h2>Shipping Address</h2>
                <p>{userAddress.fullName}</p>
                <p>{userAddress.address}, {userAddress.city}</p>
                <p>{userAddress.state}, {userAddress.country}, {userAddress.pincode}</p>
                <p>Phone: {userAddress.phoneNumber}</p>
                <button className="btn btn-secondary" onClick={() => navigate('/address')}>Edit Address</button>
            </div>
            <h2>Cart Items</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.items.map((item, index) => (
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title.length > 20 ? item.title.slice(0,20):item.title}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.price * item.quantity}</td>
                            <td>
                                <button className="btn btn-danger mx-1" onClick={() => decreaseQuantity(item.id)}>-</button>
                                <button className="btn btn-success mx-1" onClick={() => addToCart(item)}>+</button>
                                <button className="btn btn-danger mx-1" onClick={() => deleteFromCart(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="my-4">
                <h3>Total Items: {totalItems}</h3>
                <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
                <button className="btn btn-primary" onClick={() => navigate('/payment')}>Proceed to Payment</button>
            </div>
        </div>
    );
};

export default Checkout;
