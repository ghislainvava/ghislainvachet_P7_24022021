const mysql = require("mysql");
const fs = require("fs");
const db = require('../middleware/connect');
const Postage = require('../models/PublicationModel');
var moment = require('moment');


exports.posterPub = (req,res) =>{
console.log(req.body);
console.log(req.body.image)
    const posterPub = new Postage({
        id_User : req.body.id_User,
        SujetPost : req.body.SujetPost,
        image :  req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null
       
    });
    console.log(req.body.posterPub)
  
    db.query(`INSERT INTO PostGroupomania(id_User,SujetPost, image) VALUES(?, ?, ?)`,
    [posterPub.id_User,  posterPub.SujetPost, posterPub.image],function(err,data,fields){
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
  
let sql = 'SELECT userGroupamania.InputPseudo, PostGroupomania.* FROM userGroupamania INNER JOIN PostGroupomania ON userGroupamania.id = PostGroupomania.id_User ORDER BY id_Post DESC' ;
//let sql = 'SELECT userGroupamania.InputPseudo, PostGroupomania.* , CommentGroupomania.* FROM ( userGroupamania INNER JOIN PostGroupomania ON userGroupamania.id = PostGroupomania.id_User) LEFT JOIN CommentGroupomania ON PostGroupomania.id_Post = CommentGroupomania.id_Post'

    db.query(sql, function(err, data, fields){

      data[0].date_post = moment().format('DD MM YYYY',data[0].date_post);

        if (err) {
            if (err.kind === "not_found") {
              res.status(405).send({ message: "Publications non trouvé" });
            } else {
              res.status(500).send({ message: "Erreur du serveur  " });
            }
          } else {  
            
            sql2 ='SELECT userGroupamania.InputPseudo , CommentGroupomania.* FROM userGroupamania INNER JOIN CommentGroupomania ON id = createur ORDER BY Id_commentaire DESC'
            db.query(sql2,function(err2,data2, fields2){

              if (err) {
                if (err.kind === "not_found") {
                  res.status(405).send({ message: "Publications non trouvé" });
                } else {
                  res.status(500).send({ message: "Erreur du serveur" });
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
  var id = req.query.id_Post;
  let sql =  'DELETE FROM CommentGroupomania WHERE id_PostComment  = ?';
  
  db.query(sql, [id] , function (err, data, fields){
    if (err) {
      if (err.kind === "not_found") {
        res.status(405).send({
          message: `Not found Publication with id `
        });
      } else {
        res.status(500).send({
          message: "erreur 500 " 
        });
      }
    }else{
                    res.status(201).json({
                      message:  "la Publication a bien était supprimée !" 
                      });
                    }
                })
      }  


