import {
  DefaultPage,
  Home,
  Login,
  Article,
  Register,
  TextEditor,
  UserProfile,
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
    { path: 'feed', name: 'Home', component: Home },
    { path: 'login', name: 'Login', component: Login },
    { path: 'register', name: 'Register', component: Register },
    { path: 'news/:id', name: 'Article', component: Article },
    { path: 'editor/:id', name: 'TextEditor', component: TextEditor },
    { path: 'profile/:id', name: 'User profile', component: UserProfile },
  ],
};
