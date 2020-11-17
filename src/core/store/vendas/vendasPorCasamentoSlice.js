import { createSlice } from '@reduxjs/toolkit'
import vendasService from '../../services/vendasService'
import { filterDate } from '../../utils/dateUtils'

const vendasPorCasamentoSlice = createSlice({
  name: 'vendasPorCasamento',
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

const { actions, reducer } = vendasPorCasamentoSlice
export const { getData, getDataComissao } = actions

export const retrieveData = (filter, isComissao=false) => async dispatch => {
  if (filter !== undefined) {
    let vendasAll = await vendasService.getData();
    var filtered = vendasAll.filter(x =>  filterDate(x.CREATED_AT, filter))
      .reduce((p, c) => {
      var wedding = c.WEDDING_ID

      if (!p.hasOwnProperty(wedding)) {
        p[wedding] = isComissao ? parseInt(c.AMOUNT) - parseInt(c.VENDOR_AMOUNT) : parseInt(c.AMOUNT);
      }
      p[wedding] += isComissao ? parseInt(c.AMOUNT) - parseInt(c.VENDOR_AMOUNT) : parseInt(c.AMOUNT);

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
