var bcrypt = require('bcryptjs');
const user_data = require('./users');

const validUser = async function (username, password) {
    var validUser = false;
    user_data.forEach(element => {
        if (element.username == username) {
            if (bcrypt.compareSync(password, element.hashed_password)) {
                validUser = true
            }
        }
    });
    return validUser
}

const getUserData = async function (username) {
    var user;
    user_data.forEach(element => {
        if (element.username == username) {
            user = element;
        }
    });
    return user;
}

module.exports = {
    getUserData,
    validUser
}

