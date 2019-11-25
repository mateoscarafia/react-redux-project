import initialState from './initialState';
import { reducer as getNewsReducer } from './getNews';
import { reducer as loginReducer } from './login';
import { reducer as getCategoriesReducer } from './getCategories';
import { reducer as getArticlesReducer } from './getArticles';
import { reducer as registerReducer } from './register';
import { reducer as getUserReducer } from './getUser';
import { reducer as postArticleReducer } from './postArticle';
import { reducer as getArticleReducer } from './getArticle';
import { reducer as fullUserReducer } from './fullUser';
import { reducer as getWriterReducer } from './getWriter';
import { reducer as followUserReducer } from './followUser';
import { reducer as userLikeReducer } from './userLike';
import { reducer as reportArticleReducer } from './reportArticle';
import { reducer as postViewsReducer } from './postViews';
import { reducer as postVisitReducer } from './postVisit';
import { reducer as isAuthReducer } from './isAuth';
import { reducer as getRelatedReducer } from './getRelated';
import { reducer as editUserReducer } from './editUser';
import { reducer as sendCommentReducer } from './sendComment';
import { reducer as getCommentsReducer } from './getComments';
import { reducer as isFollowReducer } from './isFollow';
import { reducer as deleteCommentReducer } from './deleteComment';

const reducers = [
  getNewsReducer,
  loginReducer,
  getCategoriesReducer,
  getArticlesReducer,
  registerReducer,
  getUserReducer,
  postArticleReducer,
  getArticleReducer,
  fullUserReducer,
  getWriterReducer,
  followUserReducer,
  userLikeReducer,
  reportArticleReducer,
  postViewsReducer,
  postVisitReducer,
  isAuthReducer,
  getRelatedReducer,
  editUserReducer,
  sendCommentReducer,
  getCommentsReducer,
  isFollowReducer,
  deleteCommentReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
