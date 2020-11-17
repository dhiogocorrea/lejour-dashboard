import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";


const DonutChart = ({ title, data }) => {

  const [options, setOptions] = useState('')
  const [series, setSeries] = useState('')

  useEffect(() => {
    setSeries(data.values)
    setOptions({
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }],
      labels: data.labels,
      title: {
        text: title 
      },
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      }
    })
  }, [title, data]);

  return (
    <div>
    {
      series && <Chart options={options} series={series} type="donut" height={450}></Chart>
    }
    </div>
  );
}

export default DonutChart;