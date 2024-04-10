import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import PostRequest from './components/PostRequest/PostRequest';
import GetReguest from './components/GetRequest/GetRequest';
import Home from './pages/Home/Home';
import UpdateRequest from './components/UpdateRequest/UpdateRequest';
import Playground from './components/Playground/Playground';
import RegisterForm from './components/Authentication/Register/Register';
import LoginForm from './components/Authentication/Login/Login';
import DeleteRequest from './components/DeleteRequest/DeleteRequest';
import Layout from './layout/Layout';
import ProtectedRoute from './routes/ProtectedRoutes';
import UserProfile from './components/UserProfile/UserProfile';
import { jwtDecode } from "jwt-decode";
import ContactInformation from './components/ContactInformation/ContactInformation';
import AccountStatus from './components/AccountStatus/AccountStatus';
import UserPreferences from './components/UserPreferences/UserPreferences';
import NotificationPreferences from './components/NotificationPreferences/NotificationPreferences';
import AddProducts from './components/Products/AddProducts/AddProducts';
import UpdateProducts from './components/Products/UpdateProducts/UpdateProducts';
import PageProducts from './components/Products/PageProducts/PageProducts';
import Basket from './components/Basket/Basket';
import BasketPage from './pages/Basket/BasketPage';
import CheckoutForm from './components/Checkout/Checkout';
import Typescript from './components/Typescript/Typescript';
import CheckoutPage from './components/CheckoutNew/CheckoutPage';

export default function AppRouter() {

    const [decodedToken, setDecodedToken] = useState(null);
    // console.log("line:1", decodedToken?.user_id);

    useEffect(() => {
        // Function to get and decode the token
        const getDecodedToken = () => {
            // Get the JWT from local storage
            const token = localStorage.getItem('token');

            // Check if the token exists
            if (token) {
                try {
                    // Decode the token using jwt-decode
                    const decodedToken = jwtDecode(token);

                    // Set the decoded token in the state
                    setDecodedToken(decodedToken);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    setDecodedToken(null); // Set null in case of an error
                }
            } else {
                console.error('Token not found in local storage.');
                setDecodedToken(null); // Set null if the token is not found
            }
        };

        // Call the function when the component mounts
        getDecodedToken();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //  ### lifting state:

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [basketApi, setBasketApi] = useState([]);
    // console.log("line:88", basketApi);
    const [showBasket, setShowBasket] = useState(false);

    useEffect(() => {
        const fetchProductDataNew = async () => {
            try {
                if (decodedToken?.user_id) {
                    const response = await axios.get(`https://postgre-sql-db-01032024-7032f3a72c58.herokuapp.com/basket/${decodedToken?.user_id}`);

                    if (response.data) {
                        setBasketApi(response.data);
                    } else {
                        setBasketApi([]);
                    }
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setIsLoading(false);
            }
        };

        fetchProductDataNew();
    }, [decodedToken?.user_id]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get('https://postgre-sql-db-01032024-7032f3a72c58.herokuapp.com/product');
                if (response.data && response.data.length > 0) {
                    setProductData(response.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, []);

    const updateQuantity = async (updatedBasket) => {
        try {
            if (decodedToken?.user_id && updatedBasket.length > 0) {
                const updatePromises = updatedBasket.map(async (item) => {
                    const response = await axios.post('https://postgre-sql-db-01032024-7032f3a72c58.herokuapp.com/basket/updateQuantity', {
                        userid: decodedToken?.user_id,
                        productid: item.productid,
                        quantity: item.quantity,
                    });

                    return response.data;
                });

                const updatedBasketItems = await Promise.all(updatePromises);

                if (JSON.stringify(updatedBasket) !== JSON.stringify(updatedBasketItems)) {
                    setBasketApi(updatedBasketItems);
                }
            }
        } catch (error) {
            console.error('Error updating basket quantities:', error);
            setErrorMessage('Failed to update basket quantities.');
        }
    };

    const handleAddToBasket = async (product) => {
        try {
            const existingProductIndex = basketApi.findIndex((item) => item.productid === product.productid);

            if (existingProductIndex !== -1) {
                const updatedBasket = [...basketApi];
                updatedBasket[existingProductIndex].quantity += 1;
                setBasketApi(updatedBasket);
                setSuccessMessage(`Added ${product.productname} to the basket.`);
                updateQuantity(updatedBasket); // Update quantity after modifying the basket
            } else {
                const response = await axios.post(`https://postgre-sql-db-01032024-7032f3a72c58.herokuapp.com/basket/add`, {
                    userid: decodedToken?.user_id,
                    productid: product.productid,
                    productname: product.productname,
                    price: product.price,
                    category: product.category,
                    quantity: 1,
                });

                if (response.data) {
                    const updatedBasket = [...basketApi, { ...product, quantity: 1 }];
                    setBasketApi(updatedBasket);
                    setSuccessMessage(`Added ${product.productname} to the basket.`);
                    updateQuantity(updatedBasket); // Update quantity after modifying the basket
                } else {
                    setErrorMessage('Failed to add the product to the basket.');
                }
            }
        } catch (error) {
            console.error('Error adding product to basket:', error);
            setErrorMessage('Failed to add the product to the basket.');
        }
    };

    const handleRemoveFromBasket = async (index) => {
        try {
            const productToRemove = basketApi[index];
            const response = await axios.post(`https://postgre-sql-db-01032024-7032f3a72c58.herokuapp.com/basket/remove`, {
                userid: decodedToken?.user_id,
                productid: productToRemove.productid,
            });

            if (response.data) {
                const updatedBasket = [...basketApi];
                updatedBasket.splice(index, 1);
                setBasketApi(updatedBasket);
                setSuccessMessage('Product removed from the basket.');
                updateQuantity(updatedBasket); // Update quantity after modifying the basket
            } else {
                setErrorMessage('Failed to remove the product from the basket.');
            }
        } catch (error) {
            console.error('Error removing product from basket:', error);
            setErrorMessage('Failed to remove the product from the basket.');
        }
    };

    const handleIncreaseQuantity = async (index) => {
        try {
            const updatedBasket = [...basketApi];
            updatedBasket[index].quantity += 1;

            const response = await axios.post(`https://postgre-sql-db-01032024-7032f3a72c58.herokuapp.com/basket/updateQuantity`, {
                userid: decodedToken?.user_id,
                productid: updatedBasket[index].productid,
                quantity: updatedBasket[index].quantity,
            });

            if (response.data) {
                setBasketApi(updatedBasket);
                updateQuantity(updatedBasket); // Update quantity after modifying the basket
            } else {
                setErrorMessage('Failed to update the quantity.');
            }
        } catch (error) {
            console.error('Error increasing product quantity:', error);
            setErrorMessage('Failed to update the quantity.');
        }
    };

    const handleDecreaseQuantity = async (index) => {
        try {
            const updatedBasket = [...basketApi];
            if (updatedBasket[index].quantity > 1) {
                updatedBasket[index].quantity -= 1;

                const response = await axios.post(`https://postgre-sql-db-01032024-7032f3a72c58.herokuapp.com/basket/updateQuantity`, {
                    userid: decodedToken?.user_id,
                    productid: updatedBasket[index].productid,
                    quantity: updatedBasket[index].quantity,
                });

                if (response.data) {
                    setBasketApi(updatedBasket);
                    updateQuantity(updatedBasket); // Update quantity after modifying the basket
                } else {
                    setErrorMessage('Failed to update the quantity.');
                }
            }
        } catch (error) {
            console.error('Error decreasing product quantity:', error);
            setErrorMessage('Failed to update the quantity.');
        }
    };

    const calculateTotalPrice = () => {
        return basketApi.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const basketItemCount = basketApi.reduce((count, item) => count + item.quantity, 0);

    const handleToggleBasket = () => {
        setShowBasket(!showBasket);
    };

    return (
        <div>
            <Router>
                <Layout 
                basketApi={basketApi}
                handleRemoveFromBasket={handleRemoveFromBasket}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}

                >
                    <Routes>

                        <Route element={<ProtectedRoute />}>

                            <Route path="/" element={<Home />} />
                            <Route path="/update-request" element={<UpdateRequest />} />
                            <Route path="/post-request" element={<PostRequest />} />
                            <Route path="/get-request" element={<GetReguest />} />
                            <Route path="/delete-request" element={<DeleteRequest />} />
                            <Route path="/playground" element={<Playground />} />
                            <Route path="/userprofile" element={<UserProfile userid={decodedToken?.user_id} />} />
                            <Route path="/contact-informations" element={<ContactInformation userid={decodedToken?.user_id} />} />
                            <Route path="/account-status" element={<AccountStatus userid={decodedToken?.user_id} />} />
                            <Route path="/user-preferences" element={<UserPreferences userid={decodedToken?.user_id} />} />
                            <Route path="/notification-preferences" element={<NotificationPreferences userid={decodedToken?.user_id} />} />
                            <Route path="/products" element={<AddProducts userid={decodedToken?.user_id} />} />
                            <Route path="/update-products" element={<UpdateProducts />} />
                            <Route path="/checkout" element={<CheckoutForm />} />
                            <Route path="/typescript" element={<Typescript />} />
                            <Route path="/checkoutpage" element={<CheckoutPage />} />

                            <Route path="/basket-page" element={<BasketPage
                             userid={decodedToken?.user_id}
                             handleRemoveFromBasket={handleRemoveFromBasket}
                             setBasketApi={setBasketApi}
                             basketApi={basketApi}
                             handleAddToBasket={handleAddToBasket}
                             handleIncreaseQuantity={handleIncreaseQuantity}
                             handleDecreaseQuantity={handleDecreaseQuantity}
                            />} />

                            <Route path="/page-products" element={<PageProducts
                                userid={decodedToken?.user_id}
                                handleRemoveFromBasket={handleRemoveFromBasket}
                                setBasketApi={setBasketApi}
                                basketApi={basketApi}
                                handleAddToBasket={handleAddToBasket}
                                handleIncreaseQuantity={handleIncreaseQuantity}
                                handleDecreaseQuantity={handleDecreaseQuantity}
                            />} />

                            {/* <Route path="/basket" element={<Basket
                                userid={decodedToken?.user_id}
                                handleRemoveFromBasket={handleRemoveFromBasket}
                                setBasketApi={setBasketApi}
                                basketApi={basketApi}
                                handleAddToBasket={handleAddToBasket}
                                handleIncreaseQuantity={handleIncreaseQuantity}
                                handleDecreaseQuantity={handleDecreaseQuantity}
                            />} /> */}
                            



                        </Route>

                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    )
}
