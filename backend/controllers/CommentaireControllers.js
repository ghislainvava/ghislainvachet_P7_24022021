const mysql = require("mysql");
const fs = require("fs");
const db = require('../middleware/connect');
const Comment = require("../models/CommentaireModel");

exports.editComment = (req,res) =>{
    const posterComment = new Comment({
        id_PostComment : req.body.id_PostComment,
        commentaire : req.body.commentaire,
        createur : req.body.createur
    });
    db.query(`INSERT INTO CommentGroupomania(id_PostComment, commentaire, createur) VALUES(?, ?, ?)`,
    [posterComment.id_PostComment, posterComment.commentaire, posterComment.createur],function(err,data,fields){
      if (err) {
        if (err.kind === "not_found") {
          res.status(405).send({ message: "Commentaires non trouvé"});
        } else {
          res.status(401).send({message: "ça marche pas !"});
        }
      } else {  
        res.status(201).json({posterComment, message: "Commentaire postée !"});
    }
  })
};
exports.deleteComment = (req, res) => { 
  let sql =  'DELETE FROM CommentGroupomania WHERE Id_commentaire = ?';
  db.query(sql, [req.query.Id_commentaire] , function (err, data, fields){
    if (err) {
      if (err.kind === "not_found") {
        res.status(405).send({
          message: `commentaire non trouvé`
        });
      } else {
        res.status(500).send({
          message: "erreur avec l'id " 
        });
      }
    }else{
      res.status(201).json({
        message:  "le commentaire a bien était supprimé !" 
        });
      }
    });    
  }


