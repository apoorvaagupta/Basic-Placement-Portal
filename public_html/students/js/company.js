/**
 * Created by apoorvaa_gupta on 23/4/17.
 */

$('document').ready(function () {

    let id = window.location.href.split('=')[1];
    console.log(id);
    const job = $('#company');

    $.get('http://localhost:4000/student/company?id='+ id, function (data) {

            console.log(data);
            job.append(`COMPANY : ` + data.name + `<br>EMAIL : ` + data.email + `<br>` + `WEBSITE : ` + data.website +`<br>LOCATION : ` + data.location );

    });

});