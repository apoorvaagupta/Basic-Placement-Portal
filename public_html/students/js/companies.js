/**
 * Created by apoorvaa_gupta on 23/3/17.
 */
$('document').ready(function () {

    $.get('http://localhost:4000/student/companies?choice=all', function (data) {
        console.log(data);
        const companies = $('#viewCompanies');
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            console.log(i);
            let url = "http://localhost:4000/student/companies/"+data[i].id;
            companies.append(

                `<li><div><p> Name: `+data[i].name+`</p><p> Email: `+data[i].email+`</p><p> Website: `+data[i].website+`</p><p><a class="btn btn-danger" href="`+url+`">View</a> </p></div></li><br>`

            )
        }
    });

    document.getElementById('choice').addEventListener('change', function () {
        let choice = $('#choice').find(":selected").text();
        $.get('http://localhost:4000/student/companies?choice=' + choice, function (data) {
            console.log(data);
        });

    });


});