import React, { useContext, useState } from 'react'
import Appcontext from '../../context/Appcontext';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const {register} = useContext(Appcontext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
    }

    const {name, email, password} = formData;

    const submitHandler = async (e) =>{
        e.preventDefault();
        const result=await register(name, email, password);
        if(result.success){
            navigate('/login');
        }
        console.log(formData);
    }

  return (
    <div  className='container my-5' style={{width: "600px"}}>
        <h1 className='text-center'>Register</h1>
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                <input name="name" value={formData.name} onChange={onChangeHandler} type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input name="email" value={formData.email} onChange={onChangeHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input name="password" value={formData.password} onChange={onChangeHandler} type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default Register