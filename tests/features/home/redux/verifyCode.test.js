import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_VERIFY_CODE_BEGIN,
  HOME_VERIFY_CODE_SUCCESS,
  HOME_VERIFY_CODE_FAILURE,
  HOME_VERIFY_CODE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  verifyCode,
  dismissVerifyCodeError,
  reducer,
} from '../../../../src/features/home/redux/verifyCode';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/verifyCode', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when verifyCode succeeds', () => {
    const store = mockStore({});

    return store.dispatch(verifyCode())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_VERIFY_CODE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_VERIFY_CODE_SUCCESS);
      });
  });

  it('dispatches failure action when verifyCode fails', () => {
    const store = mockStore({});

    return store.dispatch(verifyCode({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_VERIFY_CODE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_VERIFY_CODE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissVerifyCodeError', () => {
    const expectedAction = {
      type: HOME_VERIFY_CODE_DISMISS_ERROR,
    };
    expect(dismissVerifyCodeError()).toEqual(expectedAction);
  });

  it('handles action type HOME_VERIFY_CODE_BEGIN correctly', () => {
    const prevState = { verifyCodePending: false };
    const state = reducer(
      prevState,
      { type: HOME_VERIFY_CODE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyCodePending).toBe(true);
  });

  it('handles action type HOME_VERIFY_CODE_SUCCESS correctly', () => {
    const prevState = { verifyCodePending: true };
    const state = reducer(
      prevState,
      { type: HOME_VERIFY_CODE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyCodePending).toBe(false);
  });

  it('handles action type HOME_VERIFY_CODE_FAILURE correctly', () => {
    const prevState = { verifyCodePending: true };
    const state = reducer(
      prevState,
      { type: HOME_VERIFY_CODE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyCodePending).toBe(false);
    expect(state.verifyCodeError).toEqual(expect.anything());
  });

  it('handles action type HOME_VERIFY_CODE_DISMISS_ERROR correctly', () => {
    const prevState = { verifyCodeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_VERIFY_CODE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyCodeError).toBe(null);
  });
});

