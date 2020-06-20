import {
    Observable,
    combineLatest,
    merge,
    fromEvent,
    of,
    range,
    from,
    interval,
    timer,
    asyncScheduler,
    empty,
    forkJoin
} from "rxjs";
import {
    auditTime,
    catchError, concatMap, debounce,
    debounceTime, delay,
    distinctUntilChanged, distinctUntilKeyChanged, endWith, exhaustMap,
    filter, finalize, first,
    map,
    mapTo, mergeAll,
    mergeMap, mergeMapTo,
    pluck,
    reduce, sample, sampleTime, scan, startWith, switchMap, switchMapTo, take, takeUntil, takeWhile,
    tap, throttleTime, concat, withLatestFrom, share
} from 'rxjs/operators'
import {ajax} from "rxjs/ajax";


// 36) ==================================   calculator  =========================
function calculateMortgage(interest, loanAmount, loanLength) {
    const calculatedInterest = interest / 1200
    const total = loanAmount * calculatedInterest /
        (1 - (Math.pow(1 / (1 + calculatedInterest),
            loanLength)))

    return total.toFixed(2)
}

const saveResponse = value => {
return of(value).pipe(
    delay(1000)
)
}

const loadAmount = document.querySelector('#loanAmount')
const interest = document.querySelector('#interest')
const loanLength = document.querySelectorAll('.loanLength')
const expected = document.querySelector('#expected')

const createInputValueStream = elem => {
    return fromEvent(elem, 'input').pipe(
        map(event => parseFloat(event.target.value))
    )
}

const interest$ = createInputValueStream(interest)
const loadAmount$ = createInputValueStream(loadAmount)
const loanLength$ = createInputValueStream(loanLength)


 const calculation$ = combineLatest(
    interest$,
    loadAmount$,
    loanLength$
).pipe(
    map(([interest, loadAmount, loanLength]) => {
        return calculateMortgage(interest, loadAmount, loanLength)
    }),
    tap(console.log),
    filter(value => !isNaN(value)),
share()
)
     calculation$.subscribe(value => expected.innerHTML = value)

calculation$.pipe(
    mergeMap(value => saveResponse(value))
).subscribe()


// 35) ====================================  forkJoin обеденяет в массив или объект последние значения из стримов ==========================

// const numbers$ = of(1, 2, 3)
// const letters$ = of('a', 'b', 'c')
// const bbb$ = of('a', 'b', 'c', 10)
//
// forkJoin(
//     numbers$,
//     letters$.pipe(delay(3000)),
//     bbb$
// ).subscribe(console.log)
//
// forkJoin(
//     {
//         numbers: numbers$,
//         letters: letters$.pipe(delay(3000)),
//         b: bbb$,
//     }
// ).subscribe(console.log)
//
// const GITHUB_API_BASE = 'https://api.github.com'
//
// forkJoin(
//     {
//         user: ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex`),
//         repo: ajax.getJSON((`${GITHUB_API_BASE}/users/reactivex/repos`))
//     }
// ).subscribe(console.log)


// 34 ) ======================================  combineLatest обеденяет два последних стрима ===========================

// const keyup$ = fromEvent(document, 'keyup')
// const click$ = fromEvent(document, 'click')
//
// combineLatest(
//     keyup$,
//     click$
// ).subscribe(console.log)
//
//
// click$.pipe(
//     withLatestFrom(interval(1000))
// ).subscribe(console.log)
//
// const first1 = document.getElementById('first')
// const second1 = document.getElementById('second')
//
// const keyupAsValue = elem => {
//     return fromEvent(elem, 'keyup').pipe(
//         map(v => v.target.valueAsNumber)
//     )
// }
//
// combineLatest(
//     keyupAsValue(first1),
//     keyupAsValue(second1),
// ).pipe(
//     filter(([f, s]) => {
//         return !isNaN(f) && !isNaN(s)
//     }),
//     map(([f, s]) => f + s)
// ).subscribe(console.log)
//

// 33) =======================================  merge соединяет стримы ====================

// const keyup$ = fromEvent(document, 'keyup')
// const click$ = fromEvent(document, 'click')
//
// merge(
//     keyup$,
//     click$
// ).subscribe(console.log)
//
//
// const countdown = document.querySelector('.countdown')
// const pauseBtn = document.querySelector('#pause')
// const startBtn = document.querySelector('#start')
// const counter2$ = interval(1000)
// const pauseBtn$ = fromEvent(pauseBtn, 'click')
// const startBtn$ = fromEvent(startBtn, 'click')
// const COUNTDOWN_FROM = 10
//
//
// merge(startBtn$.pipe(mapTo(true)),
//     pauseBtn$.pipe(mapTo(false))
// ).pipe(
//         switchMap(shouldStart => {
//             return shouldStart ? counter2$ : empty()
//         }),
//         mapTo(-1),
//         scan((acc, curr) => {
//             return acc + curr
//         }, COUNTDOWN_FROM),
//         takeWhile(value => value >= 0),
//         startWith(COUNTDOWN_FROM),
//     ).subscribe(value => {
//         countdown.innerHTML = value
//         if (!value) {
//             message.innerHTML = 'Liftoff'
//         }
//     })


// 32) =====================================  concat соеденяе последовательно стримы ========================

// const interval$ = interval(1000)
// const delayed$ = empty().pipe(delay(1000))
//
// // concat(
// //     interval$.pipe(take(3)),
// //     interval$.pipe(take(2))
// // ).subscribe(console.log)
//
// delayed$.pipe(
// concat(
//     delayed$.pipe(startWith('3..')),
//     delayed$.pipe(startWith('2..')),
//     delayed$.pipe(startWith('1..')),
//     delayed$.pipe(startWith('Go!')),
// ),
//     startWith('Get Ready!')
// ).subscribe(console.log)


// 31) =======================================  startWith начинает стрим с задонного значения. endWith заканчивает стрим с заданным значением ============================

// const numbers$ = of(1, 2, 3).pipe(
//     startWith('f', 'b', 'c'),
//     endWith(4, 55, 7)
// )
//
// numbers$.subscribe(console.log)
//
//
// const counter$ = interval(1000)
// const click$ = fromEvent(document, 'click')
//
// counter$.pipe(
//     takeUntil(click$)
// ).subscribe(console.log)
//
// const countdown = document.querySelector('.countdown')
// const btn = document.querySelector('#btn')
// const counter2$ = interval(1000)
// const btn$ = fromEvent(btn, 'click')
// const COUNTDOWN_FROM = 10
//
//
// counter2$.pipe(
//     mapTo(-1),
//     scan((acc, curr) => {
//         return acc + curr
//     }, COUNTDOWN_FROM),
//     takeWhile(value => value >= 0),
//     startWith(COUNTDOWN_FROM),
//     takeUntil(btn$)
// ).subscribe(value => {
//     countdown.innerHTML = value
//     if (!value) {
//         message.innerHTML = 'Liftoff'
//     }
// })


// 30) ======================================= пример с собаками  ====================

// const startBtn = document.getElementById('start')
// const stopBtn = document.getElementById('stop')
// const pollingStatus = document.getElementById('polling-status')
// const img = document.getElementById('dog')
//
// const startClick$ = fromEvent(startBtn, 'click')
// const stopClick$ = fromEvent(stopBtn, 'click')
//
// startClick$.pipe(
//     exhaustMap(() => timer(0, 5000).pipe(
//         tap(() => pollingStatus.innerHTML = 'Active'),
//         switchMapTo(
//             ajax.getJSON("https://random.dog/woof.json").pipe(
//                 pluck('url')
//             )
//             ),
//             takeUntil(stopClick$),
//             finalize(() => pollingStatus.innerHTML = 'Stopped')
//         ))
//     ).subscribe(url => img.src = url)


// 28) =======================================  catchError  ======================
// const input = document.querySelector('#text-input')
// const typeahaed = document.querySelector('.typeahaed')
// const url = 'https://api.openbrewerydb.org/breweries'
// const input$ = fromEvent(input, 'keyup')
//
// input$.pipe(
//     debounceTime(200),
//     pluck('target', 'value'),
//     distinctUntilChanged(),
//     switchMap(v => {
//         return ajax.getJSON(
//             `${url}?by_name=${v}`
//         ).pipe(
//             catchError((error, caught) => {
//                 return empty()
//                 // return caught //  на практике очень окуратно исользовать (инфинити запросы)
//             })
//         )
//     }),
//
// ).subscribe(res => {
//     typeahaed.innerHTML = res.map(({name}) => name).join('<br>')
// })


// 27) ==========================================  exhaustMap игнарирует новый стрим пока не завершится тикущий  =====================

// const interval$ = interval(1000)
// const clicks$ = fromEvent(document, 'click')
//
// clicks$.pipe(
//     exhaustMap(() => interval$.pipe(take(3)))
// ).subscribe(console.log)
//
// const authenticateUser = () => {
//     return ajax.post(
//         'https://reqres.in/api/login',
//         {
//             email: 'eve.holt@reqres.in',
//             password: 'cityslicka'
//         }
//     )
// }
// const loginButton = document.getElementById('login')
// const login$ = fromEvent(loginButton, 'click')
//
// login$.pipe(
//     exhaustMap(() => authenticateUser())
// ).subscribe(console.log)

// 26) =========================================  concatMap ждет пока закончится первый стрим и только после этого начинает следующий ==================

// const interval$ = interval(1000)
// const click$ = fromEvent(document, 'click')
//
// // click$.pipe(
// //     concatMap(() => interval$.pipe(take(5)))
// // ).subscribe(console.log)
//
// const saveAnswer = answer => {
//     return of(`Save: ${answer}`).pipe(
//         delay(2000)
//     )
// }
//
// const radioButtons = document.querySelectorAll('.radio-option')
//
// const change$ = fromEvent(radioButtons, 'click')
//
// change$.pipe(
// concatMap(e => saveAnswer(
//     e.target.value
// ))
// ).subscribe(console.log)

// 25) ============================================  switchMap заканчивает предыдущий стрим и переключается на новый ============

// const interval$ = interval(1000)
// const clicks$ = fromEvent(document, 'click')

// clicks$.pipe(
//     switchMap(() => interval$)
// ).subscribe(console.log)

// const input = document.querySelector('#text-input')
// const div = document.querySelector('.typeahaed')
//
// const input$ = fromEvent(input, 'keyup')
// const url = 'https://api.openbrewerydb.org/breweries'
//
// input$.pipe(
//     debounceTime(200),
//     pluck('target', 'value'),
//     distinctUntilChanged(),
//     switchMap(s => {
//         return ajax.getJSON(
//             `${url}?by_name=${s}`
//         )
//     })
// ).subscribe(res => {
//     div.innerHTML = res.map(({name }) => name).join('<br>')
// })

// 24) ================================================    mergeMap подробнее  =========================

// const clicks$ = fromEvent(document, 'click')
// const mousedown$ = fromEvent(document, 'mousedown')
// const mouseup$ = fromEvent(document, 'mouseup')
// const interval$ = interval(1000)
//
// mousedown$.pipe(
//     mergeMap(() => interval$.pipe(
//         takeUntil(mouseup$)
//     ))
// ).subscribe(console.log)
//
// const click$ = fromEvent(document, 'click')
//
// const coor$ = click$.pipe(
//     map(e => ({
//         x: e.clientX,
//         y: e.clientY,
//     }))
// )
//
// const coorWithSave$ = coor$.pipe(
//     mergeMap(coords => ajax.post(
//         'https://www.mocky.io/v2/5185415ba171ea3a00704eed',
//         coords
//     ))
// ).subscribe(console.log)

// 23) ===================================================  mergeAll or mergeMap объеденяет новый стрим со старым ======================
//===================================  mergeMap  ==
// const input = document.querySelector('#text-input')
//
// const input$ = fromEvent(input, 'keyup')
//
// input$.pipe(
//     debounceTime(1000),
//     mergeMap(e => {
//         const term = e.target.value
//         return ajax.getJSON(
//             `https://api.github.com/users/${term}`
//         )
//     }),
//
// ).subscribe(console.log)

//=======================  с mergeAll ===========
// const input = document.querySelector('#text-input')
//
// const input$ = fromEvent(input, 'keyup')
//
// input$.pipe(
//     map(e => {
//         const term = e.target.value
//         return ajax.getJSON(
//             `https://api.github.com/users/${term}`
//         )
//     }),
//     debounceTime(1000),
//     mergeAll()
// ).subscribe(console.log)

//==============================   то же сомое с колбек адом ==
// const input = document.querySelector('#text-input')
//
// const input$ = fromEvent(input, 'keyup')
//
// input$.pipe(
//     map(e => {
//         const term = e.target.value
//         return ajax.getJSON(
//             `https://api.github.com/users/${term}`
//         )
//     }),
//     debounceTime(1000)
// ).subscribe(obj => obj.subscribe(console.log))

// 22) ====================================  auditTime  ======================
// const click$ = fromEvent(document, 'click')
// const timer$ = interval(1000)
//
// click$.pipe(
//     auditTime(4000),
// ).subscribe(console.log)


// 21) ===================================== sampleTime or sample ======================
// const click$ = fromEvent(document, 'click')
// const timer$ = interval(1000)
//
// timer$.pipe(
//     sample(click$),
// ).subscribe(console.log)

// 20) ================================== throttleTime игнорирует следующее значение втечении указанного времени =====================
// ======================================== asyncScheduler  =========================
// const scroll$ = fromEvent(document, 'scroll')
// const progress$ = scroll$.pipe(
//     throttleTime(200, asyncScheduler, {
//         leading: false,
//         trailing: true
//     }),
//     map(({target}) => calPercent(
//         target.documentElement
//     ))
// )
//
// progress$.subscribe(percent => {
//     progressBar.style.width = `${percent}`
// })
//
//
// const click$ = fromEvent(document, 'click')
//
// click$.pipe(
//     throttleTime(1000)
// ).subscribe(console.log)

// 19) ==================================  debounceTime or debounce =========================
// const input = document.querySelector('#text-input')
// const click$ = fromEvent(document, 'click')
// const change$ = fromEvent(input, 'keyup')
//
// click$.pipe(
//     debounceTime(500)
// ).subscribe(console.log)
//
// change$.pipe(
//     debounce(() => interval(1000)),
//     pluck('target', 'value'),
//     distinctUntilChanged()
// ).subscribe(console.log)

// 18) ===================================  distinctUntilChanged or distinctUntilKeyChanged  ============
// 1)  подряд одинаковые
// 2) не различает строку и число
// 3) distinctUntilChanged((prev, curr) => {} если true то не пропускает а если false то пропускает
// 4) distinctUntilKeyChanged('name'), принимает ключ обекта в виде строки
// const numbers$ = of(1, 1, 2, 3, 3, 3, 4, 5)
//
// numbers$.pipe(
//     distinctUntilChanged()
// ).subscribe(console.log)
//
// const user = [
//     {name: 'oleg', loggedIn: false, token: null},
//     {name: 'oleg', loggedIn: true, token: 'abc'},
//     {name: 'oleg', loggedIn: true, token: '123'},
// ]
//
// const state$ = from(user).pipe(
//     scan((a, i) => {
//         return {...a, ...i}
//     }, {})
// )
//
// const name$ = state$.pipe(
//     distinctUntilKeyChanged('name'),
//     map(item => item.name),
// ).subscribe(console.log)


// 17) ===================================  takeUntil пока не наступит другой стрим  =============================
// const counter$ = interval(1000)
// const click$ = fromEvent(document, 'click')
//
// counter$.pipe(
//     takeUntil(click$)
// ).subscribe(console.log)
//
// const countdown = document.querySelector('.countdown')
// const btn = document.querySelector('#btn')
// const counter2$ = interval(1000)
// const btn$ = fromEvent(btn, 'click')
// counter2$.pipe(
//     mapTo(-1),
//     scan((acc, curr) => {
//         return acc + curr
//     }, 5),
//     takeWhile(value => value >= 0),
//     takeUntil(btn$)
// ).subscribe(value => {
//     countdown.innerHTML = value
//     if (!value) {
//         message.innerHTML = 'Liftoff'
//     }
// })


// 16) ====================================  takeWhile(() => {}, true) условие (пока не вернет false) ==========================
// const click$ = fromEvent(document, 'click')
//
// click$.pipe(
//     map(e => ({
//         x: e.clientX,
//         y: e.clientY
//     })),
//     takeWhile(({y}) => y <= 200, true)
// ).subscribe({
//     next: console.log,
//     complete: () => console.log('complete')
// })
//
// const counter$ = interval(1000)
//
// const countdown = document.querySelector('.countdown')
// counter$.pipe(
//     mapTo(-1),
//     scan((acc, curr) => {
//         return acc + curr
//     }, 10),
//     tap(console.log),
//     takeWhile(value => value >= 0)
// ).subscribe(value => {
//     countdown.innerHTML = value
//     if (!value) {
//         message.innerHTML = 'Liftoff'
//     }
// })


// 15) =====================================  take or first =========================
// const numbers$ = of(1, 2, 3, 4, 5)
// const click$ = fromEvent(document, 'click')
//
// click$.pipe(
//     map(e => ({
//         x: e.clientX,
//         y: e.clientY
//     })),
//    first(({y}) => y > 200)
// ).subscribe({
//     next: console.log,
//     complete: () => console.log('complete')
// })


// 14 ========================================  tap для сайдэфектов - (избегать как только возможно), и  для дебага  ==================
// const numbers$ = of(1,2,3,4,5)

// numbers$.pipe(
//     tap(v => console.log('befor', v)),
//     map(v => v * 10),
//     tap({
//         next: v => console.log('after',v),
//         complete: () => console.log('done'),
//         error: err => {}
//     }),
// ).subscribe(console.log)

// const countdown = document.querySelector('.countdown')
// const message = document.querySelector('#message')
//
// const counter$ = interval(1000)
//
//
// counter$.pipe(
//     mapTo(-1),
//     scan((acc, curr) => {
//         return acc + curr
//     }, 10),
//     tap(console.log),
//     filter(value => value >= 0)
// ).subscribe(value => {
//     countdown.innerHTML = value
//     if (!value) {
//         message.innerHTML = 'Liftoff'
//     }
// })
// const keyup$ = fromEvent(document, 'keyup')
// const keycode$ = keyup$.pipe(
//     map(e => e.code),
//     tap(code => {
//         message.innerHTML = code
//     })
// )
//
// const enter$ = keycode$.pipe(
//     filter(code => code === 'Ente')
// )
//
// enter$.subscribe(console.log)


// 13) ===========================================  выводим последовательно имена в список  ================
// const h2 = document.querySelector('.countdown')
// const source = ['Adam', 'Brian', 'Christine'];
// const names$ = of(source);
//
// interval(1000).pipe(
//     map(i => source.slice(0, i + 1))
// ).subscribe(value => h2.innerHTML = value)


// 12) ===================================================  обратный отсчет  ===================
// const countdown = document.querySelector('.countdown')
// const message = document.querySelector('#message')
//
// const counter$ = interval(1000)
//
//
// counter$.pipe(
//     mapTo(-1),
//     scan((acc, curr) => {
//         return acc + curr
//     }, 10),
//     filter(value => value >= 0)
// ).subscribe(value => {
//     countdown.innerHTML = value
//     if (!value) {
//         message.innerHTML = 'Liftoff'
//     }
// })


// 11) ============================================  scan  ===================
// const num = [1, 2, 3, 4, 5]
// const user = [
//     {name: 'oleg', loggedIn: false, token: null},
//     {name: 'oleg', loggedIn: true, token: 'abc'},
//     {name: 'oleg', loggedIn: true, token: '123'},
// ]
//
// const state$ = from(user).pipe(
//     scan((a, i) => {
//         return {...a, ...i}
//         }, {})
// )
//
// const name$ = state$.pipe(
//     map(item => item.name)
// ).subscribe(console.log)


// 10) ==================================  reduce  ========================
// const num = [1, 2, 3, 4, 5]
//
// const totalReducer = (acc, curr) => {
//     return acc + curr
// }
//
// const total = num.reduce((a, i) => a + i, 0)
// console.log(total)
// interval(1000).pipe(
//     take(6),
//     reduce((a, i) => (a + i), 0)
// ).subscribe({
//     next: console.log,
//     complete: () => console.log('complete')
// })


// 9) ===========================================  пример с github  ==================================
// const input = document.querySelector('input')
// const ul = document.querySelector('ul')
//
// const getUser = username => {
//     const url = `https://api.github.com/users/${username}/repos`
//
//     return fetch(url)
//         .then(res => {
//             if (res.ok) {
//                 return res.json()
//             }
//
//             throw new Error('Error')
//         })
// }
//
// const record = reps => {
//     for (let i = 0; i < reps.length; i++) {
//         if (!ul.children[i]) {
//             const newEl = document.createElement('li')
//             ul.appendChild(newEl)
//         }
//
//         const li = ul.children[i]
//         li.innerHTML = reps[i].name
//     }
//
//     while (ul.children.length > reps.length) {
//         ul.removeChild(ul.lastChild)
//     }
// }
//
// const keyUp = fromEvent(input, 'keyup').pipe(
//     debounceTime(700),
//     map(e => e.target.value),
//     filter(value => value.length > 2),
//     distinctUntilChanged(),
//     mergeMap(value => {
//        return  from(getUser(value)).pipe(
//            catchError(err => of([]))
//        )
//     }),
//
// ).subscribe({
//     next: reps => record(reps),
//     error: console.log,
// })


// 8) ============================= пример scroll  ===================
// function calc(el) {
//     const {scrollTop, scrollHeight, clientHeight} = el
//
//     return (scrollTop / (scrollHeight - clientHeight)) * 100
// }
//
// const pb = document.querySelector('.progress-bar')
//
// const scroll$ = fromEvent(document, 'scroll')
//
// const progress$ = scroll$.pipe(
//     map(({target}) => calc(target.documentElement))
// )
//
// progress$.subscribe(percent => {
//     pb.style.width = percent + '%'
// })


// 7) ============================  filter  ==================
// of(1, 2, 3, 4, 5).pipe(
//     filter(v => v > 2)
// ).subscribe(console.log)

// const keyup$ = fromEvent(document, 'keyup')
// const keycode$ = keyup$.pipe(
//     tap(console.log),
//     map(e => e.code)
// )
//
// const enter$ = keycode$.pipe(
//     filter(v => v === 'Enter')
// )
//
// keycode$.subscribe(console.log)
// enter$.subscribe(console.log)


// 6) ===========================  map  ======================
// of(1, 2, 3, 4, 5).pipe(
//     map(value => value * 10)
// ).subscribe(console.log)
//
// const keyup$ = fromEvent(document, 'keyup')
// const keycode$ = keyup$.pipe(
//     map(e => e.code)
// )
//
// const keycodeWithPluck$ = keyup$.pipe(
//     pluck('code')
// )
//
// const pressed$ = keyup$.pipe(
//     mapTo('Key Pressed!')
// )
//
// keycodeWithPluck$.subscribe(console.log)
// pressed$.subscribe(console.log)


// 5) ================================================
// const timer$ = timer(6000)
// const timer$ = timer(2000,1000)
// timer$.subscribe(console.log)

// 5) ==================================================
// const timer$ = interval(1000)

// timer$.subscribe(console.log)


// 4) ================================================
// const observer = {
//     next: value => console.log('next', value),
//     error: error => console.log('error', error),
//     complete: () => console.log('complete')
// }
//
// const source$ = from(fetch(
//     'https://api.github.com/users/octocat'
// ))
// const source$ = from('hello')
// const source$ = from([1, 2, 3, 4, 5])
//
// source$.subscribe(observer)

// 3) ============================================================
// const observer = {
//     next: value => console.log('next', value),
//     error: error => console.log('error', error),
//     complete: () => console.log('complete')
// }
//
// const source$ = range(1,  5)
// const source$ = of(1, 2, 3, 4, 5)
//
// source$.subscribe(observer)


// 2) ====================================================================
// const observer = {
//     next: value => console.log('next', value),
//     error: error => console.log('error', error),
//     complete: () => console.log('complete')
// }
//
//
// const source$ = fromEvent(document.querySelector('#increment'), 'click')
//
// const subOne = source$.subscribe(observer)
// const subTwo = source$.subscribe(observer)
//
// setTimeout(() => {
//     console.log('un')
//     subOne.unsubscribe()
// }, 3000)

// 1 ===============================================
// const observer = {
//     next: value => console.log('next', value),
//     error: error => console.log('error', error),
//     complete: () => console.log('complete')
// }
//
// const observable = new Observable(subscriber => {
//     let count = 0
//
//    const id = setInterval(() => {
//         subscriber.next(count)
//         count += 1
//     }, 1000)
//
//     return () => {
//         console.log(1111)
//         clearInterval(id)
//     }
//
// })
//
// const subscription = observable.subscribe(observer)
//
// const subscriptionTwo = observable.subscribe(observer)
//
// subscription.add(subscriptionTwo)
//
// setTimeout(() => {
//     subscription.unsubscribe()
// }, 3500)
//
// setTimeout(() => {
//     subscriptionTwo.unsubscribe()
// }, 5000)
