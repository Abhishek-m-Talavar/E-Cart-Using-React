import React, { useEffect, useState } from 'react';
import { TiShoppingCart } from "react-icons/ti";
import './FakeshopingStore.css';

function FakeshopingSore() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function FetchData() {
            try {
                let response = await fetch('https://fakestoreapi.com/products/');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                let result = await response.json();
                setData(result);
            } catch (error) {
                console.log("Error in try block: ", error);
                setError(true); // Set error state to true if there is an error
            }
        }
        FetchData();

        // Cleanup function
        return () => {
            console.log("Cleanup function");
        }
    }, []); // Empty dependency array means this effect runs only once on mount

    return (
        <div>
            <header className='headerelement'>
                <h1>Easy-Cart</h1>
                <input type='search' placeholder='Search for items...' />
                <button>Search</button>
                <div className="cart-icon">
                    <TiShoppingCart style={{ height: '100%', width: '100%' }} />
                </div>
            </header>

            {/* Display error message if there was an error */}
            {error && <p>There was an error fetching the data.</p>}

            {/* If no error and data is available */}
            {!error && data ? (
                <main className="product-grid">
                    {data.map((ele, index) => (
                        <div key={ele.id} className="product-card">
                            <img src={ele.image} alt={ele.title} />
                            <h3>{ele.title}</h3>
                            <p>${ele.price} 
                                <button className="cart-button">
                                    <TiShoppingCart />
                                </button>
                            </p>
                        </div>
                    ))}
                </main>
            ) : (
                <p>Loading product...</p> // If data is null, show loading message
            )}
        </div>
    );
}

export default FakeshopingSore;
