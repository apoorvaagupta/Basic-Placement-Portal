/**
 * Created by apoorvaa_gupta on 15/4/17.
 */

const express = require('express');
const bp = require('body-parser');
const router = express.Router();
const path = require('path');
const db = require('./../utils/db');
const jobs = require('./jobs');

router.use(bp.json());
router.use(bp.urlencoded({extended: true}));




// router.get('/',);


module.exports = router;