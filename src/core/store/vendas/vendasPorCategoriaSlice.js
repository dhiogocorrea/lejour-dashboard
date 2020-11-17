import { createSlice } from '@reduxjs/toolkit'
import vendasService from '../../services/vendasService'
import { filterDate } from '../../utils/dateUtils'

const vendasPorCategoriaSlice = createSlice({
  name: 'vendasPorCategoria',
  initialState: {
    data: {},
  },
  reducers: {
    getData: (state, { payload }) => {
      state.data = payload
    },
  }
});

const { actions, reducer } = vendasPorCategoriaSlice
export const { getData } = actions

export const retrieveData = (filter) => async dispatch => {
  if (filter !== undefined) {
    let vendasAll = await vendasService.getData();
    var filtered = vendasAll.filter(x =>  filterDate(x.CREATED_AT, filter))
      .reduce((p, c) => {
      var category = c.VENDOR_CATEGORY

      if (!p.hasOwnProperty(category)) {
        p[category] = parseInt(c.AMOUNT);
      }
      p[category] += parseInt(c.AMOUNT);

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
