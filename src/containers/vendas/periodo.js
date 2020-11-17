import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveData } from '../../core/store/vendas/vendasPorPeriodoSlice';
import BarChart from '../../components/charts/BarChart'

const VendasPeriodo = params => {
  const dispatch = useDispatch()
  const data = useSelector(({vendasPorPeriodo}) => vendasPorPeriodo.data)

  useEffect(() => {
    if (params !== undefined) {
      dispatch(retrieveData(params.filter))
    }
  }, [params])

  return (
    <BarChart
      title = {params.title}
      data = {data}
    />
  );
}

export default VendasPeriodo;