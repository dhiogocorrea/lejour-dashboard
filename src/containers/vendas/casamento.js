import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveData } from '../../core/store/vendas/vendasPorCasamentoSlice';
import TreeMapChart from '../../components/charts/TreeMapChart';

const VendasCasamento = params => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState()
  const data = useSelector(({vendasPorCasamento}) => vendasPorCasamento.data)

  useEffect(() => {
    if (params !== undefined) {
      dispatch(retrieveData(params.filter))
      setTitle(params.title + ' por casamento')
    }
  }, [params])

  return (
    <TreeMapChart
      title = {title}
      data = {data}
    />
  );
}

export default VendasCasamento;