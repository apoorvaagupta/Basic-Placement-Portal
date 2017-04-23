/**
 * Created by apoorvaa_gupta on 14/4/17.
 */

$('document').ready(function () {

    $.get('http://localhost:4000/student/allApplications?studentId=' + localStorage.getItem("studentId"), function (data) {
        console.log(data.length);
        console.log(data);
        const jobs = $('#applications');

        for (let i = 0; i < data.length; i++) {
            // console.log(i);
            let url = "http://localhost:4000/student/view?id="+data[i].jobId;
            // console.log(url);
            jobs.append(


                `<li><div><p>Application Id:` + data[i].jobAppNo + `</p><p> Title: ` +data[i].title+`</p>
                 <p> Status: `+data[i].status+`</p><p><a class="btn btn-danger" href="`+url+`">View</a> </p></div></li><br>`

            )
        }
    });

});
