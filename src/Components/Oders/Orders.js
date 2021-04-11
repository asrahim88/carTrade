import { Container, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Orders.css'

const Orders = () => {
    const [loggedInUser] = useContext(UserContext);
    const [getCheckOut, setGetCheckOut] = useState([])
    useEffect(() => {
        fetch('https://afternoon-island-73958.herokuapp.com/checkOutUserGet?email=' + loggedInUser.email)
            .then((response) => response.json())
            .then(data => setGetCheckOut(data));
    }, [])
    return (
        <Container fixed className="oderContainer">
                <h1 className="textAlign">Order Summery</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <div>

                            <div className="productInformation">
                                {
                                    getCheckOut.map(data => <div key={data._id}>
                                        <h4 className="userOrder"> Orders by:  {data.email} </h4>
                                        <p className="userOrder"> Customer Name:{data.name} </p>
                                        <span className="userOrder">Car Name: </span> {data.productName}
                                        <p className="userOrder">Car Brand: {data.brandName}</p>
                                        <p className="userOrder">  Car price: $ {data.price} </p>
                                        <p className="userOrder"> Order Date:  {data.oderDate} </p>
                                    </div>)
                                }
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} className='photoGrid'>
                        <div className="oderPhoto">
                            {
                                getCheckOut.map(data => <div key={data._id}>
                                    <img src={data.productPhoto} alt="" />
                                </div>)
                            }
                        </div>
                    </Grid>
                </Grid>
        </Container>
    );
};

export default Orders;