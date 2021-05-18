var mysql = require("mysql");

//Constructeur
const Postage = function(publication) {
    
    this.id_U = publication.id_U; 
    this.Sujet = publication.Sujet;
    
       
};

module.exports = Postage; 