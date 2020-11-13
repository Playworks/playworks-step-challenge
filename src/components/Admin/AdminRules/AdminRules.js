import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import './AdminRules.css';
import Nav from '../../Nav/Nav.js';
import { Button } from '@material-ui/core';


class AdminRules extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_RULES' });
  }

  render() {
    console.log('RULES PROPS', this.props.store.rules);
    
    return (
      <div>
        <Nav />
      
        <Grid container direction="column" alignItems="center" className="rulesFaq">
          <Grid item>
            <h2>Rules</h2>
          </Grid>
          <Grid item className="pdf">
            {this.props.store.rules.map((rule, i) => 
                <img src={rule.file_url} key={i}/>
                  )}
          </Grid>
          <Button variant='contained' 
              color='primary'
              size= 'large'
              style={{margin: '.5rem'}}
              onClick={()=>this.props.history.push('/editrules')}>
              Edit Rules
          </Button>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminRules);