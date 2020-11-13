import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import './AdminFAQ.css';
import Nav from '../../Nav/Nav.js';
import { Button } from '@material-ui/core';


class AdminFAQ extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_FAQ' });
  }

  render() {
    console.log('FAQ PROPS', this.props.store.faq);
    
    return (
      <div>
        <Nav />
      
        <Grid container direction="column" alignItems="center" className="rulesFaq">
          <Grid item>
            <h2>FAQ</h2>
          </Grid>
          <Grid item className="pdf">
            {this.props.store.faq.map((item, i) => 
                <img src={item.file_url} key={i}/>
                  )}
          </Grid>
          <Button variant='contained' 
              color='primary'
              size= 'large'
              style={{margin: '.5rem'}}
              onClick={()=>this.props.history.push('/editFAQ')}>
              Edit FAQ
          </Button>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminFAQ);