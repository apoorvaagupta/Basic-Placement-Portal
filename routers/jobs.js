// /**
//  * Created by apoorvaa_gupta on 15/4/17.
//  */
//
// const express = require('express');
// const bp = require('body-parser');
// const router = express.Router();
// const path = require('path');
// const db = require('./../utils/db');
//
//
//
//
//
//
//
// router.use(bp.urlencoded({extended: true}));
//
//
//
//         router.get('/:id', function (req, res) {
//             console.log("yayayayayayayayaya");
//                 db.getjob(req.params.id, function (data) {
//                         // console.log(data);
//                             res .send(data);
//                     });
//                 console.log(req.params.id);
//
//         });
//
//         router.use('/', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html/students/job'));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// router.use(bp.json());
// router.use(bp.urlencoded({extended: true}));
//
//
// router.get('/job', function (req, res) {
//     console.log("yayayayayayayayaya");
//     console.log(req.query.id);
//
//         db.getjob(req.query.id, function (data) {
//             // console.log(data);
//             res.send(data);
//         });
//     }
// );
//
// router.use('/', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html/students/job'));
//
//
// module.exports = router;