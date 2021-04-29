<template >
    <div class="d-flex flex-row justify-content-between">
           
              <div>  <img src="../assets/icon-left-font.png" id="logo2" class="ml-5 "></div>
           
            
            <div class=" mt-5 mr-5 d-flex flex-row" >   
                <div v-show="isAdmin == 1"><router-link    type="button" class="btn btn-outline-danger h-25 mt-3 mr-5" to="/moderateur">Modérer</router-link> </div>
                <button @click="change()" type="button" class="btn btn-primary mt-3 mr-5 h-25">Accueil</button> 
                <button
                        @click="deconnecte()"  
                         class="btn btn-outline-primary mt-3 h-25">
                        <b-icon icon="box-arrow-right"></b-icon>
                </button>
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

