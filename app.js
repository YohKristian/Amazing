const express = require('express');
const app = express();
const router = require("./routers/router.js");
const session = require('express-session')
const port = 3000;

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'session memang special',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
     }
}));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});