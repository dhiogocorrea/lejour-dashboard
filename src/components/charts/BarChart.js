import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";


const BarChart = ({ chartName, title, data }) => {

  const [options, setOptions] = useState('')
  const [series, setSeries] = useState('')

  useEffect(() => {
    setSeries([
    {
      name: chartName,
      data: data.values,
    }
  ])

    setOptions({
      chart: {
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'striaght' },
      title: { text: title },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: { categories: data.labels },
      colors: ['#68BFB7']
    })
  }, [title, data]);

  return (
    <div>
    {
      options && <Chart options={options} series={series} type="bar" height={450}></Chart>
    }
    </div>
  );
}

export default BarChart;