import { Container, Grid } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import './CheckOut.css';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../App';

const CheckOut = () => {
    const [loggedInUser] = useContext(UserContext);
    const { id } = useParams();
    const [carData, setCarData] = useState({});
    useEffect(() => {
        const url = `https://afternoon-island-73958.herokuapp.com/singleProduct/${id}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => setCarData(data));

    }, [])

    // Handle Check out send to database
    const handleCheckOut = () => {
        const newData = { ...loggedInUser, ...carData, oderDate : (new Date().toDateString('dd/MM/yyyy'))};
        fetch('https://afternoon-island-73958.herokuapp.com/checkOutData', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newData)
        })
            .then(res => {
                console.log(res)
            });
    }
    return (
        <Container fixed className="container">
            <div className="parents">
                <Grid container spacing={3} className="checkOutChild">
                    <Grid item xs={12} sm={8}>
                        <div className="checkOutPage">
                            <h1>Check Out</h1>
                            <div className='carDescription'>
                                <div className='car'>
                                    <h1 className="textStyle"> Car Name </h1>
                                    <small>
                                        {
                                            <p>{carData.productName}</p>
                                        }
                                    </small>
                                </div>
                                <div className='car'>
                                    <h1 className="textStyle"> Car Brand </h1>
                                    <small>
                                        {
                                            <p>{carData.brandName}</p>
                                        }
                                    </small>
                                </div>
                                <div className='car'>
                                    <h1 className="textStyle"> Car Price </h1>
                                    <small>
                                        {
                                            <p>$ {carData.price}</p>
                                        }
                                    </small>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className='carImage'>
                            <img src={carData.productPhoto} alt="" />
                        </div>

                    </Grid>
                    <Button onClick={handleCheckOut} variant="contained" color="primary" className="checkBtn">
                        Checkout
                    </Button>
                </Grid>
            </div>
        </Container>
    );
};

export default CheckOut;