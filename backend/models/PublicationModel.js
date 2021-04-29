var mysql = require("mysql");

//Constructeur
const Postage = function(publication) {
    
    this.id_User = publication.id_User; 
    this.SujetPost = publication.SujetPost;
    this.image = publication.image;
       
};

module.exports = Postage; 