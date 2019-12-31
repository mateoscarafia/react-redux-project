import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_NEWS_VISITS_BEGIN,
  HOME_GET_NEWS_VISITS_SUCCESS,
  HOME_GET_NEWS_VISITS_FAILURE,
  HOME_GET_NEWS_VISITS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getNewsVisits,
  dismissGetNewsVisitsError,
  reducer,
} from '../../../../src/features/home/redux/getNewsVisits';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getNewsVisits', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getNewsVisits succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getNewsVisits())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_NEWS_VISITS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_NEWS_VISITS_SUCCESS);
      });
  });

  it('dispatches failure action when getNewsVisits fails', () => {
    const store = mockStore({});

    return store.dispatch(getNewsVisits({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_NEWS_VISITS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_NEWS_VISITS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetNewsVisitsError', () => {
    const expectedAction = {
      type: HOME_GET_NEWS_VISITS_DISMISS_ERROR,
    };
    expect(dismissGetNewsVisitsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_NEWS_VISITS_BEGIN correctly', () => {
    const prevState = { getNewsVisitsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_NEWS_VISITS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNewsVisitsPending).toBe(true);
  });

  it('handles action type HOME_GET_NEWS_VISITS_SUCCESS correctly', () => {
    const prevState = { getNewsVisitsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_NEWS_VISITS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNewsVisitsPending).toBe(false);
  });

  it('handles action type HOME_GET_NEWS_VISITS_FAILURE correctly', () => {
    const prevState = { getNewsVisitsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_NEWS_VISITS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNewsVisitsPending).toBe(false);
    expect(state.getNewsVisitsError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_NEWS_VISITS_DISMISS_ERROR correctly', () => {
    const prevState = { getNewsVisitsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_NEWS_VISITS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getNewsVisitsError).toBe(null);
  });
});

