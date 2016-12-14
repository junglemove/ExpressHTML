"use strict"
const Router = require('express').Router;
const Contact = require('../model/contact');
// use bodyParser here to use it "on demand" instead of use it as middleware (for every requests)

let router = new Router();


// 1 - Creer la vue liste qui fait le rendu du tableau
// (regader la docs de http://ejs.co)
router.get('/', (req, res, next) => {

    Contact.find((err, contacts) => {
        res.render('contacts/list', { contacts });
    });
});


// 2 - Créer la vue afficher qui affiche le contact reçu
// dans l'url (req.params.id)
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Contact.findById(id, (err, contacts) => {

        if (err) {
            return next(err);
        }

        if (!contacts) {
            req.message = "Le contact n'existe pas";
            return next();
        }

        res.render('contacts/show', { contacts }); // since ES6 {contacts} can replace {contacts:contacts}
    });
});

router.get('/add', (req, res, next) => {
    res.render('contacts/add');
});


router.post('/add', (req, res, next) => {
    console.log(req.body); // parsé par le middleware bodyParser
    var contact = new Contact(req.body);
    contact.save((err, contact) => {
        res.redirect('/contacts/' + contact.id);
    });
});

module.exports = router;