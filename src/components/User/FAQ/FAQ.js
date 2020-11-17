import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import VerticalPlaceholder from '../../../images/placeholder-vertical.jpg';
import { Document, Page, pdfjs } from 'react-pdf';


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
        <Grid container direction="column" alignItems="center" className="rulesFaq">
            <Grid item>
                <h2>FAQ</h2>
            </Grid>
            {this.props.store.faq.map((item, i) => 
                <Document file={item.file_url} key={i}> 
                  <Page pageNumber={1} />
                </Document>
                  )}
        </Grid>
    );
  }
}

export default connect(mapStoreToProps)(FAQ);