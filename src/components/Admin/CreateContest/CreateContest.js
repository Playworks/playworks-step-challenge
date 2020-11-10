import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateContest.css';

class CreateContest extends Component {
    state = {
        name: '',
        start_date: '',
        end_date: ''
      };
    
      createContest = (event) => {
        event.preventDefault();
    
        this.props.dispatch({
          type: 'CREATE_CONTEST',
          payload: {
            name: this.state.name,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
          },
        });
        this.setState({
                name: '',
                start_date: '',
                end_date: ''
            });
      }; // end createContest
    
      handleInputChangeFor = (propertyName) => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });                
      };

  render() {
    return (
      <div>
        <form className="formPanel" onSubmit={this.createContest}>
        <h2>Create Contest</h2>
        <div>
          <label htmlFor="name">
            Company Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              required
              onChange={this.handleInputChangeFor('name')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="start_date">
            Start Date:
            <input
                type="date"
                name="start_date"
                value={this.state.start_date}
                required
                onChange={this.handleInputChangeFor('start_date')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="end_date">
            End Date:
            <input
                type="date"
                name="end_date"
                value={this.state.end_date}
                onChange={this.handleInputChangeFor('end_date')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Create Contest" />
        </div>
      </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateContest);