import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

let LineChart = ({ dataToShow }) => {


  let timeStamps = dataToShow.map(a => a.timestamp)
  let eCMPs = dataToShow.map(a => {
    return (a.revenue / a.impressions) * 1000;
  })

  const data = {
    labels: timeStamps,
    datasets: [
      {
        label: 'eCPM',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'rgba(0,0,0,0.5)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,0,0,0.5)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,0,0,0.5)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: eCMPs
      }
    ]
  };
  return (
    // <div className='lineChart'>
    <div>
      <Line
        data={data}
        width={100}
        height={400}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  )
}

export default LineChart;