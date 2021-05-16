const express = require('express');
const userRoute= require('./routes/userRoute');
const ProfilRoute = require('./routes/ProfilRoute');
const AdminRoute = require('./routes/AdminRoute');
const PublicationRoute = require('./routes/PublicationRoute');
const CommentaireRoute = require('./routes/CommentaireRoute');
const mysql = require('mysql');
const dotenv = require('dotenv');
require('dotenv').config()
const path = require('path')
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const cors = require('cors')

// desactive le cache
const nocache = require("nocache");

const originAccept = ['http://localhost:8080','http://localhost:8081','http://localhost:8082'];


const app = express(); // cree l'Application


app.use((req, res, next) => { //gestion du CORS
    if (req.headers['origin'] && originAccept.includes(req.headers['origin'])){  //condition pour filtrer les origines
      res.setHeader('Access-Control-Allow-Origin', req.headers['origin']);
    } else {
      res.setHeader('Access-Control-Allow-Origin', 'null');
    }
   
    if (req.method === 'OPTIONS'){
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // type de header acceptés
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // méthodes à utiliser
      return res.end();
    }
    next();
});

app.use(express.urlencoded({ extended: true}))

app.use(express.json());
app.use(nocache());
app.use(helmet());
app.use(cors());

// securise session
app.use(
  cookieSession({
    name: "session",
    secret: "s3CuR3T3",
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "http://localhost:3000/",
    },
  })
);

app.use('/api/user', userRoute);
app.use('/api/user', ProfilRoute);
app.use('/api/user', AdminRoute);
app.use('/api/publication', PublicationRoute);
app.use('/api/commentaire', CommentaireRoute);
app.use('/images', express.static(path.join(__dirname, '/images'))); //pour utiliser le dossier images en static

module.exports = app;