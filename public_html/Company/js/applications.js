/**
 * Created by bhavya on 23/4/17.
 */
$(document).ready(function () {
    $.get("http://localhost:4000/company/applications?companyId=" + localStorage.getItem("companyId"),function (data) {
        if(data.isSuccess==="true"){
            // console.log(data.data);
            const $applications=$('#applications');
            for(let i=0;i<data.data.length;i++){
                console.log(data.data[i].id);
                console.log(data.jobs);

                $applications.append(`
                    <div class='col-xs-12'>
                         <p>Job Title:</p>
                        <p>Student Id:`+data.data[i].studentId+`</p>
                        <p>Application:`+data.data[i].app+`</p>
                        <p>Status:`+data.data[i].status+`</p>
                    
                    </div>
                `)
            }
        }
    })
});