import expensesReducer from '../../reducers/expenses'
import expensesTest from '../fixtures/expenses'


it('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual([])
})

it('should remove expense by id', () => {
const action = {
    type: 'REMOVE_EXPENSE',
    id: expensesTest[1].id
}
    const state = expensesReducer(expensesTest, action)
    expect(state).toEqual([expensesTest[0], expensesTest[2]])
})

it('should not remove expense if id not found', () => {
const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
}
    const state = expensesReducer(expensesTest, action)
    expect(state).toEqual(expensesTest)
})

it('should add an expense', () => {
const expense = {
    id: '1008',
    description: 'Laptop',
    note: '',
    amount: 19500,
    createdAt: 2300
}
const action = {
    type: 'ADD_EXPENSE',
    expense
}
    const state = expensesReducer(expensesTest, action)
    expect(state).toEqual([...expensesTest, expense])
})

it('should edit an expense', () => {
const amount = 12200
const action = {
    type: 'EDIT_EXPENSE',
    id: expensesTest[1].id,
    updates: {
        amount
    }
}
    const state = expensesReducer(expensesTest, action)
    expect(state[1].amount).toEqual(amount)
})

it('should not edit an expense if id not found', () => {
const amount = 12200
const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
        amount
    }
}
    const state = expensesReducer(expensesTest, action)
    expect(state).toEqual(expensesTest)
})
