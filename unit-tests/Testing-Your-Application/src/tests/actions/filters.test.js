import moment from 'moment'
import {setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter} from '../../actions/filters'

it('should generate set start date action object', () => {
const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

it('should generate set end date action object', () => {
const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})

it('should generate sort date action object', () => {
    expect(sortByAmount()).toEqual({type: 'SORT_BY_AMOUNT'})
})

it('should generate sort date ', () => {
    expect(sortByDate()).toEqual({type: 'SORT_BY_DATE'})
})

it('should generate set text ', () => {
    const text = 'Something in'
const action = setTextFilter(text)
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    })
})

it('should generate set text by default', () => {
const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})
