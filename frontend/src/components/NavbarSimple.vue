<template >
<div>
    <div class="d-flex flex-row justify-content-between mx-md-3">
           
              <div>  <img src="../assets/icon-left-font.png" id="logo2" class=" "></div>
           
            
            <div class=" mt-5 mr-3 d-flex flex-row" >   
                
                <button @click="change()" type="button" class="btn btn-primary mt-3 mr-2 h-25">Accueil</button> 
                <button
                        @click="deconnecte()"  
                         class="btn btn-outline-primary mt-3 h-25">
                        <b-icon icon="box-arrow-right"></b-icon>
                </button>
            </div>
           
    </div>
    
</div>
</template>
<script>


export default {
    name:"NavbarSimple",
    data() {
        return {
            isAdmin: localStorage.getItem("isAdmin")
        }
         
    },
    methods : {
        deconnecte(){
           localStorage.clear();
           this.$router.push('/');
         },
          change(){
            this.$router.push('/Userconnect');
        }
    }
}
</script>
<style scoped>

 
   
</style>

