/**
 * Created by apoorvaa_gupta on 16/4/17.
 */

$('document').ready(function () {

    $.get('http://localhost:4000/student/job/:id', function (data) {
        console.log("the job data");
        console.log(data);

    });


});