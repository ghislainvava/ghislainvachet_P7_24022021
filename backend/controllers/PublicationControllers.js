const mysql = require("mysql");
const fs = require("fs");
const db = require('../middleware/connect');
const Postage = require('../models/PublicationModel');
const jwt = require('jsonwebtoken')

exports.posterPub = (req,res) =>{
    const posterPub = new Postage({   
        id_User : req.body.id_User,
        SujetPost : req.body.SujetPost,
        image :  req.file                               //image est géréici pour être nul ou avec fichier
        ? req.protocol + '://' + req.get('host') + '/images/' + req.file.filename 
        : null
      });
      db.query(`INSERT INTO PostGroupomania(id_User,SujetPost, image) VALUES(?, ?, ?)`, //insere ds la base la nouvelle publication
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
  
const sql = 'SELECT userGroupamania.InputPseudo, PostGroupomania.* FROM userGroupamania INNER JOIN PostGroupomania ON userGroupamania.id = PostGroupomania.id_User ORDER BY id_Post DESC' ;
    db.query(sql, function(err, data, fields){ // recuperation des tables de Post avec le pseudo de la table user
        if (!err) {
                  const sql2 ='SELECT userGroupamania.InputPseudo , CommentGroupomania.* FROM userGroupamania INNER JOIN CommentGroupomania ON id = createur ORDER BY Id_commentaire DESC'
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
  const id = req.query.id_Post;
  const findPost = 'SELECT * FROM `PostGroupomania` WHERE PostGroupomania.id_Post = ?'
  const sql =  'DELETE FROM PostGroupomania WHERE id_Post  = ?';
  function sup(){
                  db.query(sql, [id] , function (err, data, fields){
                    if (!err){
                      res.status(201).json({message:  "la Publication a bien était supprimée !" });
                    }else{
                      res.status(404).send({ message: "Publication non trouvée"})
            }   
        })
  };
  db.query(findPost, [id], function (err,data,fields){
      if(data[0].image != null){ 
              const filename = data[0].image.split('/images/')[1];
                if(isAdmin == 1 || data[0].id_User == userId){                //vérification suplémentaire qu'il n'y a pas de fraude avec admin ou id 
                          fs.unlink(`images/${filename}`, () =>{      //permet de supprimer l'image du dossier images
                                    sup();
                          })
                        }else{
                          res.status(401).send({ message:"vous n'avez pas le droit de supprimer cette publication"});
                        }
                 }else{
                        if(isAdmin == 1 || data[0].id_User == userId){
                          sup();
                        }else{
                          res.status(401).send({ message:"vous n'avez pas le droit de supprimer cette publication"});
                        }
                } 
             });
  }