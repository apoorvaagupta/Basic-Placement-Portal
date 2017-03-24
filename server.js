/**
 * Created by apoorvaa_gupta on 21/3/17.
 */

const express = require('express');
const bp = require('body-parser');

//const hbs = require('express-hbs');
const path = require('path');
const app = express();
const company = require('./routers/company');
const student = require('./routers/student');
// app.engine('hbs', hbs.express4({})
// );
// app.set('views', path.join(__dirname, 'views'));
// app.set("view engine", "hbs");


app.use(bp.json());
app.use(bp.urlencoded({extended: true}));


app.use('/company',company);
app.use('/student',student);
app.use('/', express.static(__dirname + '/public_html'));



app.listen(4000,function () {
    console.log("server started on port 4000");
});