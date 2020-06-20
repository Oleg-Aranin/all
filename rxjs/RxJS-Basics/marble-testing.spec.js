// ===================================  marble  testing  =====================================

// '_' each dash represents a frame of virtual time

// [a-z0-9]' represents emitted values, ex. -a--b-

// '#' represents errors ex. -a--b-#

// '()' represents synchronous groupings, ex. -(abc)--

// '|' represents completion ex. (abc|)

// '^' represents subscribe

// '!' represents unsubscribe

// '#' represents error

import {TestScheduler} from 'rxjs/testing';
import {catchError, delay, map, mergeMap, take, toArray} from "rxjs/operators";
import {from, interval, of, throwError} from "rxjs";
import {breweryTypeahead} from "./src/part-2";

describe('Marble testing in RxJs', () => {

    let testScheduler

    beforEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected)
        })


        it('should convert ASCII diagrams into observables', () => {
            testScheduler.run(helpers => {
                const {cold, expectObservable} = helpers

                const source$ = cold('--a-b---c')
                const expected = '--a-b---c'

                expectObservable(source$).toBe(expected)
            })
        })


        it('should alow configuration of emitted values', () => {
            testScheduler.run(helpers => {
                const {cold, expectObservable} = helpers

                const source$ = cold('--a-b---c', {a: 1, b: 2, c: 3})
                const final$ = source$.pipe(map(val => val * 10))
                const expected = '--a-b---c'

                expectObservable(final$).toBe(expected, {a: 10, b: 20, c: 30})
            })
        })


        it('should let you identify subscription points', () => {
            testScheduler.run(helpers => {
                const {cold, expectObservable, expectSubscriptions} = helpers

                const source$ = cold('-a---b-|')
                const sourceTwo$ = cold('-c---d-|')
                const final$ = concat(source$, sourceTwo$)

                const expected = '-a---b--c---d-|'
                const sourceOneExpectedSub = '^------!'
                const sourceTwoExpectedSub = '------^------!'

                expectObservable(final$).toBe(expected)
                expectSubscriptions(source$.subscriptions).toBe(sourceOneExpectedSub)
                expectSubscriptions(sourceTwo$.subscriptions).toBe(sourceTwoExpectedSub)
            })
        })


        it('should let you test hot observables', () => {
            testScheduler.run(helpers => {
                const {cold, hot, expectObservable, expectSubscriptions} = helpers

                const source$ = hot('--a-b-^-c')
                const final$ = source$.pipe(take(1))
                const expected = '--(c|)'

                expectObservable(final$).toBe(expected)
            })
        })


        it('should let you test synchronous operations', () => {
            testScheduler.run(helpers => {
                const {expectObservable} = helpers

                const source$ = from([1, 2, 3, 4, 5])
                const expected = '(abcde|)'

                expectObservable(source$).toBe(expected, {a: 1, b: 2, c: 3, d: 4, e: 5})
            })
        })


        it('should let you test asynchronous operations', () => {
            testScheduler.run(helpers => {
                const {expectObservable} = helpers

                const source$ = from([1, 2, 3, 4, 5])
                const final$ = source$.pipe(delay(200))
                const expected = '200ms (abcde|)'

                expectObservable(final$).toBe(expected, {a: 1, b: 2, c: 3, d: 4, e: 5})
            })
        })

// ===================== test #1
        it('should debounce input by 200ms', () => {
            testScheduler.run(helpers => {
                const {cold, expectObservable} = helpers
                const searchTerm = 'testing'
                const source$ = cold('a', {a: {target: {value: searchTerm}}})
                const final$ = source$.pipe(
                    breweryTypeahead({
                        getJSON: () => of(searchTerm).pipe(delay(300))
                    })
                )

                const expected = '500ms a'

                expectObservable(final$).toBe(expected, {a: searchTerm})
            })
        })

        it('should cancel active request if another value is emitted', () => {
            testScheduler.run(helpers => {
                const {cold, expectObservable} = helpers
                const searchTerm = 'testing'
                const source$ = cold('a 250ms b', {
                    a: {target: {value: 'first'}},
                    b: {target: {value: 'second'}},
                })
                const final$ = source$.pipe(
                    breweryTypeahead({
                        getJSON: () => of(searchTerm).pipe(delay(300))
                    })
                )

                const expected = '751ms b'

                expectObservable(final$).toBe(expected, {a: searchTerm})
            })
        })

        it('should not emit duplicate values ia a row', () => {
            testScheduler.run(helpers => {
                const {cold, expectObservable} = helpers
                const searchTerm = 'testing'
                const source$ = cold('a 250ms b', {
                    a: {target: {value: 'first'}},
                    b: {target: {value: 'first'}},
                })
                const final$ = source$.pipe(
                    breweryTypeahead({
                        getJSON: () => of(searchTerm).pipe(delay(300))
                    })
                )

                const expected = '500ms b'

                expectObservable(final$).toBe(expected, {a: searchTerm})
            })
        })

        it('should ignore ajax errors', () => {
            testScheduler.run(helpers => {
                const {cold, expectObservable} = helpers
                const searchTerm = 'testing'
                const source$ = cold('a 250ms b', {
                    a: {target: {value: 'first'}},
                    b: {target: {value: 'first'}},
                })
                const final$ = source$.pipe(
                    breweryTypeahead({
                        getJSON: () => throwError('error')
                    })
                )

                const expected = ''

                expectObservable(final$).toBe(expected)
            })
        })

        it('should let you test errors and error messages', () => {
            testScheduler.run(helpers => {
                const {expectObservable} = helpers
                const source$ = of({firstName: 'Brian', lastName: 'Smith'}, null).pipe(
                    map(o => `${o.firstName} ${o.lastName}`),
                    catchError(() => {
                        throw 'Invalid user!'
                    })
                )

                const expected = '(a#)'

                expectObservable(source$).toBe(expected, {a: 'Brian Smith'}, 'Invalid user!')
            })
        })

        it('should let you test snapshots of streams that do not complete', () => {
            testScheduler.run(helpers => {
                const {expectObservable} = helpers
                const source$ = interval(1000).pipe(
                    map(val => `${val + 1}sec`)
                )

                const expected = '1s a 999ms b 999ms c'
                const unsubscribe = '4s !'

                expectObservable(source$, unsubscribe).toBe(expected, {
                    a: '1sec',
                    b: '2sec',
                    c: '3sec'
                })
            })
        })
    })
})

describe('subscribe & assert tasting in RxJS', () => {

    it('should compare each emitted value', () => {
        const source$ = of(1, 2, 3)
        const final$ = source$.pipe(
            map(val => val * 10)
        )

        const expected = [10, 20, 30]
        let index = 0

        final$.subscribe(val => {
            expect(val).toEqual(expected[index])
            index++
        })

    })

    it('should compare emitted values on completion with toArray', () => {
        const source$ = of(1, 2, 3)
        const final$ = source$.pipe(
            map(val => val * 10),
            toArray()
        )

        const expected = [10, 20, 30]

        final$.subscribe(val => {
            expect(val).toEqual(expected)
        })

    })

    it('should let you test async operations with done callback', done => {
        const source$ = of('Ready', 'Set', 'Go!').pipe(
            mergeMap((message, index) => of(message).pipe(
                delay(index * 1000)
            )),
        )

        const expected = ['Ready', 'Set', 'Go!']
        let index = 0

        source$.subscribe(val => {
            expect(val).toEqual(expected[index])
            index++
        }, null, done)

    })

    it('should let you test errors and error message', done => {
        const source$ = of({first: 'Brian', last: 'Smith'}, null).pipe(
            map(o => `${o.last} ${o.first}`),
            catchError(() => {
                throw 'Invalid response!'
            })
        )

        const expected = ['Smith Brian', 'Invalid response!']
        let actual = []
        let index = 0

        source$.subscribe({
            next: value => {
                actual.push(value)
                index++
            },
            error: err => {
                actual.push(err)
                expect(actual).toEqual(expected)
            }
        })

    })


})
