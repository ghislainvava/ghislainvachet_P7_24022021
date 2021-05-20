import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
 
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Singin',
    name: 'SingIn',
    component:() => import('../views/SingIn.vue')
    
  },
  { path: '/forum', name: 'Forum', component:() => import('../views/Forum')},

  { path: '/Publications', name: 'Publications', component:() => import('../views/Publications')},
  { path: '/userConnect', name: 'UserConnect', component:() => import('../views/UserConnect')},
  { path: '/profil', name: 'Profil', component:() => import('../views/Profil')},
  { path: '/moderateur', name: 'Moderateur', component:() => import('../views/Moderateur')}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
