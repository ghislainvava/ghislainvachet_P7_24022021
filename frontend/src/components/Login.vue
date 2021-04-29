<template>
    <div>
     
      <div>
        <img class="height" src="../assets/icon-above-font.png" >
      </div>
     
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="Email">Adresse email</label>
                <input type="email" class="form-control" id="Email" aria-describedby="emailHelp" v-model="InputEmail" placeholder="Entrez votre email">
            </div>
            <div class="form-group">
                <label for="Password">Password</label>
                <input type="password" class="form-control" id="Password" v-model="InputPassword" placeholder="Entrez votre mot de passe">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return{
        InputEmail: "",
        InputPassword:"",
        token: localStorage.getItem("acces_token") || null,
        connect : false
    }
  },
    methods: {
       
              
                  handleSubmit(){
                  axios.post('http://localhost:3000/api/user/login',  {
                  
                      'InputEmail': this.InputEmail,
                      'InputPassword':this.InputPassword
                    })
                      .then(res => {

                        const token = (this.token = res.data.token);
                        const userId = res.data.userId;
                        localStorage.setItem("acces_token", token),
                        localStorage.setItem("userId", userId),
                        localStorage.setItem("isAdmin", res.data.isAdmin),
                        console.log(res);
                        alert("Vous êtes connectez !")
                        this.$router.push('/Userconnect');
                      })
                      .catch(error => {
                        const erreur = error.res.data
                        alert(erreur.error)
                      })
                    }
              },
      
}
</script>
<style scoped>
.height{
  height: 200px;
}
</style>
