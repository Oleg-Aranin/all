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
    forkJoin,
    Subject,
    observable,
    BehaviorSubject,
    ReplaySubject,
    AsyncSubject,
    asapScheduler,
    animationFrameScheduler,
    queueScheduler, EMPTY, throwError, partition
} from "rxjs";
import {
    auditTime,
    catchError,
    concatMap,
    debounce,
    debounceTime,
    delay,
    distinctUntilChanged,
    distinctUntilKeyChanged,
    endWith,
    exhaustMap,
    filter,
    finalize,
    first,
    map,
    mapTo,
    mergeAll,
    mergeMap,
    mergeMapTo,
    pluck,
    reduce,
    sample,
    sampleTime,
    scan,
    startWith,
    switchMap,
    switchMapTo,
    take,
    takeUntil,
    takeWhile,
    tap,
    throttleTime,
    concat,
    withLatestFrom,
    share,
    multicast,
    refCount,
    shareReplay,
    observeOn,
    subscribeOn,
    toArray,
    retryWhen
} from 'rxjs/operators'
import {ajax} from "rxjs/ajax";
import {loadingService} from "./loadingService";
import {ObservableStore} from "./store";

const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
}

// ========  use partition and filter for conditional logic  ====================

const MOVE_SPEED = 20
let leftPosition = 0

const box = document.getElementById('box')

const click$ = fromEvent(document, 'click')
const xPositionClick$ = click$.pipe(
    pluck('clientX')
)

const [leftSideClick$, rightSideClick$ ] = partition(xPositionClick$, xPos => {
    return xPos < window.innerWidth / 2
})

leftSideClick$.subscribe(xPos => {
        box.style.left = `${leftPosition -= MOVE_SPEED}px`
    console.log(xPos)
})

rightSideClick$.subscribe(() => {
    box.style.left = `${leftPosition += MOVE_SPEED}px`
})








// ========== automate observable cleanup with takeUntil and Subjects  ==================

// const onDestroy$ = new Subject()
//
// fromEvent(document, 'click').pipe(
//     map(event => ({
//         x: event.clientX,
//         y: event.clientY,
//     })),
//     takeUntil(onDestroy$)
// ).subscribe(v => {
//     console.log(v)
// })
//
// fromEvent(document, 'scroll').pipe(
//     throttleTime(30),
//     takeUntil(onDestroy$)
//     ).subscribe(v => {
//         console.log(v)
//     })
//
//
// interval(1000).pipe(
//     takeUntil(onDestroy$)
// ).subscribe(v => {
//         console.log(v)
//     })
//
//
// setTimeout(() => {
//     onDestroy$.next()
//     onDestroy$.complete()
// }, 4000)


// ============  use combination operators to access state from secondary streams  ===============

// const saveAnswer = (answer, testId) => {
//     return of({
//         answer,
//         testId
//     }).pipe(delay(200))
// }
//
// const radioButtons = document.getElementsByClassName('radio')
//
// const answerChange$ = fromEvent(radioButtons, 'click')
//
// const store$ = new BehaviorSubject({
//     testId: 'abc123',
//     complete: false,
//     moreData: {}
// })
//
// answerChange$.pipe(
//     withLatestFrom(store$.pipe(
//         pluck('testId')
//     )),
//     concatMap(([event, testId]) => {
//         return saveAnswer(event.target.value, testId)
//     })
// ).subscribe(console.log)


// ===============  extract common operator logic into standalone functions  ======================

// const click$ = fromEvent(document, 'click')
//
// export function customRetry(
//     {
//         excludedStatusCode = [],
//         retryAttempts = 3,
//         scalingDuration = 1000,
//     } = {}
// ) {
//     return function (source) {
//
//
//         return source.pipe(
//             retryWhen(attempts => {
//                 return attempts.pipe(
//                     mergeMap((error, i) => {
//                         const attemptNumber = i + 1
//                         if (attemptNumber > retryAttempts || excludedStatusCode.find(e => e === error.status)) {
//                             console.log('Giving up!')
//                             return throwError(error)
//                         }
//                         console.log(
//                             `Attempt ${attemptNumber}: retrying
//                         in ${attemptNumber * 1000}ms`
//                         )
//                         return timer(attemptNumber * scalingDuration)
//                     })
//                 )
//             })
//         )
//     }
// }
//
// click$.pipe(
//     mergeMapTo(throwError({
//             status: 400,
//             message: 'Server error'
//         }).pipe(
//         customRetry({retryAttempts: 4}),
//         catchError(err => of(err.message))
//         )
//     )
// ).subscribe(console.log)


// ========================= use finalize to execute side effects on completion  ========================

// const counter = document.getElementById('counter')
//
// const sub = throwError(new Error('error')).pipe(
//     take(3),
//     finalize(() => {
//         counter.innerHTML = 'Stopped!'
//     })
// ).subscribe( val => {
//         counter.innerHTML = val
// })

// setTimeout(() => {
//     sub.unsubscribe()
// }, 3000)


// ===================================  marble  testing  =====================================

// '_' each dash represents a frame of virtual time

// [a-z0-9]' represents emitted values, ex. -a--b-

// '#' represents errors ex. -a--b-#

// '()' represents synchronous groupings, ex. -(abc)--

// '|' represents completion ex. (abc|)


//==================== test #1
// export const breweryTypeahead = (ajaxHelper = ajax) => sourceObservable => {
//     return sourceObservable.pipe(
//         debounceTime(200),
//         pluck('target', 'value'),
//         distinctUntilChanged(),
//         switchMap(s => {
//             return ajaxHelper.getJSON(
//                 `${url}?by_name=${s}`
//             ).pipe(catchError(() => EMPTY))
//         })
//     )
// }
//
//
//
// const input = document.querySelector('#text-input')
// const div = document.querySelector('.typeahaed')
//
// const input$ = fromEvent(input, 'keyup')
// const url = 'https://api.openbrewerydb.org/breweries'
//
// input$.pipe(
//     breweryTypeahead()
// ).subscribe(res => {
//     div.innerHTML = res.map(({name }) => name).join('<br>')
// })
//==================================


// ===================================  execute tasks on a queue with the Queue Scheduler =============================

// queueScheduler.schedule(() => {
//     queueScheduler.schedule(() => {
//         queueScheduler.schedule(() => {
//             console.log('three')
//         })
//
//         console.log('hello')
//     })
//
//     console.log('hi')
// })
//
// console.log('by')


//==================================== schedule tasks before browser repaint with the Animation Frame Scheduler  ===============================


// const ball = document.getElementById('ball')
//
// animationFrameScheduler.schedule(function (position) {
//     ball.style.transform = `translate3d(0, ${position}px, 0)`
//
//     if (position <= 300) {
//         this.schedule(position + 1)
//     }
// }, 0, 0)


// interval(0, animationFrameScheduler).pipe(
//     takeWhile(val => val <= 300)
// ).subscribe(val => ball.style.transform = `translate3d(0, ${val}px, 0)`)


// ==================================== defer task execution with the Asap Scheduler  =========================

// asyncScheduler.schedule(() => {
//     console.log('asyncScheduler')
// })
// asapScheduler.schedule(() => {
//     console.log('asapScheduler')
// })
// queueMicrotask(() => console.log('from microtask'))
// Promise.resolve('from promise').then(console.log)
// console.log('by')

// const div = document.getElementById('counter')
//
// range(1,1000, asapScheduler).subscribe(val => {
//     div.innerHTML = val
//     }
// )
// console.log('by')


// =================== execute tasks asynchronously with the AsyncScheduler  ================  ==========================

// work, delay?, state?
// const sub = asyncScheduler.schedule(
//     console.log,
//     2000,
//     'hi'
// )
// sub.unsubscribe()
// of(4,5,6, asyncScheduler).subscribe(observer)
// of(4,5,6).pipe(
//     tap(val => console.log('from tab', val)),
//     subscribeOn(asyncScheduler, 3000)
// ).subscribe(observer)
// of(1,2,3).subscribe(observer)
// console.log('sync')


// ========================= deliver the last value on completion with AsyncSubjects  ======================

// const observer = {
//     next: val => console.log('next', val),
//     error: err => console.log('error', err),
//     complete: () => console.log('complete')
// }
//
// const subject = new AsyncSubject()
//
// subject.subscribe(observer)
// subject.subscribe(observer)
//
// subject.next('hi')
// subject.next('world')
// subject.next('goodbye')
// subject.next('hello')
//
// subject.complete()

// =================== automate multicasting and replaying with shareReplay =======
// const observer = {
//     next: val => console.log('next', val),
//     error: err => console.log('error', err),
//     complete: () => console.log('complete')
// }
//
// const ajax$ = ajax(
//     'https://api.github.com/users/octocat'
// )
//
// const click$ = fromEvent(document, 'click')
// const clickRequest$ = click$.pipe(
//     mergeMapTo(ajax$),
//     shareReplay(1, 2000)
// )
//
// clickRequest$.subscribe(console.log)
//
//
// setTimeout(() => {
//     console.log(1111)
//     clickRequest$.subscribe(console.log)
// }, 5000)


// ===================  replay history to new subscribers with ReplaySubject  =================

// const observer = {
//     next: val => console.log('next', val),
//     error: err => console.log('error', err),
//     complete: () => console.log('complete')
// }
// const subject = new ReplaySubject(2)
//
// subject.next('hi')
// subject.next('world')
// subject.next('goodbye')
//
// subject.subscribe(observer)


// ===================   build a basic application store with Subjects ===========

// const store = new ObservableStore({
//     user: 'brian',
//     isAuthenticated: false,
// })
//
// store.selectState('user').subscribe(console.log)
//
// store.updateState({
//     user: 'joe'
// })
//
// store.updateState({
//     isAuthenticated: true
// })


// ======================== deliver a starting value to subscribers with BehaviorSubjects  =====================
// const observer = {
//     next: val => console.log('next', val),
//     error: err => console.log('error', err),
//     complete: () => console.log('complete')
// }
//
// const subject = new BehaviorSubject('hi')
//
// const subscription = subject.subscribe(
//     observer
// )
//
//
// const secondSubscription = subject.subscribe(observer)
//
// subject.next('world')
//
// setTimeout(() => {
//     subject.subscribe(observer)
// }, 3000)
//
//
// const loadingOverlay = document.getElementById('loading-overlay')
//
// const loading$ = new Subject()
//
// loadingService.loadingStatus$.subscribe(isLoading => {
//     if (isLoading) {
//         loadingOverlay.classList.add('open')
//     } else {
//         loadingOverlay.classList.remove('open')
//     }
// })
//
//
// setTimeout(() => loadingService.hideLoading(), 3000)
//


//=======================  share an observable execution with multicast and share  ==================

// const observer = {
//     next: val => console.log('next', val),
//     error: err => console.log('error', err),
//     complete: () => console.log('complete')
// }
//
// const interval$ = interval(2000).pipe(
//     tap(value => console.log('new interval', value))
// )
//
// const multicastedInterval$ = interval$.pipe(
//     share()
// )
//
//
// const subOne = multicastedInterval$.subscribe(observer)
// const subTwo = multicastedInterval$.subscribe(observer)
//
// setTimeout(() => {
//     subOne.unsubscribe()
//     subTwo.unsubscribe()
// }, 3000)


// =======================   manage application loading state with Subjects  ============

// const loadingOverlay = document.getElementById('loading-overlay')
//
// const loading$ = new Subject()
//
// loadingService.loadingStatus$.subscribe(isLoading => {
//     if (isLoading) {
//         loadingOverlay.classList.add('open')
//     } else {
//         loadingOverlay.classList.remove('open')
//     }
// })
//
// loadingService.showLoading()
//
// setTimeout(() => loadingService.hideLoading(), 3000)


//=========================  share data among multiple subscribers with Subjects  ===========

// const observer = {
//     next: val => console.log('next', val),
//     error: err => console.log('error', err),
//     complete: () => console.log('complete')
// }
//
// const subject = new Subject()
//
// const subscription = subject.subscribe(observer)
// const subscriptionTwo = subject.subscribe(observer)
//
// const interval$ = interval(2000).pipe(
//     tap(value => console.log('new interval', value))
// )
//
// interval$.subscribe(subject)
