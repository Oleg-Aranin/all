import React from "react";
import {shallow} from 'enzyme'
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage'
import {MemoryRouter} from "react-router-dom";


describe('ExpenseDashboardPage', () => {
    it('should render ExpenseDashboardPage correctly', () => {
        const wrapper = shallow(
            <MemoryRouter>
                <ExpenseDashboardPage/>
            </MemoryRouter>
        )

        expect(wrapper.html()).toMatchSnapshot()
    })


})
