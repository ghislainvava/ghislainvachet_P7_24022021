<template>
  <div id="corps">
        <div class="container">
                    <h1>Créer un nouveau Post</h1>
                    <form @submit="publier">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend"><span class="input-group-text" id="inputGroup">Thême</span></div>
                            <input name="titlePost" type="text" v-model="titlePost" class="form-control" aria-label="Groupe d'input de taille normale" aria-describedby="inputGroup" required>
                        </div>
                        
                        <textarea
                          class="form-control"
                          name="SujetPost"
                          rows="3"
                          placeholder="Décrire le post..."
                          v-model="SujetPost"
                        ></textarea>

                        <div id="postage">
                        <input type="file" ref="image" class="file-input" @change="upload($event)"  />
                        <button  type="submit" class="btn btn-primary btn-lg ">Publier</button>
                         </div>
                    </form>
                    
        </div>
        
           
                <div class="publier" v-for="pub in Publications" :key="pub.titlePost" >
                  <div class="publipostage">
                        <div class="posteur">
                          <p> {{ pub.InputPseudo }} a posté le  {{ pub.date_post }}</p>
                       
                        </div>

                        <div class="desc">
                          {{ pub.SujetPost }}
                        </div>
                   

                        <button                            
                            @click="deletePublication(pub)"       
                            class="btnsup mt-3 btn btn-sm btn-outline-danger mb-3">
                             <b-icon icon="trash"></b-icon>
                        </button>
                    </div>

                      <form @submit="commenter(pub.id_Post)">
                  
                            <div class="bouton">
                                
                                <textarea 
                                  class="form-control"
                                  name="commentaire"
                                  rows="3"
                                  placeholder="Écrivez votre commentaire...."
                                  v-model = commentaire
                                
                                ></textarea>
                                <button type="submit" 
                                        class="btn btn-outline-primary btnComment">Commenter</button>
                            </div>
                        </form> 
                        <div>
                          {{pub.commentaire}}
                        </div>
          
                      <div    v-for="comment in Commentaire.filter((comment) => {
                                return comment.id_PostComment == pub.id_Post;
                              })"
                              :key="comment.Id_commentaire " >

                          <div class="editer">
                          <p class="ps">{{ comment.InputPseudo }} a commenté:</p>
                          <p class="comment">{{ comment.commentaire }}</p>
                          <button                            
                            @click="deletecomment(comment)"       
                            class="btnsup mt-3 btn btn-sm btn-outline-danger mb-3">
                             <b-icon icon="trash"></b-icon>
                        </button>
            
                        
                </div>
            </div>
    </div>
</div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      Publications:[],
      Commentaire : [[]],
       isAdmin: localStorage.getItem("isAdmin"),
       id_User : localStorage.getItem("userId") ,
       titlePost:"",
       SujetPost:"",
       date_post:"",
       id_Post:"",
       id_PostComment:"",
       commentaire:"",
       InputPseudo:"",
       
       Id_commentaire:"",
       image:null 
    }
  },
  components : {
     
  },
  methods : {
    upload() {
      this.image = this.$refs.image.files[0];
      console.log(this.image);
    },
    publier(){
      console.log(this.image)
              this.Publications = [];
                axios.post(`http://localhost:3000/api/publication/post`, {
                'id_User' : this.id_User ,
                'titlePost' : this.titlePost,
                'SujetPost': this.SujetPost,
                'image' : this.image
              },
            {
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
       deletePublication(pub){
        function testConfirmDialog()  {
              var result = confirm("Etes-vous sûr de vouloir supprimer cette publication "+pub.id_Post +"?");
              if(result)  {
                  return 0
              } else { 
                  return 1
              }   
          }
            if (testConfirmDialog() == 0){

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
        function testConfirmDialog()  {
              var result = confirm("Etes-vous sûr de vouloir supprimer ce commentaire ?");
              if(result)  {
                  return 0
              } else { 
                  return 1
              }   
          }
            if (testConfirmDialog() == 0){

                axios.delete(`http://localhost:3000/api/commentaire/delete?Id_commentaire=${comment.Id_commentaire}`,{
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
            condition(){
              this.isAdmin;
              this.userId;
              this.Puplications;
               if (this.isAdmin === 1 || this.pub.id_User === this.id_User) {
                 return  true
               } else {
                 return  false
               }

            },
            commenter(id_Post){
              this.Commentaire = [];
                axios.post(`http://localhost:3000/api/commentaire/post`, {
                'id_PostComment' : id_Post ,
                'commentaire' : this.commentaire,
                'createur': this.id_User,
              },
            {
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
    .container{
        margin: 50px auto;
    }
    h1{
      display: flex;
      align-self: flex-start;
    }
    .input-group-prepend{
        border-top-left-radius: 10px;
    }
    .publier{
      margin : 20px 20px 60px 20px;
      border-radius: 10px;
    }
    .posteur{
      background-color: rgb(243, 240, 240);
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .desc{
      margin: 20px;
      display: flex;
      justify-content: flex-start;
    }
    .editer{ 
      display :flex;
      justify-content: space-around;
      margin : 15px;
    }
    .comment{
      background-color: rgb(240, 240, 240);
      border-radius: 15px;
      width : 80%;
      display: flex;
      justify-content: start;
      align-items: center;
      padding : 10px;
    }
    .ps{
      width: 10%;
    }
    #postage{
      display: flex;
      justify-content: space-between;
      margin-top : 15px;
    }
    .btn-primary{
      margin-right: 0px;
    }
    .bouton{
      display: flex;
      margin: 25px;
    }
    .btnComment{
      height: 40px;
      margin-left: 20px;
    }
    .publipostage{
      border : black 1px solid;
      margin :10px;
      border-radius: 10px;
    }
   
   
</style>