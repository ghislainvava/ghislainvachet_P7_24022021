const mysql = require("mysql");
const fs = require("fs");
const db = require('../middleware/connect');
const Postage = require('../models/PublicationTextModel');
const jwt = require('jsonwebtoken')

exports.posterPub = (req,res) =>{
    const posterPub = new Postage({   
        id_U : req.body.id_U,
        Sujet : req.body.Sujet
      });
      const sql = 'INSERT INTO PostTextGroupomania(id_U, Sujet) VALUES(?, ?)'
      db.query(sql, [posterPub.id_U,  posterPub.Sujet],function(err,data,fields){ //insere ds la base la nouvelle publication
        if (!err) {
          res.status(201).json({posterPub, message: "Publication postée !"});
      }else{
        res.status(404).json({ message: "Publication non postée"})
      }
    })
};

exports.editerPub = (req, res) => {
  
const sql = 'SELECT userGroupamania.InputPseudo, PostTextGroupomania.* FROM userGroupamania INNER JOIN PostTextGroupomania ON userGroupamania.id = PostTextGroupomania.id_U ORDER BY id_P DESC' ;
    db.query(sql, function(err, data, fields){ // recuperation des tables de Post avec le pseudo de la table user
        if (!err) {
                  const sql2 ='SELECT userGroupamania.InputPseudo , CommentTextGroupomania.* FROM userGroupamania INNER JOIN CommentTextGroupomania ON id = id_Createur ORDER BY Id_Comment DESC'
                    db.query(sql2,function(err2,data2, fields2){ //recuperation des tables de commentaires avec le pseudo de la table user 
                      if (!err) {
                        res.status(200).json({      //renvoi de toutes les publications et de tout les commentaires
                          AllPublications: data,
                          AllCommentaires: data2
                        })  
                        } else {
                          res.status(400).json({ message: "un probléme est survenu, aucune publication trouvé " });
                        }
                      })   
                }else{
                  res.status(400).json({ message: "un probléme est survenu, aucune publication trouvé " });
                }
              });
      }

exports.deletePublication = (req, res) => {         //permet de supprimer les publications avec les commentaires ratachés
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'Code_SECRET_Pour_Token_Randomisé');
  const userId = decodedToken.userId;
  const isAdmin = decodedToken.isAdmin;
  const id = req.query.id_P;
  const findPost = 'SELECT * FROM `PostTextGroupomania` WHERE PostTextGroupomania.id_P = ?'
  const sql =  'DELETE FROM PostTextGroupomania WHERE id_P  = ?';
  
  
  db.query(findPost, [id], function (err,data,fields){
      
                
                        if(isAdmin == 1 || data[0].id_U == userId){
                          db.query(sql, [id] , function (err, data, fields){
                            if (!err){
                              res.status(201).json({message:  "la Publication a bien était supprimée !" });
                            }else{
                              res.status(404).send({ message: "Publication non trouvée"});
                            }
                        })
                      }else{
                          res.status(401).send({ message:"vous n'avez pas le droit de supprimer cette publication"});
                        }
                
             });
  }