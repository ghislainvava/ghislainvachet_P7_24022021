<template>
    <div>
        <navbar-simple :montrer='true'/>
       <div class=" rounded bg-light createPost mx-2 px-2 mx-md-5 px-md-5 mb-5 py-3">
                    <h1>Créer un nouveau Post</h1>
                    <form method="post" @submit.prevent="publierPost">
                            <textarea
                              class="form-control mb-3"
                              name="Sujet"
                              rows="3"
                              placeholder="Décrire le post..."
                              v-model="Sujet"
                            ></textarea>
                            <div class="d-md-flex justify-content-between" >
                               
                                <button  type="submit" 
                                        @click.prevent="publierPost" 
                                        class="btn btn-outline-secondary font-weight-bold bg-white btn-md mt-2 mt-md-0"
                                        >Publier
                                </button>
                            </div>
                    </form>        
        </div>
        <div class=" rounded-top bg-light createPost mt-5 mx-2 px-2 mx-md-5 px-md-5 py-3" 
              v-for="publi in Publication" :key="publi.Sujet" >
                  <div class="d-flex row ml-2">
                        <p class="border-bottom font-weight-bold"> <b>{{ publi.InputPseudo }}</b> a posté le  {{ dateForm(publi.date_p) }}</p>
                        <div class="d-flex w-100">
                           <p class="d-flex justify-content-start font-weight-bold">{{ publi.Sujet }}</p>
                            <button       
                                v-show="isAdmin == 1 || id_U == publi.id_U"              
                                @click="deletePub(publi)"       
                                class=" btnsup  btn btn-sm font-weight-bold border-light mb-5 mr-3">
                                <i class="fas fa-trash text-danger"></i> supprimer
                            </button>
                        </div>
                  </div>
                  <form @submit="comment(publi.id_P)">
                            <div class="d-flex"> 
                                <textarea 
                                  class="form-control"
                                  name="SujetComment"
                                  rows="3"
                                  placeholder="Écrivez votre commentaire...."
                                  v-model.lazy = SujetComment
                                ></textarea>
                                <button type="submit" 
                                        class=" ml-2 h-25 btn btn-outline-secondary font-weight-bold bg-white">
                                        Commenter
                                </button>
                            </div>
                    </form> 
                    <div>
                             {{publi.SujetComment}}
                    </div>
                    <div    v-for="comment in Commentaires.filter((comment) => {
                                return comment.id_PostCommentaire == publi.id_P;
                              })" :key="comment.date_comment " >
                           <div class=" mt-3 border  rounded-top">
                                <p class="bg-secondary text-white rounded-top font-weight-bold">{{ comment.InputPseudo }} a commenté le :{{ dateForm(comment.date_comment) }}</p>
                                <div class=" d-flex justify-content-start">
                                    <p class="mx-2">{{ comment.SujetComment }}</p>
                                    <button   
                                          v-show="isAdmin == 1 || id_U== comment.id_Createur"                         
                                          @click="deleteCommentaire(comment)"       
                                          class=" btnsup  btn btn-sm font-weight-bold border-light mb-5 mr-3">
                                            <i class="fas fa-trash text-danger"></i> supprimer
                                    </button>
                                </div>
                          </div>
                    </div>
        </div>
</div>
</template>

<script>
import axios from 'axios';
import NavbarSimple from '../components/NavbarSimple'
export default {
    name: "forum",
  data() {
    return {
      Publication:[],
      Commentaires : [],
       isAdmin: localStorage.getItem("isAdmin"),  //permet a vue de savoir si l'utilisateur est administrateur
       id_U: localStorage.getItem("userId") , //permet a vue de savoir si c'est le créateur du post ou commentaire
       Sujet:"",
       date_p:"",
       id_P:"",
       id_PostCommentaire:"",
       SujetComment:"",
       InputPseudo:"",
       id:"",
       Id_Comment:"",
       id_Createur: ""
      }
    },
    components : { 
      NavbarSimple
    },
    methods : {
      dateForm(date){                                                       // Modification du format de Date
              const event = new Date(date);
              const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
              return event.toLocaleDateString('fr-FR', options);
          },
      
               
      publierPost(){
            
        axios.post(`http://localhost:3000/api/forumtext/publication/post`,{
          
              'id_U': this.id_U,
              'Sujet': this.Sujet,
        },{
            headers:{
               Authorization: `token ${localStorage.getItem("acces_token")}` }
                      })
                .then(res => { console.log(res); this.$router.go("/forum"); })
                .catch(error => { alert(error) })
        },
        testConfirmDialog()  {
                var result = confirm("Etes-vous sûr de vouloir faire cette suppression ?");
                if(result)  {
                    return 0
                } else { 
                    return 1
                }   
            },
         deletePub(publi){
            if (this.testConfirmDialog() == 0){
                axios.delete(`http://localhost:3000/api/forumtext/publication/delete?id_P=${publi.id_P}`,{
                    headers: {
                Authorization: `token ${localStorage.getItem("acces_token")}`
                              }
                            }) 
                .then((res) => {
                  console.log(res);this.$router.go('/forum');
                })
                .catch((error) => {
                  const erreur = error.res.data ; alert(erreur.error)
                  });
                }
            },
          deleteCommentaire(comment){
            if (this.testConfirmDialog() == 0){
                axios.delete(`http://localhost:3000/api/forumtext/commentaire/delete?Id_comment=${comment.Id_comment}`,{
                    headers: {
                Authorization: `token ${localStorage.getItem("acces_token")}`
                    }
                }) 
                .then((res) => { console.log(res); this.$router.go('/forum') })
                .catch((error) => { console.log(erreur); const erreur = error.res.data });
                }
            },
            comment(id_P){
                axios.post(`http://localhost:3000/api/forumtext/commentaire/post`, {
                'id_PostCommentaire' : id_P ,
                'SujetComment' : this.SujetComment,
                'id_Createur': this.id_U,
              },{
                    headers:{
                      Authorization: `token ${localStorage.getItem("acces_token")}`
                    }
            })
            .then(res => {
            console.log(res), alert("Votre commentaire a bien été ajoutée")  })
            .catch(error => { alert(error) })
     }
}, 
 created(){
   this.Publication = [];
   this.Commentaires = [];
      axios.get(`http://localhost:3000/api/forumtext/publication/get`, {
          headers:{
                Authorization: `token ${localStorage.getItem("acces_token")}`
              }
          })
          .then(res => { 
           this.Publication = res.data.AllPublication ;
           this.Commentaires = res.data.AllCommentaire;
           
           })
          .catch(error => { alert(error) })
      }  
  }
</script>