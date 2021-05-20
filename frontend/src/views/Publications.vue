<template>
  <div class="">

        <NavbarSimple :montrer='true'/>
        <div class=" rounded bg-light createPost mx-2 px-2 mx-md-5 px-md-5 mb-5 py-3">
                    <h1>Créer un nouveau Post</h1>
                    <form method="post" @submit.prevent="publier"
                          enctype="multipart/form-data">
                            <textarea
                              class="form-control mb-3"
                              name="SujetPost"
                              rows="3"
                              placeholder="Décrire le post..."
                              v-model="SujetPost"
                            ></textarea>
                            <div class="d-md-flex justify-content-between" >
                              <label for="valider">Charger le fichier</label>
                                <input type="file" 
                                        id="valider"
                                        ref="image" 
                                        class="file-input"
                                        @change="upload()"/> 
                                <button  type="submit" 
                                        @click.prevent="publier" 
                                        class="btn btn-outline-secondary  font-weight-bold bg-white btn-md mt-2 mt-md-0"
                                        >Publier
                                </button>
                            </div>
                    </form>        
        </div>
        <div class=" rounded-top bg-light createPost mt-5 mx-2 px-2 mx-md-5 px-md-5 py-3" 
              v-for="pub in Publications" :key="pub.SujetPost" >
                  <div class="d-flex row ml-2">
                        <p class="border-bottom font-weight-bold"> <b>{{ pub.InputPseudo }}</b> a posté le  {{ dateFormat(pub.date_post) }}</p>
                        <br>
                        <img 
                        v-show="pub.image !== '' && pub.image !== null"
                        :src="pub.image"
                        class="w-75  mx-auto"
                        alt="image_ou_video"/>
                        <div class="d-flex w-100">
                           <p class="d-flex justify-content-start font-weight-bold">{{ pub.SujetPost }}</p>
                            <button       
                                v-show="isAdmin == 1 || id_User == pub.id_User"              
                                @click="deletePublication(pub)"       
                                class=" btnsup  btn btn-sm font-weight-bold border-light mb-5 mr-3">
                                <i class="fas fa-trash text-danger"></i> supprimer 
                            </button>
                        </div>
                  </div>
                  <form @submit="commenter(pub.id_Post)">
                            <div class="d-flex"> 
                                <textarea 
                                  class="form-control"
                                  name="commentaire"
                                  rows="3"
                                  placeholder="Écrivez votre commentaire...."
                                  v-model.lazy = commentaire
                                ></textarea>
                                
                                <button type="submit" 
                                        class=" ml-2 h-25 btn btn-outline-secondary  font-weight-bold bg-white">
                                        Commenter
                                </button>
                            </div>
                    </form> 
                    <div>
                             {{pub.commentaire}}
                    </div>
                    <div    v-for="comment in Commentaire.filter((comment) => {
                                return comment.id_PostComment == pub.id_Post;
                              })" :key="comment.date_commentaire " >
                           <div class=" mt-3 border  rounded-top">
                                <p class="bg-secondary text-white rounded-top">{{ comment.InputPseudo }} a commenté le :{{ dateFormat(comment.date_commentaire) }}</p>
                                <div class=" d-flex justify-content-start">
                                    <p class="mx-2 font-weight-bold">{{ comment.commentaire }}</p>
                                    <button   
                                          v-show="isAdmin == 1 || id_User == comment.createur"                         
                                          @click="deleteComment(comment)"       
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
    name: "Publications",
  data() {
    return {
      Publications:[],
      Commentaire : [],
       isAdmin: localStorage.getItem("isAdmin"),  //permet a vue de savoir si l'utilisateur est administrateur
       id_User : localStorage.getItem("userId") , //permet a vue de savoir si c'est le créateur du post ou commentaire
       SujetPost:"",
       date_post:"",
       id_Post:"",
       id_PostComment:"",
       commentaire:"",
       InputPseudo:"",
       id:"",
       Id_commentaire:"",
       image: null,
       createur:"",
      }
    },
    components : { 
      NavbarSimple
    },
    methods : {
      dateFormat(date){                                                       // Modification du format de Date
              const event = new Date(date);
              const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
              return event.toLocaleDateString('fr-FR', options);
          },
      upload() {
        this.image = this.$refs.image.files[0];
      },
               
      publier(){
        const data = new FormData();
            if (this.image == '' || this.image == null){
              data.append("id_User", this.id_User);
              data.append('SujetPost', this.SujetPost);
            }else{
              data.append("id_User", this.id_User);
              data.append('SujetPost', this.SujetPost);
              data.append('image', this.image, this.image.name);
            }
        axios.post(`http://localhost:3000/api/publication/post`, data,{
            headers:{
               Authorization: `token ${localStorage.getItem("acces_token")}` }
                      })
                .then(res => { console.log(res); this.$router.go("/publications"); })
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
         deletePublication(pub){
            if (this.testConfirmDialog() == 0){
                axios.delete(`http://localhost:3000/api/publication/delete?id_Post=${pub.id_Post}`,{
                    headers: {
                Authorization: `token ${localStorage.getItem("acces_token")}`
                              }
                            }) 
                .then((res) => {
                  console.log(res);this.$router.go("/publications");
                })
                .catch((error) => {
                  const erreur = error.res.data ; alert(erreur.error)
                  });
                }
            },
          deleteComment(comment){
            if (this.testConfirmDialog() == 0){
                axios.delete(`http://localhost:3000/api/commentaire/delete?Id_commentaire=${comment.Id_commentaire}`,{
                    headers: {
                Authorization: `token ${localStorage.getItem("acces_token")}`
                    }
                }) 
                .then((res) => { console.log(res) ; this.$router.go("/publications")})
                .catch((error) => { console.log(erreur); const erreur = error.res.data });
                }
            },
            commenter(id_Post){
                axios.post(`http://localhost:3000/api/commentaire/post`, {
                'id_PostComment' : id_Post ,
                'commentaire' : this.commentaire,
                'createur': this.id_User,
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
      axios.get(`http://localhost:3000/api/publication/get`, {
          headers:{
                Authorization: `token ${localStorage.getItem("acces_token")}`
              }
          })
          .then(res => { 
           this.Publications = res.data.AllPublications ;
           this.Commentaire = res.data.AllCommentaires;
           })
          .catch(error => { alert(error) })
      }  
  }
</script>
