import React from 'react';

const TestComponent = () => {
    const [count, setCount] = React.useState(0);

    return (
        <>
            <h3>{count}</h3>
            <span>
        <button id="count-up" type="button" onClick={() => setCount(count + 1)}>Count Up</button>
    <button id="count-down" type="button" onClick={() => setCount(count - 1)}>Count Down</button>
    <button id="zero-count" type="button" onClick={() => setCount(0)}>Zero</button>
</span>
        </>
    );
}

export default TestComponent;

// export const setHookState = (newState) => jest.fn().mockImplementation((state) => [
//     newState,
//     (newState) => {
//     }
// ])