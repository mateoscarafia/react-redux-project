import {
  DefaultPage,
  Home,
  Login,
  Article,
  Register,
  TextEditor,
  UserProfile,
  TermsAndCond,
  EditArticle,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    { path: 'login', name: 'Login', component: Login },
    { path: 'feed/:info', name: 'Home', component: Home },
    { path: 'register', name: 'Register', component: Register },
    { path: 'news/:id', name: 'Article', component: Article },
    { path: 'editor/:id', name: 'TextEditor', component: TextEditor },
    { path: 'profile/:id', name: 'User profile', component: UserProfile },
    { path: '/terminosycondiciones', name: 'Terms and cond', component: TermsAndCond },
    { path: 'editarticle/:id', name: 'Edit article', component: EditArticle },
  ],
};
