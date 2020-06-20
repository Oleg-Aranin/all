import {addExpense, removeExpense, editExpense} from '../../actions/expenses'

it('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

it('should edit', () => {
    const action = editExpense('123abc', {node: 'New value'})
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            node: 'New value'
        }
    })
})

it('should add {}', () => {
    const action = addExpense()

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
})


it('should add', () => {
    const data = {
        description: 'D',
        note: '5',
        amount: 0,
        createdAt: 10
    }
    const action = addExpense(data)

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...data}
        })
    })

