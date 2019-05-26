import React, { Component } from 'react';

export default class Dates extends Component {
  state = {
    error: undefined
  }

  constructor() {
    super();
    this.startDateRef = React.createRef();
    this.endDateRef = React.createRef();
  }

  dateValidation = (startDate, endDate) => {

    if (startDate > endDate) {
      return false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let startDate = this.startDateRef.current.value;
    let endDate = this.endDateRef.current.value;
    let todaysDate = new Date();
    todaysDate = todaysDate.toLocaleDateString();
    let day = todaysDate.slice(0, 2);
    let month = todaysDate.slice(3, 5);
    let year = todaysDate.slice(6);
    todaysDate = parseInt(`${year}${month}${day}`, 10);


    let startDateday = startDate.slice(8);
    let startDatemonth = startDate.slice(5, 7);
    let startDateyear = startDate.slice(0, 4);
    startDate = parseInt(`${startDateyear}${startDatemonth}${startDateday}`, 10);

    let endDateday = endDate.slice(8);
    let endDatemonth = endDate.slice(5, 7);
    let endDateyear = endDate.slice(0, 4);
    endDate = parseInt(`${endDateyear}${endDatemonth}${endDateday}`, 10);

    if (startDate > todaysDate || endDate > todaysDate) {
      this.props.getError(' You cannot select the future dates');
      this.setState({ error: 'Please enter correct date' });
      this.startDateRef.current.value = '';
      this.endDateRef.current.value = '';
      return;
    }

    if (!this.dateValidation(startDate, endDate)) {
      this.props.getError(' Start date should be prior to end date');
      this.setState({ error: 'Please enter correct date' });
      this.startDateRef.current.value = '';
      this.endDateRef.current.value = '';
      return;
    }

    this.props.getTimeStamps({ startDate, endDate });
    // this.props.getError(undefined);
  }

  render() {
    const { error } = this.state;
    return (
      <div className='dates'>
        <h3 className='dateHeading'>Select Date Range</h3>
        <form className='dateForm' onSubmit={this.handleSubmit}>
          <div className='datesContainer'>
            <div className='datePicker'>
              <h3>Start date</h3>
              <input type="date" required ref={this.startDateRef} />
            </div>
            <div className='datePicker'>
              <h3>End date</h3>
              <input type="date" required ref={this.endDateRef} />
            </div>
          </div>
          <div>
            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    )
  }
};