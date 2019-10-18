import initialState from './initialState';
import { reducer as getNewsReducer } from './getNews';
import { reducer as loginReducer } from './login';
import { reducer as getCategoriesReducer } from './getCategories';
import { reducer as getArticlesReducer } from './getArticles';
import { reducer as getPromotedReducer } from './getPromoted';
import { reducer as registerReducer } from './register';
import { reducer as getUserReducer } from './getUser';
import { reducer as postArticleReducer } from './postArticle';
import { reducer as getArticleReducer } from './getArticle';
import { reducer as fullUserReducer } from './fullUser';
import { reducer as getSecArticlesReducer } from './getSecArticles';
import { reducer as getWriterReducer } from './getWriter';
import { reducer as followUserReducer } from './followUser';
import { reducer as userLikeReducer } from './userLike';
import { reducer as reportArticleReducer } from './reportArticle';

const reducers = [
  getNewsReducer,
  loginReducer,
  getCategoriesReducer,
  getArticlesReducer,
  getPromotedReducer,
  registerReducer,
  getUserReducer,
  postArticleReducer,
  getArticleReducer,
  fullUserReducer,
  getSecArticlesReducer,
  getWriterReducer,
  followUserReducer,
  userLikeReducer,
  reportArticleReducer,
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
