$(document).ready(function () {

    $("#addNewJob").click(function () {
        $("#addNewJobModal").modal('toggle');
    })

    $("#newJobActive").click(function () {
        let x=$("#showWhenActiveTrue");
        if(x.css("display")==="none"){
            x.css("display","block");
        }else{
            x.css("display","none");
        }
    })

    $("#addNewJobForm").submit(function (e) {
        e.preventDefault();
    })

    $("#addNewJobButton").click(function () {
        //TODO 1
        //Post request to add a new job


        //TODO 2
        //Add data to html
    })
});