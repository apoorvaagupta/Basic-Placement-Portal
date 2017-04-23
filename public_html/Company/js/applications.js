/**
 * Created by bhavya on 23/4/17.
 */
$(document).ready(function () {
    $.get("http://localhost:4000/company/applications?companyId=" + localStorage.getItem("companyId"),function (data) {
        if(data.isSuccess==="true"){
            console.log(data.data);
            console.log("hii");
        }
    })
});