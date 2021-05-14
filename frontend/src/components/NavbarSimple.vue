<template >
    <div class="container ">            <!--composant qui de la barre de navigation-->
           <div class="d-flex ">
                <div class="col-6 ">  
                    <img src="../assets/icon-left-font.png"
                         alt="logo-groupomania"
                         class="w-75 d-flex justify-content-start">
                </div>
                <div class="col-6  d-flex align-items-center justify-content-md-end  " >   
                    <button @click="change()" 
                            class="btn btn-outline-primary  mr-2 h-25 border-white">
                            <b-icon icon="house-door-fill"></b-icon>
                    </button> 
                    <button @click="account()" 
                            class="btn btn-outline-primary border-white  mr-2 h-25">
                            <b-icon icon="file-person"></b-icon>
                    </button>
                    <button
                            @click="deconnecte()"  
                            class="btn btn-outline-primary  h-25 border-white">
                            <b-icon icon="box-arrow-right"></b-icon>
                    </button>
                </div>
           </div>
    </div>
</template>
<script>


export default {
    name: "NavbarSimple",

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


