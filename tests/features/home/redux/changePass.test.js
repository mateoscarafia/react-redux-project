import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_CHANGE_PASS_BEGIN,
  HOME_CHANGE_PASS_SUCCESS,
  HOME_CHANGE_PASS_FAILURE,
  HOME_CHANGE_PASS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  changePass,
  dismissChangePassError,
  reducer,
} from '../../../../src/features/home/redux/changePass';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/changePass', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when changePass succeeds', () => {
    const store = mockStore({});

    return store.dispatch(changePass())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_CHANGE_PASS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_CHANGE_PASS_SUCCESS);
      });
  });

  it('dispatches failure action when changePass fails', () => {
    const store = mockStore({});

    return store.dispatch(changePass({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_CHANGE_PASS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_CHANGE_PASS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissChangePassError', () => {
    const expectedAction = {
      type: HOME_CHANGE_PASS_DISMISS_ERROR,
    };
    expect(dismissChangePassError()).toEqual(expectedAction);
  });

  it('handles action type HOME_CHANGE_PASS_BEGIN correctly', () => {
    const prevState = { changePassPending: false };
    const state = reducer(
      prevState,
      { type: HOME_CHANGE_PASS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changePassPending).toBe(true);
  });

  it('handles action type HOME_CHANGE_PASS_SUCCESS correctly', () => {
    const prevState = { changePassPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CHANGE_PASS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changePassPending).toBe(false);
  });

  it('handles action type HOME_CHANGE_PASS_FAILURE correctly', () => {
    const prevState = { changePassPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CHANGE_PASS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changePassPending).toBe(false);
    expect(state.changePassError).toEqual(expect.anything());
  });

  it('handles action type HOME_CHANGE_PASS_DISMISS_ERROR correctly', () => {
    const prevState = { changePassError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_CHANGE_PASS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changePassError).toBe(null);
  });
});

