import React from "react";
import {shallow} from 'enzyme'
import NotFoundPage from '../../components/NotFoundPage'
import {MemoryRouter} from "react-router-dom";


describe('NotFoundPage', () => {
    it('should render NotFoundPage correctly', () => {
        const wrapper = shallow(
            <MemoryRouter>
                <NotFoundPage/>
            </MemoryRouter>
        )

        expect(wrapper.html()).toMatchSnapshot()
    })


})
