const express = require('express');
const router = express.Router();
const data = require('../data/access');

router.get('/', async (req, res) => {
    if (!req.session.user) {
        res.render('form', { layout: 'main' });
    }
    else {
        res.redirect('/private');
    }

});

router.post('/login', async (req, res) => {
    let authenticate = await data.validUser(req.body.username, req.body.password);
    if (authenticate == true) {
        req.session.user = req.body.username;
        res.redirect('/private');
    }
    else {
        res.render('form', {
            layout: 'main',
            error: "Please enter valid Username/Password!"
        })
    }
});

router.get('/private', authenticateMiddle, async (req, res) => {
    if (!req.session.user) {
        res.status(401).render('userInfo', {
            layout: 'main',
            document_title : "Login Failed!",
            error: "User is not logged in."
        })
    } else {
        const userInfo = await data.getUserData(req.session.user);
        res.render('userInfo', { layout: 'main', userInfo: userInfo, document_title : "Login Page" });
    }
});


router.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.clearCookie("AuthCookie");
        res.render('userInfo', {
            layout: 'main',
            document_title : "Logout Successfully!",
            logout_message: "You have successfully logout."
        });
    }else{
        res.status(401).render('userInfo', {
            layout: 'main',
            document_title : "Login Failed!",
            error: "Access denied"
        })
    }
})

function authenticateMiddle(req, res, next) {
    if (!req.session.user) {
        res.status(403).render('userInfo', {
            layout: 'main',
            document_title : "Login Failed!",
            error: "User is not logged in!"
        })
    }
    else {
        next();
    }
}

module.exports = router;
