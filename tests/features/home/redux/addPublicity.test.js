import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_ADD_PUBLICITY_BEGIN,
  HOME_ADD_PUBLICITY_SUCCESS,
  HOME_ADD_PUBLICITY_FAILURE,
  HOME_ADD_PUBLICITY_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  addPublicity,
  dismissAddPublicityError,
  reducer,
} from '../../../../src/features/home/redux/addPublicity';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addPublicity', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addPublicity succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addPublicity())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_PUBLICITY_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_PUBLICITY_SUCCESS);
      });
  });

  it('dispatches failure action when addPublicity fails', () => {
    const store = mockStore({});

    return store.dispatch(addPublicity({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_PUBLICITY_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_PUBLICITY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddPublicityError', () => {
    const expectedAction = {
      type: HOME_ADD_PUBLICITY_DISMISS_ERROR,
    };
    expect(dismissAddPublicityError()).toEqual(expectedAction);
  });

  it('handles action type HOME_ADD_PUBLICITY_BEGIN correctly', () => {
    const prevState = { addPublicityPending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PUBLICITY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPublicityPending).toBe(true);
  });

  it('handles action type HOME_ADD_PUBLICITY_SUCCESS correctly', () => {
    const prevState = { addPublicityPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PUBLICITY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPublicityPending).toBe(false);
  });

  it('handles action type HOME_ADD_PUBLICITY_FAILURE correctly', () => {
    const prevState = { addPublicityPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PUBLICITY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPublicityPending).toBe(false);
    expect(state.addPublicityError).toEqual(expect.anything());
  });

  it('handles action type HOME_ADD_PUBLICITY_DISMISS_ERROR correctly', () => {
    const prevState = { addPublicityError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_PUBLICITY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addPublicityError).toBe(null);
  });
});

