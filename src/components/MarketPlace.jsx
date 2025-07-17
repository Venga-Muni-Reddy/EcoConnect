import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../redux/cartSlice'; // Import actions
import ShimmerPlaceholder from './ShimmerPlaceholder';

// Mock API data for products
const mockProducts = [
    { id: 1, name: 'Reusable Bamboo Cutlery Set', price: 15.99, image: 'https://thumbs.dreamstime.com/b/eco-bamboo-cutlery-illustration-friendly-sustainable-natural-texture-appeal-forks-eco-bamboo-cutlery-ai-generated-eco-bamboo-373328919.jpg', description: 'Eco-friendly and portable.' },
    { id: 2, name: 'Organic Cotton Shopping Bag', price: 8.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfLnx5T6aVcAjUbIRP4PoOeb-3TgmG11PadA&sg', description: 'Durable and stylish reusable bag.' },
    { id: 3, name: 'Solar Powered Phone Charger', price: 45.00, image: 'https://images-cdn.ubuy.co.in/65cc3cb75b8e111e043a698a-bigblue-10w-etfe-solar-panel-charger.jpg', description: 'Charge your devices with sun power.' },
    { id: 4, name: 'Compostable Garbage Bags (50 Pcs)', price: 12.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmmZEdnLhmEDDbpjhbstlyaEuL2JWvWBRJTQ&s', description: 'Biodegradable solution for waste.' },
    { id: 5, name: 'Water Filter Bottle', price: 29.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DDHSte3g1BLRI9FN6QSohhfGj7wi3-AIIQ&s', description: 'Stay hydrated with filtered water.' },
    { id: 6, name: 'Eco-Friendly Laundry Detergent Pods', price: 18.75, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAJTkm7PUwCCXkTmaZoa7CpOoUN6-1IUKJfg&s', description: 'Plant-based, powerful cleaning.' },
];

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
    const dispatch = useDispatch(); // Get dispatch function

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                setProducts(mockProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addItemToCart(product)); // Dispatch action to add item
    };

    const isAddedToCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2C3E50', marginBottom: '20px' }}>Sustainable Marketplace</h2>
            <p style={{ color: '#555', marginBottom: '30px' }}>Discover and shop for eco-friendly products and services that align with your values.</p>

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <ShimmerPlaceholder key={i} height="250px" width="100%" borderRadius="8px" />
                    ))}
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                    {products.map(product => (
                        <div key={product.id} style={{
                            border: '1px solid #eee', borderRadius: '8px', padding: '15px',
                            backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
                        }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
                            <h3 style={{ fontSize: '1.2em', color: '#34495e', marginBottom: '5px' }}>{product.name}</h3>
                            <p style={{ fontWeight: 'bold', color: '#4CAF50', fontSize: '1.1em', marginBottom: '10px' }}>${product.price.toFixed(2)}</p>
                            <p style={{ fontSize: '0.9em', color: '#666', flexGrow: 1, marginBottom: '15px' }}>{product.description}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                disabled={isAddedToCart(product.id)}
                                className="btn btn-success"
                                style={{
                                    width: '100%',
                                    padding: '8px 0',
                                    backgroundColor: isAddedToCart(product.id) ? '#cccccc' : '#4CAF50',
                                    borderColor: isAddedToCart(product.id) ? '#cccccc' : '#4CAF50',
                                    cursor: isAddedToCart(product.id) ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                {isAddedToCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <h3 style={{ color: '#2C3E50', marginBottom: '15px' }}>Your Cart ({cartItems.length} items)</h3>
                {cartItems.length === 0 ? (
                    <p style={{ color: '#666' }}>Your cart is empty. Add some green products!</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {cartItems.map(item => (
                            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed #eee' }}>
                                <span>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)}</span>
                                <button
                                    onClick={() => dispatch(removeItemFromCart(item.id))}
                                    style={{ background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', fontSize: '1.2em' }}
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                        <li style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.2em', marginTop: '15px' }}>
                            Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Marketplace;