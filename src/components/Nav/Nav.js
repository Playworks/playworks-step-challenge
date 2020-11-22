import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Logo from '../../images/PW-hor-logo.png'
import MenuIcon from '@material-ui/icons/Menu';
import { Button, Menu, MenuItem } from '@material-ui/core';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/home';
    loginLinkData.text = 'Home';
  };

  const [ anchorEl, setAnchorEl ] = React.useState( null );

  const handleClick = ( event ) => {
    setAnchorEl( event.currentTarget );
  };

  const handleClose = () => {
    setAnchorEl( null );
  };

  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/home">
          <img className='nav-logo' src={Logo} alt="" />
        </Link>
      </div>

        {/* Shows the hamburger menu if the user is logged in */}
         { props.store.user.admin === 'ADMIN' ? 
          <div className='nav-right'>
            <Button style={{ verticalAlign: 'baseline' }} aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClick }>
              <MenuIcon fontSize={ 'medium' } style={{ color: 'black' }}/>
            </Button>
            <Menu id="simple-menu"
              anchorEl={ anchorEl }
              keepMounted
              open={ Boolean( anchorEl )}
              onClose={ handleClose }>
                <MenuItem onClick={ handleClose }>
                  <Link className='nav-link' to="/adminhome">Contests</Link>
                </MenuItem>
                <MenuItem onClick={ handleClose }>
                  <Link className='nav-link' to="/adminchallenges">Challenges</Link>
                </MenuItem>
                <MenuItem onClick={ handleClose }>
                  <Link className='nav-link' to="/adminrules">Rules</Link>
                </MenuItem>
                <MenuItem onClick={ handleClose }>
                  <Link className='nav-link' to="/adminfaq">FAQ</Link>
                </MenuItem>
                <MenuItem onClick={() => props.dispatch({ type: 'LOGOUT' })}>Logout</MenuItem>
            </Menu>
          </div>
          : props.store.user.id == null ? ( null ) : (  
          <div className='nav-right'>
            <Button style={{ verticalAlign: 'baseline' }} aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClick }>
              <MenuIcon fontSize={ 'medium' } style={{ color: 'black' }}/>
            </Button>
            <Menu id="simple-menu"
              anchorEl={ anchorEl }
              keepMounted
              open={ Boolean( anchorEl )}
              onClose={ handleClose }>
                <MenuItem onClick={ handleClose }>
                  <Link className='nav-link' to="/home">Home</Link>
                </MenuItem>
                <MenuItem onClick={ handleClose }>
                  <Link className='nav-link' to="/addphoto">Add Photo</Link>
                </MenuItem>
                <MenuItem onClick={ handleClose }>
                  <Link className='nav-link' to="/addsteps">Add Steps</Link>
                </MenuItem>
                <MenuItem onClick={ handleClose }>
                  <Link className='nav-link' to="/team">Team Page</Link>
                </MenuItem>
                <MenuItem onClick={ handleClose }>
                  <Link className='nav-link' to="/rules">Rules</Link>
                </MenuItem>
                <MenuItem onClick={() => props.dispatch({ type: 'LOGOUT' })}>Logout</MenuItem>
            </Menu>
          </div>
         )} 
      </div>
  );
};

export default connect(mapStoreToProps)(Nav);
