import React from 'react';
import headerStyles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { SIGN_OUT } from '../../store/actions/types';

const HeaderImage = styled.img`
  border-radius: 50%;
  height: 33px;
  width: 33px;
  margin: 0 10px;
`;

const Header = () => {

  const { isSignedIn, userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch()

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Link to="/" className="navbar-brand">Cleaning service</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>

          {isSignedIn ?
            <div>
              <Link to={`/users/${userInfo.id}`} className={headerStyles.userProfileLink}>
                {userInfo.name}
              </Link>
              <HeaderImage alt={userInfo.name} src={userInfo.profilePicURL} />
              <button className="btn btn-outline-primary" onClick={() => dispatch({ type: SIGN_OUT })}>Logout</button>
            </div>
            :
            <>
              <Link to="/users/login" className="btn btn-primary">
                Sign In
              </Link>
              <Link to="/users/register" className="btn btn-outline-primary">
                Sign up
              </Link>
            </>
          }

        </Navbar.Collapse>
      </Navbar>
      <div className="jumbotron jumbotron-fluid" className={headerStyles.jumbotron}>
        <div className="container">
          <h1 className="display-3">Be always cleaned!</h1>
          <p className="lead">Choose service for your home and office by comparing</p>
        </div>
      </div>
    </>
  )
};

export default Header;