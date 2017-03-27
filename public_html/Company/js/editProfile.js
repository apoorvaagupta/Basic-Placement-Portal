/**
 * Created by bhavya on 22/3/17.
 */
$(document).ready(function () {
    $.get("http://localhost:4000/company/profile?companyId=" + localStorage.getItem("companyId"), function (data) {
        if (data.isSuccess) {
            $('#name').val(data.row.name);
            $('#email').val(data.row.email);
            $('#password').val(data.row.password);
        }
    });

    $('#save').click(function () {
        $.post("http://localhost:4000/company/update?companyId=" + localStorage.getItem("companyId"), {
            details: {
                name: $('#name').val(),
                email: $('#email').val(),
                password: $('#password').val()
            }
        }, function (data) {
            window.location.replace(data.url);

        })
    })
});