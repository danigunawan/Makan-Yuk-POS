const express = require('express');
const router = express.Router();
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');


router.get('/',checkLogin, (req, res) =>{
    // res.render('./menu/menu.ejs');
    models.Menu.findAll({}).then(dataMenu =>{
        res.render('./menu/menu.ejs', {data:dataMenu})
      })
})

router.get('/add',checkLogin, (req, res) =>{
    let err = req.query;
    res.render(`./menu/add-menu.ejs`,{err:err});
})

router.post('/add', (req, res) =>{
    models.Menu.create({
        name: req.body.name,
        price: req.body.price,
        jenis: req.body.jenis,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(function(){
        res.redirect('/menus')
    }).catch(err => {
        res.redirect(`/menus/add?err=${err.message}`);
    })
});

router.get('/edit/:id',checkLogin, (req, res) =>{
    let err = req.query;
    models.Menu.findById(req.params.id).then(dataMenu => {
        res.render('./menu/edit-menu.ejs', {data:dataMenu,err:err})
    })
});

router.post('/edit/:id',checkLogin, (req, res)=>{
    models.Menu.update({
        name: req.body.name,
        price: req.body.price,
        jenis: req.body.jenis,
        updatedAt: new Date()
    }, { where: { id: req.params.id }
    }).then(dataMenu =>{
        res.redirect('/menus');
    }).catch(err => {
        res.redirect(`/menus/edit/${req.params.id}?err=${err.message}`);
    })
});

router.get('/delete/:id',checkLogin, (req, res)=>{
    models.Menu.destroy({
        where: { id: req.params.id }
    }).then(dataMenu =>{
        res.redirect('/menus');
    });
});

module.exports = router;
