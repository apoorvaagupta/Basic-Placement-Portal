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
            skills: $("#newjobskills").val(),
            jobType: $("input[name='jobType']:checked").val(),
            location: $("#newjoblocation").val(),
            stipend: $("#newjobstipend").val(),
            active: $("#newJobActive").val(),
            startDate: $("#newjobstartdate").val(),
            endDate: $("#newJobEndDate").val()
        };
        console.log(data);
        // $.post()

        //TODO 2
        //Add data to html
    })
});