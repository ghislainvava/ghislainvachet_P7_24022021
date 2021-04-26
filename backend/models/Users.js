var mysql = require("mysql");

//Constructeur
const User = function(user) {
    
    this.InputPseudo = user.InputPseudo; 
    this.InputName = user.InputName;
    this.InputLastName = user.InputLastName;
    this.InputEmail = user.InputEmail;
    this.InputPassword = user.InputPassword;   
};

module.exports = User; 