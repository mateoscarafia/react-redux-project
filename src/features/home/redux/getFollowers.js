import {
  HOME_GET_FOLLOWERS_BEGIN,
  HOME_GET_FOLLOWERS_SUCCESS,
  HOME_GET_FOLLOWERS_FAILURE,
  HOME_GET_FOLLOWERS_DISMISS_ERROR,
} from './constants';
import * as VALUES from '../../../constants';
const axios = require('axios');

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getFollowers(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_FOLLOWERS_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.post(VALUES.BACKEND_URL + 'getfollowers', args);
      doRequest.then(
        res => {
          dispatch({
            type: HOME_GET_FOLLOWERS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: HOME_GET_FOLLOWERS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetFollowersError() {
  return {
    type: HOME_GET_FOLLOWERS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_FOLLOWERS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getFollowersPending: true,
        getFollowersError: null,
      };

    case HOME_GET_FOLLOWERS_SUCCESS:
      // The request is success
      return {
        ...state,
        getFollowersPending: false,
        getFollowersError: null,
        myfollowers: action.data,
      };

    case HOME_GET_FOLLOWERS_FAILURE:
      // The request is failed
      return {
        ...state,
        getFollowersPending: false,
        getFollowersError: action.data.error,
      };

    case HOME_GET_FOLLOWERS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getFollowersError: null,
      };

    default:
      return state;
  }
}
