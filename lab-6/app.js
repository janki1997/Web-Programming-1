let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let configRoutes = require("./routes");

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
  console.log("We have now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});