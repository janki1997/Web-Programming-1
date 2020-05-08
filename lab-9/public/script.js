function validatePalindrome() {
    var x = document.forms["myform"]["phrase"].value;
    if (x == "") {
        document.getElementById('list').innerHTML += "<li class = not-palindrome>" + x + "</li>"
        return false;
    } else {
        var regstr = /[^A-Za-z0-9]/g;
        var str = x.toLowerCase().replace(regstr, '');
        var reverse_str = str.split('').reverse().join('');
        if (str === reverse_str && str) {
            document.getElementById('list').innerHTML += "<li class = is-palindrome >" + x + "</li>"
        } else {
            document.getElementById('list').innerHTML += "<li class = not-palindrome>" + x + "</li>"
        }
          document.getElementById('palindrome').value= ""
        return true;
    }
  }