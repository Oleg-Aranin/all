import React from "react";
import {shallow} from 'enzyme'
import ExpenseListItem from '../../components/ExpenseListItem'
import expenses from "../fixtures/expenses";
import {MemoryRouter} from "react-router-dom";


describe('ExpenseListItem', () => {
    it('should render ExpenseListItem correctly', () => {
        const wrapper = shallow(
            <MemoryRouter>
                <ExpenseListItem {...expenses[0]}/>
            </MemoryRouter>
        )

        expect(wrapper.html()).toMatchSnapshot()
    })


})
