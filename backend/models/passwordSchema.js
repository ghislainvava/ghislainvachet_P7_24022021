const passwordValidator = require('password-validator');
 

const passwordSchema = new passwordValidator();
 

passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(60)                                  // Maximum length 60
    .has().uppercase()                              // doit avoir des majuscules
    .has().lowercase()                              // doit avoir des minuscules
    .has().digits(2)                                // doit avoir 1 chiffres
    .has().not().spaces()                           // Pas d'espaces
    .is().not().oneOf(['Passw00rd', 'Password123']); // Blacklist 


module.exports = passwordSchema;