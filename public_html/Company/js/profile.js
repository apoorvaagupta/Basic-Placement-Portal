/**
 * Created by bhavya on 22/3/17.
 */
$(document).ready(function () {
    console.log(localStorage.getItem("companyId"));
    $.get("http://localhost:4000/company/profile?companyId=" + localStorage.getItem("companyId"), function (data) {
        if (data.isSuccess) {

            $('#name').text(data.row.name);
            $('#email').text(data.row.email);
            $('#id').text(data.row.id);
        }
    });
});