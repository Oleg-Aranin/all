import React from 'react';
import {shallow} from 'enzyme'
import expenses from "../fixtures/expenses";
import {EditExpensePage} from '../../components/EditExpensePage'

let editExpense, removeExpense, history, wrapper

beforeEach(() => {
    editExpense = jest.fn()
    removeExpense = jest.fn()
    history = {push: jest.fn()}
    wrapper = shallow(<EditExpensePage
        editExpense={editExpense}
        removeExpense={removeExpense}
        history={history}
        expense={expenses[2]}
    />)
})

it('should render snapshot', () => {
    expect(wrapper).toMatchSnapshot()
})

it('should handle editExpense spies', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2])
})

it('should handle removeExpense spies', () => {
    wrapper.find('button').prop('onClick')()
    wrapper.find('button').simulate('click')

    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[2].id})

})
