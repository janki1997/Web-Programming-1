let express = require('express');
let router = express.Router();

router.get('/', function (req, res) 
{
  res.render('home', { layout: 'main', document_title: "The Best Palindrome Checker in the World!"});
  });
  
  router.post('/result', function (req, res) 
  {
    let regstr = /[^A-Za-z0-9]/g;
    if (req.body['text-to-test']) 
    {
      let str = req.body['text-to-test'].toLowerCase().replace(regstr, '');
      let reverse_str = str.split('').reverse().join('');
      if (str === reverse_str && str) 
      {
        res.render('result', { layout: 'main', document_title: "The Palindrome Results!", success_message: "The string is palindrome.", input_string : req.body['text-to-test'] });
      } 
      else 
      {
        res.render('result', { layout: 'main', document_title: "The Palindrome Results!", failure_message: "The string is not palindrome.", input_string : req.body['text-to-test'] });
      }
    } 
    else 
    {
      res.status(400).render('error', { layout: 'main', document_title: "The Palindrome Results!", error_message: "Proper string(alphanumeric) must need to be provided." });
    }
  });

  module.exports = router;