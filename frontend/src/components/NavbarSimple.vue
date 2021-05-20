<template >
    <div class="container ">            <!--composant qui de la barre de navigation-->
           <div class="d-flex ">
                <div class="col-6 ">  
                    <img src="../assets/icon-left-font.jpg"
                         alt="logo-groupomania"
                         class="w-75 h-auto d-flex justify-content-start">
                </div>
                <div class="col-6  d-flex align-items-center justify-content-md-end  " >   
                    <button  v-show="montrer == true"
                             @click="change()" 
                             
                            class="btn btn-outline-secondary  mr-2 h-25 ">
                             Accueil
                            <i class="fas fa-home"></i>
                    </button> 
                    <button @click="account()" 
                           
                            class="btn btn-outline-secondary  mr-2 h-25">
                            <i class="far fa-user"></i> account
                    </button>
                    <button
                            @click="deconnecte()"  
                            
                            class="btn btn-outline-secondary  h-25 ">
                            <i class="fas fa-share-square"></i> Se déconnecter
                    </button>
                </div>
           </div>
    </div>
</template>
<script>


export default {
    name: "NavbarSimple",
    data(){
        return {
           
           
        }
    },
    props : {
        montrer: Boolean
    },

    methods : {
       
        deconnecte(){
           localStorage.clear();
           this.$router.push('/');
         },
          change(){
            this.$router.push('/userconnect');
        },
        account(){
            this.$router.push('/profil')
        }
    }
}
</script>
