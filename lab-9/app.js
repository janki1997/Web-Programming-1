let express = require("express");
let routes = require('./routes/route');  
let app = express();
let express_hbs = require("express-handlebars");
let bodyParser = require('body-parser');


app.use('/', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/'));
app.engine('handlebars', express_hbs());
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log("We have now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});