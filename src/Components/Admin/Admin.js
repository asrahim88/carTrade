import React, { useState } from 'react';
import "./Admin.css";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
// const axios = require('axios');


const Admin = () => {
    const [product, setProduct] = useState({
        price: '',
        productName: '',
        brandName: '',
        productPhoto: null
    })
    const handleImageUpload = event => {
        const imgData = new FormData();
        imgData.set('key', 'beff36e7fe15b7d9abc3b7c7350bad4f')
        imgData.append('image', event.target.files[0])

        // axios
        axios.post('https://api.imgbb.com/1/upload',
            imgData)
            .then(function (response) {
                const photo = response.data.data.display_url;
                const newProduct = { ...product };
                newProduct.productPhoto = photo;
                setProduct(newProduct);
            })
            .catch(function (error) {
                console.log(error);
            });
        // axios
    }

    // get data from input field
    const handleBlur = (e) => {
        if (e.target.name === 'productName') {
            const itemName = e.target.value;
            const newProduct = { ...product };
            newProduct.productName = itemName;
            setProduct(newProduct);
        }
        if (e.target.name === 'brandName') {
            const productBrandName = e.target.value;
            const newProduct = { ...product };
            newProduct.brandName = productBrandName;
            setProduct(newProduct);
        }
        if (e.target.name === 'price') {
            const productPrice = e.target.value;
            const newProduct = { ...product };
            newProduct.price = productPrice;
            setProduct(newProduct);
        }
    }

    // submit form
    const handleSubmit = (e) => {
        const data = product;
        const url = `https://afternoon-island-73958.herokuapp.com/addData`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => console.log(res));
    }

    return (
        <Container fixed >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} className='product-manager'>
                    <div className='allDivCenter'>
                        <div>
                            <h1 >Car Trade</h1>
                        </div>
                        <div>
                            <div className='parent'>
                                <Link to='/manageProduct'>
                                    <div className='grid'>
                                        <img src="https://i.ibb.co/kMzR8H9/grid-1.png" alt="" />
                                    </div>
                                    <div className='gridManage'>
                                        <p className='manageProductText'>Manage Car</p>
                                    </div>
                                </Link>
                            </div>
                            <div className='parent'>
                                <div>
                                    <div className='grid'>
                                        <img src="https://i.ibb.co/M9dpS7k/plus-1.png" alt="" />
                                    </div>
                                    <div className='gridManage'>
                                        <p className='manageProductText'>Add Car</p>
                                    </div>
                                </div>
                            </div>
                            <div className='parent'>
                                <div>
                                    <div className='grid'>
                                        <img src="https://i.ibb.co/yXLJcXT/edit-1.png" alt="" />
                                    </div>
                                    <div className='gridManage'>
                                        <p className='manageProductText'>Edit Car</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={9} className='addedDiv'>
                    <div className = 'addingContainer'>
                        <div>
                            <div className='addProduct'>
                                <h1>Add Car</h1>
                            </div>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className='adminForm'>
                                    <div className='fst-part'>
                                        <p>Car Name</p>
                                        <input type="text" placeholder='Enter name' name='productName' className='input' onBlur={handleBlur} required />
                                        <p className='add'>Car price</p>
                                        <input type="text" placeholder='Enter price' name='price' className='input' onBlur={handleBlur} required />
                                    </div>
                                    <div className="second-part">
                                        <p>Brand Name</p>
                                        <input type="text" placeholder='Enter brand name' name='brandName' className='input' onBlur={handleBlur} required />
                                        <p className='add'>Add photo</p>
                                        <input type="file" placeholder='Upload Photo' className='input' onChange={handleImageUpload} />
                                    </div>
                                </div>
                                <input type='submit' className='inputBtn' value='Submit' />
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Admin;