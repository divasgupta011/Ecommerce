import React, { useEffect, useState } from 'react';
import Appcontext from './Appcontext';
import axios from 'axios';

const Appstate = (props) => {

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user,setUser] = useState();
  const [cart,setCart] = useState([]);
  const [reload,setReload] = useState(false);


  const url = "http://localhost:1000/api"

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      })
      setProducts(api.data.product);
      setFilteredData(api.data.product);
      userProfile();
    }
    fetchProduct();
    userCart();
  }, [token, reload])

  // Save token to local storage when it updates
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  useEffect(() => {

    const lstoken = localStorage.getItem("token");

    if (token) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, [token]);

  // register user
  const register = async (name, email, password) => { 
    const api = await axios.post(`${url}/user/register`, {
      name,
      email,
      password
    }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    })
    console.log("User Registered", api.data);
    return api.data;
  }

  // login user
  const login = async (email, password) => {
    const api = await axios.post(`${url}/user/login`, {
      email,
      password
    }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    })
    setToken(api.data.token);
    setIsAuthenticated(true);
    console.log("User Logged In", api.data);
    return api.data;
  }

  // logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken('');
    localStorage.removeItem('token');
  }


  // user profile

  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`,{
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    })
    setUser(api.data.user);
  }

  // Add to cart

  const addToCart = async(productId, title, description, price, quantity, imageSRC) => {
    const api = await axios.post(`${url}/cart/add`,
      {productId, title, description, price, quantity, imageSRC},
      {
      headers:{
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true
    })
    setReload(!reload);
  }

  // User Cart

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`,{
      headers:{
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true
    })
    setCart(api.data.cart)
  }

  return (
    <Appcontext.Provider value={{ products, register, login, url, token, isAuthenticated, setIsAuthenticated, filteredData, setFilteredData, logout, user, addToCart, cart }}>
      {props.children}
    </Appcontext.Provider>
  )
}

export default Appstate;
