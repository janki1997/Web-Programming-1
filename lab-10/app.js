const express = require('express');
var session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const express_hbs = require('express-handlebars');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'AuthCookie',
    secret: 'myprivatekey123',
    resave: false,
    saveUninitialized: true
}))

app.engine('handlebars', express_hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(function (req, res, next) {
    let current_date = new Date().toUTCString()
    let session_user = (req.session.user) ? '(Authenticated User)' : '(Non Authenticated User)';
    console.log(current_date + " "+ req.method + " "+ req.originalUrl + " " +session_user );
    next();
});

configRoutes(app);

app.listen(port, () => {
    console.log('Listening on http://localhost:'+ port);
});