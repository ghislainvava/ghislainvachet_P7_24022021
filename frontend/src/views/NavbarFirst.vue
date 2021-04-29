<template>
    <div class="nav" >
        <img src="../assets/icon-left-font.png" id="logo">
        <div id="connexion">
           <router-link  class="btn btn-primary btn-sm"  to="/Login"> connexion</router-link>
           <router-link  class="btn btn-primary btn-sm"  to="/SingIn"> inscription</router-link>
        </div>
    </div>
</template>
<script>
export default {
    setup() {
        
    },
    
}
</script>
<style>
    .nav{
        display: flex;
        justify-content: space-between;
        margin-right: 20px;
        margin-left: 20px;
    }
    #connexion {
        display: flex;
       flex-direction: column;
    }

    .btn-primary{
        margin-bottom: 10px;
    }

    #logo {
        height: 120px;
    }

</style>