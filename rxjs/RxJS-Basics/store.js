import {BehaviorSubject, Subject} from "rxjs";
import {distinctUntilChanged, pluck, scan} from "rxjs/operators";

export class ObservableStore {
    constructor(initialState) {
        this._store = new BehaviorSubject(initialState)
        this._stateUpdates = new Subject()

        this._stateUpdates.pipe(
            scan((acc, curr) => {
                return {...acc, ...curr}
            }, initialState)
        ).subscribe(this._store)
    }

    updateState(stateUpdate) {
        this._stateUpdates.next(stateUpdate)
    }

    selectState(stateKey){
        return this._store.pipe(
            distinctUntilChanged(stateKey),
            pluck(stateKey)
        )
    }

    stateChanges() {
        return this._store.asObservable()
    }
}
