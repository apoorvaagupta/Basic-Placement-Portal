/**
 * Created by apoorvaa_gupta on 14/4/17.
 */

$('document').ready(function () {

    $.get('http://localhost:4000/student/allApplications', function (data) {
        console.log(data);
        const jobs = $('#applications');
        // console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            // console.log(i);
            let url = "http://localhost:4000/student/view?id="+data[i].id;
            // console.log(url);
            jobs.append(


                `<li><div><p> Title: `+data[i].title+`</p><p> Description: `+data[i].description+`</p><p> Skills: `+data[i].skills+`</p><p><a class="btn btn-danger" href="`+url+`">Apply</a> </p></div></li><br>`

            )
        }
    });

});
