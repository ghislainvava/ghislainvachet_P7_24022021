const mysql = require("mysql");
const User = require("../models/users");
const fs = require("fs");
const db = require('../middleware/connect')

// Trouver un utilisateur par id
exports.findUser = (req, res) => {
  let sql = 'SELECT * FROM userGroupamania WHERE id = ?';
    db.query(sql,[req.query.id] ,function(err, data, fields) {
      if (err) {
        if (err.kind === "not_found") {
          res.status(405).send({
            message: `Not found User with id ${req.query.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.query.id,
          });
        }
      } else {  
        res.status(200).json({
          InputPseudo : data[0].InputPseudo,
          InputName : data[0].InputName,
          InputLastName : data[0].InputLastName,
          InputEmail : data[0].InputEmail, 
         })  
      }
    });
  };

  exports.modifyUserProfil = (req, res) => {
    let sql ='UPDATE userGroupamania SET InputPseudo = ? ,InputName = ?, InputLastName = ?, InputEmail = ? WHERE id= ?'
    db.query(sql,[req.body.InputPseudo, req.body.InputName ,req.body.InputLastName, req.body.InputEmail, req.query.id] ,function(err, data, fields) {
      if (err) {
        if (err.kind === "not_found") {
          res.status(405).send({
            message: `Utilisateur non trouvé ${req.query.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la récupération de l'utilisateur avec l'ID " + req.query.id,
          });
        }
      }else{
        res.status(202).json({
          message:  "l'utilsateur a bien était modifié !" 
        });
      }
    });    
}
exports.deleteUser = (req, res) => { 
  let sql =  'DELETE FROM userGroupamania WHERE id= ?';
  db.query(sql, [req.query.id] , function (err, data, fields){
    if (err) {
      if (err.kind === "not_found") {
        res.status(405).send({
          message: `Not found User with id ${req.query.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.query.id,
        });
      }
    }else{
      res.status(201).json({
        message:  "l'utilisateur a bien était supprimé !" 
        });
      }
    });    
  }



