import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveData } from '../../core/store/vendas/vendasPorCategoriaSlice';
import DonutChart from '../../components/charts/DonutChart'

const VendasCategoria = params => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState()
  const data = useSelector(({vendasPorCategoria}) => vendasPorCategoria.data)

  useEffect(() => {
    if (params !== undefined) {
      dispatch(retrieveData(params.filter))
      setTitle(params.title + ' por categoria')
    }
  }, [params])

  return (
    <DonutChart
      title = {title}
      data = {data}
    />
  );
}

export default VendasCategoria;
