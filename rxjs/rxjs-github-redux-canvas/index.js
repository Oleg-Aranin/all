import {EMPTY, fromEvent, Subject} from "rxjs";
import {ajax} from "rxjs/ajax";
import {
    catchError,
    debounceTime, distinctUntilChanged, filter,
    map, mergeMap,
    pairwise,
    pluck,
    scan,
    shareReplay,
    startWith,
    switchMap,
    takeUntil, tap,
    withLatestFrom
} from "rxjs/operators";


// ===================================  github  ================================

const url = 'https://api.github.com/search/users?q='

const search = document.getElementById('search')
const result = document.getElementById('result')


const search$ = fromEvent(search, 'input').pipe(
    pluck('target', 'value'),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(() => result.innerHTML = ''),
    filter(v => v.trim()),
    switchMap(value => {
        return ajax.getJSON(url + value).pipe(
            pluck('items'),
            mergeMap(item => item),
            catchError(() => EMPTY)
        )
    }),
)

search$.subscribe(v => {
    console.log(v)
    const html = ` <img src="${v.avatar_url}" alt="">
            <span class="title">${v.login}</span>
            <a href="${v.html_url}" target="_blank">Open GitHub</a>
            <br>
`

    result.insertAdjacentHTML('beforeend', html)
})


// ======================================  redux  =================================
/*
const initialState = {
    counter: 0
}

const pre = document.querySelector('pre')

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {...state, counter: state.counter + 1}
        case 'DECREMENT':
            return {...state, counter: state.counter - 1}
        case 'ADD':
            return {...state, counter: state.counter + action.payload}
        default:
            return state
    }
}

function createStore(rootReducer) {
    const subj$ = new Subject()

    const store$ = subj$.pipe(
        startWith({type: '__INIT__'}),
        scan(rootReducer, undefined),
        shareReplay(1)
    )

    store$.dispatch = action => subj$.next(action)

    return store$
}

const store$ = createStore(reducer)

store$.subscribe(state => {
    pre.innerHTML = JSON.stringify(state, null, 2)
})

document.getElementById('increment').addEventListener('click', () => {
store$.dispatch({type: 'INCREMENT'})
})

document.getElementById('decrement').addEventListener('click', () => {
    store$.dispatch({type: 'DECREMENT'})
})

document.getElementById('add').addEventListener('click', () => {
    store$.dispatch({type: 'ADD', payload: 10})
})

 */


// ==========================================   рисование на canvas  ====================
/*
const canvas = document.querySelector('canvas')
const range = document.getElementById('range')
const color = document.getElementById('color')

const ctx = canvas.getContext('2d')
const rect = canvas.getBoundingClientRect()
const scale = window.devicePixelRatio

canvas.width = rect.width * scale
canvas.height = rect.height * scale
ctx.scale(scale, scale)

const mouseMove$ = fromEvent(canvas, 'mousemove')
const mouseDown$ = fromEvent(canvas, 'mousedown')
const mouseUp$ = fromEvent(canvas, 'mouseup')
const mouseOut$ = fromEvent(canvas, 'mouseout')

const createInputStream = elem => {
    return fromEvent(elem, 'input').pipe(
        pluck('target', 'value'),
        startWith(elem.value)
    )
}

const lineWidth$ = createInputStream(range)
const strokeStyle$ = createInputStream(color)

mouseDown$.pipe(
    withLatestFrom(lineWidth$, strokeStyle$),
    switchMap(([_, lineWidth, strokeStyle]) => {
        return mouseMove$.pipe(
            map(e => ({
                x: e.offsetX,
                y: e.offsetY,
                lineWidth,
                strokeStyle,
            })),
            pairwise(),
            takeUntil(mouseUp$),
            takeUntil(mouseOut$),
        )
    })
).subscribe(([from, to]) => {
    ctx.lineWidth = from.lineWidth
    ctx.strokeStyle = from.strokeStyle

    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
})

 */
