import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Appcontext from '../context/Appcontext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {setFilteredData, products, logout, isAuthenticated, cart} = useContext(Appcontext);
  
  const filterByCategory = (cat) => {
    if (cat === "all") {
      setFilteredData(products);
    } else {
      setFilteredData(products.filter((data) => data.category.toLowerCase() === cat.toLowerCase()));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(" ");
  };

  return (
    <div className='sticky-top'>
    <div className='Navbar'>
        <Link to={"/"} className="left" style={{textDecoration:'none', color:'black'}}>
            <h3>eCommerce</h3>
        </Link>
        <form className="searchbar" onSubmit={submitHandler}>
            <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='....' />
        </form>
        <div className="right">
            {isAuthenticated && (
              <>
              <Link to={"/cart"} type="button" className="btn">
              <span className="material-icons">shopping_cart</span>
              {cart?.items?.length>0 && (
                <span className="badge bg-danger">{cart?.items?.length}</span>
              )}
              </Link>
              <Link to={'/profile'} className="btn">Profile</Link>
              <button className="btn" onClick={()=>{
              logout();
              navigate('/');
            }}>Logout</button>
              </>
            )}
            {!isAuthenticated && (
              <>
              <Link to={'/login'} className="btn">Login</Link>
              <Link to={'/register'} className="btn">Register</Link>
              </>
            )}
            
        </div>
    </div>
    {location.pathname == "/" &&(
    <div className='Navbar'>
    <div className="items" onClick={()=>filterByCategory("all")}>No filter</div>
      <div className="items" onClick={()=>filterByCategory("phone")}>Mobiles</div>
      <div className="items" onClick={()=>filterByCategory("laptop")}>Laptops</div>
      <div className="items" onClick={()=>filterByCategory("camera")}>Camera</div>
      <div className="items" onClick={()=>filterByCategory("headphone")}>Headphone</div>
    </div>

    )}
    </div>
  )
}

export default Navbar