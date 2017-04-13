$(document).ready(function () {

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
            companyId:window.localStorage.getItem("companyId")
        };
        console.log(data);
        $.post("http://localhost:4000/company/addNewJob",{
            data:data
        },function (done) {
            if(done.isSuccess==="true"){
                $("#addNewJobModal").modal('toggle');
                console.log("truuuuuueeeee");
                //TODO 2
                //Add data to html



            }
        })


    })
});