const mysql = require("mysql");
const fs = require("fs");
const db = require('../middleware/connect');
const Comment = require("../models/CommentaireTextModel");
const jwt = require('jsonwebtoken')

exports.editComment = (req,res) =>{
    const posterComment = new Comment({
        id_PostCommentaire : req.body.id_PostCommentaire,
        SujetComment : req.body.SujetComment,
        id_Createur : req.body.id_Createur
    });
    console.log(posterComment)
    db.query(`INSERT INTO CommentTextGroupomania(id_PostCommentaire, SujetComment, id_Createur) VALUES(?, ?, ?)`,
    [posterComment.id_PostCommentaire, posterComment.SujetComment, posterComment.id_Createur], function(err,data,fields){
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
  const id = req.query.Id_Comment; //récupération de l'id de la route 
  
  function deleteCom(){  //fonction pour supprimer le commentaire de la BD
      let sql =  'DELETE FROM CommentTextGroupomania WHERE Id_Comment = ?';
      db.query(sql, [id] , function (err, data, fields){
                if (!err) { 
                    res.status(201).json({ message: "le commentaire a bien était supprimé !"});
                  }else{
                  res.status(401).json({ message:  "le commentaire n'a pas était supprimé !"});
                  }
                }); 
      }
  const idOfCreator = 'SELECT CommentTextGroupomania.id_Createur FROM CommentTextGroupomania WHERE CommentTextGroupomania.Id_Comment =  ?'
      if(isAdmin == 1){ //on vérifie a partir du token
              deleteCom();
       }else{ 
        db.query(idOfCreator, [id], function (err, data, fields){
          if (data[0].id_Createur == userId){ //on verifie que c'est le bon utilisateur a partir du token
                deleteCom();
            }else{
              return res.status(401).send({ message :"Vous n'êtes pas le bon utilisateur !" });
            }
        } )        
            }
  }  