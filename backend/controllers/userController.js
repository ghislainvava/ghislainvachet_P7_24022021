const User = require('../models/Users');
const mysql = require('mysql');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const crypto = require('crypto-js');
const validator = require('email-validator');
const passwordSchema = require('../models/passwordSchema');
const fs = require('fs')
const db = require('../middleware/connect')


exports.signIn = (req, res) => {
  if (!validator.validate(req.body.InputEmail)) {
    throw { error: "Votre email n'est pas valide "}
  }else if(!passwordSchema.validate(req.body.InputPassword)){
    throw {error: "Votre mot de passe doit 8 et 60 caractères sans espace, et inclure au moins une majuscule, une minuscule et un chiffre"}
  }else{
          hash = bcrypt.hash(req.body.InputPassword, 10)
          .then (hash =>  {
        
          const user = new User({
            InputPseudo: req.body.InputPseudo,
            InputName: req.body.InputName, 
            InputLastName: req.body.InputLastName,
            InputEmail: req.body.InputEmail,
            InputPassword : hash
          });
          
              db.query(`INSERT INTO userGroupamania(InputPseudo,InputName, InputLastName, InputEmail, InputPassword ) VALUES(?, ?, ?, ?, ?)`, // sauvegarde du nouvel utilisateur
              [user.InputPseudo,user.InputName, user.InputLastName, user.InputEmail, user.InputPassword], function (err, data, fields){
                if(!err){
                  res.status(201).json({user, message: "Compte créé !"})
                } else {
                  res.status(401).json({ message: "votre compte n'a pas pu être créer"})
                }
              })
              
              
            }) 
            .catch(() => res.status(401).json({ message: "votre compte n'a pas pu être créer"}))
        }
    }
        
exports.login = (req, res, next) => {
  const InputEmail = req.body.InputEmail;

  let sql = 'SELECT * FROM userGroupamania WHERE InputEmail = ?';
  db.query(sql,[InputEmail], function(err, data, fields){
          bcrypt.compare(req.body.InputPassword,  data[0].InputPassword )
          .then( valid => {  
            if (!valid) {
              return res.status(404).json({ message: 'Mot de passe incorect !' })
            }
          res.status(200).json({
              userId: data[0].id,
              isAdmin: data[0].isAdmin,
              token: jwt.sign(

                   { userId: data[0].id, isAdmin : data[0].isAdmin},
                  'Code_SECRET_Pour_Token_Randomisé',
                  { expiresIn: '24h' }
                )
            })
        })
      
      })
      
};
