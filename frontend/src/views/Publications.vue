<template>
  <div >

        <NavbarSimple/>
        <div class=" createPost mx-2 px-2 mx-md-5 px-md-5 mb-5 py-3">
                    <h1>Créer un nouveau Post</h1>
                    <form @submit="publier">
                        <textarea
                          class="form-control mb-3"
                          name="SujetPost"
                          rows="3"
                          placeholder="Décrire le post..."
                          v-model="SujetPost"
                        ></textarea>
                        <div class="d-md-flex justify-content-between" >
                            <input type="file" ref="image" class="file-input" @change="upload"  />
                            <button  type="submit" class="btn btn-primary btn-md mt-2 mt-md-0">Publier</button>
                        </div>
                    </form>   
        </div>
        <div class="createPost mt-5 mx-2 px-2 mx-md-5 px-md-5 py-3" v-for="pub in Publications" :key="pub.SujetPost" >
                  <div class="d-flex row ml-2">
                        
                            <p class="border-bottom"> <b>{{ pub.InputPseudo }}</b> a posté le  {{ pub.date_post }}</p>
                      
                           
                        
                        <div class="d-flex    w-100">
                           <p class="d-flex justify-content-start">{{ pub.SujetPost }}</p>
                            <button       
                                v-show="isAdmin == 1 || id_User == pub.id_User"              
                                @click="deletePublication(pub)"       
                                class=" btnsup  btn btn-sm btn-outline-danger border-white mb-5 mr-3">
                                <b-icon icon="trash"></b-icon>
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
                                        class=" ml-2 h-25 btn btn-outline-primary btnComment">
                                        Commenter
                                </button>
                            </div>
                    </form> 
                    <div>
                             {{pub.commentaire}}
                    </div>
          
                    <div    v-for="comment in Commentaire.filter((comment) => {
                                return comment.id_PostComment == pub.id_Post;
                              })"
                              :key="comment.Id_commentaire " >

                          <div class=" mt-3 border  rounded">
                                <p class="bg-secondary text-white rounded">{{ comment.InputPseudo }} a commenté:</p>
                                <div class=" d-flex justify-content-start">
                                  <p class="comment">{{ comment.commentaire }}</p>
                                  <button   
                                        v-show="isAdmin == 1 || id_User == comment.createur"                         
                                        @click="deleteComment(comment)"       
                                        class="btnsup  btn btn-sm btn-outline-danger border-white mb-5 mr-3">
                                        <b-icon icon="trash"></b-icon>
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
  data() {
    return {
      Publications:[],
      Commentaire : [[]],
       isAdmin: localStorage.getItem("isAdmin"),
       id_User : localStorage.getItem("userId") ,
       SujetPost:"",
       date_post:"",
       id_Post:"",
       id_PostComment:"",
       commentaire:"",
       InputPseudo:"",
       id:"",
       Id_commentaire:"",
       image:null ,
       createur:""
    }
  },
  components : { 
    NavbarSimple
    
  },
  methods : {

  upload(event) {
    this.image = event.target.files[0];
    //this.image = this.$refs.image.files[0];
    console.log(this.image);
                },
      
    
    
    publier(){
      console.log(this.image)
              this.Publications = [];
                axios.post(`http://localhost:3000/api/publication/post`, {
                'id_User' : this.id_User ,
                'SujetPost': this.SujetPost,
                'image' : this.image
                    },{
                        headers:{
                          Authorization: `token ${localStorage.getItem("acces_token")}`
                        }
            })
              .then(res => {
                console.log(res)
              alert("Votre publication a bien été ajoutée") 
              })
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
                    console.log(res) ; this.$router.go("/publications");
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
              this.Commentaire = [];
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
      this.Puplications = [];
      axios.get(`http://localhost:3000/api/publication/get`, {
          headers:{
                Authorization: `token ${localStorage.getItem("acces_token")}`
              }
          })
          .then(res => { 
           this.Publications = res.data.AllPublications ;
           console.log(res.data.AllPublications);
           this.Commentaire = res.data.AllCommentaires;
           console.log(res.data.AllCommentaires);
           })
          .catch(console.log("probleme d'acces aux publications"))
      }  
  }
</script>

<style>
.createPost{
  border: rgb(54, 121, 246) 5px solid;
  border-radius: 15px;
}
    
    .input-group-prepend{
        border-top-left-radius: 10px;
    }
   

   
    .publipostage{
      border : rgb(236, 236, 236) 1px solid;
      margin :10px;
      border-radius: 10px;
    }
   
   
</style>