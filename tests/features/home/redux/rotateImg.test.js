import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_ROTATE_IMG_BEGIN,
  HOME_ROTATE_IMG_SUCCESS,
  HOME_ROTATE_IMG_FAILURE,
  HOME_ROTATE_IMG_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  rotateImg,
  dismissRotateImgError,
  reducer,
} from '../../../../src/features/home/redux/rotateImg';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/rotateImg', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when rotateImg succeeds', () => {
    const store = mockStore({});

    return store.dispatch(rotateImg())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ROTATE_IMG_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ROTATE_IMG_SUCCESS);
      });
  });

  it('dispatches failure action when rotateImg fails', () => {
    const store = mockStore({});

    return store.dispatch(rotateImg({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ROTATE_IMG_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ROTATE_IMG_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRotateImgError', () => {
    const expectedAction = {
      type: HOME_ROTATE_IMG_DISMISS_ERROR,
    };
    expect(dismissRotateImgError()).toEqual(expectedAction);
  });

  it('handles action type HOME_ROTATE_IMG_BEGIN correctly', () => {
    const prevState = { rotateImgPending: false };
    const state = reducer(
      prevState,
      { type: HOME_ROTATE_IMG_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rotateImgPending).toBe(true);
  });

  it('handles action type HOME_ROTATE_IMG_SUCCESS correctly', () => {
    const prevState = { rotateImgPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ROTATE_IMG_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rotateImgPending).toBe(false);
  });

  it('handles action type HOME_ROTATE_IMG_FAILURE correctly', () => {
    const prevState = { rotateImgPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ROTATE_IMG_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rotateImgPending).toBe(false);
    expect(state.rotateImgError).toEqual(expect.anything());
  });

  it('handles action type HOME_ROTATE_IMG_DISMISS_ERROR correctly', () => {
    const prevState = { rotateImgError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ROTATE_IMG_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rotateImgError).toBe(null);
  });
});

