import React from "react";
import TestComponent, {} from "./TestComponent";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});
const reactMock = require('react')

const setHookState = (newState) => jest.fn().mockImplementation((state) => [
    newState,
    (newState) => {
    }
])

describe('ComponentWithHook component', () => {
    it('should render itself', () => {
        reactMock.useState = setHookState({
            count: 3,
            setCount: false
        })
        const wrapper = shallow(<TestComponent/>)
        expect(wrapper.find('h3').length).toEqual(1)
        const h3 = wrapper.find('h3').get(0)
        expect(h3.props.children.count).toEqual(3)
    })
})


