<template>
    <div>
        <div v-show="isAdmin == 1" >
            <router-link   type="button" class="btn btn-outline-danger  " to="/moderateur">Modérer</router-link> 
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
        isAdmin: localStorage.getItem("isAdmin")
        }
    }
}
</script>
