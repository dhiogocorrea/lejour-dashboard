import { configureStore } from '@reduxjs/toolkit';
import vendasPorPeriodoReducer from './vendas/vendasPorPeriodoSlice'
import vendasPorCategoriaReducer from './vendas/vendasPorCategoriaSlice'
import vendasPorCasamentoReducer from './vendas/vendasPorCasamentoSlice'
import vendasPorFornecedorReducer from './vendas/vendasPorFornecedorSlice'

const store = configureStore({
  reducer: {
    vendasPorPeriodo: vendasPorPeriodoReducer,
    vendasPorCategoria: vendasPorCategoriaReducer,
    vendasPorCasamento: vendasPorCasamentoReducer,
    vendasPorFornecedor: vendasPorFornecedorReducer,
  },
});

export default store;
