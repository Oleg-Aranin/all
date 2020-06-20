import React from "react";
import {shallow, mount} from 'enzyme'
import moment from "moment";
import ExpenseForm from '../../components/ExpenseForm'
import expenses from "../fixtures/expenses";

describe('ExpenseForm', () => {

    it('should render ExpenseForm correctly', () => {
        const wrapper = shallow(<ExpenseForm/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('should render ExpenseForm with expense data', () => {
        const wrapper = shallow(<ExpenseForm expenses={expenses[1]}/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('should tender error for invalid form submission', () => {
        const wrapper = shallow(<ExpenseForm/>)
        expect(wrapper).toMatchSnapshot()
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {
            }
        })
        expect(wrapper.state('error').length).toBeGreaterThan(0)
        expect(wrapper).toMatchSnapshot()
    })

    it('should set description on input change', () => {
        const value = 'New value'
        const wrapper = shallow(<ExpenseForm/>)
        wrapper.find('input').at(0).simulate('change', {
            target: {value}
        })
        expect(wrapper.state('description')).toBe(value)
    })

    it('should set note on textarea change', () => {
        const value = 'New note value'
        const wrapper = shallow(<ExpenseForm/>)
        wrapper.find('textarea').simulate('change', {
            target: {value}
        })
        expect(wrapper.state('note')).toBe(value)
    })

    it('should set amount if valid input', () => {
        const value = '23.50'
        const wrapper = shallow(<ExpenseForm/>)
        wrapper.find('input').at(1).simulate('change', {
            target: {value}
        })
        expect(wrapper.state('amount')).toBe(value)
    })

    it('should not set amount if invalid input', () => {
        const value = '12.122'
        const wrapper = shallow(<ExpenseForm/>)
        wrapper.find('input').at(1).simulate('change', {
            target: {value}
        })
        expect(wrapper.state('amount')).toBe('')
    })

    it('should call onSubmit prop for valid form submission', () => {
        const onSubmitSpy = jest.fn()
        const wrapper = shallow(<ExpenseForm
            expense={expenses[0]}
            onSubmit={onSubmitSpy}
        />)

        wrapper.find('form').simulate('submit', {
            preventDefault: () => {
            }
        })

        expect(wrapper.state('error')).toBe('')
        expect(onSubmitSpy).toHaveBeenCalledWith(
            {
                amount: expenses[0].amount,
                createdAt: expenses[0].createdAt,
                description: expenses[0].description,
                note: expenses[0].note,
            }
        )
    })

    it('should set new date on date change', () => {
        const now = moment()
        const wrapper = shallow(<ExpenseForm />)
        wrapper.find('SingleDatePicker').prop('onDateChange')(now)
        expect(wrapper.state('createdAt')).toEqual(now)
    })

    it('should set calendar focus on change', () => {
        const focused = true
        const wrapper = shallow(<ExpenseForm/>)
        wrapper.find('SingleDatePicker').prop('onFocusChange')({focused})
        expect(wrapper.state('calendarFocused')).toBe(focused)
    })
})

