/**
 * Created by apoorvaa_gupta on 7/4/17.
 */

/**
 * Created by apoorvaa_gupta on 23/3/17.
 */
$('document').ready(function () {

    $.get('http://localhost:4000/student/allJobs?choice=all', function (data) {
         console.log(data);
        const jobs = $('#jobs');
        // console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            // console.log(i);
            let url = "http://localhost:4000/student/view/job?id="+data[i].id;
            // console.log(url);
            jobs.append(


                `<li><div><p> Title: `+data[i].title+`</p><p> Description: `+data[i].description+`</p><p> Skills: `+data[i].skills+`</p><p><a class="btn btn-danger" href="`+url+`">Apply</a> </p></div></li><br>`

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

