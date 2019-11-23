import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_EDIT_USER_BEGIN,
  HOME_EDIT_USER_SUCCESS,
  HOME_EDIT_USER_FAILURE,
  HOME_EDIT_USER_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  editUser,
  dismissEditUserError,
  reducer,
} from '../../../../src/features/home/redux/editUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/editUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when editUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(editUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_EDIT_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_EDIT_USER_SUCCESS);
      });
  });

  it('dispatches failure action when editUser fails', () => {
    const store = mockStore({});

    return store.dispatch(editUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_EDIT_USER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_EDIT_USER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissEditUserError', () => {
    const expectedAction = {
      type: HOME_EDIT_USER_DISMISS_ERROR,
    };
    expect(dismissEditUserError()).toEqual(expectedAction);
  });

  it('handles action type HOME_EDIT_USER_BEGIN correctly', () => {
    const prevState = { editUserPending: false };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_USER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editUserPending).toBe(true);
  });

  it('handles action type HOME_EDIT_USER_SUCCESS correctly', () => {
    const prevState = { editUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_USER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editUserPending).toBe(false);
  });

  it('handles action type HOME_EDIT_USER_FAILURE correctly', () => {
    const prevState = { editUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editUserPending).toBe(false);
    expect(state.editUserError).toEqual(expect.anything());
  });

  it('handles action type HOME_EDIT_USER_DISMISS_ERROR correctly', () => {
    const prevState = { editUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_EDIT_USER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editUserError).toBe(null);
  });
});

