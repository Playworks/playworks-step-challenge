import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import {Document, Page, pdfjs} from 'react-pdf';
// import components
import FAQ from '../../User/FAQ/FAQ';
import Nav from '../../Nav/Nav.js';
import ScrollingFooter from '../../ScrollingFooter/ScrollingFooter';
// import material ui
import { Grid, Typography } from "@material-ui/core";

class Rules extends Component {
  state = {
    heading: 'Rules',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_RULES' });
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }

  render() {
    return (
      <div>
        <Nav />
        <div>
          <Grid container direction="column" alignItems="center" className="rulesFaq">
            <Grid item>
              <div className='userRulesHeader'>
                <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h4'>Rules</Typography>
              </div>
            </Grid>
            {this.props.store.rules.map((rule, i) => 
              <Document file={rule.file_url} key={i}> 
                <Page pageNumber={1}> 
                </Page>
              </Document>
            )}
            <FAQ />
          </Grid>
        </div>
        <ScrollingFooter />
    </div>
    );
  }
}

export default connect(mapStoreToProps)(Rules);