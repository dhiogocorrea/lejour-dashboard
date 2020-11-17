import React, { useState } from 'react';
import RadioFilters from '../../components/filter/RadioFilters';
import VendasPeriodo from '../vendas/periodo';
import VendasCategoria from '../vendas/categoria';
import VendasCasamento from '../vendas/casamento';
import VendasFornecedor from '../vendas/fornecedor';

const ComissaoCharts = (params) => {
  const [selectedFilter, setSelectedFilter] = useState(params.filter)
  const [title, setTitle] = useState('Total de vendas no Ano')

  const filters = [
    {label: 'Dia', value: 'day', title: 'Total de vendas no último dia'},
    {label: 'Semana', value: 'week', title: 'Total de vendas na última semana'},
    {label: 'Mês', value: 'month', title: 'Total de vendas no último mês'},
    {label: '3 Meses', value: 'three_months', title: 'Total de vendas nos últimos 3 meses'},
    {label: '6 Meses', value: 'six_months', title: 'Total de vendas nos últimos 6 meses'},
    {label: 'Ano', value: 'year', title: 'Total de vendas no Ano'}
  ]

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setTitle(event.target.dataset.label)
    params.setFilterRadio(event.target.value)
  }



  console.log('COMISSAO')

  return (
    <div>
      <RadioFilters
        filters={filters}
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
      />
      <VendasPeriodo
        filter={selectedFilter}
        title={title}
        comissao={true}
      />
      <VendasCasamento
        filter={selectedFilter}
        title={title}
        comissao={true}
      />
      <VendasCategoria
        filter={selectedFilter}
        title={title}
        comissao={true}
      />
      <VendasFornecedor
        filter={selectedFilter}
        title={title}
        comissao={true}
      />
    </div>
  )
}

export default ComissaoCharts;