import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import "./HomeDetails.css";
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

const HomeDetails = (props) => {
    const { price, productName, productPhoto, _id } = props.product;
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={3}>
            <Card className={classes.root}>
                <CardContent>
                    <div className='productPhoto'>
                        <img src={productPhoto} alt="" />
                    </div>
                    <div className='productName'>
                        <b>{productName}</b>
                    </div>
                    <div className='productDescription'>
                        <div className='price'>
                            <b>$ {price}</b>
                        </div>
                        <div className='byeBtn'>
                            <Link to={`/checkOut/${_id}`} className = 'byeNowBtnLink'>
                                <Button variant="contained" color="primary">
                                    Buy Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default HomeDetails;