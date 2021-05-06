<template>
<div >
    
    <NavbarSimple/>
    <IntranetModerer/>
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
            home : 1
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
    
 
   
</style>
