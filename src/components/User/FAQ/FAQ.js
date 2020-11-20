import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid, Typography } from "@material-ui/core";
import { Document, Page, pdfjs } from 'react-pdf';
import '../Rules/Rules.css';

class FAQ extends Component {
  state = {
    heading: 'FAQ',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_FAQ' });
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  }

  render() {
    return (
      <div>
         <Grid container direction="column" alignItems="center" className="rulesFaq">
             <Grid item>
              <div className='userFaqHeader'>
                <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h4'>FAQ</Typography>
              </div>
             </Grid>
            {this.props.store.faq.map((item, i) => 
                <Document file={item.file_url} key={i}> 
                  <Page pageNumber={1} />
                </Document>
                  )}
        </Grid>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(FAQ);