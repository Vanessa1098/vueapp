import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Secure from '@/components/secure'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-3424431.okta.com/oauth2/default',
  client_id: '0oaeij5vkHoY0d27O5d5',
  redirect_uri: window.location.origin + '/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/secure',
      name: 'Secure',
      component: Secure,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
