import { createSlice } from '@reduxjs/toolkit'
import vendasService from '../../services/vendasService'
import { filterDate } from '../../utils/dateUtils'
import moment from 'moment'

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

export const retrieveData = (filter, isComissao=false, applyRegression=false) => async dispatch => {
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


    var labels = Object.keys(filtered)
    var values = Object.values(filtered)

    if (applyRegression) {
      let lastdate = moment(labels[labels.length - 1])
      
      let nextdate = null
      if (filter === 'month') {
        nextdate = lastdate.add(1, 'months')
      } else if (filter === 'three_months') {
        nextdate = lastdate.add(3, 'months')
      } else if (filter === 'six_months') {
        nextdate = lastdate.add(6, 'months')
      } else if (filter === 'day') {
        nextdate = lastdate.add(1, 'days')
      } else if (filter === 'year') {
        nextdate = lastdate.add(1, 'years')
      } else if (filter === 'week') {
        nextdate = lastdate.add(1, 'weeks')
      }

      let avg = 0

      if (values.length > 0) {
        for (var v in values) {
          avg += values[v];
        }

        avg = parseInt(avg/values.length)
      
        if (filter === 'month' || filter === 'week') nextdate = nextdate.format('YYYY-MM-DD')
        else if (filter === 'year' || filter.includes('months')) nextdate = nextdate.format('YYYY-MM')
        else if (filter === 'day') nextdate = nextdate.format('HH:mm')
        
        labels.push(nextdate)
        values.push(avg)
      }
    }

    var final = {
      'labels': labels,
      'values': values,
    }

    if (!isComissao) {
      dispatch(getData(final))
    } else {
      dispatch(getDataComissao(final))
    }
  }
}


export default reducer
