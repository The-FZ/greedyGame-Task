import React, { Component } from 'react';
import Dates from '../Dates';
import LineChart from '../LineChart';
import Table from '../Table';
import { toast } from 'react-toastify';


export default class Main extends Component {
  state = {
    data: [],
    dataToShow: [],
    isDisconnected: false,
    error: undefined,
  }

  // componentWillMount = async () => {
  //   let _response = await fetch('http://www.mocky.io/v2/5cd04a20320000442200fc10');
  //   let response = await _response.json();
  //   let _data = response.map(item => {
  //     let itemday = item.timestamp.slice(8);
  //     let itemmonth = item.timestamp.slice(5, 7);
  //     let itemyear = item.timestamp.slice(0, 4);
  //     let itemDate = parseInt(`${itemyear}${itemmonth}${itemday}`, 10);
  //     return {
  //       ...item,
  //       date: itemDate
  //     }
  //   });

  //   this.setState({
  //     data: _data
  //   });
  // }

  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }


  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(
        async () => {
          let _response = await fetch('http://www.mocky.io/v2/5cd04a20320000442200fc10');
          let response = await _response.json();
          let _data = response.map(item => {
            let itemday = item.timestamp.slice(8);
            let itemmonth = item.timestamp.slice(5, 7);
            let itemyear = item.timestamp.slice(0, 4);
            let itemDate = parseInt(`${itemyear}${itemmonth}${itemday}`, 10);
            return {
              ...item,
              date: itemDate
            }
          });

          this.setState({ isDisconnected: false, data: _data, error: undefined });
          return clearInterval(webPing)

        }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true });
  }



  getTimeStamps = ({ startDate, endDate }) => {
    let { data } = this.state;
    let _data = data.filter(a => {
      return a.date >= startDate && a.date <= endDate
    });

    if (_data.length === 0) {
      this.setState({ error: 'No data for this date range', dataToShow: [] });
    }
    if (_data.length > 0) {
      this.setState({
        dataToShow: _data, error: undefined
      });
    }
  }

  getError = error => {
    this.setState({ error })
  }

  render() {
    const { dataToShow, isDisconnected, error } = this.state;
    if (isDisconnected) {
      return (
        <div className='internetOffline'>
          Device offline.
        </div>
      )
    }

    return (
      <div>
        <Dates getTimeStamps={this.getTimeStamps} getError={this.getError} />
        {dataToShow.length > 0 && <div>
          <h3>Data Visualisation</h3>
          <div className='chartTableContainer'>
            {dataToShow.length > 0 && <LineChart dataToShow={this.state.dataToShow} />}
            {dataToShow.length > 0 && <Table dataToShow={this.state.dataToShow} />}
          </div>
        </div>}
        {
          error && <div className='error'>
            {error}
          </div>
        }
      </div>
    )
  }
}