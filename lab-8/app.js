const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const routes = require('./routes/route');  
const express_hbs = require("express-handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', express_hbs());
app.set('view engine', 'handlebars');

app.listen(port, () => 
{
  console.log("Your routes will be running on http://localhost:" + port);
});