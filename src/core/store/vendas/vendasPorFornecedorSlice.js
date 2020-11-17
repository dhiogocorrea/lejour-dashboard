import { createSlice } from '@reduxjs/toolkit'
import vendasService from '../../services/vendasService'
import { filterDate } from '../../utils/dateUtils'

const vendasPorFornecedorSlice = createSlice({
  name: 'vendasPorFornecedor',
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

const { actions, reducer } = vendasPorFornecedorSlice
export const { getData, getDataComissao } = actions

export const retrieveData = (filter, isComissao=false) => async dispatch => {
  if (filter !== undefined) {
    let vendasAll = await vendasService.getData();
    var filtered = vendasAll.filter(x =>  filterDate(x.CREATED_AT, filter))
      .reduce((p, c) => {
      var vendor = c.VENDOR_ID

      if (!p.hasOwnProperty(vendor)) {
        p[vendor] = isComissao ? parseInt(c.AMOUNT) - parseInt(c.VENDOR_AMOUNT) : parseInt(c.AMOUNT);
      }
      p[vendor] += isComissao ? parseInt(c.AMOUNT) - parseInt(c.VENDOR_AMOUNT) : parseInt(c.AMOUNT);

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
