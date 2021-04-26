<template>
        <div>
            <h2 class="mb-5">Voici la liste des utilisateurs</h2>
            <ul id="array">
                <li v-for="user in users" :key="user.InputPseudo">
                    {{ user.InputPseudo}} 
                    
                    <button         
                        @click="deleteUser(user)"
                        class="btnsup mt-3 btn btn-sm btn-outline-danger ml-5 mb-3 ">
                        Supprimer ce compte <b-icon icon="trash"></b-icon>
                    </button>
                    
                    
                </li>

            </ul>
            <button @click="change()" type="button" class="btn btn-primary mt-5">Accueil</button>
        </div>
</template>
<script>
import  axios from 'axios'


export default {
     components: {
 
  },
    data() { 
        return {
            users : [],
           

        }
    },
    methods : {
        change(){
            this.$router.push('/Userconnect');
        },
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

li{
    list-style: none;
}

</style>
