const mysql = require("mysql");
const fs = require("fs");
const db = require('../middleware/connect');
const Comment = require("../models/CommentaireModel");
const jwt = require('jsonwebtoken')

exports.editComment = (req,res) =>{
    const posterComment = new Comment({
        id_PostComment : req.body.id_PostComment,
        commentaire : req.body.commentaire,
        createur : req.body.createur
    });
    db.query(`INSERT INTO CommentGroupomania(id_PostComment, commentaire, createur) VALUES(?, ?, ?)`,
    [posterComment.id_PostComment, posterComment.commentaire, posterComment.createur], function(err,data,fields){
      if (!err) {
        res.status(201).json({posterComment, message: "Commentaire postée !"});
        } else {
          res.status(401).send({message: "probléme avec ce commentaire !"});
        }
  })
};

exports.deleteComment = (req, res) => { 
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'Code_SECRET_Pour_Token_Randomisé');
  const userId = decodedToken.userId; //récupération de l'userId du token
  const isAdmin = decodedToken.isAdmin  //récupération de isAdmin du token 
  const id = req.query.Id_commentaire; //récupération de l'id de la route 
  
  function deleteCom(){  //fonction pour supprimer le commentaire de la BD
      let sql =  'DELETE FROM CommentGroupomania WHERE Id_commentaire = ?';
      db.query(sql, [id] , function (err, data, fields){
                if (!err) { 
                    res.status(201).json({ message: "le commentaire a bien était supprimé !"});
                  }else{
                  res.status(401).json({ message:  "le commentaire n'a pas était supprimé !"});
                  }
                }); 
      }
  const idOfCreator = 'SELECT CommentGroupomania.createur FROM CommentGroupomania WHERE CommentGroupomania.id_commentaire =  ?'
      if(isAdmin == 1){ //on vérifie a partir du token
              deleteCom();
       }else{ 
        db.query(idOfCreator, [id], function (err, data, fields){
          if (data[0].createur == userId){ //on verifie que c'est le bon utilisateur a partir du token
                deleteCom();
            }else{
              return res.status(401).send({ message :"Vous n'êtes pas le bon utilisateur !" });
            }
        } )        
            }
  }  


