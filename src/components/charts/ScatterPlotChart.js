import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import moment from 'moment'

const ScatterPlotChart = ({ chartName, title, data }) => {

  const [options, setOptions] = useState('')
  const [series, setSeries] = useState('')

  useEffect(() => {
    if (data !== undefined) {
      console.log(data)

      setSeries(data)
      setOptions({
          chart: {
            height: 350,
            type: 'scatter',
            zoom: {
              type: 'xy'
            }
          },
          dataLabels: {
            enabled: false
          },
          title: {
            text: title
          },
          grid: {
            xaxis: {
              lines: {
                show: true
              }
            },
            yaxis: {
              lines: {
                show: true
              }
            },
          },
          xaxis: {
            type: 'datetime',
          },
      })
    }
  }, [title, data]);

  return (
    <div>
    {
      options && <Chart options={options} series={series} type="scatter" height={450}></Chart>
    }
    </div>
  );
}

export default ScatterPlotChart;