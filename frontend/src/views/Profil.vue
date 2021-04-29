<template >
<div class="desc">
<h1 v-if="user">Bienvenue {{ user.InputPseudo }} ! </h1>
<h2>Vous pouvez modifier votre profile ci-dessous : </h2>
<form  @submit.prevent="handleSubmit"  class="form-group"> 
  
  <div class="form-group" >
    
      <input   class="form-control" v-model="InputPseudo" placeholder="modifier ici" >
      <p v-if="InputPseudo">Votre Pseudo est : {{InputPseudo}}!</p>
      <p v-else>Votre nouveau Pseudo est : {{ InputPseudo }}</p>
      
  </div>
  <div class="form-group">
    <input   class="form-control" v-model="InputName" placeholder="modifier ici" >
      <p v-if="InputName">Votre  nom  est : {{ InputName }}</p>
      <p v-else>Votre nom actualisé est : {{InputName}}</p>
  </div>
  <div class="form-group">
    <input   class="form-control" v-model="InputLastName" placeholder="modifier ici" >
      <p v-if="InputLastName">Votre prénom  est : {{ InputLastName }}</p>
      <p v-else>Votre prénom rectifié est : {{InputLastName}}</p>
  </div>
  <div class="form-group">
    <input   class="form-control" v-model="InputEmail" placeholder="modifier ici" >
      <p v-if="InputEmail">Votre  adresse mail est : {{ InputEmail }}</p>
      <p v-else>Votre nouvelle adresse mail est : {{InputEmail}}</p>
  </div>
  
      <button type="submit" class="btn btn-primary">Modifier</button>

</form> 
  <div id="envoi">
    <button         
            @click="deleteSubmit()"
            class="btnsup mt-3 btn btn-sm btn-outline-danger">
            Supprimer votre compte <b-icon icon="exclamation-triangle"></b-icon>
          </button>

    
        
</div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
           user: [
              //user récupéré
           ],
           
           InputEmail: "", //user modifié


           InputName: "",
           InputLastName: "",
           InputPseudo: "",
          user_id: localStorage.getItem("userId") || null,

        }
    },
    methods: {
      handleSubmit(){
            axios.put(`http://localhost:3000/api/user/Profil/modify?id=${this.user_id}`, {
                'InputPseudo' : this.InputPseudo,
                'InputName' : this.InputName,
                'InputLastName' : this.InputLastName,
                'InputEmail': this.InputEmail
              }, { headers: {
                Authorization: `token ${localStorage.getItem("acces_token")}`
                }
              })
            .then(res => {
              alert(res.body.message)
              this.$router.push('/Userconnect');
            })
            .catch(error => {
              const erreur = error.res.data
              alert(erreur.error)
            })
        },
  
        deleteSubmit(){
          function testConfirmDialog()  {
              var result = confirm("Etes-vous sûr de vouloir supprimer votre compte?");
              if(result)  {
                  return 0
              } else { 
                  return 1
              }   
          }
            if (testConfirmDialog() == 0){
                axios.delete(`http://localhost:3000/api/user/Profil/modify?id=${this.user_id}`, { 
                  headers:{
                Authorization: `token ${localStorage.getItem("acces_token")}`
                }
              })
                .then(() => {
                  localStorage.clear()
                  this.$router.push('/');
                  
                })
                .catch((error) => {
                  const erreur = error.res.data
                  alert(erreur.error)
                  });
                }
         },
         
    },
    created(){
                console.log(this.user_id)
                this.user = [];
            axios.get(`http://localhost:3000/api/user/profil?id=${this.user_id}`, 
            {
              headers:{
                Authorization: `token ${localStorage.getItem("acces_token")}`
              }
            })
      .then(res => {
        this.InputEmail = res.data.InputEmail; 
        this.InputName = res.data.InputName;
        this.InputLastName = res.data.InputLastName;
        this.InputPseudo= res.data.InputPseudo;

        return this.user = res.data;
      })
      .catch(error => {
        const erreur = error.res.data
        alert(erreur.error)
      })
    }
        
}
</script>
<style scoped>
#envoi{
  display: flex;
  justify-content: space-around;
}

h2{
  font-size: 14px;
  margin-bottom: 30px;
}
h1{
  font-size: 18px;
  }
  .desc{
    display: flex;
    flex-direction: column;
  }

</style>