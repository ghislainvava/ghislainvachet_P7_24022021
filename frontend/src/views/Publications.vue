<template>
  <div class="corpus">

        <NavbarSimple/>
        <div id="container">
                    <h1>Créer un nouveau Post</h1>
                    <form @submit="publier">
                        
                        <textarea
                          class="form-control"
                          name="SujetPost"
                          rows="3"
                          placeholder="Décrire le post..."
                          v-model="SujetPost"
                        ></textarea>

                        <div id="postage">
                            <input type="file" ref="image" class="file-input" @change="upload()"  />
                            <button  type="submit" class="btn btn-primary btn-lg ">Publier</button>
                        </div>
                    </form>   
        </div>
        
           
        <div id="publier" v-for="pub in Publications" :key="pub.SujetPost" >
                  <div class="publipostage">
                        <div class="posteur">
                            <p> {{ pub.InputPseudo }} a posté le  {{ pub.date_post }}</p>
                        </div>
                        <div class="desc">
                            {{ pub.SujetPost }}
                        </div>
                        <button       
                            v-show="isAdmin == 1 || id_User == pub.id_User"              
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
                                  v-model.lazy = commentaire
                                ></textarea>
                                <button type="submit" 
                                        class="btn btn-outline-primary btnComment">
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

                          <div class="editer">
                                <p class="ps">{{ comment.InputPseudo }} a commenté:</p>
                                <p class="comment">{{ comment.commentaire }}</p>
                          <button   
                                v-show="isAdmin == 1 || id_User == comment.createur"                         
                                @click="deleteComment(comment)"       
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

  upload() {
    this.image = this.$refs.image.files[0];
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
  
    #container{
        margin: 50px 20px;
        background-color: white;  
    }

    h1{
      display: flex;
      align-self: flex-start;
    }
    .input-group-prepend{
        border-top-left-radius: 10px;
    }
    #publier{
      margin : 20px 20px 60px 20px;
      border-radius: 10px;
       
    }
    .posteur{
      background-color: rgb(236, 236, 236);
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
      border: rgb(236, 236, 236) solid 1px;
      border-radius: 15px;
    }
    .comment{
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
      border : rgb(236, 236, 236) 1px solid;
      margin :10px;
      border-radius: 10px;
    }
   
   
</style>