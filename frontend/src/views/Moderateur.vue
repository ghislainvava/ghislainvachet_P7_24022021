<template>
        
        <div>
            <NavbarSimple :montrer='true'/>
            <h2 >Voici la liste des utilisateurs</h2>
            <ul  class="d-flex flex-column  mt-5">
                <li class="pseudo d-flex justify-content-beetween " v-for="user in users" :key="user.InputPseudo">
                    <p class="kolko d-flex justify-content-start"  >{{ user.InputPseudo}}</p> 
                    <button         
                        @click="deleteUser(user)"
                        class="btnsup ml-5 mb-2 btn btn-sm btn-outline-danger  ">
                        <i class="fas fa-trash"></i> supprimer
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
    name: "Moderateur",
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
                  this.$router.go('/')
                 
                  
                })
                .catch(() => {
                 alert("Vous n'êtes pas administrateur la suppresion à échouée !")
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

.kolko{
    width: 200px;
}
h2{
    background-color: rgb(240, 240, 240);
}

</style>