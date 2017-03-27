/**
 * Created by apoorvaa_gupta on 22/3/17.
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize('hb', 'cbuser', 'cbpass', {
    host: 'localhost',
    dialect: 'mysql'
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
    contact: {type: Sequelize.BIGINT,allowNull: true},
    pincode: {type: Sequelize.INTEGER, allowNull: true},
    education:{type:Sequelize.STRING},
    skills:Sequelize.STRING,
    languages:Sequelize.STRING,
    projects: Sequelize.STRING,
    trainings:Sequelize.STRING,
    cbStudent: Sequelize.BOOLEAN,
    cbCourses:Sequelize.STRING

});

//function to add a student
function addStudent(body, done) {
    student.create({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password
    }).then(function (row) {
        done(row);
    }).catch(function (err) {
        throw err;
    })
}

function getStudent(email, pass, done) {
    student.findOne({where: {email: email, password: pass}
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

function getStudentProfile(id,done) {
    student.findOne({where: {id:id}}).then(function (row) {
        done(row);
    })
}

function updatestudentprofile(id,firstname, lastname, email, done) {
    student.findOne({where:{id:id}}).then(function (row) {
        if(row==null){
            done(false);
        }
        else{
            row.update({
                firstname:firstname,
                lastname:lastname,
                email:email
            }).then(function () {
                done(true);
            });
        }
    })
}

function getcompanies(done) {
    Company.findAll().then(function (data) {
        console.log(data);
        done(data);
    })


}

const Company = sequelize.define('Company', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

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
    Company.findOne({where: {email: email, password: pass}
    }).then(function (row) {
        if (row != null) {
            done(row);
        }
        else {
            return null;
        }
    })
}

function getCompanyFromId(id,done){
    Company.findOne({where: {id:id}}).then(function (row) {
        if (row != null) {
            done(row);
        }
        else {
            return null;
        }
    })

}

function updateCompany(body,id,done) {
    Company.findOne({where:{id:id}}).then(function (data) {
        if(data==null){
            done(null);
        }
        else{
            data.update({
                name:body.name,
                email:body.email,
                password:body.password
            }).then(function () {
                done(1);
            });
        }
    })

}

function getStudents(filter1,filter2,done) {
    student.findAndCountAll().then(function (data) {
        done(data.rows,data.count);
    })
}
module.exports = {addStudent, addCompany, getCompany, getStudent, getStudentProfile,updatestudentprofile,getCompanyFromId,updateCompany,getStudents,getcompanies};
