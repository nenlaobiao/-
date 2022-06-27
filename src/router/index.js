import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Layout from '@/views/Layout'
import User from '@/views/User'
import HouseList from '@/views/HouseList'
import InfoList from '@/views/InfoList'
import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'user', component: User },
      { path: 'houselist', component: HouseList },
      { path: 'infolist', component: InfoList }
    ]
  },
  { path: '/login', component: Login }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
