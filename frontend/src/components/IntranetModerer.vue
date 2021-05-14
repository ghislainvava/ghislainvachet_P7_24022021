<template>
    <div>
        <div v-show="isAdmin == 1" >
            <router-link   type="button" class="btn btn-outline-danger mb-5 " to="/moderateur">Modérer</router-link> 
        </div>
        <div v-show="home == 1">
    <router-link type="button" class="btn btn-outline-secondary btn-lg mr-3" to="/Publications">Publications</router-link>
    <router-link type="button" class="btn btn-outline-secondary btn-lg " to="/forum">Forum</router-link>

    </div>
        <div class="d-flex flex-column mt-5" >
                <img class="img-responsive" src="../assets/intranet.jpg">
         </div>  
    </div>
    
</template>

<script>
export default {
    data() {
        return {
        isAdmin: localStorage.getItem("isAdmin"),
        home:1
        }
    }
}
</script>
