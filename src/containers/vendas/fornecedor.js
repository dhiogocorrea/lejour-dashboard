import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveData } from '../../core/store/vendas/vendasPorFornecedorSlice';
import TreeMapChart from '../../components/charts/TreeMapChart'

const VendasFornecedor = params => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState()

  const data = useSelector(({vendasPorFornecedor}) => vendasPorFornecedor.data)

  useEffect(() => {
    if (params !== undefined) {
      dispatch(retrieveData(params.filter))
      setTitle(params.title + ' por fornecedor')
    }
  }, [params])

  return (
    <TreeMapChart
      title = {title}
      data = {data}
    />
  );
}

export default VendasFornecedor;