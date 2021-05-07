<template>
<div>
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
                                        class=" ml-2 h-25 btn btn-outline-secondary btnComment">
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

                          <div class=" mt-3 border  rounded-top">
                                <p class="bg-secondary text-white rounded-top">{{ comment.InputPseudo }} a commenté:</p>
                                <div class=" d-flex justify-content-start">
                                  <p class="mx-2">{{ comment.commentaire }}</p>
                                  <button   
                                        v-show="isAdmin == 1 || id_User == comment.createur"                         
                                        @click="deleteComment(comment)"       
                                        class="btnsup  btn btn-sm btn-outline-danger border-light mb-5 mr-3">
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
    name: "Comment",
    data() {
        return{
            Commentaire : [[]],
            isAdmin: localStorage.getItem("isAdmin"),
            id_User : localStorage.getItem("userId") ,

        }
       
    },
    methods: {
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
                                .then(res => { console.log(res), alert("Votre commentaire a bien été ajoutée")  })
                                .catch(error => { alert(error) })
                        }
    }
}
</script>
