import {TestScheduler} from "rxjs/testing";
import {cancel, fetchFailed, fetchFulfilled, reset, search, setStatus} from "../../reducers/beersActions";
import {initialState} from "../../reducers/configreducer";
import {fetchBeersEpic} from "../fetchBeers";
import {of} from "rxjs";

it('produces correct actions (reset)', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
    })

    testScheduler.run(({hot, cold, expectObservable}) => {
        const action$ = hot('a 500ms -b', {
            a: search('ship'),
            b: cancel()
        });
        const state$ = of({
            config: initialState
        });
        const dependencies = {
            getJSON: (url) => {
                return cold('---a')
            }
        }

        const output$ = fetchBeersEpic(action$, state$, dependencies)

        expectObservable(output$).toBe('500ms a-b', {
            a: setStatus('pending'),
            b: reset()
        })
    })
})

it('produces correct actions (success)', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
    })

    testScheduler.run(({hot, cold, expectObservable}) => {
        const action$ = hot('a', {
            a: search('ship')
        });
        const state$ = of({
            config: initialState
        });
        const dependencies = {
            getJSON: (url) => {
                return cold('-a', {
                    a: [{name: 'Beer 1'}]
                })
            }
        }

        const output$ = fetchBeersEpic(action$, state$, dependencies)

        expectObservable(output$).toBe('500ms ab', {
            a: setStatus('pending'),
            b: fetchFulfilled([{name: 'Beer 1'}])
        })
    })
})

it('produces correct actions (error)', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
    })

    testScheduler.run(({hot, cold, expectObservable}) => {
        const action$ = hot('a', {
            a: search('ship')
        });
        const state$ = of({
            config: initialState
        });
        const dependencies = {
            getJSON: (url) => {
                return cold('-#', null, {
                    response: {
                       message: 'oops!'
                    }
                })
            }
        }

        const output$ = fetchBeersEpic(action$, state$, dependencies)

        expectObservable(output$).toBe('500ms ab', {
            a: setStatus('pending'),
            b: fetchFailed('oops!')
        })
    })
})
