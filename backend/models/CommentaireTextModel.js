const mysql = require('mysql');

//constructeur
const Comment = function (comment) {
   
    this.id_PostComment = comment.id_PostComment;
    this.commentaire = comment.commentaire;
    this.createur = comment.createur;

}

module.exports = Comment;