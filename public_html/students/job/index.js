/**
 * Created by apoorvaa_gupta on 16/4/17.
 */

$('document').ready(function () {

    let id = window.location.href.split('=')[1];
    console.log(id);
    const job = $('#job');
    $.get('http://localhost:4000/student/job?id=' + id, function (data) {
        console.log("the job data");
        console.log(data);
        job.append(`JOB TITLE : `+data.title + `<br>JOB DESCRIPTION : ` + data.description + `<br><br><button id="apply">Apply</button> <br><br>`);
        $('#apply').click(function () {
            $('#showWhenApplyIsClicked').css("display","block");
        });
    });




    $('#submit').click(function () {
        const ansVal = $('#answer').val();
        console.log(ansVal);

        application = {
            studentId: localStorage.getItem("studentId"),
            jobId: id,
            answer: ansVal,
            status: "none"
        };
        console.log(application);
        $.post('http://localhost:4000/student/apply/', application,function (data) {
            console.log(data);
        })

    });

    // submit.onclick(function () {
    //     console.log($('#answer').val());
    // });
    //
    // submit.addEventListener('click',function () {
    //
    // })
    // submit.addEventListener('click',function () {
    //     const ans = $('#ans').valueOf();
    //     console.log(ans);
    // });



});