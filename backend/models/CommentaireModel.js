const mysql = require('mysql');

//constructeur
const Comment = function (comment) {
   
    this.id_PostCommentaire = comment.id_PostCommentaire;
    this.SuejetComment = comment.SujetComment;
    this.id_Createur = comment.id_Createur;

}

module.exports = Comment;