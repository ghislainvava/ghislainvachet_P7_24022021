<template>
<div class="User">
    <div class="navbarConnect">
    <img src="../assets/icon-left-font.png" id="logo">
    <div>
    <router-link type="button" to="/Profil" class="btn btn-outline-primary compte">Compte</router-link>
    <router-link v-if="isAdmin"   type="button" class="btn btn-outline-primary compte" to="/moderateur">Modérer</router-link>
    </div>
    </div>
    <div id="direction">
    <router-link type="button" class="btn btn-primary btn-lg" to="/Publications">Publications</router-link>
    <router-link type="button" class="btn btn-primary btn-lg " to="/video">Video</router-link>

    </div>
     <Footer/>
</div>
</template>
<script>
import Footer from '../components/Footer'
export default {
    name: "UserConnect",
    data()  {
        return{
            isAdmin: localStorage.getItem("isAdmin")
        }
    },
    components :  {
        Footer   
    }
}
</script>
<style>
    .navbarConnect{
        display: flex;
        justify-content: space-around;
    }
    .compte{
        height: 40px;
        margin: 20px;
        width: 100px;   
    }
    #direction{
        background-image:  url("../assets/intranet.jpg");
        width: 100%;
        height: 100%;
    }
</style>
