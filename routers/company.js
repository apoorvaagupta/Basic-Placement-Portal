/**
 * Created by bhavya on 21/3/17.
 */

const express = require('express');
const bp = require('body-parser');
const router = express.Router();
const path = require('path');
const db = require('./../utils/db');


router.use(bp.json());
router.use(bp.urlencoded({extended: true}));

router.post('/add', function (req, res) {
    // console.log(req.body.email, req.body.name, req.body.password);
    db.addCompany(req.body.name, req.body.email, req.body.password, function (row) {
        res.send({url: "http://localhost:4000/company/dashboard", isSuccess: "true", companyId: row.id})
    });
});

router.post('/login', function (req, res) {
    db.getCompany(req.body.email, req.body.password, function (row) {
        if (row != null) {
            res.send({url: "http://localhost:4000/company/dashboard", isSuccess: "true", companyId: row.id});
        }
    });
});

router.get('/profile', function (req, res) {
    db.getCompanyFromId(req.query.companyId, function (row) {
        if (row != null) {
            res.send({isSuccess: "true", row: row});
        }else{
            res.redirect("http://www.google.com");
        }
    })
});

router.post('/update', function (req, res) {
    console.log(req.body.email, req.body.name, req.body.password);
    db.updateCompany(req.body, req.query.companyId, function (row) {
        if (row == null) {
            console.log(1);
            res.send({isSuccess: 'false'});
        } else {
            res.send({url: "http://localhost:4000/company/dashboard", isSuccess: "true"});
        }
    });
});

router.get('/students',function (req,res) {
    db.getStudents(null,null,function (rows,count) {
        res.send({isSuccess:'true',rows:rows,count:count});
    })
});

router.use('/dashboard', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html/Company'));

module.exports = router;
