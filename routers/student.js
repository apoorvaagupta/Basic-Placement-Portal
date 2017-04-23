/**
 * Created by apoorvaa_gupta on 21/3/17.
 */

const express = require('express');
const bp = require('body-parser');
const router = express.Router();
const path = require('path');
const db = require('./../utils/db');
// const job = require('./jobs');

router.use('/', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html'));


router.use(bp.json());
router.use(bp.urlencoded({extended: true}));
router.post('/add', function (req, res) {

    console.log(req.body.email, req.body.password);
    db.addStudent(req.body.firstname, req.body.lastname,
        req.body.email, req.body.password,
        function (row) {
            res.send({
                url: "http://localhost:4000/student/dashboard",
                isSuccess: "true",
                studentId: row.id
            });
        });
});

router.post('/login', function (req, res) {

    db.getStudent(req.body.email, req.body.password,
        function (row) {
            if (row != null) {
                res.send({
                    url: "http://localhost:4000/student/dashboard",
                    isSuccess: "true",
                    studentId: row.id
                });
            } else {
                res.send({
                    url: "",
                    isSuccess: "false",
                    studentId: null
                });
            }
        });
});

router.post('/update', function (req, res) {
    db.updatestudentprofile(req.body.details.id, req.body.details, function (bool) {
        if (bool === true) {
            res.send({
                url: "http://localhost:4000/student/dashboard",
                isSuccess: "true"
            });
        }
    })
})

router.get('/profile', function (req, res) {
    console.log(req.query.studentId);
    console.log("reached here");
    db.getStudentProfile(req.query.studentId, function (row) {
        console.log("logging row data");
        //console.log(row);
        console.log("logged row data");
        res.send(row);
    })
});

router.get('/companies', function (req, res) {
    console.log(req.query.choice);
    db.getcompanies(function (data) {
        // console.log(data);
        res.send(data);
    });
});

router.get('/allJobs', function (req, res) {
    console.log(req.query.choice);
    db.getjobs(function (data) {
        // console.log(data);
        res.send(data);
    });
});

router.use('/view', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html/students/job'));

router.get('/job', function (req, res) {


    db.getApplication(req.query.studentId, req.query.jobId, function (data) {
        // console.log(data);
        res.send(data);
    });
});

router.post('/apply', function (req, res) {
    db.addApplication(req.body, function (data) {
        if (data != null) {
            res.send({
                isSuccess: true
            });
        } else {
            res.send({
                isSuccess: false
            });
        }

    })


});

router.get('/allApplications', function (req, res) {
    let obj = [];
    db.getAllApplications(req.query.studentId, function (data) {
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                db.getjob(data[i].jobId, function (jobData) {
                    obj[i] = {
                        title: jobData.title,
                        jobId: data[i].jobId,
                        jobAppNo: data[i].id,
                        status: data[i].status
                    };
                    if (i == data.length - 1) {
                        res.send(obj);
                    }
                })
            }
        } else {
            res.send(data);
        }
    })
});

router.use('/dashboard', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html/students'));

module.exports = router;