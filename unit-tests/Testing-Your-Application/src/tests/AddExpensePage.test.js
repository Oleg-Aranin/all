import React from "react";
import {mount, shallow} from 'enzyme'
import {AddExpensePage} from '../../src/components/AddExpensePage'
import expenses from "./fixtures/expenses";

let addExpense, history, wrapper

beforeEach(() => {
    addExpense = jest.fn()
    history = {push: jest.fn()}
    wrapper = shallow(<AddExpensePage history={history} addExpense={addExpense}/>)
})

it('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

it('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1])
})
