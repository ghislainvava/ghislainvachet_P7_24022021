const db = require('../middleware/connect');
const mysql = require("mysql");
const User = require("../models/users");


exports.findAllUsers = (req, res) => {
    let sql = 'SELECT * FROM userGroupamania ';
  
      db.query(sql ,function(err, data, fields) {
       
        if (err) {
          if (err.kind === "not_found") {
            res.status(405).send({
              message: "Utilisateurs non trouvé"
            });
          } else {
            res.status(500).send({
              message: "Error retrieving  ",
            });
          }
        } else {  
          console.log(data)
          res.status(200).json({
            AllUsers : data
           })  
        }
      });
    };
    exports.deleteUser = (req, res) => { 
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
        });    
      
        }