const jwt = require('jsonwebtoken'); //pour encoder l'id 

module.exports = (req, res, next) => {
    try {
      const code = process.env.CODE_TOKEN
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, code);
      const userId = decodedToken.userId;
          if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
          } else {
            next();
          }
        } catch {
          res.status(401).json({ 
            error: new Error('Requette invalide!')
          });
        }
  };