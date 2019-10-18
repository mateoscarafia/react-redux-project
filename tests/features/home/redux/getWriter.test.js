import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_WRITER_BEGIN,
  HOME_GET_WRITER_SUCCESS,
  HOME_GET_WRITER_FAILURE,
  HOME_GET_WRITER_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getWriter,
  dismissGetWriterError,
  reducer,
} from '../../../../src/features/home/redux/getWriter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getWriter', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getWriter succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getWriter())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_WRITER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_WRITER_SUCCESS);
      });
  });

  it('dispatches failure action when getWriter fails', () => {
    const store = mockStore({});

    return store.dispatch(getWriter({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_WRITER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_WRITER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetWriterError', () => {
    const expectedAction = {
      type: HOME_GET_WRITER_DISMISS_ERROR,
    };
    expect(dismissGetWriterError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_WRITER_BEGIN correctly', () => {
    const prevState = { getWriterPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_WRITER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWriterPending).toBe(true);
  });

  it('handles action type HOME_GET_WRITER_SUCCESS correctly', () => {
    const prevState = { getWriterPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_WRITER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWriterPending).toBe(false);
  });

  it('handles action type HOME_GET_WRITER_FAILURE correctly', () => {
    const prevState = { getWriterPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_WRITER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWriterPending).toBe(false);
    expect(state.getWriterError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_WRITER_DISMISS_ERROR correctly', () => {
    const prevState = { getWriterError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_WRITER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWriterError).toBe(null);
  });
});

