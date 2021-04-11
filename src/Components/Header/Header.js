import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import './Header.css';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
// import firebase from "firebase/app";

const Header = () => {
    const [loggedInUser] = useContext(UserContext);
    return (
        <Container fixed>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <div className='logo'>
                        <img src="https://i.ibb.co/g4k6b3K/cartrade-logo-238-48.png" alt="" />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ul>
                        <li> <Link to='/home'>Home</Link> </li>
                        <li> <Link to="/orders">Orders</Link> </li>
                        <li><Link to="/admin">Admin</Link></li>
                        <li> <Link to="/deals">Deals</Link> </li>
                        {loggedInUser.isSignedIn ? <Link to="/login"> <button className="loginBtn">{loggedInUser.name}</button> </Link> :
                            <Link to="/login"> <button className="loginBtn">Login</button> </Link>
                        }
                        {/* {loggedInUser.isSignedIn &&
                            <Link to="/login"> <button className="loginBtn" onClick={handleSignOut}>Sign Out</button> </Link>
                        } */}
                    </ul>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Header;