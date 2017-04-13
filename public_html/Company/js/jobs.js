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

    $("#addnewjobform").submit(function (e) {
        e.preventDefault();
    })

    $("#addNewJobButton").click(function () {
        //Post request to add a new job
    })
});