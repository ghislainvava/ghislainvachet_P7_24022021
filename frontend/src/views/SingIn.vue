<template>
<div>
    <div>
        <img class="w-25 " src="../assets/icon-above-font.png" >
    </div>
    <form  @submit.prevent="handleSubmit"  class="form-group m-3"> <!-- formulaire -->
          <div class="form-group" >
              <label for="InputPseudo"></label>
                <input name="InputPseudo" 
                       type="text" 
                       class="form-control" 
                       id="InputPseudo" 
                       v-model="InputPseudo"   
                       placeholder="Entrez votre pseudonyme" 
                       required>
          </div>
          <div class="form-group">
              <label for="InputName"></label>
                <input name="InputName" 
                       type="text" 
                       class="form-control" 
                       id="InputName" 
                       v-model="InputName" 
                       placeholder="Entrez votre nom"  
                       required>
          </div>
          <div class="form-group">
              <label for="InputLastName"></label>
                <input name="InputLastName"   
                       type="text" 
                       class="form-control" 
                       id="InputLastName"  
                       v-model="InputLastName" 
                       placeholder="Entrez votre prénom" r
                       equired>
          </div>
          <div class="form-group">
                <label for="InputEmail"></label>
                <input  name="InputEmail" 
                        type="email" 
                        class="form-control" 
                        id="InputEmail"  
                        v-model="InputEmail" 
                        aria-describedby="emailHelp" 
                        placeholder="Entrez votre email" 
                        required>
          </div>
          <div class="form-group">
                <label for="InputPassword"></label>
                <input name="InputPassword" 
                       type="password" 
                       class="form-control" 
                       id="InputPassword" 
                       v-model="InputPassword" 
                       placeholder="Entrez votre mot de passe" 
                       required>
          </div>
          <button type="submit" 
                  class="btn btn-primary mt-3"
                  >Soumettre</button>
    </form> 
</div>
</template>
<script>
import axios from 'axios'  //client http

export default {
  name: "SignIn",
    data () {
      return {
       InputPseudo:"",
       InputName:"",
       InputLastName:"",
       InputEmail:"",
       InputPassword:"",
      
      }
    },
          methods: {
            handleSubmit(){               //methode pour envoyer l'inscription sur le serveur
            axios.post('http://localhost:3000/api/user/signup', { 
                'InputPseudo' : this.InputPseudo,
                'InputName' : this.InputName,
                'InputLastName': this.InputLastName,
                'InputEmail': this.InputEmail,
                'InputPassword':this.InputPassword
              })
                .then(res => {
                  console.log(res);
                  alert("Votre compte a bien été crée !")
                  this.$router.push('/');
                })
                .catch(error => {
                  const erreur = error.res.data
                  alert(erreur.error)
                })
              }
        },
      } 
         
</script>
