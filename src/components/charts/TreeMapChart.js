import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";


const TreeMapChart = ({ title, data }) => {

  const [options, setOptions] = useState('')
  const [series, setSeries] = useState('')

  useEffect(() => {

    let seriesAux = []

    if(data.values !== undefined) {
      data.values.forEach((value, i) => {
        seriesAux.push({x: data.labels[i], y: value})
      })
    
      setSeries([{ data: seriesAux }])
      setOptions({
        options: {
          legend: {
            show: false
          },
          chart: {
            height: 450,
            type: 'treemap'
          },
          title: {
            text: title
          },
        },
      })
    }
  }, [title, data]);

  return (
    <div>
    {
      series && <Chart options={options} series={series} type="treemap" height={450}></Chart>
    }
    </div>
  );
}

export default TreeMapChart;