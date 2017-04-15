/**
 * Created by apoorvaa_gupta on 22/3/17.
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize('hb', 'cbuser', 'cbpass', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.sync().then(function () {

}).catch(function (err) {
    throw err;
});

const student = sequelize.define('student', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    contact: {type: Sequelize.BIGINT, allowNull: true},
    pincode: {type: Sequelize.INTEGER, allowNull: true},
    education: {type: Sequelize.STRING},
    skills: Sequelize.STRING,
    languages: Sequelize.STRING,
    projects: Sequelize.STRING,
    trainings: Sequelize.STRING,
    // cbStudent:{type:Sequelize.BOOLEAN,defaultValue:false},
    // cbCourses:Sequelize.STRING

});

const Company = sequelize.define('company', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    website: Sequelize.STRING,
    locations: Sequelize.ARRAY(Sequelize.STRING),
    skills: Sequelize.ARRAY(Sequelize.STRING),
    repName: Sequelize.STRING,
    repNumber: Sequelize.BIGINT,
});


const jobs = sequelize.define("jobs", {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    title: Sequelize.STRING,
    description: Sequelize.STRING(1234),
    skills: Sequelize.ARRAY(Sequelize.STRING),
    jobType: Sequelize.STRING,
    location: Sequelize.STRING,
    stipend: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    startDate: Sequelize.STRING,
    endDate: Sequelize.STRING
});

jobs.belongsTo(Company);
Company.hasMany(jobs);

const applications = sequelize.define('applications', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    status: Sequelize.STRING,
    date: Sequelize.INTEGER,
    app: Sequelize.STRING
});

applications.belongsTo(student);
applications.belongsTo(jobs);
student.hasMany(applications);
jobs.hasMany(applications);

//function to add a student
function addStudent(firstname, lastname, email, password, done) {
    student.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    }).then(function (row) {
        done(row);
    }).catch(function (err) {
        throw err;
    })
}

function getStudent(email, pass, done) {
    student.findOne({
        where: {email: email, password: pass}
    }).then(function (row) {
        done(row);
        // if (row != null) {
        //     done(row);
        // }
        // else {
        //     return null;
        // }
    })
}

function getStudentProfile(id, done) {
    student.findOne({where: {id: id}}).then(function (row) {
        done(row);
    })
}

function updatestudentprofile(id, data, done) {
    student.findOne({where: {id: id}}).then(function (row) {
        if (row == null) {
            done(false);
        }
        else {
            row.update({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                contact: data.contact,
                pincode: data.pincode,
                education: data.education,
                skills: data.skills,
                languages: data.languages,
                projects: data.projects,
                trainings: data.trainings,
                cbStudent: data.cbCourses,
                cbCourses: data.cbCourses
            }).then(function () {
                done(true);
            });
        }
    })
}

function getcompanies(done) {
    Company.findAll().then(function (data) {
        //TODO check if data is not false
        console.log(data);
        done(data);
    })


}


function addCompany(name, email, password, done) {
    Company.create({
        name: name,
        email: email,
        password: password
    }).then(function (row) {
        done(row.dataValues);
    }).catch(function (err) {
        throw err;
    })
}

function getCompany(email, pass, done) {
    Company.findOne({
        where: {email: email, password: pass}
    }).then(function (row) {
        if (row != null) {
            done(row);
        }
        else {
            return null;
        }
    })
}

function getCompanyFromId(id, done) {
    Company.findOne({where: {id: id}}).then(function (row) {
        if (row != null) {
            done(row);
        }
        else {
            return null;
        }
    })

}

function updateCompany(data, id, done) {
    Company.findOne({where: {id: id}}).then(function (data) {
        if (data == null) {
            done(null);
        }
        else {
            data.update({
                name: data.name,
                email: data.email,
                website: data.website,
                locations: data.locations,
                skills: data.skills,
                repName: data.repName,
                repNumber: data.repNumber

            }).then(function () {
                done(1);
            });
        }
    })

}

function getStudents(filter1, filter2, done) {
    student.findAndCountAll().then(function (data) {
        done(data.rows, data.count);
    })
}
module.exports = {
    addStudent,
    addCompany,
    getCompany,
    getStudent,
    getStudentProfile,
    updatestudentprofile,
    getCompanyFromId,
    updateCompany,
    getStudents,
    getcompanies,
    addJob,
    getJobs,
    updateJobActiveInactive,
    updateJob
};

function addJob(data, done) {
    data.skills = [data.skills]; //Change After asking sir

    jobs.create({
        title: data.title,
        description: data.description,
        skills: data.skills,
        jobType: data.jobType,
        location: data.location,
        stipend: data.stipend,
        active: data.active,
        startDate: data.startDate,
        endDate: data.endDate,
        companyId: data.companyId
    }).then(function (row) {
        done(row.id);
    }).catch(function (err) {
        throw err;
    })
}

function getJobs(companyId, done) {
    jobs.findAndCountAll({where: {companyId: companyId}}).then(function (data) {
        done(data.rows, data.count);
    })
}

function updateJobActiveInactive(jobId, done) {
    jobs.findOne({where: {id: jobId}}).then(function (data) {
        if (data === null) {
            done("false");
        } else {
            console.log(data.active);
            data.active = data.active !== true;
            data.update({
                active: data.active
            }).then(function () {
                console.log(data.active);
                done("true");
            });

        }
    })
}

function updateJob(data, done) {
    console.log(data.jobId);
    data.skills = [data.skills]; //Change After asking sir
    jobs.findOne({where: {id: data.jobId}}).then(function (row) {
        // console.log(data);
        if (row === null) {
            done("false");
        } else {
            console.log("jiiii");
            row.update({
                title: data.title,
                description: data.description,
                skills: data.skills,
                jobType: data.jobType,
                location: data.location,
                stipend: data.stipend,
                active: data.active,
                startDate: data.startDate,
                endDate: data.endDate,
            }).then(function () {
                done("true");
            });

        }
    })
}






























































