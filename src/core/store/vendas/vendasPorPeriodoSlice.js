import { createSlice } from '@reduxjs/toolkit'
import vendasService from '../../services/vendasService'
import { filterDate } from '../../utils/dateUtils'

const vendasPorPeriodoSlice = createSlice({
  name: 'vendasPorPeriodo',
  initialState: {
    data: {},
    dataComissao: {},
  },
  reducers: {
    getData: (state, { payload }) => {
      state.data = payload
    },
    getDataComissao: (state, { payload }) => {
      state.dataComissao = payload
    },
  }
});

const { actions, reducer } = vendasPorPeriodoSlice
export const { getData, getDataComissao } = actions

export const retrieveData = (filter, isComissao=false) => async dispatch => {
  if (filter !== undefined) {
    let vendasAll = await vendasService.getData();
    var filtered = vendasAll.filter(x =>  filterDate(x.CREATED_AT, filter))
      .reduce((p, c) => {
      var date = c.CREATED_AT

      if (filter === 'month' || filter === 'week') date = date.substring(0, 10)
      else if (filter === 'year' || filter.includes('months')) date = date.substring(0, 7)
      else if (filter === 'day') date = date.substring(12, 17) 
      
      if (!p.hasOwnProperty(date)) {
        p[date] = isComissao ? parseInt(c.AMOUNT) - parseInt(c.VENDOR_AMOUNT) : parseInt(c.AMOUNT);
      }
      p[date] += isComissao ? parseInt(c.AMOUNT) - parseInt(c.VENDOR_AMOUNT) : parseInt(c.AMOUNT);

      return p;
    }, {});

    var final = {
      'labels': Object.keys(filtered),
      'values': Object.values(filtered),
    }

    if (!isComissao) {
      dispatch(getData(final))
    } else {
      dispatch(getDataComissao(final))
    }
  }
}


export default reducer
