import { createSlice } from '@reduxjs/toolkit'
import vendasService from '../../services/vendasService'
import { filterDate } from '../../utils/dateUtils'
import moment from 'moment'


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

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = item[keyGetter];
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}

export const retrieveData = (filter, isComissao=false) => async dispatch => {
  if (filter !== undefined) {
    let vendasAll = await vendasService.getData();
    var filtered = vendasAll.filter(x =>  filterDate(x.CREATED_AT, filter));

    var grouped = groupBy(filtered, 'VENDOR_ID')

    var dataFinal = []
    grouped.forEach((v, k) => {
      var byDate = v.reduce((p, c) => {
        var date = c.CREATED_AT

        if (filter === 'month' || filter === 'week') date = date.substring(0, 10)
        else if (filter === 'year' || filter.includes('months')) date = date.substring(0, 7)
        else if (filter === 'day') date = date.substring(12, 17) 


        date = new Date(moment(date)).getTime()
        if (!p.hasOwnProperty(date)) {
          p[date] = isComissao ? parseInt(c.AMOUNT) - parseInt(c.VENDOR_AMOUNT) : parseInt(c.AMOUNT);
        }
        p[date] += isComissao ? parseInt(c.AMOUNT) - parseInt(c.VENDOR_AMOUNT) : parseInt(c.AMOUNT);
    
        return p;
      }, {});

      var valuePoints = []

      for (const [x, y] of Object.entries(byDate)) {
        valuePoints.push([parseFloat(x), y])
      }

      dataFinal.push({name: k, data: valuePoints})
    })

    if (!isComissao) {
      dispatch(getData(dataFinal))
    } else {
      dispatch(getDataComissao(dataFinal))
    }
  }
}


export default reducer
