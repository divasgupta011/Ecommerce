import React, { useContext, useState, useEffect } from 'react';
import Appcontext from '../../context/Appcontext';
import { Link, useParams } from 'react-router-dom';

const SearchProduct = () => {
    const { products } = useContext(Appcontext);
    const [searchProduct, setSearchProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const { term } = useParams();

    useEffect(() => {
        if (products && products.length > 0 && term) {
            const filteredProducts = products.filter((data) => 
                data.title?.toLowerCase().includes(term.toLowerCase())
            );
            setSearchProduct(filteredProducts);
        }
        setLoading(false);
    }, [term, products]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container text-center">
                <h1>Related Product</h1>
                {searchProduct.length === 0 ? (
                    <div>No products found.</div>
                ) : (
                    <div className='row row-cols-2 row-cols-md-4 g-4'>
                        {searchProduct.map((product) =>
                            <div key={product._id} className='col'>
                                <div className="card" style={{ width: '18rem' }}>
                                    <Link to={`/product/${product._id}`}>
                                        <img src={product.imageSRC} className="card-img-top" alt={product.title} />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">₹ {product.price}</p>
                                        <div className='d-flex'>
                                            <button className="btn btn-primary mx-3">Buy Now</button>
                                            <button className="btn btn-primary">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchProduct;
