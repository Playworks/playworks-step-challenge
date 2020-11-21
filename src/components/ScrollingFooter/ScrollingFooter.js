import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Typography } from '@material-ui/core';
import classnames from "classnames";
import './ScrollingFooter.css'

class ScrollingFooter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true
    };
  }

   // Adds an event listener when the component is mount.
   componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;
    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    return (
      <footer className={classnames("scrollingFooter", {"scrollingFooter--hidden": !this.state.visible})}>
        <div className='footerIconGroup' onClick={() => {this.props.history.push('/home')}}>
          <HomeIcon/>
          <div className='footerCaption'>
            <Typography variant='caption'>Home</Typography>
          </div>
        </div>
        <div className='footerIconGroup' onClick={() => {this.props.history.push('/addphoto')}}>
          <AddAPhotoIcon/>
          <div className='footerCaption'>
            <Typography variant='caption'>Add Photo</Typography>
          </div>
        </div>
        <div className='footerIconGroup' onClick={() => {this.props.history.push('/addsteps')}}>
          <DirectionsWalkIcon/>
          <div className='footerCaption'>
            <Typography variant='caption'>Add Steps</Typography>
          </div>
        </div>
        <div className='footerIconGroup' onClick={() => {this.props.history.push('/team')}}>
          <SupervisedUserCircleIcon/>
          <div className='footerCaption'>
            <Typography variant='caption'>Team Home</Typography>
          </div>
        </div>
      </footer>
    );
  }
}
export default connect(mapStoreToProps) ( withRouter (ScrollingFooter));
