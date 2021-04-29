<template>
  <div class="home">
    <div class="container-fluid">

      <NavbarFirst />
      
      <div class="row">
          <div class= "col-12">
              <img class=img-responsive src="../assets/intranet-325.jpg">
          </div>
      </div>
        <Footer/>
    </div>
  </div>  
</template>

<script>


import NavbarFirst from './NavbarFirst'

import Footer from '../components/Footer'
//import UserConnect from './UserConnect'

export default {
  name: 'Home',

  components: {  
    NavbarFirst,
    Footer,
   
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
#direction{
  display: flex;
  justify-content: center;
}
.btn-lg{
  height: 50px;
  width: 160px;
  margin-right: 30px;
}
.home{
  margin-top: 10px;
}
</style>