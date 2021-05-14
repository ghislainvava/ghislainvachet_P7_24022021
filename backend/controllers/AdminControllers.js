const db = require('../middleware/connect');
const mysql = require("mysql");
const User = require("../models/users");
const jwt = require('jsonwebtoken')

exports.findAllUsers = (req, res) => {
    let sql = 'SELECT * FROM userGroupamania ';
  
      db.query(sql ,function(err, data, fields) {
       
        if (err) {
          if (err.kind === "not_found") {
            res.status(405).send({ message: "Utilisateurs non trouvé" });
          } else {
            res.status(500).send({ message: "Error retrieving  ",});
          }
        } else {  
          res.status(200).json({ AllUsers : data })  
        }
      });
    };

    exports.deleteUser = (req, res, next) => { 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'Code_SECRET_Pour_Token_Randomisé');
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;

       
       if (isAdmin === 0) {
         res.status(401).json({ message: "Vous n'êtes pas Administrateur, vous ne pouvez donc pas supprimer un utilisateur"})
       }else {
       
        let sql =  'DELETE FROM userGroupamania WHERE id= ?';
        db.query(sql, [req.query.id] , function (err, data, fields){
          if (err) {
            if (err.kind === "not_found") {
              res.status(405).send({
                message: `utilisateur non retrouvé : ${req.query.id}.`,
              });
            } else {
              res.status(500).send({
                message: "Echec d'envoi" 
              });
            }
          }else{
            res.status(201).json({
              message:  "l'utilisateur a bien était supprimé !" 
            });
          }
        }) 
      }
    
  }  
