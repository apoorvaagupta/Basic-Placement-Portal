/**
 * Created by apoorvaa_gupta on 7/4/17.
 */

/**
 * Created by apoorvaa_gupta on 23/3/17.
 */
$('document').ready(function () {

    $.get('http://localhost:4000/student/companies?choice=all', function (data) {
        console.log(data);
        const jobs = $('#jobs');
        console.log(data.length);
        for (let i = 1; i <= data.length; i++) {
            console.log(i);
            let url = "http://localhost:4000/student/jobs/"+i;
            console.log(url);
            jobs.append(

                `<li>job ` + i + `<button onclick="function () {
    console.log(url);
                    window.location.replace(`+url+`);
}">Apply</button> </li>`

                // `<li>job ` + i + `<a class="btn btn-danger" href="`+url+`">Apply</a> </li>`

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