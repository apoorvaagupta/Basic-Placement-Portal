/**
 * Created by apoorvaa_gupta on 16/4/17.
 */

$('document').ready(function () {

    let id = window.location.href.split('=')[1];
    console.log(id);
    $.get('http://localhost:4000/student/job?id=' + id, function (data) {
        console.log("the job data");
        console.log(data);

    });


});