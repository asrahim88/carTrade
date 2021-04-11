import React, { useEffect, useState } from 'react';
import './Home.css'
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import HomeDetails from "../HomeDetails/HomeDetails";
import { Grid } from '@material-ui/core';

const Home = () => {
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        const url = 'https://afternoon-island-73958.herokuapp.com/productData';
        fetch(url)
            .then(res => res.json())
            .then(data => setProductData(data));
    }, [])
    return (
        <Container fixed>
            
            <div className='searchBox'>
                <form className="example" >
                    <input type="text" placeholder="Search.." name="search2" />
                    <button type="submit"> <FontAwesomeIcon icon={faSearch} /></button>
                </form>
            </div>
            <Container fixed>
                <Grid container spacing={3}>
                    {
                        productData.map(product => <HomeDetails product={product} key={product._id}></HomeDetails>)
                    }
                </Grid>
            </Container>


        </Container>
    );
};

export default Home;