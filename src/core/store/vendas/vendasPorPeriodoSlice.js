import { createSlice } from '@reduxjs/toolkit'
import vendasService from '../../services/vendasService'
import { filterDate } from '../../utils/dateUtils'

const vendasPorPeriodoSlice = createSlice({
  name: 'vendasPorPeriodo',
  initialState: {
    data: {},
  },
  reducers: {
    getData: (state, { payload }) => {
      state.data = payload
    },
  }
});

const { actions, reducer } = vendasPorPeriodoSlice
export const { getData } = actions

export const retrieveData = (filter) => async dispatch => {
  if (filter !== undefined) {
    let vendasAll = await vendasService.getData();
    var filtered = vendasAll.filter(x =>  filterDate(x.CREATED_AT, filter))
      .reduce((p, c) => {
      var date = c.CREATED_AT

      if (filter === 'month' || filter === 'week') date = date.substring(0, 10)
      else if (filter === 'year' || filter.includes('months')) date = date.substring(0, 7)
      else if (filter === 'day') date = date.substring(12, 17) 
      
      if (!p.hasOwnProperty(date)) {
        p[date] = parseInt(c.AMOUNT);
      }
      p[date] += parseInt(c.AMOUNT);

      return p;
    }, {});

    var final = {
      'labels': Object.keys(filtered),
      'values': Object.values(filtered),
    }

    dispatch(getData(final))
  }
}


export default reducer
