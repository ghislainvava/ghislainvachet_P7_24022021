<template>
  <div class="home">
   
       
   <NavbarFirst />
        <img src="../assets/intranet.jpg">
    
    
    <Footer/>
  </div>  
</template>

<script>

//import HelloWorld from '@/components/HelloWorld.vue'
import NavbarFirst from './NavbarFirst'

import Footer from '../components/Footer'
//import UserConnect from './UserConnect'

export default {
  name: 'Home',

  components: {  
    NavbarFirst,
    Footer
  }
}
</script>
<style>
#direction{
  display: flex;
  justify-content: center;
}
.btn-lg{
  height: 50px;
  width: 160px;
  margin-right: 30px;
}
</style>