import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_REPORT_ARTICLE_BEGIN,
  HOME_REPORT_ARTICLE_SUCCESS,
  HOME_REPORT_ARTICLE_FAILURE,
  HOME_REPORT_ARTICLE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  reportArticle,
  dismissReportArticleError,
  reducer,
} from '../../../../src/features/home/redux/reportArticle';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/reportArticle', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when reportArticle succeeds', () => {
    const store = mockStore({});

    return store.dispatch(reportArticle())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_REPORT_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_REPORT_ARTICLE_SUCCESS);
      });
  });

  it('dispatches failure action when reportArticle fails', () => {
    const store = mockStore({});

    return store.dispatch(reportArticle({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_REPORT_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_REPORT_ARTICLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissReportArticleError', () => {
    const expectedAction = {
      type: HOME_REPORT_ARTICLE_DISMISS_ERROR,
    };
    expect(dismissReportArticleError()).toEqual(expectedAction);
  });

  it('handles action type HOME_REPORT_ARTICLE_BEGIN correctly', () => {
    const prevState = { reportArticlePending: false };
    const state = reducer(
      prevState,
      { type: HOME_REPORT_ARTICLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.reportArticlePending).toBe(true);
  });

  it('handles action type HOME_REPORT_ARTICLE_SUCCESS correctly', () => {
    const prevState = { reportArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_REPORT_ARTICLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.reportArticlePending).toBe(false);
  });

  it('handles action type HOME_REPORT_ARTICLE_FAILURE correctly', () => {
    const prevState = { reportArticlePending: true };
    const state = reducer(
      prevState,
      { type: HOME_REPORT_ARTICLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.reportArticlePending).toBe(false);
    expect(state.reportArticleError).toEqual(expect.anything());
  });

  it('handles action type HOME_REPORT_ARTICLE_DISMISS_ERROR correctly', () => {
    const prevState = { reportArticleError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_REPORT_ARTICLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.reportArticleError).toBe(null);
  });
});

