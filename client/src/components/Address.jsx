import React, { useContext, useState } from 'react';
import Appcontext from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';

const Address = () => {
    const { shippingaddress, getUserAddress, userAddress } = useContext(Appcontext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "", 
        address: "", 
        city: "", 
        state: "", 
        country: "", 
        pincode: "",
        phoneNumber: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        const result = await shippingaddress(fullName, address, city, state, country, pincode, phoneNumber);

        console.log('address added', result);

        if (result.success) {
            navigate('/checkout');
        }

        setFormData({
            fullName: "", 
            address: "", 
            city: "", 
            state: "", 
            country: "", 
            pincode: "",
            phoneNumber: ""
        });
    };

    return (
        <div className='container my-5' style={{ width: "600px" }}>
            <h1 className='text-center'>Shipping Address</h1>
            <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input 
                            name="fullName" 
                            value={fullName} 
                            onChange={onChangeHandler} 
                            type="text" 
                            className="form-control" 
                            id="fullName"
                            required 
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input 
                            name="country" 
                            value={country} 
                            onChange={onChangeHandler} 
                            type="text" 
                            className="form-control" 
                            id="country"
                            required 
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="state" className="form-label">State</label>
                        <input 
                            name="state" 
                            value={state} 
                            onChange={onChangeHandler} 
                            type="text" 
                            className="form-control" 
                            id="state"
                            required 
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input 
                            name="city" 
                            value={city} 
                            onChange={onChangeHandler} 
                            type="text" 
                            className="form-control" 
                            id="city"
                            required 
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="pincode" className="form-label">Pincode</label>
                        <input 
                            name="pincode" 
                            value={pincode} 
                            onChange={onChangeHandler} 
                            type="number" 
                            className="form-control" 
                            id="pincode"
                            required 
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="phoneNumber" className="form-label">Phone No.</label>
                        <input 
                            name="phoneNumber" 
                            value={phoneNumber} 
                            onChange={onChangeHandler} 
                            type="number" 
                            className="form-control" 
                            id="phoneNumber"
                            required 
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Complete Address</label>
                    <textarea 
                        name="address" 
                        value={address} 
                        onChange={onChangeHandler} 
                        className="form-control" 
                        id="address"
                        rows="3"
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {userAddress && (
                <div className="d-grid mt-3">
                    <button 
                        className="btn btn-warning" 
                        onClick={() => navigate('/checkout')}
                    >
                        Use Old Address
                    </button>
                </div>
            )}
        </div>
    );
};

export default Address;
