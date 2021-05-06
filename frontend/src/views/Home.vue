<template>
  <div >
    

      <NavbarFirst />
      
      <intranet-moderer/>
      <Footer/>
    </div>

</template>

<script>


import NavbarFirst from '../components/NavbarFirst'

import Footer from '../components/Footer'
import IntranetModerer from '../components/IntranetModerer.vue'
//import UserConnect from './UserConnect'

export default {
  name: 'Home',

  components: {  
    NavbarFirst,
    Footer,
    IntranetModerer,
   
  }, 
  data() {
    return  {
      connect : false 
    }
  },
  methods : {
  
  }
}
</script>
<style>

</style>