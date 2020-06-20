
import {
    catchError,
    debounceTime,
    delay,
    filter,
    ignoreElements,
    map,
    mapTo, pluck,
    switchMap,
    takeUntil,
    tap, withLatestFrom
} from "rxjs/operators";
import {
    CANCEL,
    FETCH_DATA,
    fetchFailed,
    fetchFulfilled,
    RANDOM,
    reset,
    SEARCH,
    setStatus
} from "../reducers/beersActions";
import {ofType} from 'redux-observable'
import {concat, EMPTY, forkJoin, fromEvent, merge, of, race} from 'rxjs'

const search = (apiBase, perPage, term) => `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;

const random = (apiBase) => `${apiBase}/random`

export function fetchBeersEpic(action$, state$, {getJSON, document}) {

    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim()),
        withLatestFrom(state$.pipe(pluck('config',))),
        switchMap(([{payload}, config]) => {

            const ajax$ = getJSON(search(config.apiBase, config.perPage, payload)).pipe(
                map(resp => fetchFulfilled(resp)),
                catchError(err => {
                    return  of(fetchFailed(err.response.message))
                })
            )

            const blocker$ = merge(
                action$.pipe(ofType(CANCEL)),
                fromEvent(document, 'keyup').pipe(
                    filter(e => e.key === 'Escape' || e.key === 'Esc')
                )
            ).pipe(mapTo(reset()))

            return concat(
                of(setStatus('pending')),
                race(ajax$, blocker$)
            )
        }),
    )
}

//====================================================  делаем много запросов  =====================
// export function fetchBeersEpic(action$, state$) {
//
//     return action$.pipe(
//         ofType(RANDOM),
//         debounceTime(500),
//         withLatestFrom(state$.pipe(pluck('config',))),
//         switchMap(([{payload}, config]) => {
//
//             const reqs = [...Array(config.perPage)].map(() => {
//                 return ajax.getJSON(random(config.apiBase)).pipe(pluck(0))
//             })
//
//             const ajax$ = forkJoin(reqs).pipe(
//                 map(resp => fetchFulfilled(resp)),
//                 catchError(err => {
//                     return of(fetchFailed(err.response.message))
//                 })
//             )
//
//             const blocker$ = merge(
//                 action$.pipe(ofType(CANCEL)),
//                 fromEvent(document, 'keyup').pipe(
//                     filter(e => e.key === 'Escape' || e.key === 'Esc')
//                 )
//             ).pipe(mapTo(reset()))
//
//             return concat(
//                 of(setStatus('pending')),
//                 race(ajax$, blocker$)
//             )
//         }),
//     )
// }


//
// export function fetchBeersEpic(action$, state$) {
//
//     return action$.pipe(
//         ofType(SEARCH),
//         debounceTime(500),
//         filter(({payload}) => payload.trim() !== ''),
//         withLatestFrom(state$.pipe(pluck('config'))),
//         switchMap(([{payload}, config]) => {
//
//             const ajax$ = ajax.getJSON(search(config.apiBase, config.perPage, payload)).pipe(
//                 map(resp => fetchFulfilled(resp)),
//                 catchError(err => {
//                     return of(fetchFailed(err.response.message))
//                 })
//             )
//
//             const blocker$ = merge(
//                 action$.pipe(ofType(CANCEL)),
//                 fromEvent(document, 'keyup').pipe(
//                     filter(e => e.key === 'Escape' || e.key === 'Esc')
//                 )
//             ).pipe(mapTo(reset()))
//
//             return concat(
//                 of(setStatus('pending')),
//                 race(ajax$, blocker$)
//             )
//         })
//     )
// }
