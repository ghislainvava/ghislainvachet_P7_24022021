<template>
<div >
    
    <NavbarSimple/>
    <IntranetModerer/>
    
    <div class="direction">
    <router-link type="button" class="btn btn-primary btn-lg mr-3" to="/Publications">Publications</router-link>
    <router-link type="button" class="btn btn-primary btn-lg " to="/video">Video</router-link>

    </div>
    
     <Footer/>
</div>
</template>
<script>
import Footer from '../components/Footer'
import NavbarSimple from '../components/NavbarSimple'
import IntranetModerer from '../components/IntranetModerer'
export default {
    name: "UserConnect",
    data()  {
        return{
            
        }
    },
    components :  {
        Footer,
        NavbarSimple,
        IntranetModerer
    },
    methods : {
        deconnecte(){
           localStorage.clear();
           this.$router.push('/');
         }
    }
}
</script>
<style>
    .compte{
        height: 40px;
        margin: 80px 20px auto auto;
        width: 100px;   
    }
    .direction{   
        width: 100%;
        height: 100%;
    }
    #logo2{
        height: 180px;
    }
    #un{
        height: 60px;
        margin: 0px;
    }
    #deux{
        height:38px;
        width: 50px;
        margin:0px;    
    }
    #trois{
        width: 60px;
        padding-top: 6px;   
    }
</style>
