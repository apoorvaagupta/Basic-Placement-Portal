/**
 * Created by apoorvaa_gupta on 15/4/17.
 */

const express = require('express');
const bp = require('body-parser');
const router = express.Router();
const path = require('path');
const db = require('./../utils/db');


router.use(bp.json());
router.use(bp.urlencoded({extended: true}));


router.get('/:id', function (req, res) {
    console.log("yayayayayayayayaya");
    console.log(req.params.id);

        db.getjob(req.params.id, function (data) {
            // console.log(data);
            res.send(data);
        });
    }
);




module.exports = router;

