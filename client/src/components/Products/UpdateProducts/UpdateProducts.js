import React, { useState, useEffect } from 'react';
import './UpdateProducts.css';
import Select from 'react-select';

const productDataDummy = [
    {
        "productid": "101",
        "productname": "Samba",
        "price": 99.99,
        "category": "Adidas",
        // Add other properties as needed
    },
    // Add more product data as needed
];

const categoriesOptions = [
    { value: 'Adidas', label: 'Adidas' },
    { value: 'Nike', label: 'Nike' },
    { value: 'Puma', label: 'Puma' }
    // Add more options as needed
];

const UpdateProducts = () => {
    const [products, setProducts] = useState([]);
    console.log("line:1", products);
    const [dummyProducts, setDummyProducts] = useState([...productDataDummy]);
    const [loading, setLoading] = useState(true);
    const [updateFormData, setUpdateFormData] = useState({});
    console.log("line:3", updateFormData);
    const [selectedProductId, setSelectedProductId] = useState(null);
    console.log("line:2", selectedProductId);
    const [showDummyDataMessage, setShowDummyDataMessage] = useState(false);

    const fetchProductsData = async () => {
        try {
            const response = await fetch('http://localhost:3005/product'); // Assuming your products endpoint
            const data = await response.json();
            setProducts(data);
            setLoading(false);
            setShowDummyDataMessage(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
            setDummyProducts(productDataDummy);
            setShowDummyDataMessage(true);
        }
    };

    useEffect(() => {
        fetchProductsData();
    }, [updateFormData, selectedProductId]);

    const handleToggleUpdateForm = (productId) => {
        setUpdateFormData((prevFormData) => {
            if (selectedProductId !== productId) {
                const productToUpdate = products.length > 0
                    ? products.find((product) => product.productid === productId)
                    : dummyProducts.find((product) => product.productid === productId);

                return {
                    ...prevFormData,
                    [productId]: { ...productToUpdate } || {},
                };
            }

            return prevFormData;
        });

        setSelectedProductId((prevProductId) => (prevProductId === productId ? null : productId));
    };

    const handleUpdateFormDataChange = (productId, field, value) => {
        setUpdateFormData((prevFormData) => ({
            ...prevFormData,
            [productId]: { ...prevFormData[productId], [field]: value },
        }));
    };

    const handleUpdateProduct = async (e, productId) => {
        e.preventDefault();
        const { productname, price, category } = updateFormData[productId] || {};

        try {
            await fetch(`http://localhost:3005/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productname, price, category }),
            });

            setUpdateFormData((prevFormData) => {
                const { [productId]: omit, ...rest } = prevFormData;
                return rest;
            });

            setSelectedProductId(null);

            fetchProductsData();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            // Delete the product from the API
            await fetch(`http://localhost:3005/products/${productId}`, {
                method: 'DELETE',
            });

            // Update the state to remove the deleted product from the API data
            setProducts(products.filter(product => product.productid !== productId));

            // Update the dummy data by removing the deleted product
            setDummyProducts(dummyProducts.filter(product => product.productid !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="products-container">
            <h2 className="update-request-heading">Update Products</h2>
            {loading ? (
                <p className="loading">Loading...</p>
            ) : products.length > 0 ? (
                <div>
                    {products.map((product) => (
                        <div key={product.productid} className={`product-container ${selectedProductId === product.productid ? 'open' : ''}`}>
                            <div className="product-info">
                                {/* <div className="product-info"> */}
                                <span className="product-name">
                                    {product.productname}
                                </span>
                                <button
                                    className={`toggle-button ${selectedProductId === product.productid ? 'red' : ''}`}
                                    onClick={() => handleToggleUpdateForm(product.productid)}
                                >
                                    {selectedProductId === product.productid ? 'Close' : 'Open Profile'}
                                </button>
                            </div>
                            {selectedProductId === product.productid && (
                                <form onSubmit={(e) => handleUpdateProduct(e, product.productid)} className="update-form">
                                    <div className="form-fields">
                                        {/* Modify the input fields as per your product properties */}
                                        <label htmlFor={`newName_${product.productid}`}>Product ID:</label>
                                        <input
                                            type="number"
                                            id={`newName_${product.productid}`}
                                            placeholder="Product ID"
                                            value={updateFormData[product.productid]?.productid || ''}
                                            onChange={(e) => handleUpdateFormDataChange(product.productid, 'productid', e.target.value)}
                                            disabled
                                        />
                                        <label htmlFor={`newName_${product.productid}`}>Product Name:</label>
                                        <input
                                            type="text"
                                            id={`newName_${product.productid}`}
                                            placeholder="Enter new name"
                                            value={updateFormData[product.productid]?.productname || ''}
                                            onChange={(e) => handleUpdateFormDataChange(product.productid, 'productname', e.target.value)}
                                        />
                                        <label htmlFor={`newPrice_${product.productid}`}>price:</label>
                                        <input
                                            type="number"
                                            id={`newPrice_${product.productid}`}
                                            placeholder="Enter price"
                                            value={updateFormData[product.productid]?.price || ''}
                                            onChange={(e) => handleUpdateFormDataChange(product.productid, 'price', e.target.value)}
                                        />

                                        <label htmlFor={`newCategory_${product.productid}`}>Category:</label>
                                        <Select
                                            id={`newCategory_${product.productid}`}
                                            options={categoriesOptions}
                                            value={{ value: updateFormData[product.productid]?.category || '', label: updateFormData[product.productid]?.category || '' }}
                                            onChange={(selectedOption) => handleUpdateFormDataChange(product.productid, 'category', selectedOption.value)}
                                        />
                                    </div>
                                    <div className="form-fields-second">
                                        <button type="submit" className="update-button">
                                            Update
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.productid)} className="delete-button">Delete</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {showDummyDataMessage && <p>No products available from the API. Displaying dummy data:</p>}
                    {dummyProducts.map((product) => (
                        <div key={product.productid} className={`product-container ${selectedProductId === product.productid ? 'open' : ''}`}>
                            <div className="product-info">
                                <span className="product-name" >
                                    {product.productname}
                                </span>
                                <button
                                    className={`toggle-button ${selectedProductId === product.productid ? 'red' : ''}`}
                                    onClick={() => handleToggleUpdateForm(product.productid)}
                                >
                                    {selectedProductId === product.productid ? 'Close' : 'Open Profile'}
                                </button>
                            </div>
                            {selectedProductId === product.productid && (
                                <form onSubmit={(e) => handleUpdateProduct(e, product.productid)} className="update-form">
                                    <div className="form-fields">
                                        {/* Modify the input fields as per your product properties */}
                                        <label htmlFor={`newName_${product.productid}`}>Product ID:</label>
                                        <input
                                            type="number"
                                            id={`newName_${product.productid}`}
                                            placeholder="Product ID"
                                            value={updateFormData[product.productid]?.productid || ''}
                                            onChange={(e) => handleUpdateFormDataChange(product.productid, 'productid', e.target.value)}
                                            disabled
                                        />
                                        <label htmlFor={`newName_${product.productid}`}>Product Name:</label>
                                        <input
                                            type="text"
                                            id={`newName_${product.productid}`}
                                            placeholder="Enter new name"
                                            value={updateFormData[product.productid]?.productname || ''}
                                            onChange={(e) => handleUpdateFormDataChange(product.productid, 'productname', e.target.value)}
                                        />
                                        <label htmlFor={`newPrice_${product.productid}`}>price:</label>
                                        <input
                                            type="number"
                                            id={`newPrice_${product.productid}`}
                                            placeholder="Enter price"
                                            value={updateFormData[product.productid]?.price || ''}
                                            onChange={(e) => handleUpdateFormDataChange(product.productid, 'price', e.target.value)}
                                        />
                                        <label htmlFor={`newCategory_${product.productid}`}>Category:</label>
                                        <Select
                                            id={`newCategory_${product.productid}`}
                                            options={categoriesOptions}
                                            value={{ value: updateFormData[product.productid]?.category || '', label: updateFormData[product.productid]?.category || '' }}
                                            onChange={(selectedOption) => handleUpdateFormDataChange(product.productid, 'category', selectedOption.value)}
                                        />
                                    </div>
                                    <div className="form-fields-second">
                                        <button type="submit" className="update-button">
                                            Update
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.productid)} className="delete-button">Delete</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpdateProducts;
