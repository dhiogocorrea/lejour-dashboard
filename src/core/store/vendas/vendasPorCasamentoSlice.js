import { createSlice } from '@reduxjs/toolkit'
import vendasService from '../../services/vendasService'
import { filterDate } from '../../utils/dateUtils'

const vendasPorCasamentoSlice = createSlice({
  name: 'vendasPorCasamento',
  initialState: {
    data: {},
  },
  reducers: {
    getData: (state, { payload }) => {
      state.data = payload
    },
  }
});

const { actions, reducer } = vendasPorCasamentoSlice
export const { getData } = actions

export const retrieveData = (filter) => async dispatch => {
  if (filter !== undefined) {
    let vendasAll = await vendasService.getData();
    var filtered = vendasAll.filter(x =>  filterDate(x.CREATED_AT, filter))
      .reduce((p, c) => {
      var wedding = c.WEDDING_ID

      if (!p.hasOwnProperty(wedding)) {
        p[wedding] = parseInt(c.AMOUNT);
      }
      p[wedding] += parseInt(c.AMOUNT);

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
