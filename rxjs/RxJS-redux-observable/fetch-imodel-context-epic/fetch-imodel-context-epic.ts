import { catchError, map, switchMap, withLatestFrom, distinctUntilChanged, startWith } from 'rxjs/operators';
import { ofType, ActionsObservable, StateObservable } from 'redux-observable';
import { EMPTY, of, from } from 'rxjs';
import { IModelActions } from '../reducers/imodel/imodel-actions';
import logger from '../api/logging/logger';
import { ActionWithPayload } from '../reducers/side-navigation/actions';
import { SET_ACTIVE_CONNECT_PROJECT } from '../reducers/shared/actions';
import { IModelHubProps } from '../api/imodelhub-api/imodelhub';
import { IModelsResponse } from '../api/imodelhub-api/api/response-types';

export interface Dependencies {
    getPrimaryRaw: (propsOrUrl: IModelHubProps, projectGuid: string) => Promise<IModelsResponse>;
}

export function fetchIModelContextEpic(
    action$: ActionsObservable<ActionWithPayload>,
    state$: StateObservable<any>,
    { getPrimaryRaw }: Dependencies,
) {
    return action$.pipe(
        ofType(SET_ACTIVE_CONNECT_PROJECT),
        map(action => {
            return action.payload ? action.payload.instanceId : '';
        }),
        distinctUntilChanged(),
        withLatestFrom(
            state$.pipe(map(state => state.sharedReducer.iModelHubURL)),
            state$.pipe(map(state => state.oidcReducer.oidc)),
        ),
        switchMap(([projectId, hubUrl, user]) => {
            if (projectId && hubUrl && user) {
                return from(getPrimaryRaw({ hubUrl, user }, projectId)).pipe(
                    map(response =>
                        IModelActions.iModelContextLoaded({
                            projectId,
                            context: response,
                        }),
                    ),
                    catchError(error => {
                        logger.error('loadModelContext Action Error: Failed to load iModel context', {
                            projectId,
                            error,
                        });
                        return of(IModelActions.iModelContextLoadError(error));
                    }),
                    startWith(IModelActions.iModelContextLoading()),
                );
            }
            return EMPTY;
        }),
    );
}
