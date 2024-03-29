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
        } else {
            res.send({url: "", isSuccess: "false", companyId: -1});
        }
    });
});

router.get('/profile', function (req, res) {
    db.getCompanyFromId(req.query.companyId, function (row) {
        if (row != null) {
            res.send({isSuccess: "true", row: row});
        } else {
            res.redirect("http://www.google.com");
        }
    })
});

router.post('/update', function (req, res) {
    // console.log(req.body.email, req.body.name, req.body.password);
    db.updateCompany(req.body.details, req.query.companyId, function (row) {
        if (row == null) {
            console.log(1);
            res.send({isSuccess: 'false'});
        } else {
            res.send({url: "http://localhost:4000/company/dashboard", isSuccess: "true"});
        }
    });
});

router.get('/students', function (req, res) {
    db.getStudents(null, null, function (rows, count) {
        if (count !== 0) {
            res.send({isSuccess: 'true', rows: rows, count: count});
        }
    })
});

router.post('/addNewJob', function (req, res) {
    db.addJob(req.body.data, function (jobId) {
        res.send({isSuccess: "true", jobId: jobId})
    });
});

router.get('/jobs', function (req, res) {
    db.getJobs(req.query.companyId, function (rows, count) {
        if (count !== 0) {
            res.send({isSuccess: "true", rows: rows, count: count});
        }
    })
});

router.post('/jobActiveInactive', function (req, res) {
    db.updateJobActiveInactive(req.body.jobId, function (isSuccess) {
        res.send({isSuccess: isSuccess});
    })
});

router.post('/updateJob', function (req, res) {
    db.updateJob(req.body.data, function (isSuccess) {
        res.send({isSuccess: isSuccess});
    })
});

router.post('/deleteJob', function (req, res) {
    db.deleteJob(req.body.data.jobId, function (isSuccess) {
        res.send({isSuccess: isSuccess});
    })
});

router.get("/applications", function (req, res) {
    db.getJobs(req.query.companyId, function (rows, count) {
        if (count !== 0) {
            // console.log(rows);

            let finalRows = [];
            let jobRows=[];
            for (let i = 0; i < rows.length; i++) {
                // console.log("i");
                console.log(rows[i].dataValues.id);
                jobRows.push(rows[i].dataValues);
                db.getApplicationFromJobId(rows[i].id).then(function (data) {
                    // console.log(data);
                    // console.log("-------------------");
                    // console.log(data[0].dataValues);
                    for (let j = 0; j < data.length; j++) {
                        console.log(jobRows);
                        finalRows.push(data[j].dataValues);
                    }

                    if (i === rows.length - 1) {
                        console.log("yo");
                        // console.log(finalRows);
                        res.send({isSuccess: "true", data: finalRows, jobs: jobRows});
                    }
                });

            }
        }
    })
});

router.use('/dashboard', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html/Company'));

module.exports = router;

