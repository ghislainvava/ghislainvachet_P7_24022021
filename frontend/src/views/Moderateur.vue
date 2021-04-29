<template>
        
        <div>
            <NavbarSimple/>
            <h2 class="mt-5 mb-5">Voici la liste des utilisateurs</h2>
            <ul  class="d-flex flex-column justify-content-center">
                <li class="pseudo " v-for="user in users" :key="user.InputPseudo">
                    {{ user.InputPseudo}} 
                    <button         
                        @click="deleteUser(user)"
                        class="btnsup ml-5 mb-2 btn btn-sm btn-outline-danger  ">
                        <b-icon icon="trash"></b-icon>
                    </button>
                </li>
            </ul>
          <Footer/>  
        </div>
</template>
<script>
import  axios from 'axios';
import NavbarSimple from '../components/NavbarSimple'
import Footer from '../components/Footer.vue';


export default {
     components: {
         NavbarSimple,
          Footer
 
  },
    data() { 
        return {
            users : [],
        }
    },
    methods : {
       
        deleteUser(user){
        function testConfirmDialog()  {
              var result = confirm("Etes-vous sûr de vouloir supprimer "+user.InputPseudo+" de ce réseau?");
              if(result)  {
                  return 0
              } else { 
                  return 1
              }   
          }
            if (testConfirmDialog() == 0){
                axios.delete(`http://localhost:3000/api/user/admin?id=${user.id}`,{
                    headers: {
                Authorization: `token ${localStorage.getItem("acces_token")}`
                    }
                }) 
                
                .then((res) => {
                    console.log(res)
                  alert("suppresion réussie");
                 
                  
                })
                .catch((error) => {
                  const erreur = error.res.data
                  alert(erreur.error)
                  });
                }
            }

    }, created(){
                
                this.users = [];
                console.log(this.users);
            axios.get(`http://localhost:3000/api/user/admin`, 
            {
              headers: {
                Authorization: `token ${localStorage.getItem("acces_token")}`
                }
            })
            .then(res => {
            // (this.users = res.body.data);
            console.log(res.data);
            return this.users = res.data.AllUsers;
        }
      )

      .catch(error => {
        const erreur = error.res.data
        alert(erreur.error)
      });
    
    }
}
</script>
<style scoped>

.pseudo{
    width: 150px;
    margin : 0 auto 10px auto ;
}
h2{
    background-color: rgb(240, 240, 240);
}

</style>
