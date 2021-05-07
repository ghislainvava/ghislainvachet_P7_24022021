<template>     <!--page d'acceuil avant connection-->
  <div >
        <div class="d-flex justify-content-between">
            <img src="../assets/icon-left-font.png" alt="logo" class="w-25">
            <div class="mt-auto mb-auto mr-5">
                <div ><router-link  class="btn btn-primary btn-sm mb-3"  to="/Login"> connexion</router-link></div>
                <div ><router-link  class="btn btn-primary btn-sm"  to="/SingIn"> inscription</router-link></div>
            </div>
        </div>
        <div class="d-flex flex-column mt-5" >
                <img class="img-responsive" src="../assets/intranet.jpg">
         </div>  
      <Footer/>
    </div>
</template>

<script>
  // importation des composants

import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: {  
    Footer,
  }, 
}
</script>
