import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_CATEGORIES_BEGIN,
  HOME_GET_CATEGORIES_SUCCESS,
  HOME_GET_CATEGORIES_FAILURE,
  HOME_GET_CATEGORIES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getCategories,
  dismissGetCategoriesError,
  reducer,
} from '../../../../src/features/home/redux/getCategories';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getCategories', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCategories succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCategories())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CATEGORIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CATEGORIES_SUCCESS);
      });
  });

  it('dispatches failure action when getCategories fails', () => {
    const store = mockStore({});

    return store.dispatch(getCategories({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CATEGORIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CATEGORIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetCategoriesError', () => {
    const expectedAction = {
      type: HOME_GET_CATEGORIES_DISMISS_ERROR,
    };
    expect(dismissGetCategoriesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_CATEGORIES_BEGIN correctly', () => {
    const prevState = { getCategoriesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_CATEGORIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCategoriesPending).toBe(true);
  });

  it('handles action type HOME_GET_CATEGORIES_SUCCESS correctly', () => {
    const prevState = { getCategoriesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CATEGORIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCategoriesPending).toBe(false);
  });

  it('handles action type HOME_GET_CATEGORIES_FAILURE correctly', () => {
    const prevState = { getCategoriesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CATEGORIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCategoriesPending).toBe(false);
    expect(state.getCategoriesError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_CATEGORIES_DISMISS_ERROR correctly', () => {
    const prevState = { getCategoriesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_CATEGORIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCategoriesError).toBe(null);
  });
});

