<template>
    <div>
        <img class="w-25 h-25" src="../assets/icon-above-font.jpg" alt="logo groupomania">
    
        <form @submit.prevent="submitHand" class="mx-auto w-75 ">
            <div class="form-group">
                <input type="email" class="form-control" id="Email" aria-describedby="emailHelp" v-model="InputEmail" placeholder="Entrez votre email">
            </div>
            <div class="form-group ">
                <input type="password" class="form-control" id="Password" v-model="InputPassword" placeholder="Entrez votre mot de passe">
            </div>
            <button type="submit" class="btn btn-secondary mt-3">Se connecter</button>
      </form>
    </div>
</template>
<script>
import axios from 'axios' //client http

export default {
  name: "login",
  data() {
    return{
        //v-model
        InputEmail: "",
        InputPassword:""
    }
  },
    methods: {
                  submitHand(){
                   
                    if (this.InputEmail =="" || this.InputPassword== ""){
                      this.$alert("Veuillez entrer votre email et votre mot de passe");
                    }else{
                  axios.post('http://localhost:3000/api/user/login',  {
                  
                      'InputEmail': this.InputEmail,
                      'InputPassword':this.InputPassword
                    },{
                         headers: {
                                      Authorization: `token ${localStorage.getItem("acces_token")}`
                                     
                                      }
                                  })
                      .then(res => {
                        
                        localStorage.setItem("acces_token", res.data.token), //recuperation du token  
                        localStorage.setItem("userId", res.data.userId), //recuperation du userId
                        localStorage.setItem("isAdmin", res.data.isAdmin), //recuperation isAdmin
                        
                        alert("Vous êtes connectez !"),
                        this.$router.push('/userconnect');
                      })
                      .catch(error => {
                        const erreur = error.res.data
                        alert(erreur.error)
                      })
                     }
                    }
              },
      
}
</script>
