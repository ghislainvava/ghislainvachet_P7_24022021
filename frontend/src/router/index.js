import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login'
import SignIn from '../components/SingIn'
import Footer from '../components/Footer'
//import Commentaire from '../components/Commentaire'

import NavbarFirst from '../views/NavbarFirst'
import Video from '../views/Video'
import UserConnect from '../views/UserConnect'
import Profil from '../views/Profil'
import Moderateur from '../views/Moderateur'
import Publications from '../views/Publications'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nav',
    name: 'HomeNavbar',
    component: NavbarFirst
   },
   {
     path:'/Footer',
     name:'Footer',
     cmponent: Footer

   },
   {
     path: '/Login',
     name: 'Login',
     component: Login
   },
   {
     path: '/SingIn',
     name: 'SingIn',
     component: SignIn
   },
  //  {
  //    path: '/Commentaire',
  //    name: 'Commentaire',
  //    component: Commentaire
  //  },
   {
     path:'/Publications',
     name: 'Publications',
     component: Publications
   },
   {
     path: '/Video',
     name: 'Video',
     component: Video
   },
   {
     path:'/UserConnect',
     name:'UserConnect',
     component: UserConnect
   },
   {
     path:'/Profil',
     name:'Profil',
     component:Profil
   },
   {
     path:'/Moderateur',
     name:'Moderateur',
     component:Moderateur
   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
