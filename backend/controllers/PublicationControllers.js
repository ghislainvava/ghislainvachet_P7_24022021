const mysql = require("mysql");
const fs = require("fs");
const db = require('../middleware/connect');
const Postage = require('../models/PublicationModel');



exports.posterPub = (req,res) =>{
console.log(req.body.posterPub)
    const posterPub = new Postage({
        id_User : req.body.id_User,
        titlePost : req.body.titlePost,
        SujetPost : req.body.SujetPost,
        image :  req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.image
    });
  
    db.query(`INSERT INTO PostReseau(id_User,titlePost,SujetPost, image) VALUES(?, ?, ?, ?)`,
    [posterPub.id_User, posterPub.titlePost, posterPub.SujetPost, posterPub.image],function(err,data,fields){
      if (err) {
        if (err.kind === "not_found") {
          res.status(405).send({message: "Publications non trouvé"});
        } else {
          res.status(402).send({message: "ça marche pas !"});
        }
      } else {  
        res.status(201).json({posterPub, message: "Publication postée !"});
    }
  })
    
   

};

exports.editerPub = (req, res) => {
let sql = 'SELECT userGroupamania.InputPseudo, postReseau.* FROM userGroupamania INNER JOIN PostReseau ON userGroupamania.id = PostReseau.id_User ORDER BY id_Post DESC' ;
//let sql = 'SELECT userGroupamania.InputPseudo, PostReseau.* , CommentaireReseau.* FROM ( userGroupamania INNER JOIN PostReseau ON userGroupamania.id = PostReseau.id_User) LEFT JOIN CommentaireReseau ON PostReseau.id_Post = CommentaireReseau.id_Post'

    db.query(sql, function(err, data, fields){
        if (err) {
            if (err.kind === "not_found") {
              res.status(405).send({ message: "Publications non trouvé" });
            } else {
              res.status(500).send({ message: "Error retrieving  " });
            }
          } else {  
            //sql2 = 'SELECT CommentaireReseau.* FROM CommentaireReseau INNER JOIN PostReseau ON CommentaireReseau.id_PostComment = PostReseau.id_Post'
            sql2 ='SELECT userGroupamania.InputPseudo, CommentaireReseau.* FROM ( userGroupamania INNER JOIN PostReseau ON userGroupamania.id = PostReseau.id_User) LEFT JOIN CommentaireReseau ON PostReseau.id_Post = CommentaireReseau.id_PostComment ORDER BY id_Post DESC'
            db.query(sql2,[req.query.id_Post] ,function(err2,data2, fields2){
              if (err) {
                if (err.kind === "not_found") {
                  res.status(405).send({ message: "Publications non trouvé" });
                } else {
                  res.status(500).send({ message: "Error retrieving" });
                  }
                } else{
                res.status(200).json({
                  AllPublications: data,
                  AllCommentaires: data2
                 })  
                }
              })   
            }
          });
      }

exports.deletePublication = (req, res) => { 
  let sql =  'DELETE FROM PostReseau WHERE id_Post= ?';
  db.query(sql, [req.query.id_Post] , function (err, data, fields){
    if (err) {
      if (err.kind === "not_found") {
        res.status(405).send({
          message: `Not found Publication with id `
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " 
        });
      }
    }else{
      res.status(201).json({
        message:  "la Publication a bien était supprimée !" 
        });
      }
    });    
  }

