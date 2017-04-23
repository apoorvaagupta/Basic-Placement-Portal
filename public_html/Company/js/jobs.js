$(document).ready(function () {

    $.get("http://localhost:4000/company/jobs?companyId=" + localStorage.getItem("companyId"), function (data) {
        if (data.isSuccess==="true") {
            for (let i = 0; i < data.count; i++) {
                addNewJob(data.rows[i]);
            }
        }
    });

    $("#addNewJob").click(function () {
        document.getElementById('addNewJobForm').reset();
        $("#addNewJobButton").attr("updateJob", "false");
        $("#addNewJobModal").modal('toggle');
    });

    $("#newJobActive").click(function () {
        let x = $("#showWhenActiveTrue");
        if (x.css("display") === "none") {
            x.css("display", "block");
        } else {
            x.css("display", "none");
        }
    });

    $("#addNewJobForm").submit(function (e) {
        e.preventDefault();
    });

    $("#addNewJobButton").click(function () {
        //TODO 1
        //Post request to add a new job
        // console.log(this);
        // console.log("\n");
        const isUpdate=$(this).attr("updateJob");
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

        if ( isUpdate=== "false") {
            console.log("trueeeeeeeeeeee");

            // console.log(data);
            $.post("http://localhost:4000/company/addNewJob", {
                data: data
            }, function (done) {
                if (done.isSuccess === "true") {
                    $("#addNewJobModal").modal('toggle');
                    console.log(done);
                    //TODO 2
                    //Add data to html
                    data.id = done.jobId;
                    console.log(data);
                    addNewJob(data);

                }
            })

        }else if(isUpdate ==="true"){
            // console.log($(this.parentElement));
            data.jobId=this.getAttribute("jobId");
            console.log(data.jobId);
            delete data.companyId;
            // console.log(data.companyId);
            $.post("http://localhost:4000/company/updateJob", {
                data: data
            }, function (done) {
                if (done.isSuccess === "true") {
                    $("#addNewJobModal").modal('toggle');
                    //TODO 2
                    //Update data to html


                    console.log("yoo");
                    let ptags = $(("div[jobId='"+data.jobId+"']")).parent().find("p");
                    console.log(ptags);
                    ptags[0].innerText="Title:"+data.title;

                    ptags[1].innerText="Description:"+data.description;
                    ptags[2].innerText="Skills:"+data.skills;

                    ptags[3].innerText="Job Type:"+data.jobType;


                    ptags[4].innerText="Location:"+data.location;
                    ptags[5].innerText="Stipend:"+data.stipend;

                    // $("#newJobActive").prop("checked")
                    ptags[6].innerText="Active:"+data.active;


                    ptags[7].innerText="Start Date:"+data.startDate;
                    ptags[8].innerText="End Date:"+data.endDate;







                }
            })
        }


    });

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
                            <div jobId="` + data.id + `">
                                <button class="btn btn-default" onclick="activeInactive(this)">Active/Inactive</button>
                                <button class="btn btn-default" onclick="editJob(this)">Edit</button>
                                <button class="btn btn-default" onclick="deleteJob(this)">Delete</button>
                            </div>
                            <br></br>
                        </div>
                `)
    }
});

function activeInactive(e) {
    console.log(e.parentElement.getAttribute("jobId"));
    $.post("http://localhost:4000/company/jobActiveInactive", {
        jobId: e.parentElement.getAttribute("jobId")
    }, function (done) {
        if (done.isSuccess === "true") {
            let text = $(e.parentElement.parentElement).find("p")[6];
            if (text.innerText === "Active:false") {
                text.innerText = "Active:true";
            } else {
                text.innerText = "Active:false";
            }
        }
    });
}

function editJob(e) {

    document.getElementById('addNewJobForm').reset();
    let ptags = $(e.parentElement.parentElement).find('p');
    console.log(ptags);
    $("#newJobTitle").val(ptags[0].innerText.split("Title:")[1]);

    $("#newJobDescription").val(ptags[1].innerText.split("Description:")[1]);
    $("#newJobSkills").val(ptags[2].innerText.split("Skills:")[1]);

    if (ptags[3].innerText.split("Job Type:")[1] === "Full-Time") {
        $("input[value='Full-Time']").prop("checked", true);
    } else {
        $("input[value='Intern']").prop("checked", true);
    }

    $("#newJobLocation").val(ptags[4].innerText.split("Location:")[1]);
    $("#newJobStipend").val(ptags[5].innerText.split("Stipend:")[1]);

    // $("#newJobActive").prop("checked")
    if (ptags[6].innerText.split("Active:")[1] === "true") {
        $("#newJobActive").prop("checked", true);
        $("#showWhenActiveTrue").css("display", "block");
    } else {
        $("#newJobActive").prop("checked", false);
        $("#showWhenActiveTrue").css("display", "none");
    }

    $("#newJobStartDate").val(ptags[7].innerText.split("Start Date:")[1]);
    $("#newJobEndDate").val(ptags[8].innerText.split("End Date:")[1]);

    $("#addNewJobButton").attr("updateJob", "true").attr("jobId",e.parentElement.getAttribute("jobId"));

    $("#addNewJobModal").modal('toggle');
}

function deleteJob(e){
    $.post("http://localhost:4000/company/deleteJob",{
        data:{jobId:e.parentElement.getAttribute("jobId")}
    },function (done) {
        if(done.isSuccess==="true"){
             $(e.parentElement.parentElement).remove();
        }
    })

}