import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthenticationLayout from '../layouts/AuthenticationLayout.vue'
import Home from '../views/Home.vue'
import Signin from '../views/authentication/Signin.vue'
import Signup from '../views/authentication/Signup.vue'
import ResetPassword from '../views/authentication/ResetPassword.vue'
import Dashboard from '../views/Dashboard.vue'
import BulletinBoard from '../views/BulletinBoard.vue'
import CardList from '../views/CardList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'bulletin-board',
        name: 'BulletinBoard',
        component: BulletinBoard
      },
      {
        path: 'card-list',
        name: 'CardList',
        component: CardList
      }
    ]
  },
  {
    path: '/authentication',
    component: AuthenticationLayout,
    children: [
      {
        path: 'signin',
        name: 'Signin',
        component: Signin
      },
      {
        path: 'signup',
        name: 'Signup',
        component: Signup
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPassword
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
