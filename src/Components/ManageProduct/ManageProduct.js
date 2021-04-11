import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './ManageProduct.css';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const ManageProduct = () => {
    const [manageCart, setManageCart] = useState([]);
    useEffect(() => {
        fetch("https://afternoon-island-73958.herokuapp.com/productData")
            .then((response) => response.json())
            .then(data => setManageCart(data));
    }, [manageCart])

    // Delete product
    const deleteProduct = (id) => {
        fetch(`https://afternoon-island-73958.herokuapp.com/delete/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(data => console.log(data));
    }
    return (
        <Container fixed >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} className='product-manager'>
                    <div>
                        <div>
                            <h1 >Car Trade</h1>
                        </div>
                        <div>
                            <div className='parent'>
                                <div>
                                    <div className='grid'>
                                        <img src="https://i.ibb.co/kMzR8H9/grid-1.png" alt="" />
                                    </div>
                                    <div className='gridManage'>
                                        <p className='manageProductText'>Manage Car</p>
                                    </div>
                                </div>
                            </div>
                            <div className='parent'>
                                <Link to='/admin'>
                                    <div className='grid'>
                                        <img src="https://i.ibb.co/M9dpS7k/plus-1.png" alt="" />
                                    </div>
                                    <div className='gridManage'>
                                        <p className='addProductText'>Add Car</p>
                                    </div>
                                </Link>
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
                <Grid item xs={12} sm={9} className='manage-container'>
                    <div className='managerDiv'>
                        <div>
                            <div className='manageCarDiv'>
                                <h2>Manage Car</h2>
                            </div>
                        </div>
                        <div>
                            <div className='manageDescriptionNames'>
                                <li> <span className='proName'>Product Name</span>  <span className='prodBrand'>Brand</span> <span className='proPrice'>Price</span> <span className='proAction'>Action</span></li>
                            </div>
                            <div className='manageDescriptionNames' >
                                {
                                    manageCart.map(data => <div key={data._id}>
                                        <li><div className='productName'>{data.productName}</div> <div className="manageBrandName">{data.brandName}</div> <div className="manageProductPrice">$ {data.price}</div> <div className="manageAction">
                                            <div className="deleteBtnDiv">
                                                <DeleteForeverIcon className="deleteBtn" onClick={() => {deleteProduct(data._id)}} /></div> </div>
                                        </li>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ManageProduct;