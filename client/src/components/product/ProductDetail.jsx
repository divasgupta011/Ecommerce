import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import RelatedProduct from './RelatedProduct';

const ProductDetail = () => {
  const {id} = useParams();
  const [product,setProduct] = useState([]);

  const url = "http://localhost:1000/api"

  useEffect(() => {
    const fetchProduct = async ()=>{
      const api = await axios.get(`${url}/product/${id}`,{
        headers:{
          "Content-Type":"Application/json"
        },
        withCredentials:true
      })
      console.log(api.data.product);
      setProduct(api.data.product);
    }  
    fetchProduct();
  }, [id])
  return (
    <div className='container'>
      <div className="left">
        <img src={product?.imageSRC} />
      </div>
      <RelatedProduct category={product?.category}/>
    </div>
  )
}

export default ProductDetail