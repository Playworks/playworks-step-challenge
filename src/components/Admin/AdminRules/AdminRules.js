import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import './AdminRules.css';
import Nav from '../../Nav/Nav.js';
import { Button, Typography } from '@material-ui/core';
import {Document, Page, pdfjs} from 'react-pdf';
import { MobilePDFReader } from 'react-read-pdf';


class AdminRules extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_RULES' });
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }

  render() {
    console.log('RULES PROPS', this.props.store.rules);
    
    return (
      <div>
        <Nav />
        <center>
            <div className='adminRulesAndFaqHeader'>
              <Typography variant='h5'>Rules</Typography>
            </div>
            <div className='adminRulesFaqBtn'>
              <Button variant='contained' 
                  color='primary'
                  size= 'large'
                  style={{margin: '.5rem', color: 'white', background: '#054f95'}}
                  onClick={()=>this.props.history.push('/editrules')}>
                  Edit Rules
              </Button>
            </div>
              {this.props.store.rules.map((rule, i) => 
                <Document file={rule.file_url} key={i}> 
                  <Page pageNumber={1}> 

                  </Page>
                </Document>
                  )}
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminRules);