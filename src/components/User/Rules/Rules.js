import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import FAQ from '../../User/FAQ/FAQ';
import { Grid, Typography } from "@material-ui/core";
import Nav from '../../Nav/Nav.js';
import Footer from '../../Footer/Footer';
import {Document, Page, pdfjs} from 'react-pdf';



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
        <Footer />
    </div>
    );
  }
}

export default connect(mapStoreToProps)(Rules);
