import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateChallenges.css';
import AdminNav from '../../Admin/AdminNav/AdminNav.js';

class CreateChallenges extends Component {
  state = {
    name: '',
    description: '',
    date: ''
  };

  handleInputChangeFor = (propertyName) => (event) => {
    console.log('inputs', [propertyName], event.target.value);
    
    this.setState({
      [propertyName]: event.target.value,
    });                
  };

  createChallenges = (event) => {
    console.log('challenge to create', this.state.name, this.state.description, this.state.date);
    
    event.preventDefault();

    this.props.dispatch({
      type: 'CREATE_CHALLENGES',
      payload: {
        name: this.state.name,
        description: this.state.description,
        date: this.state.date,
      },
    });
    this.setState({
            name: '',
            description: '',
            date: ''
        });
  }; // end createContest

  render() {
    return (
      <div>
      <h2>{this.state.heading}</h2>
      <form className="formPanel" onSubmit={this.createChallenges}>
      <h2>Add Challenge</h2>
      <div>
        <label htmlFor="name">
          Challenge Name:
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
      <label htmlFor="name">
          Description:
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            required
            onChange={this.handleInputChangeFor('description')}
          />
        </label>
      </div>
      <div>
        <label htmlFor="end_date">
          Challenge Date:
          <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChangeFor('date')}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Add Challenge" />
      </div>
    </form>
    </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateChallenges);