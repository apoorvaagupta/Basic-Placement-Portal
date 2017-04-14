$(document).ready(function () {

    $.get("http://localhost:4000/company/jobs?companyId=" + localStorage.getItem("companyId"), function (data) {
        if (data.isSuccess) {
            for(let i=0;i<data.count;i++){
                addNewJob(data.rows[i]);
            }
        }
    });

    $("#addNewJob").click(function () {
        $("#addNewJobModal").modal('toggle');
    })

    $("#newJobActive").click(function () {
        let x = $("#showWhenActiveTrue");
        if (x.css("display") === "none") {
            x.css("display", "block");
        } else {
            x.css("display", "none");
        }
    })

    $("#addNewJobForm").submit(function (e) {
        e.preventDefault();
    })

    $("#addNewJobButton").click(function () {
        //TODO 1
        //Post request to add a new job
        data = {
            title: $("#newJobTitle").val(),
            description: $("#newJobDescription").val(),
            skills: $("#newJobSkills").val(),
            jobType: $("input[name='jobType']:checked").val(),
            location: $("#newJobLocation").val(),
            stipend: $("#newJobStipend").val(),
            active: $("#newJobActive").prop("checked"),
            startDate: $("#newJobStartDate").val(),
            endDate: $("#newJobEndDate").val(),
            companyId: window.localStorage.getItem("companyId")
        };
        console.log(data);
        $.post("http://localhost:4000/company/addNewJob", {
            data: data
        }, function (done) {
            if (done.isSuccess === "true") {
                $("#addNewJobModal").modal('toggle');
                console.log("truuuuuueeeee");
                //TODO 2
                //Add data to html
                addNewJob(data);

            }
        })


    })

    function addNewJob(data) {
        const jobs = $("#jobs");

        jobs.append(`
                        <div class="col-xs-4">
                            <p>Title:` + data.title + `</p>
                            <p>Description:` + data.description + `</p>
                            <p>Skills:` + data.skills + `</p>
                            <p>Job Type:` + data.jobType + `</p>
                            <p>Location:` + data.location + `</p>
                            <p>Stipend:` + data.stipend + `</p>
                            <p>Active:` + data.active + `</p>
                            <p>Start Date:` + data.startDate + `</p>
                            <p>End Date:` + data.endDate + `</p>
                            <br></br>
                        </div>
                `)
    }
});