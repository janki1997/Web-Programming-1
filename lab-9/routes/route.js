let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
  res.render('home', { layout: 'main', document_title: "Palindrome  Checker  Page:)" });
});



module.exports = router;


