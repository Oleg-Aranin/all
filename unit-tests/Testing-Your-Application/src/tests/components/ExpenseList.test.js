import React from "react";
import {shallow} from 'enzyme'
import {ExpenseList} from '../../components/ExpenseList'
import expenses from "../fixtures/expenses";
import {MemoryRouter} from "react-router-dom";


describe('ExpenseList', () => {
    it('should render ExpenseList with expenses', () => {
        const wrapper = shallow(
            <MemoryRouter>
                <ExpenseList expenses={expenses}/>
            </MemoryRouter>
        )
        expect(wrapper.html()).toMatchSnapshot()

    })

    it('should render ExpenseList with empty message', () => {
        const wrapper = shallow(
            <MemoryRouter>
                <ExpenseList expenses={[]}/>
            </MemoryRouter>
        )
        expect(wrapper.html()).toMatchSnapshot()

    })

})
