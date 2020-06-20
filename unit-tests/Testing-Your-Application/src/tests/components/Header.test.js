import React from "react";
import {shallow, mount} from 'enzyme';
import Header from '../../components/Header'
import {Router, MemoryRouter} from "react-router-dom";

it('should Match Snapshot', () => {
    const wrapper = shallow(
        <MemoryRouter>
            <Header/>
        </MemoryRouter>
    )

    expect(wrapper.html()).toMatchSnapshot()
})

it('should render Header correctly', () => {
    const wrapper = shallow(<Header/>)

    expect(wrapper.find('h1').length).toBe(1)
    expect(wrapper.find('h1').text()).toBe('Expensify')
})
