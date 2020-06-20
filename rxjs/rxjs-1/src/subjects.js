import {Subject, BehaviorSubject, ReplaySubject} from "rxjs";

document.addEventListener('click', () => {

    /*
    const stream$ = new Subject()

    stream$.subscribe(v => console.log(v))

    stream$.next('hi')
    stream$.next('Rx')
    stream$.next('JS')
    */

    /*
    const stream$ = new BehaviorSubject('first')

    stream$.subscribe(v => console.log(v))

    stream$.next('hi')
    stream$.next('Rx')
    stream$.next('JS')

     */

    const stream$ = new ReplaySubject(2)

    stream$.next('hi')
    stream$.next('Rx')
    stream$.next('JS')

    stream$.subscribe(v => console.log(v))




})

