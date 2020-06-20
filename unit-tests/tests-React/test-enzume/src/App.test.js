import React from "react";
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from "./App";
import Character from "./Character";

configure({
    adapter: new Adapter()
})

describe('<App />', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallow(<App/>)
    })

    it('Should render 3 items', () => {


        expect(wrapper.find(Character)).toHaveLength(3)
    })

    it('Should render 2 items dark', () => {
        wrapper.setProps({
            side: 'dark'
        })
        expect(wrapper.find(Character)).toHaveLength(2)
    })
})
