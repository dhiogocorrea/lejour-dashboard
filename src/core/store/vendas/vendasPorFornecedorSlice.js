import { createSlice } from '@reduxjs/toolkit'
import vendasService from '../../services/vendasService'
import { filterDate } from '../../utils/dateUtils'

const vendasPorFornecedorSlice = createSlice({
  name: 'vendasPorFornecedor',
  initialState: {
    data: {},
  },
  reducers: {
    getData: (state, { payload }) => {
      state.data = payload
    },
  }
});

const { actions, reducer } = vendasPorFornecedorSlice
export const { getData } = actions

export const retrieveData = (filter) => async dispatch => {
  if (filter !== undefined) {
    let vendasAll = await vendasService.getData();
    var filtered = vendasAll.filter(x =>  filterDate(x.CREATED_AT, filter))
      .reduce((p, c) => {
      var vendor = c.VENDOR_ID

      if (!p.hasOwnProperty(vendor)) {
        p[vendor] = parseInt(c.AMOUNT);
      }
      p[vendor] += parseInt(c.AMOUNT);

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
