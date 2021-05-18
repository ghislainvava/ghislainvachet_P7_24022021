<template>
    <div >
        <NavbarSimple :montrer="false"/>
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
        data() {
            return {
              
            }
        },
 
    components :  {
        Footer,
        NavbarSimple,
        IntranetModerer
    },

}
</script>

