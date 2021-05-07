import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import SignIn from '../views/SingIn'
import Footer from '../components/Footer'
import Video from '../views/Video'
import UserConnect from '../views/UserConnect'
import Profil from '../views/Profil'
import Moderateur from '../views/Moderateur'
import Publications from '../views/Publications'
import Comment from '../components/Comment'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/comment',
    name: 'Comment',
    component: Comment
  },
   {
     path:'/footer',
     name:'Footer',
     component: Footer

   },
   {
     path: '/login',
     name: 'Login',
     component: Login
   },
   {
     path: '/singIn',
     name: 'SingIn',
     component: SignIn
   },
 
   {
     path:'/publications',
     name: 'Publications',
     component: Publications
   },
   {
     path: '/video',
     name: 'Video',
     component: Video
   },
   {
     path:'/userConnect',
     name:'UserConnect',
     component: UserConnect
   },
   {
     path:'/profil',
     name:'Profil',
     component:Profil
   },
   {
     path:'/moderateur',
     name:'Moderateur',
     component: Moderateur
   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
