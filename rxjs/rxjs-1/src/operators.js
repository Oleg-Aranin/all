import {fromEvent, interval} from "rxjs";
import {filter, map, reduce, scan, switchMap, take, takeLast, takeWhile, tap} from "rxjs/operators";

/*
fromEvent(document, 'click')
    .subscribe(() => {
        const stream$ = interval(1000)
            .pipe(
                take(5),
                reduce((acc, v) => acc + v, 0)
            )
        stream$.subscribe({
            next: v => console.log(v),
            complete: () => console.log('complete')
        })
    })

 */

fromEvent(document, 'click')
    .pipe(
        switchMap((event) => {
            return interval(1000)
                .pipe(
                    take(5),
                    reduce((acc, v) => acc + v, 0)
                )
        })
    )
    .subscribe({
        next: v => console.log(v),
        complete: () => console.log('complete')
    })

// const stream$ = interval(1000)
//     .pipe(
//         // tap(v => console.log(v)),
//         // map(v => v * 3),
//         // filter(v => v % 2 === 0),
//         take(5),
//         // takeLast(5)
//         // takeWhile(v => v < 7)
//         // scan((acc, v) => acc + v, 0)
//         reduce((acc, v) => acc + v, 0)
//     )
//
// stream$.subscribe({
//     next: v => console.log('next:', v),
//     complete: () => console.log('complete')
// })
