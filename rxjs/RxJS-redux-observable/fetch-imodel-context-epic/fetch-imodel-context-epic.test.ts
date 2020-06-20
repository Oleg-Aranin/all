import logger from '../api/logging/logger';
const longerMock = jest.spyOn(logger, 'error').mockImplementation(jest.fn);
import { TestScheduler } from 'rxjs/testing';
import { fetchIModelContextEpic, Dependencies } from './fetch-imodel-context-epic';
import { of } from 'rxjs';
import { ActionWithPayload } from '../reducers/side-navigation/actions';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { IModelHubProps } from '../api/imodelhub-api/imodelhub';
import { IModelActions } from '../reducers/imodel/imodel-actions';
import { SET_ACTIVE_CONNECT_PROJECT } from '../reducers/shared/actions';

describe('testing fetchIModelContextEpic', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should produces correct actions when success', done => {
        testScheduler.run(({ hot, expectObservable }) => {
            const action$ = (hot('a', {
                a: {
                    type: SET_ACTIVE_CONNECT_PROJECT,
                    payload: { instanceId: 'bf6befa5-209e-460d-9e2a-9c366e74ed82' },
                },
            }) as unknown) as ActionsObservable<ActionWithPayload>;

            const state$ = of({
                sharedReducer: { iModelHubURL: 'url' },
                oidcReducer: { oidc: { user: 'oleg' } },
            }) as StateObservable<any>;

            const dependencies = ({
                getPrimaryRaw: (propsOrUrl: IModelHubProps, projectGuid: string) => {
                    return [propsOrUrl];
                },
            } as unknown) as Dependencies;

            const output$ = fetchIModelContextEpic(action$, state$, dependencies);

            const payload = {
                projectId: 'bf6befa5-209e-460d-9e2a-9c366e74ed82',
                context: {
                    hubUrl: 'url',
                    user: {
                        user: 'oleg',
                    },
                },
            };

            const firstExpectedAction = IModelActions.iModelContextLoading();
            const secondExpectedAction = IModelActions.iModelContextLoaded(payload);

            expectObservable(output$).toBe('(bc)', {
                b: firstExpectedAction,
                c: secondExpectedAction,
            });
            done();
        });
    });

    it('should produces correct actions when error', done => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = (hot('a', {
                a: {
                    type: SET_ACTIVE_CONNECT_PROJECT,
                    payload: { instanceId: 'bf6befa5-209e-460d-9e2a-9c366e74ed82' },
                },
            }) as unknown) as ActionsObservable<ActionWithPayload>;

            const state$ = of({
                sharedReducer: { iModelHubURL: 'url' },
                oidcReducer: { oidc: { user: 'oleg' } },
            }) as StateObservable<any>;

            const dependencies = ({
                getPrimaryRaw: () => {
                    return cold('-#', null, 'oops!');
                },
            } as unknown) as Dependencies;

            const output$ = fetchIModelContextEpic(action$, state$, dependencies);

            const firstExpectedAction = IModelActions.iModelContextLoading();
            const secondExpectedAction = IModelActions.iModelContextLoadError('oops!');

            expectObservable(output$).toBe('bc', {
                b: firstExpectedAction,
                c: secondExpectedAction,
            });
            done();
        });
        expect(longerMock).toHaveBeenCalledTimes(1);
        expect(longerMock).toHaveBeenLastCalledWith('loadModelContext Action Error: Failed to load iModel context', {
            projectId: 'bf6befa5-209e-460d-9e2a-9c366e74ed82',
            error: 'oops!',
        });
    });

    it('should not produces actions when type is unknowen', done => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = (hot('a', {
                a: {
                    type: 'unknowen-type',
                    payload: { instanceId: 'bf6befa5-209e-460d-9e2a-9c366e74ed82' },
                },
            }) as unknown) as ActionsObservable<ActionWithPayload>;

            const state$ = of({
                sharedReducer: { iModelHubURL: 'url' },
                oidcReducer: { oidc: { user: 'oleg' } },
            }) as StateObservable<any>;

            const dependencies = ({
                getPrimaryRaw: (propsOrUrl: IModelHubProps, projectGuid: string) => {
                    return [propsOrUrl];
                },
            } as unknown) as Dependencies;

            const output$ = fetchIModelContextEpic(action$, state$, dependencies);

            expectObservable(output$).toBe('');
            done();
        });
    });
});
